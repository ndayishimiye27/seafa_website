import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { octoberMedia } from "../../src/data/october-media";

test("renamed archive photographs load through image optimization", async ({
  request,
}) => {
  const selected = octoberMedia
    .filter((media) => media.src.includes("2024-tournoi-saint-esprit"))
    .slice(0, 6);
  expect(selected.length).toBe(6);
  for (const media of selected) {
    const query = new URLSearchParams({ url: media.src, w: "640", q: "75" });
    const response = await request.get(`/_next/image?${query}`);
    expect(response.status(), media.src).toBe(200);
    expect(response.headers()["content-type"]).toMatch(/^image\//);
  }
});

test("all eight supplied clips have playable video frames and original downloads", async ({
  page,
  request,
}) => {
  await page.goto("/gallery/sages-jeunes-2025", {
    waitUntil: "domcontentloaded",
  });
  await expect(page.locator("video")).toHaveCount(8);
  for (const video of await page.locator("video").all()) {
    const result = await video.evaluate(
      (video: HTMLVideoElement) =>
        new Promise<{ width: number; height: number }>((resolve, reject) => {
          const timer = setTimeout(
            () => reject(new Error("Video frame did not load")),
            15000,
          );
          video.addEventListener(
            "loadeddata",
            () => {
              clearTimeout(timer);
              resolve({ width: video.videoWidth, height: video.videoHeight });
            },
            { once: true },
          );
          video.addEventListener(
            "error",
            () => {
              clearTimeout(timer);
              reject(new Error(video.error?.message));
            },
            { once: true },
          );
          video.preload = "auto";
          video.load();
        }),
    );
    expect(result.width).toBeGreaterThan(0);
    expect(result.height).toBeGreaterThan(0);
    expect(
      (await request.get((await video.getAttribute("poster"))!)).status(),
    ).toBe(200);
  }
  for (const link of await page
    .getByRole("link", { name: "Télécharger la vidéo originale" })
    .all()) {
    expect(
      (await request.get((await link.getAttribute("href"))!)).status(),
    ).toBe(200);
  }
});

for (const width of [375, 390, 430, 768, 1024, 1280, 1440]) {
  test(`October integration responsive review at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 950 });
    for (const path of [
      "/",
      "/history",
      "/gallery",
      "/gallery/seafa-lumitel",
      "/gallery/sages-jeunes-2025",
      "/gallery/conference-sante-2022",
      "/events/conference-sante-2022",
      "/gallery/activities-2024-tournament",
      "/join",
    ]) {
      const response = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      if (path === "/") {
        await page.locator("#presidence").scrollIntoViewIfNeeded();
        await expect(
          page.getByRole("heading", { name: "Jimmy Jambo" }),
        ).toBeVisible();
        await page.screenshot({ path: `tmp/october/home-${width}.png` });
      }
      if (path === "/gallery/sages-jeunes-2025") {
        await expect(page.locator("video")).toHaveCount(8);
        expect(
          await page
            .locator("video")
            .evaluateAll((videos) =>
              videos.every(
                (video) =>
                  video.getAttribute("preload") === "none" &&
                  video.hasAttribute("controls") &&
                  video.hasAttribute("playsinline"),
              ),
            ),
        ).toBe(true);
      }
      if (path === "/gallery/seafa-lumitel")
        await page.screenshot({ path: `tmp/october/album-${width}.png` });
    }
    const selector = page.locator("#join-positions");
    for (const code of ["GK", "LB", "CB", "CM", "ST"]) {
      await selector
        .getByRole("button", { name: new RegExp(`^${code} —`) })
        .click();
      await expect(
        selector.getByRole("button", { name: new RegExp(`^${code} —`) }),
      ).toHaveAttribute("aria-pressed", "true");
    }
    await expect(selector.locator(".position-chip")).toHaveCount(5);
    await expect(
      selector.getByRole("button", { name: /^RW —/ }),
    ).toBeDisabled();
    await selector.getByRole("button", { name: /^Retirer CB/ }).click();
    await expect(
      selector.getByRole("button", { name: /^CB —/ }),
    ).toHaveAttribute("aria-pressed", "false");
    await selector.getByRole("button", { name: /^RW —/ }).click();
    await expect(
      selector.getByRole("button", { name: /^RW —/ }),
    ).toHaveAttribute("aria-pressed", "true");
    await selector.scrollIntoViewIfNeeded();
    await page.screenshot({ path: `tmp/october/pitch-${width}.png` });
    expect(
      (
        await new AxeBuilder({ page })
          .include("#join-positions")
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
  });
}
