import { test, expect } from "@playwright/test";
for (const width of [375, 1440]) {
  test(`registration navigation and discreet footer credit at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    if (width < 1280)
      await page.getByRole("button", { name: "Menu", exact: true }).click();
    await expect(
      page
        .locator("header")
        .getByRole("link", { name: "Devenir membre", exact: true }),
    ).toBeVisible();
    await expect(
      page
        .locator("header")
        .getByRole("link", { name: "Se connecter", exact: true }),
    ).toBeVisible();
    const credit = page
      .locator("footer")
      .getByRole("link", { name: "TechVision Labs", exact: true });
    await expect(credit).toHaveAttribute("href", "https://www.techvlabs.org");
    await credit.scrollIntoViewIfNeeded();
    await expect(credit).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  });
}
