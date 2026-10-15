import { test, expect } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`presidency, calendar and reorganized gallery at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 950 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const presidency = page.locator(".presidency-timeline");
    await expect(presidency.locator("li").first()).toContainText("2014–2022");
    await expect(presidency.locator(".presidency-term")).toHaveCount(4);
    await presidency.locator("li").first().scrollIntoViewIfNeeded();
    await page.screenshot({ path: `tmp/oct15/presidency-${width}.png` });
    await page.goto("/events");
    const basketball = page.locator("article").filter({
      has: page.locator('a[href="/events/match-basketteurs-2026"]'),
    });
    await expect(basketball).toContainText("Novembre 2026");
    await expect(page.locator("main")).not.toContainText(
      /à confirmer|non confirmé/i,
    );
    await page.goto("/gallery");
    const cards = page.locator('a[href^="/gallery/"]');
    await expect(cards.first()).toHaveAttribute(
      "href",
      "/gallery/match-basketteurs-2026",
    );
    await expect(cards.first()).toContainText("À venir");
    await page.getByLabel("Parcourir une année").selectOption("2021");
    await expect(
      page.locator('a[href="/gallery/community-2019-jenda-excursion"]'),
    ).toContainText("2021");
    await expect(
      page.locator('a[href="/gallery/events-2021-anniversary"]'),
    ).toContainText("Karera");
    for (const image of await page.locator(".album-card img").all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth))
        .toBeGreaterThan(0);
    }
    await page.screenshot({
      path: `tmp/oct15/gallery-${width}.png`,
      fullPage: true,
    });
    await page.goto("/gallery/community-2019-jenda-excursion");
    await expect(page.locator("h1")).toContainText("2021");
    const opener = page.getByRole("button", { name: /Ouvrir l’image/ }).first();
    await opener.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        opener
          .locator("img")
          .evaluate((img: HTMLImageElement) => img.naturalWidth),
      )
      .toBeGreaterThan(0);
    expect(
      await opener
        .locator("img")
        .evaluate((img) => getComputedStyle(img).objectFit),
    ).toBe("contain");
    await page.screenshot({
      path: `tmp/oct15/jenda-${width}.png`,
      fullPage: true,
    });
    await opener.click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("dialog")).toContainText("Image 2 sur");
    await page.keyboard.press("Escape");
    await expect(opener).toBeFocused();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  });
}
