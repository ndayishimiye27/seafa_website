import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const page = await browser.newPage();
await mkdir("tmp/october", { recursive: true });
try {
  for (const width of process.argv.includes("--videos-only")
    ? []
    : [390, 1440]) {
    await page.setViewportSize({ width, height: 950 });
    for (const [name, path, focus] of [
      ["home", "/", "#presidence"],
      ["history", "/history", "#presidents"],
      ["gallery", "/gallery", null],
      ["event", "/events/conference-sante-2022", null],
      ["album", "/gallery/seafa-lumitel", null],
      ["pitch", "/join", "#join-positions"],
      ["videos", "/gallery/sages-jeunes-2025", "video"],
    ]) {
      await page.goto(`http://localhost:3100${path}`, {
        waitUntil: "domcontentloaded",
      });
      await page.locator("h1").waitFor({ state: "visible" });
      if (focus)
        await page
          .locator(focus)
          .first()
          .evaluate((element) =>
            window.scrollTo(
              0,
              element.getBoundingClientRect().top + window.scrollY - 110,
            ),
          );
      await page.evaluate(async () => {
        await Promise.race([
          new Promise((resolve) => setTimeout(resolve, 5000)),
          Promise.all(
            [...document.images]
              .filter((img) => {
                const rect = img.getBoundingClientRect();
                return rect.top < innerHeight && rect.bottom > 0;
              })
              .map((img) => img.decode().catch(() => {})),
          ),
        ]);
      });
      await page.screenshot({
        path: `tmp/october/review-${name}-${width}.png`,
      });
    }
    if (width === 390) {
      await page.goto("http://localhost:3100");
      await page.getByRole("button", { name: "Menu", exact: true }).click();
      await page.screenshot({ path: "tmp/october/review-navigation-390.png" });
    }
  }
  await page.goto("http://localhost:3100/gallery/sages-jeunes-2025", {
    waitUntil: "domcontentloaded",
  });
  const metadata = [];
  for (let i = 0; i < 8; i++) {
    const video = page.locator("video").nth(i);
    metadata.push(
      await video.evaluate(
        (video) =>
          new Promise((resolve, reject) => {
            const timer = setTimeout(
              () => reject(new Error("Video metadata timed out")),
              20000,
            );
            video.addEventListener(
              "loadedmetadata",
              () => {
                clearTimeout(timer);
                resolve({
                  src: video.querySelector("source").getAttribute("src"),
                  width: video.videoWidth,
                  height: video.videoHeight,
                  duration: video.duration,
                });
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
            video.preload = "metadata";
            video.load();
          }),
      ),
    );
  }
  await writeFile(
    "docs/OCTOBER_VIDEO_AUDIT.json",
    JSON.stringify(metadata, null, 2),
  );
  console.log(JSON.stringify(metadata));
} finally {
  await browser.close();
}
