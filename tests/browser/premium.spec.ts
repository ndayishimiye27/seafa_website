import { test, expect } from "@playwright/test";

for (const width of [390, 768, 1440, 1920]) {
  test(`premium layouts, portraits and logo navigation at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 950 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const route of ["/", "/history", "/gallery", "/about", "/team"]) {
      await page.goto(route);
      await expect(page.locator("h1").last()).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(page.locator("main").last()).not.toContainText(
        "Les visages de SEAFA",
      );
      await expect(page.locator("main").last()).not.toContainText(
        "Les portraits de nos archives",
      );
      if (["/", "/history", "/team"].includes(route)) {
        const portraits = page.locator(".presidency-timeline li");
        await expect(portraits).toHaveCount(4);
        if (width >= 1440) {
          const tops = await portraits.evaluateAll((nodes) =>
            nodes.map((node) => node.getBoundingClientRect().top),
          );
          expect(Math.max(...tops) - Math.min(...tops)).toBeLessThan(2);
        }
        await expect(portraits.last()).toContainText("Jimmy Jambo");
        await expect(portraits.last()).toContainText("Depuis 2024");
        for (const portrait of await portraits.locator("img").all()) {
          await portrait.scrollIntoViewIfNeeded();
          await expect
            .poll(() =>
              portrait.evaluate(
                (image: HTMLImageElement) =>
                  image.complete && image.naturalWidth > 0,
              ),
            )
            .toBe(true);
        }
      }
      await page.evaluate(() => scrollTo(0, 0));
      await page.locator(".header-brand").click();
      await expect(page).toHaveURL(/\/$/);
    }
    expect(errors).toEqual([]);
  });
}

test("hero rotates, pauses and loads photographs progressively", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".hero-slide")).toHaveCount(1);
  await expect(
    page.getByRole("button", {
      name: "Afficher la photographie 2",
      exact: true,
    }),
  ).toHaveAttribute("aria-current", "true", { timeout: 12000 });
  await page
    .getByRole("button", { name: "Mettre le diaporama en pause" })
    .click();
  const paused = await page
    .locator(".hero-indicator[aria-current]")
    .getAttribute("aria-label");
  await page.locator("h1").click();
  await page.waitForTimeout(6500);
  await expect(page.locator(".hero-indicator[aria-current]")).toHaveAttribute(
    "aria-label",
    paused!,
  );
  await page.getByRole("button", { name: "Photographie suivante" }).click();
  await expect(
    page.locator(".hero-indicator[aria-current]"),
  ).not.toHaveAttribute("aria-label", paused!);
  const links = await page
    .locator(".home-stories a")
    .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
  expect(links).toEqual([
    "/gallery/seafa-lumitel",
    "/gallery/anniversaire-2026",
    "/gallery/events-2018-karera-falls",
    "/gallery/conference-sante-2022",
  ]);
});

test("reduced motion and mobile drawer keyboard behavior", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 850 });
  await page.goto("/");
  await page.waitForTimeout(6500);
  await expect(
    page.getByRole("button", {
      name: "Afficher la photographie 1",
      exact: true,
    }),
  ).toHaveAttribute("aria-current", "true");
  await page.getByRole("button", { name: "Photographie suivante" }).click();
  await expect(
    page.getByRole("button", {
      name: "Afficher la photographie 2",
      exact: true,
    }),
  ).toHaveAttribute("aria-current", "true");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.locator(".header-login")).toBeFocused();
  await page.locator(".header-join").focus();
  await page.keyboard.press("Tab");
  await expect(page.locator(".header-brand")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page.locator(".header-brand").click();
  await expect(page.locator("#site-navigation")).toBeHidden();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});
