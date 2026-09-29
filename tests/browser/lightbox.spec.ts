import { test, expect } from "@playwright/test";

test("real lightbox supports keyboard, focus restoration and horizontal touch", async ({
  page,
}) => {
  page.on("pageerror", (error) => {
    throw error;
  });
  await page.goto("/gallery/history-2014");
  const opener = page.getByRole("button", {
    name: "Ouvrir l’image 1 sur 2 en plein écran",
  });
  await opener.click();
  const close = page.getByRole("button", { name: "Fermer la galerie" });
  await expect(close).toBeFocused();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByText("Image 2 sur 2")).toBeVisible();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByText("Image 1 sur 2")).toBeVisible();
  await close.focus();
  await page.keyboard.press("Shift+Tab");
  await expect(
    page.getByRole("button", { name: "Afficher l’image suivante" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(close).toBeFocused();
  const dialog = page.getByRole("dialog");
  await dialog.dispatchEvent("touchstart", {
    touches: [{ identifier: 1, clientX: 250, clientY: 100 }],
  });
  await dialog.dispatchEvent("touchend", {
    changedTouches: [{ identifier: 1, clientX: 100, clientY: 110 }],
  });
  await expect(page.getByText("Image 2 sur 2")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});
