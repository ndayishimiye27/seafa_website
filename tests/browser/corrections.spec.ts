import { test, expect } from "@playwright/test";
import {
  correctionPhotos,
  correctionAlbums,
} from "../../src/data/correction-media";
import { mediaAssets } from "../../src/data/media";
import { albums } from "../../src/data/albums";

test("every newly supplied photograph is published and its image URL resolves", async ({
  request,
}) => {
  test.setTimeout(300_000);
  const published = new Set(
    albums.flatMap((album) => album.images.map((image) => image.mediaId)),
  );
  for (const id of Object.values(correctionPhotos).flat()) {
    expect(published.has(id), id).toBe(true);
    const media = mediaAssets.find((asset) => asset.id === id)!;
    expect((await request.get(media.src)).status(), media.src).toBe(200);
    const query = new URLSearchParams({ url: media.src, w: "640", q: "75" });
    const response = await request.get(`/_next/image?${query}`);
    expect(response.status(), media.src).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^image\//);
  }
});

for (const width of [390, 1440]) {
  test(`corrected names, presidency, Archives and new collections at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 950 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/history");
    const founders = page.locator(".founders-figure");
    await expect(founders).toContainText("Axel Bayoboke");
    await expect(founders).toContainText("Mugisha Celestin");
    await expect(founders).toContainText("Butungunu Fleury");
    const montage = founders.locator("img");
    await montage.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        montage.evaluate(
          (image: HTMLImageElement) => image.complete && image.naturalWidth > 0,
        ),
      )
      .toBe(true);
    const presidents = page.locator(".presidency-timeline li");
    await expect(presidents.first()).toContainText("2014–2022");
    await expect(presidents.nth(1)).toContainText("2020–2022");
    await expect(presidents.nth(2)).toContainText("2022–2024");
    await expect(presidents.last()).toContainText("Depuis 2024");
    await page.goto("/interviews/idan");
    await expect(page).toHaveURL(/\/interviews\/idane$/);
    await expect(page.locator("main")).toContainText("Idane");
    await expect(page.locator("main")).not.toContainText(/\bIdan\b/);
    await page.goto("/gallery");
    await page.getByRole("button", { name: "Archives", exact: true }).click();
    await expect(
      page.locator('a[href="/gallery/archives-ajoutees"]'),
    ).toBeVisible();
    await expect(
      page.locator('a[href="/gallery/community-2019-jenda-excursion"]'),
    ).toHaveCount(0);
    await expect(
      page.locator('a[href="/gallery/events-2019-anniversary"]'),
    ).toHaveCount(0);
    for (const album of correctionAlbums) {
      await page.goto(`/gallery/${album.slug}`);
      await expect(page.locator("h1")).toContainText(album.title);
      const photo = page
        .locator('button[aria-label^="Ouvrir l’image"]')
        .first();
      await photo.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          photo
            .locator("img")
            .evaluate(
              (image: HTMLImageElement) =>
                image.complete && image.naturalWidth > 0,
            ),
        )
        .toBe(true);
      await photo.click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.keyboard.press("Escape");
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
      ).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}
