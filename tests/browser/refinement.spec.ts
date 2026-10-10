import { test, expect } from "@playwright/test";

test("hero suspends rotation while the document is hidden", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".hero-indicator").first().focus();
  await page.locator("h1").click();
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await page.waitForTimeout(6500);
  await expect(page.locator(".hero-indicator").first()).toHaveAttribute(
    "aria-current",
    "true",
  );
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: false,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(page.locator(".hero-indicator").nth(1)).toHaveAttribute(
    "aria-current",
    "true",
    { timeout: 12000 },
  );
});

test("scaled desktop retains a compact header and anchored dropdown", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1273, height: 850 });
  await page.goto("/");
  await expect(
    page.getByRole("button", { name: "Menu", exact: true }),
  ).toBeHidden();
  const nav = page.locator(".header-navigation");
  await expect(nav).toBeVisible();
  expect(await nav.evaluate((node) => getComputedStyle(node).position)).toBe(
    "static",
  );
  await page.getByRole("button", { name: "Le club", exact: true }).click();
  expect(
    await page
      .locator("#club-menu")
      .evaluate((node) => node.getBoundingClientRect().width),
  ).toBeLessThan(300);
});

test("slideshow controls are discreet until the motion control receives keyboard focus", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("button", {
      name: /Photographie précédente|Photographie suivante/,
    }),
  ).toHaveCount(0);
  const motion = page.locator(".hero-motion-toggle");
  expect(
    await motion.evaluate((node) => node.getBoundingClientRect().width),
  ).toBe(1);
  await motion.focus();
  expect(
    await motion.evaluate((node) => node.getBoundingClientRect().width),
  ).toBeGreaterThan(100);
  await expect(motion).toBeFocused();
  await expect(
    page.getByRole("link", { name: "Rejoindre SEAFA", exact: true }).first(),
  ).toBeVisible();
  await expect(
    page
      .getByRole("link", { name: "Découvrir notre histoire", exact: true })
      .first(),
  ).toBeVisible();
});

test("history has one year row and confines founders to the 2013 entry", async ({
  page,
  request,
}) => {
  await page.goto("/history");
  const years = await page.locator(".timeline-year").allTextContents();
  expect(new Set(years).size).toBe(years.length);
  await expect(page.locator("#year-2026 .timeline-event")).toHaveCount(2);
  await expect(page.locator("#year-2013 .founders-figure")).toHaveCount(1);
  await expect(page.locator(".founders-figure figcaption")).toContainText(
    "Axel Ndayizeye",
  );
  await expect(page.locator(".founders-figure figcaption")).toContainText(
    "Fidèle",
  );
  for (const route of ["/", "/team", "/gallery"]) {
    await page.goto(route);
    await expect(page.locator(".founders-figure")).toHaveCount(0);
    await expect(page.locator('img[src*="founders"]')).toHaveCount(0);
  }
  const foundersRedirect = await request.get("/gallery/history-2013", {
    maxRedirects: 0,
  });
  expect(foundersRedirect.status()).toBe(308);
  expect(foundersRedirect.headers().location).toBe("/history#year-2013");
  await page.goto("/gallery/nouvel-an-2018");
  await expect(page.locator("h1")).toContainText("2018");
});
