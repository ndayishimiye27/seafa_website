import { test, expect } from "@playwright/test";

test("static booklet preserves direct page links, bounds and original-page navigation", async ({
  page,
}) => {
  for (const [query, expectedPage] of [
    ["23", 23],
    ["29", 29],
    ["0", 1],
    ["30", 1],
    ["invalid", 1],
    ["1.5", 1],
  ] as const) {
    await page.goto(`/interviews/book?page=${query}`);
    await expect(
      page.getByRole("heading", { name: `Page ${expectedPage}`, exact: true }),
    ).toBeVisible();
  }
  await page.goto("/interviews/book?page=23");
  await page
    .getByRole("button", { name: "Voir la page du livret", exact: true })
    .click();
  await page.getByRole("button", { name: "Suivante", exact: true }).click();
  await expect(page).toHaveURL(/page=24$/);
  await expect(
    page.getByRole("heading", { name: "Page 24", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Lire le texte", exact: true }),
  ).toBeVisible();
  await expect(page.locator("main img")).toHaveAttribute("alt", /Page 24/);
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Page 24", exact: true }),
  ).toBeVisible();
});
