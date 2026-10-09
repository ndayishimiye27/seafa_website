import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { formFields } from "../../src/content/form-fields";

async function fill(page: Page, kind: "contact" | "join" | "match-requests") {
  for (const field of formFields[kind]) {
    const input = page.locator(`[name="${field.name}"]`);
    if (field.type === "positions") {
      await page
        .locator("#join-positions")
        .getByRole("button", { name: /^GK —/ })
        .click();
      await page
        .locator("#join-positions")
        .getByRole("button", { name: /^ST —/ })
        .click();
    } else if (field.type === "checkbox") await input.check();
    else if (field.type === "select")
      await input.selectOption(field.options![0][0]);
    else if (field.type === "email") await input.fill("visiteur@example.test");
    else if (field.type === "tel") await input.fill("+25779123456");
    else if (field.type === "datetime-local")
      await input.fill("2099-10-01T15:00");
    else await input.fill("Équipe & amis + # — demande de test uniquement");
  }
}

for (const width of [375, 1440])
  for (const kind of ["contact", "join", "match-requests"] as const)
    for (const channel of ["whatsapp", "email"] as const) {
      test(`${kind} prepares ${channel} without server submission at ${width}px`, async ({
        page,
      }) => {
        await page.setViewportSize({ width, height: 900 });
        await page.addInitScript(() => {
          window.open = () => null;
        });
        const posts: string[] = [];
        page.on("request", (r) => {
          if (r.method() === "POST") posts.push(r.url());
        });
        await page.goto(
          kind === "contact"
            ? "/contact"
            : kind === "join"
              ? "/join"
              : "/request-match",
        );
        await expect(page.locator('button[type="submit"]')).toBeEnabled();
        await expect(
          page.getByRole("radio", {
            name: "Envoyer par WhatsApp",
            exact: true,
          }),
        ).toBeVisible();
        await expect(
          page.getByRole("radio", { name: "Envoyer par e-mail", exact: true }),
        ).toBeVisible();
        await fill(page, kind);
        await page.locator(`[name="delivery"][value="${channel}"]`).check();
        await page.locator('button[type="submit"]').click();
        const preview = page.getByRole("region", {
          name: "Brouillon de votre demande",
        });
        await expect(preview).toBeVisible();
        const body = await page.locator("#draft-message").inputValue();
        expect(body).toContain("visiteur@example.test");
        expect(body).toContain("Équipe & amis + #");
        for (const field of formFields[kind])
          expect(body).toContain(field.label + " :");
        if (kind === "join") {
          expect(body).toContain("GK — Gardien");
          expect(body).toContain("ST — Attaquant de pointe");
        }
        const url = new URL(
          (await preview.getByRole("link").getAttribute("href"))!,
        );
        expect(url.pathname).toBe(
          channel === "whatsapp"
            ? "/25779690359"
            : "jambojeanjimmy52@gmail.com",
        );
        const visibleText = await page.locator("main").innerText();
        expect(visibleText).not.toContain("jambojeanjimmy52@gmail.com");
        expect(visibleText).not.toContain("+25779690359");
        expect(visibleText).not.toContain("+257 79 690 359");
        expect(visibleText).not.toContain("Jimmy");
        expect(
          url.searchParams.get(channel === "whatsapp" ? "text" : "body"),
        ).toBe(body);
        if (channel === "email")
          expect(url.searchParams.get("subject")).toContain("SEAFA");
        await expect(page.locator("form")).toContainText(
          "appuyez vous-même sur Envoyer",
        );
        await expect(page.locator('[name="email"]')).toHaveValue(
          "visiteur@example.test",
        );
        expect(posts).toEqual([]);
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBe(true);
        await expect(page.locator(".form-message.success")).toHaveCount(0);
        await page.locator('[name="email"]').fill("autre@example.test");
        await expect(preview).toHaveCount(0);
      });
    }

for (const width of [320, 768, 1440])
  test(`position selector keyboard, limit, chips and contrast at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 950 });
    await page.goto("/join");
    await expect(page.locator("main")).toHaveCount(1);
    const pitch = page.locator("#join-positions");
    await expect(pitch.locator('input[type="checkbox"]')).toHaveCount(0);
    await expect(pitch.locator(".position-pitch button")).toHaveCount(21);
    for (const code of ["GK", "SW", "LB", "CB", "ST"]) {
      const marker = pitch.getByRole("button", {
        name: new RegExp(`^${code} —`),
      });
      await expect(marker).toBeEnabled();
      await marker.focus();
      await expect(marker).toBeFocused();
      await page.keyboard.press("Space");
      await expect(marker).toHaveAttribute("aria-pressed", "true");
    }
    const sixth = pitch.getByRole("button", { name: /^RW —/ });
    await expect(sixth).toBeDisabled();
    await expect(pitch).toContainText("déjà choisi 5 postes");
    await expect(pitch.locator(".position-chip")).toHaveCount(5);
    await pitch.getByRole("button", { name: /^Retirer SW/ }).click();
    await sixth.click();
    await expect(sixth).toHaveAttribute("aria-pressed", "true");
    await expect(pitch.locator(".position-chip")).toHaveCount(5);
    await expect(page.locator(".delivery-choice")).not.toContainText("+257");
    await expect(page.locator(".delivery-choice")).not.toContainText(
      "jambojeanjimmy52@gmail.com",
    );
    expect(
      (
        await new AxeBuilder({ page })
          .include(".public-form")
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    await pitch.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `tmp/composer/pitch-${width}.png` });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });

test("WhatsApp opens the complete draft when popups are allowed", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.open = (() => ({
      opener: null,
      location: {
        replace: (url: string) => {
          document.documentElement.dataset.draftUrl = url;
        },
      },
    })) as unknown as typeof window.open;
  });
  await page.goto("/request-match");
  await fill(page, "match-requests");
  await page.locator('[name="delivery"][value="whatsapp"]').check();
  await page.locator('button[type="submit"]').click();
  const url = new URL(
    (await page.locator("html").getAttribute("data-draft-url"))!,
  );
  expect(url.hostname).toBe("wa.me");
  expect(url.searchParams.get("text")).toBe(
    await page.locator("#draft-message").inputValue(),
  );
  await expect(page.locator(".form-message")).toContainText(
    "Aucun envoi n’est confirmé",
  );
});

test("invalid and long drafts remain local, with manual copy fallback", async ({
  page,
}) => {
  await page.addInitScript(() => {
    window.open = () => {
      throw new Error("Unexpected popup");
    };
    Object.defineProperty(navigator, "clipboard", {
      value: {
        writeText: async () => {
          throw new Error("denied");
        },
      },
    });
  });
  await page.goto("/join");
  await page.locator('button[type="submit"]').click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "1 à 5 postes",
  );
  await fill(page, "join");
  await page.locator('[name="reasonForJoining"]').fill("é".repeat(2000));
  await page.locator('[name="qualifications"]').fill("\u754c".repeat(1500));
  await page.locator('[name="delivery"][value="email"]').check();
  await page.locator('button[type="submit"]').click();
  await expect(page.locator(".form-message")).toContainText("trop long");
  expect(await page.locator("#draft-message").inputValue()).toContain(
    "\u754c".repeat(1500),
  );
  await page.getByRole("button", { name: "Copier le message" }).click();
  await expect(page.locator("form")).toContainText("copiez-le manuellement");
  await expect(
    page.getByRole("link", { name: "Envoyer par e-mail", exact: true }),
  ).toHaveAttribute("href", /^mailto:jambojeanjimmy52@gmail.com\?subject=/);
  const fullUrl = new URL(
    (await page
      .getByRole("link", { name: "Envoyer par e-mail", exact: true })
      .getAttribute("href"))!,
  );
  expect(fullUrl.searchParams.get("body")).toBe(
    await page.locator("#draft-message").inputValue(),
  );
});
