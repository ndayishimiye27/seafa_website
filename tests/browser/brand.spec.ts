import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const width of [375, 1440]) {
  test(`approved logos and Claver's interview work at ${width}px`, async ({
    page,
    request,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/interviews");
    const headerLogo = page.locator("header img");
    await expect(headerLogo).toHaveAttribute("src", /seafa-logo-main/);
    await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
      "href",
      "/media/brand/logos/favicon-32x32.png",
    );
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute(
      "href",
      "/media/brand/logos/apple-touch-icon.png",
    );
    const card = page.locator("article").filter({
      has: page.getByRole("heading", {
        name: "Claver Kazobavamwo",
        exact: true,
      }),
    });
    await expect(card.locator("img")).toHaveAttribute(
      "src",
      /claver-kazobavamwo-0c199519\.png/,
    );
    await card.getByRole("link", { name: "Lire son témoignage" }).click();
    await expect(page).toHaveURL(/\/interviews\/claver-kazobavamwo$/);
    await expect(page.locator("h1")).toHaveText("Claver Kazobavamwo");
    const portrait = page.locator("main img");
    await portrait.scrollIntoViewIfNeeded();
    await expect(portrait).toHaveAttribute(
      "src",
      /claver-kazobavamwo-0c199519\.png/,
    );
    await expect
      .poll(() =>
        portrait.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
    await expect(page.locator("main")).toContainText("p. 21");
    await expect(page.locator("main")).toContainText(
      "ne confirme pas une fonction actuelle",
    );
    await page.screenshot({
      path: `tmp/media-audit/claver-${width}.png`,
      fullPage: true,
    });
    const footerLogo = page.locator("footer img");
    await footerLogo.scrollIntoViewIfNeeded();
    await expect(footerLogo).toHaveAttribute("src", /seafa-logo-white/);
    await expect
      .poll(() =>
        footerLogo.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    for (const path of ["/about", "/history"]) {
      await page.goto(path);
      const stacked = page.locator(
        'main img[alt="SEAFA — Saint Esprit Alumni Football Academy"]',
      );
      await stacked.scrollIntoViewIfNeeded();
      await expect(stacked).toHaveAttribute("src", /seafa-logo-stacked/);
      await expect
        .poll(() =>
          stacked.evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
        )
        .toBe(true);
      const ratio = await stacked.evaluate(
        (img) =>
          img.getBoundingClientRect().width /
          img.getBoundingClientRect().height,
      );
      expect(ratio).toBeCloseTo(885 / 1290, 2);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: `tmp/media-audit/brand-${path.slice(1)}-${width}.png`,
        fullPage: true,
      });
    }
    const manifest = await (await request.get("/manifest.webmanifest")).json();
    expect(manifest.icons[0].src).toBe(
      "/media/brand/logos/seafa-logo-icon.png",
    );
    for (const path of ["/opengraph-image", "/twitter-image"]) {
      const response = await request.get(path);
      expect(response.status()).toBe(200);
      expect(response.headers()["content-type"]).toContain("image/png");
    }
  });
}
