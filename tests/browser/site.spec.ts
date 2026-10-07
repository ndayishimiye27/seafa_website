import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
const routes = [
  "/",
  "/about",
  "/history",
  "/team",
  "/activities",
  "/events",
  "/awards",
  "/awards/meilleur-joueur-2015",
  "/gallery",
  "/login",
  "/interviews/book?page=23",
  "/community",
  "/diaspora",
  "/interviews",
  "/interviews/idan",
  "/events/anniversaire-2026",
  "/gallery/anniversaire-2026",
  "/news",
  "/join",
  "/contact",
  "/request-match",
  "/privacy",
  "/code-of-conduct",
  "/challenges",
];
for (const width of [320, 375, 768, 1024, 1440]) {
  test(`all public pages fit ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        route,
      ).toBeTruthy();
      await expect
        .poll(
          async () =>
            page.locator("img").evaluateAll((images) =>
              images.every((image) => {
                const img = image as HTMLImageElement;
                const rect = img.getBoundingClientRect();
                return (
                  !img.checkVisibility() ||
                  (img.complete && img.naturalWidth > 0) ||
                  (img.loading === "lazy" &&
                    (rect.top >= innerHeight || rect.bottom <= 0))
                );
              }),
            ),
          { message: route, timeout: 30000 },
        )
        .toBeTruthy();
      await expect(page.locator("html")).toHaveAttribute("lang", "fr-BI");
    }
    expect(errors).toEqual([]);
  });
}
for (const route of routes) {
  test(`automated accessibility: ${route}`, async ({ page }) => {
    await page.goto(route, { waitUntil: "domcontentloaded" });
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations, route).toEqual([]);
  });
}
test("mobile menu and history are keyboard accessible", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: /Menu/ });
  await menu.click();
  await expect(
    page.getByRole("navigation", { name: "Navigation principale" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await menu.click();
  await page.getByRole("button", { name: "Vie associative" }).click();
  await page
    .getByRole("navigation", { name: "Navigation principale" })
    .getByRole("link", { name: "Diaspora", exact: true })
    .click();
  await expect(page).toHaveURL(/diaspora/);
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await page.goto("/history");
  const first = page.locator("details summary").first();
  await first.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("details").first()).toHaveAttribute("open", "");
});
test("desktop menu closes with Escape and restores focus", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  const more = page.getByRole("button", { name: /Vie associative/ });
  await more.click();
  await expect(page.locator("#community-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(more).toBeFocused();
  await expect(more).toHaveAttribute("aria-expanded", "false");
});
test("forms show French errors and honest success only after persistence", async ({
  page,
}) => {
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 201,
      contentType: "application/json",
      body: JSON.stringify({
        success: true,
        message: "Votre demande a été enregistrée dans le système.",
        reference: "SEAFA-COR-2026-00000001",
        token: "a".repeat(64),
        statusUrl: "https://system.example.invalid/application-access",
      }),
    }),
  );
  await page.goto("/contact");
  await page.getByRole("button", { name: "Envoyer mon message" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Veuillez corriger",
  );
  await page.getByLabel("Nom complet").fill("Test navigateur");
  await page.getByLabel("Adresse e-mail").fill("browser@example.test");
  await page.getByLabel("Objet").fill("Demande de test");
  await page
    .getByLabel("Votre message")
    .fill("Une demande créée uniquement pour vérifier le formulaire.");
  await page.getByLabel(/J’accepte/).check();
  await page.getByRole("button", { name: "Envoyer mon message" }).click();
  await expect(page.getByRole("status")).toContainText("enregistrée");
  await expect(page.getByLabel("Nom complet")).toHaveValue("");
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", (r) =>
    r.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        success: false,
        message: "Service temporairement indisponible.",
      }),
    }),
  );
  await page.getByLabel("Nom complet").fill("Test conservé");
  await page.getByLabel("Adresse e-mail").fill("browser@example.test");
  await page.getByLabel("Objet").fill("Demande de test");
  await page
    .getByLabel("Votre message")
    .fill("Le texte doit rester présent si la réception échoue.");
  await page.getByLabel(/J’accepte/).check();
  await page.getByRole("button", { name: "Envoyer mon message" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "indisponible",
  );
  await expect(page.getByLabel("Nom complet")).toHaveValue("Test conservé");
});
test("links, metadata and reduced motion", async ({ page, request }) => {
  test.setTimeout(180000);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (m) => new URL(m[1]).pathname,
  );
  const links = new Set<string>();
  for (const route of paths) {
    await page.goto(route);
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute("href");
    expect(new URL(canonical!).pathname).toBe(route);
    const found = await page
      .locator("a[href]")
      .evaluateAll((items) => items.map((a) => a.getAttribute("href")!));
    for (const href of found) {
      expect(href.trim()).not.toBe("");
      if (href.startsWith("/") && !href.startsWith("//"))
        links.add(href.split("#")[0]);
    }
  }
  for (const href of links)
    expect((await request.get(href)).status(), href).toBe(200);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page.screenshot({ path: "tmp/audit/home-desktop.png", fullPage: true });
  await page.setViewportSize({ width: 375, height: 900 });
  await page.screenshot({ path: "tmp/audit/home-mobile.png", fullPage: true });
});
