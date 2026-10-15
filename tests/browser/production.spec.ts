import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const origin = "https://www.saintespritfootballacademyalumni.com";
test("production metadata uses the canonical host and branded sharing images", async ({
  page,
  request,
}) => {
  for (const route of [
    "/",
    "/gallery",
    "/gallery/community-2019-jenda-excursion",
    "/join",
    "/contact",
    "/request-match",
    "/activities",
    "/events",
    "/login",
  ]) {
    await page.goto(route);
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveCount(1);
    expect(new URL((await canonical.getAttribute("href"))!).href).toBe(
      new URL(route, origin).href,
    );
    for (const selector of [
      'meta[property="og:image"]',
      'meta[name="twitter:image"]',
    ]) {
      const image = await page.locator(selector).getAttribute("content");
      expect(new URL(image!).origin).toBe(origin);
      expect(new URL(image!).pathname).toBe("/opengraph-image");
    }
    await expect(page.locator('meta[property="og:image:alt"]')).toHaveAttribute(
      "content",
      /SEAFA/,
    );
  }
  const image = await request.get("/opengraph-image");
  expect(image.status()).toBe(200);
  expect(image.headers()["content-type"]).toContain("image/png");
  const png = await image.body();
  expect(png.readUInt32BE(16)).toBe(1200);
  expect(png.readUInt32BE(20)).toBe(630);
});

for (const width of [390, 1440, 720]) {
  for (const route of ["/join", "/contact", "/request-match"]) {
    test(`error recovery remains visible on ${route} at ${width}px`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 950 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(route);
      await page.locator('button[type="submit"]').click();
      const summary = page.locator('form [role="alert"]');
      await expect(summary).toBeFocused();
      const links = await summary
        .locator("a")
        .evaluateAll((items) => items.map((a) => a.getAttribute("href")!));
      expect(links.length).toBeGreaterThan(2);
      for (const href of links) {
        const link = summary.locator(`a[href="${href}"]`);
        await link.focus();
        await page.keyboard.press("Enter");
        const target = page.locator(href);
        await expect(target).toBeFocused();
        const position = await target.evaluate((element) => ({
          top: element.getBoundingClientRect().top,
          headerBottom: document
            .querySelector(".site-header")!
            .getBoundingClientRect().bottom,
          viewportHeight: innerHeight,
        }));
        expect(position.top).toBeGreaterThanOrEqual(position.headerBottom + 30);
        expect(position.top).toBeLessThan(position.viewportHeight - 40);
      }
      if (route === "/join") {
        // Tab navigation into Genre and the positions fieldset shares the same controls.
        await expect(page.locator('[name="gender"]')).toHaveValue("");
      }
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(axe.violations).toEqual([]);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
      ).toBe(false);
      await page.screenshot({
        path: `tmp/production-fixes/${route.slice(1)}-${width}.png`,
      });
    });
  }
}
