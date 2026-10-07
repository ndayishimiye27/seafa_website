import { test, expect } from "@playwright/test";
import {
  getPublishedAlbums,
  getPublishedActivities,
  getPublishedEvents,
  getPublishedAwards,
} from "../../src/lib/content";
import { resolveAlbumImages } from "../../src/lib/media";
import AxeBuilder from "@axe-core/playwright";

test("every supplied album and connected detail route resolves with its full gallery", async ({
  page,
}) => {
  test.setTimeout(240000);
  const routes = [
    ...getPublishedAlbums().map((album) => ({
      path: "/gallery/" + album.slug,
      album,
    })),
    ...getPublishedActivities().map((record) => ({
      path: "/activities/" + record.slug,
      album: getPublishedAlbums().find((a) => a.id === record.albumId)!,
    })),
    ...getPublishedEvents().map((record) => ({
      path: "/events/" + record.slug,
      album: getPublishedAlbums().find((a) => a.id === record.albumId)!,
    })),
    ...getPublishedAwards()
      .filter((r) => r.albumId)
      .map((record) => ({
        path: "/awards/" + record.slug,
        album: getPublishedAlbums().find((a) => a.id === record.albumId)!,
      })),
  ];
  for (const { path, album } of routes) {
    const response = await page.goto(path, { waitUntil: "domcontentloaded" });
    expect(response?.status(), path).toBe(200);
    await expect(
      page.getByRole("button", { name: /Ouvrir l’image/ }),
    ).toHaveCount(album.images.length);
    await expect(page.locator("h1")).toHaveCount(1);
  }
});
for (const width of [375, 1440]) {
  test(`real albums, lightbox and video work at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const album = getPublishedAlbums().find(
      (a) => a.slug === "activities-2024-tournament",
    )!;
    await page.goto("/activities/" + album.slug);
    const opener = page.getByRole("button", {
      name: `Ouvrir l’image 1 sur ${album.images.length} en plein écran`,
    });
    await opener.click();
    const dialog = page.getByRole("dialog");
    const image = dialog.locator("img");
    await expect
      .poll(() =>
        image.evaluate((img) => (img as HTMLImageElement).naturalWidth),
      )
      .toBeGreaterThan(0);
    await expect(image).toHaveAttribute(
      "alt",
      resolveAlbumImages(album)[0].media.alt,
    );
    await page.keyboard.press("ArrowLeft");
    await expect(dialog).toContainText(
      `Image ${album.images.length} sur ${album.images.length}`,
    );
    await page.keyboard.press("ArrowRight");
    await expect(dialog).toContainText(`Image 1 sur ${album.images.length}`);
    await page.screenshot({ path: `tmp/media-audit/lightbox-${width}.png` });
    await page.keyboard.press("Escape");
    await expect(opener).toBeFocused();
    await page.screenshot({
      path: `tmp/media-audit/album-${width}.png`,
      fullPage: true,
    });
    await page.goto("/gallery");
    await page.getByRole("button", { name: "Histoire", exact: true }).click();
    await expect(
      page.getByRole("link", { name: /Découvrir l’album/ }),
    ).toHaveCount(4);
    await page.goto("/interviews");
    for (const img of await page.locator("main img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() => img.evaluate((el) => (el as HTMLImageElement).naturalWidth))
        .toBeGreaterThan(0);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `tmp/media-audit/interviews-${width}.png`,
      fullPage: true,
    });
    await page.goto("/activities");
    const video = page.getByLabel("Entraînement SEAFA", { exact: true });
    await video.scrollIntoViewIfNeeded();
    await expect(video).toHaveAttribute("controls", "");
    await expect(video).toHaveAttribute("preload", "metadata");
    expect(
      await video.evaluate((el) => (el as HTMLVideoElement).autoplay),
    ).toBe(false);
    await expect
      .poll(() => video.evaluate((el) => (el as HTMLVideoElement).readyState), {
        timeout: 30000,
      })
      .toBeGreaterThanOrEqual(1);
    await video.evaluate((el) => (el as HTMLVideoElement).play());
    await expect
      .poll(
        () => video.evaluate((el) => (el as HTMLVideoElement).currentTime),
        { timeout: 15000 },
      )
      .toBeGreaterThan(0);
    await video.evaluate((el) => (el as HTMLVideoElement).pause());
    await page.screenshot({ path: `tmp/media-audit/video-${width}.png` });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
  });
}
test("album detail pages and video meet automated accessibility checks", async ({
  page,
}) => {
  for (const route of [
    "/gallery/history-archives",
    "/events/events-medical-session",
    "/awards/archives-distinctions-2018",
    "/activities/activities-2024-tournament",
  ]) {
    await page.goto(route);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
      route,
    ).toEqual([]);
  }
});
import { archivedPeople } from "../../src/data/people";
for (const width of [375, 1440]) {
  test(`Team uses known archives instead of empty panels at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/team");
    for (const person of archivedPeople)
      await expect(
        page.getByRole("heading", { name: person.name, exact: true }).first(),
      ).toBeVisible();
    await expect(
      page.getByText("Président — archive de 2024", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Premier président — portrait d’archive", { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByText("Le leadership sera bientôt présenté", { exact: true }),
    ).toHaveCount(0);
    await expect(
      page.getByText("L’encadrement est en préparation", { exact: true }),
    ).toHaveCount(0);
    for (const image of await page.locator("main img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate((el) => (el as HTMLImageElement).naturalWidth),
        )
        .toBeGreaterThan(0);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `tmp/media-audit/team-final-${width}.png`,
      fullPage: true,
    });
  });
}
test("brand and portrait sections link directly to their complete albums", async ({
  page,
  request,
}) => {
  for (const [route, href] of [
    ["/", "/gallery/brand"],
    ["/interviews", "/gallery/interviews"],
    ["/team", "/gallery/people"],
  ]) {
    await page.goto(route);
    await expect(page.locator(`main a[href="${href}"]`)).toHaveCount(1);
    expect((await request.get(href)).status()).toBe(200);
  }
});
for (const width of [375, 1440]) {
  test(`gallery keeps content-type and theme filters available at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/gallery");
    for (const [label, count] of [
      ["Activités", 12],
      ["Rencontres et célébrations", 15],
      ["Prix et distinctions", 4],
      ["Histoire", 4],
    ] as const) {
      await page.getByRole("button", { name: label, exact: true }).click();
      await expect(
        page.getByRole("link", { name: /Découvrir l’album/ }),
      ).toHaveCount(count);
    }
    await page
      .getByRole("button", { name: "Football et entraînements", exact: true })
      .click();
    await expect(
      page.getByRole("link", { name: /Découvrir l’album/ }),
    ).toHaveCount(12);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "Tout", exact: true }).click();
    await expect(
      page.getByRole("link", { name: /Découvrir l’album/ }),
    ).toHaveCount(48);
  });
}
