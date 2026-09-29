import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { navigationGroups, primaryLinks } from "../../src/content/fr";

for (const width of [320, 375, 768, 1024, 1280, 1440]) {
  test(`navigation layout and disclosures at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const header = page.locator(".site-header");
    const nav = page.getByRole("navigation", { name: "Navigation principale" });
    const mobile = width < 1280;
    if (mobile)
      await header.getByRole("button", { name: "Menu", exact: true }).click();
    await expect(
      nav.getByRole("link", { name: "Se connecter", exact: true }),
    ).toHaveAttribute("href", "/login");
    await expect(
      nav.getByRole("link", { name: "Devenir membre" }),
    ).toHaveAttribute("href", "/join");
    const hrefs = await nav
      .locator("a")
      .evaluateAll((nodes) => nodes.map((node) => node.getAttribute("href")));
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(hrefs.sort()).toEqual(
      [
        ...navigationGroups.flatMap((group) => group.links),
        ...primaryLinks,
        { href: "/login" },
        { href: "/join" },
      ]
        .map((link) => link.href)
        .sort(),
    );
    for (const group of navigationGroups) {
      const trigger = nav.getByRole("button", {
        name: group.label,
        exact: true,
      });
      await trigger.focus();
      await page.keyboard.press("Enter");
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await page.keyboard.press("Tab");
      await expect(
        nav.getByRole("link", { name: group.links[0].label, exact: true }),
      ).toBeFocused();
      await page.keyboard.press("Escape");
      await expect(trigger).toBeFocused();
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await trigger.click();
      for (const link of group.links)
        await expect(
          nav.getByRole("link", { name: link.label, exact: true }),
        ).toBeVisible();
      expect(
        (
          await new AxeBuilder({ page })
            .include(".site-header")
            .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
            .analyze()
        ).violations,
      ).toEqual([]);
      await page.screenshot({
        path: `tmp/navigation/${width}-${group.id}.png`,
      });
      await trigger.click();
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({ path: `tmp/navigation/${width}.png` });
    await nav.getByRole("link", { name: "Galerie", exact: true }).click();
    await expect(page).toHaveURL(/\/gallery$/);
    if (mobile) await expect(nav).toBeHidden();
    else
      await expect(
        nav.getByRole("link", { name: "Galerie", exact: true }),
      ).toHaveAttribute("aria-current", "page");
  });
}

test("touch, outside click, focus exit and breakpoint changes reset menus", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 375, height: 800 },
    hasTouch: true,
  });
  const page = await context.newPage();
  await page.goto("/");
  const header = page.locator(".site-header");
  await header.getByRole("button", { name: "Menu", exact: true }).tap();
  await header.getByRole("button", { name: "Vie associative" }).tap();
  await header.getByRole("link", { name: "Diaspora", exact: true }).tap();
  await expect(page).toHaveURL(/\/diaspora$/);
  await expect(
    header.getByRole("button", { name: "Menu", exact: true }),
  ).toHaveAttribute("aria-expanded", "false");
  await page.setViewportSize({ width: 1440, height: 900 });
  const club = header.getByRole("button", { name: "Le club", exact: true });
  await club.click();
  await header.getByRole("button", { name: "Vie associative" }).focus();
  await expect(club).toHaveAttribute("aria-expanded", "false");
  await club.click();
  // Click the exposed edge: the dropdown can cover the heading's center.
  await page.locator("h1").click({ position: { x: 5, y: 5 } });
  await expect(club).toHaveAttribute("aria-expanded", "false");
  await club.click();
  await page.setViewportSize({ width: 375, height: 800 });
  await expect(
    page.getByRole("navigation", { name: "Navigation principale" }),
  ).toBeHidden();
  await header.getByRole("button", { name: "Menu", exact: true }).tap();
  await expect(club).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Escape");
  await expect(
    header.getByRole("button", { name: "Menu", exact: true }),
  ).toBeFocused();
  await context.close();
});
