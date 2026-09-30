import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("membership required labels follow category and homepage photos do not repeat", async ({
  page,
}) => {
  await page.goto("/join");
  await page.locator('[name="category"]').selectOption("diaspora");
  await expect(page.locator('[name="country"]')).toHaveAttribute(
    "required",
    "",
  );
  await page.locator('[name="category"]').selectOption("active");
  await expect(page.locator('[name="country"]')).not.toHaveAttribute(
    "required",
  );
  await expect(page.locator('[name="positions"]')).toHaveCount(21);
  await page.goto("/");
  const sources = await page
    .locator("main img")
    .evaluateAll((images) =>
      images.map(
        (image) =>
          new URL((image as HTMLImageElement).src).searchParams.get("url") ??
          (image as HTMLImageElement).src,
      ),
    );
  expect(new Set(sources).size).toBe(sources.length);
});
for (const width of [375, 1440]) {
  test(`year/event navigation, member entry and book at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/gallery");
    await page
      .getByRole("combobox", { name: "Année", exact: true })
      .selectOption("2016");
    const links = await page
      .locator('main a[href^="/gallery/"]')
      .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href")));
    await page.getByRole("button", { name: "Événements", exact: true }).click();
    expect(
      await page
        .locator('main a[href^="/gallery/"]')
        .evaluateAll((nodes) => nodes.map((n) => n.getAttribute("href"))),
    ).toEqual(links);
    await page
      .getByRole("combobox", { name: "Année", exact: true })
      .selectOption("unknown");
    await expect(
      page.getByRole("link", {
        name: "Découvrir l’album Visite chez les Badogomba",
      }),
    ).toBeVisible();
    if (width < 1280) await page.getByRole("button", { name: "Menu" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Se connecter" })
      .click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(
      page.getByRole("heading", { name: "Connexion bientôt disponible" }),
    ).toBeVisible();
    await page.screenshot({
      path: `tmp/finishing-login-${width}.png`,
      fullPage: true,
    });
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await page.goto("/interviews/arnaud-bados-badogomba");
    await page
      .getByRole("link", { name: "Lire l’entretien dans le livret" })
      .click();
    await expect(
      page.getByRole("heading", { name: "Page 23", exact: true }),
    ).toBeVisible();
    await page.getByRole("button", { name: "Suivante", exact: true }).click();
    await expect(page).toHaveURL(/page=24/);
    await page.getByRole("button", { name: "Voir la page du livret" }).click();
    await expect(page.locator("main img")).toBeVisible();
    expect(
      (await page.request.get("/book/newsletter-seafa.pdf")).status(),
    ).toBe(200);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth + 1,
      ),
    ).toBe(true);
  });
}
test("form preserves editable data after a failed delivery", async ({
  page,
}) => {
  await page.goto("/contact");
  await page.locator('[name="fullName"]').fill("Test SEAFA");
  await page.locator('[name="email"]').fill("test@example.test");
  await page.locator('[name="subject"]').fill("Courrier test");
  await page
    .locator('[name="message"]')
    .fill("Message de test pour le Secrétariat.");
  await page.locator('[name="privacyConsent"]').check();
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        success: false,
        message: "La demande n’a pas été enregistrée.",
      }),
    }),
  );
  await page.getByRole("button", { name: "Envoyer mon message" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "n’a pas été enregistrée",
  );
  await expect(page.locator('[name="fullName"]')).toHaveValue("Test SEAFA");
});
