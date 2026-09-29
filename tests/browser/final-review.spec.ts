import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { getPublishedInterviews } from "../../src/data/interviews";

for (const width of [375, 768, 1440]) {
  test(`anniversary discovery, real photos and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/events"]) {
      await page.goto(path);
      await expect(
        page.locator('main a[href="/events/anniversaire-2026"]'),
      ).toBeVisible();
    }
    await page.goto("/gallery");
    await page
      .getByRole("combobox", { name: "Année", exact: true })
      .selectOption("2026");
    await page.locator('main a[href="/gallery/anniversaire-2026"]').click();
    await expect(page.locator("h1")).toHaveText("13e anniversaire de SEAFA");
    await expect(page.locator("main")).toContainText("26 septembre 2026");
    await expect(
      page.getByRole("button", { name: /Ouvrir l’image/ }),
    ).toHaveCount(175);
    await page.getByRole("button", { name: /Ouvrir l’image 1 sur/ }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect
      .poll(() =>
        dialog
          .locator("img")
          .evaluateAll((nodes) =>
            nodes.every((n) => (n as HTMLImageElement).naturalWidth > 0),
          ),
      )
      .toBe(true);
    await page.keyboard.press("ArrowRight");
    await page.keyboard.press("Escape");
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `tmp/final-review/anniversary-${width}.png`,
    });
  });
}
test("Darcy route is unavailable and all four other interviews and reader links remain", async ({
  page,
  request,
}) => {
  expect((await request.get("/interviews/darcy-nibogora")).status()).toBe(404);
  const xml = await (await request.get("/sitemap.xml")).text();
  expect(xml).not.toContain("darcy");
  for (const path of ["/", "/interviews"]) {
    await page.goto(path);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("main")).not.toContainText("Darcy");
    await expect(page.locator('a[href*="darcy"]')).toHaveCount(0);
    await expect(
      page.locator('a[href="/interviews/book?page=27"]'),
    ).toHaveCount(0);
    for (const interview of getPublishedInterviews())
      await expect(
        page.locator(`a[href="/interviews/${interview.slug}"]`),
      ).toBeVisible();
  }
  for (const interview of getPublishedInterviews()) {
    await page.goto("/interviews/" + interview.slug);
    await expect(page.locator("h1")).toContainText(interview.fullName);
    await expect(
      page.getByRole("link", { name: "Lire l’entretien dans le livret" }),
    ).toBeVisible();
  }
});
