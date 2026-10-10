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
  await expect(
    page.locator("#join-positions .position-pitch button"),
  ).toHaveCount(21);
  await expect(page.locator("#join-positions input")).toHaveCount(0);
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
      .getByRole("combobox", { name: "Parcourir une année", exact: true })
      .selectOption("2016");
    await expect(
      page.getByRole("link", { name: /Anniversaire SEAFA — 2016/ }),
    ).toBeVisible();
    await page
      .getByRole("combobox", { name: "Parcourir une année", exact: true })
      .selectOption("unknown");
    await expect(
      page.getByRole("link", {
        name: "Découvrir l’album Archives photographiques",
      }),
    ).toBeVisible();
    if (width < 1024) await page.getByRole("button", { name: "Menu" }).click();
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Espace membre" })
      .click();
    await expect(page).toHaveURL(/\/login$/);
    await expect(
      page.getByRole("heading", { name: "Connexion bientôt disponible" }),
    ).toBeVisible();
    await expect(page).toHaveTitle(/\S/);
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
test("contact preserves editable data when the messaging application cannot open", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.open = () => {
      throw new Error("Application unavailable");
    };
  });
  await page.goto("/contact");
  await page.locator('[name="fullName"]').fill("Test SEAFA");
  await page.locator('[name="email"]').fill("test@example.test");
  await page.locator('[name="subject"]').fill("Courrier test");
  await page
    .locator('[name="message"]')
    .fill("Message de test pour le Secrétariat.");
  await page.locator('[name="privacyConsent"]').check();
  await page
    .getByRole("button", { name: "Envoyer par WhatsApp", exact: true })
    .click();
  await expect(page.locator(".form-message")).toContainText(
    "L’application n’a pas pu être ouverte",
  );
  await expect(page.locator('[name="fullName"]')).toHaveValue("Test SEAFA");
});
