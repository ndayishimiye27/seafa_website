import assert from "node:assert/strict";

const canonicalOrigin = "https://www.saintespritfootballacademyalumni.com";
const base = process.env.BASE_URL || canonicalOrigin;
const indexable = process.env.EXPECT_INDEXABLE === "true";
const expectedCommit = process.env.EXPECT_COMMIT;
let checks = 0;
async function get(path, options = {}) {
  const response = await fetch(new URL(path, base), {
    signal: AbortSignal.timeout(20000),
    ...options,
  });
  assert.equal(response.status, options.expectedStatus ?? 200, path);
  checks++;
  return response;
}
function tags(html, tag) {
  return [...html.matchAll(new RegExp(`<${tag}\\b[^>]*>`, "gi"))].map(
    ([text]) =>
      Object.fromEntries(
        [...text.matchAll(/([\w:-]+)="([^"]*)"/g)].map((m) => [
          m[1],
          m[2].replaceAll("&amp;", "&"),
        ]),
      ),
  );
}
const images = new Set();
for (const path of [
  "/",
  "/gallery",
  "/gallery/community-2019-jenda-excursion",
  "/join",
  "/contact",
  "/request-match",
  "/events",
]) {
  const html = await (await get(path)).text();
  assert.match(html, /lang="fr-BI"/);
  const links = tags(html, "link").filter((t) => t.rel === "canonical");
  assert.equal(links.length, 1, `${path}: canonical count`);
  assert.equal(
    new URL(links[0].href).href,
    new URL(path, canonicalOrigin).href,
    `${path}: canonical origin/path`,
  );
  const meta = tags(html, "meta");
  for (const key of ["og:image", "twitter:image"]) {
    const image = meta.find((t) => (t.property || t.name) === key)?.content;
    assert.ok(image, `${path}: ${key}`);
    assert.equal(new URL(image).origin, canonicalOrigin);
    images.add(new URL(image).pathname + new URL(image).search);
  }
  assert.ok(
    meta.find((t) => t.property === "og:image:alt")?.content,
    `${path}: image alt`,
  );
  const robots = meta.find((t) => t.name === "robots")?.content || "";
  assert.equal(
    /(?:^|,\s*)noindex(?:,|$)/.test(robots),
    !indexable,
    `${path}: indexing policy`,
  );
  if (path === "/" && expectedCommit)
    assert.equal(
      meta.find((t) => t.name === "seafa:release")?.content,
      expectedCommit,
      "deployed commit",
    );
  if (path === "/") {
    const ld = [
      ...html.matchAll(
        /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs,
      ),
    ].map((m) => JSON.parse(m[1]));
    assert.ok(
      ld.some(
        (entry) =>
          entry["@type"] === "Organization" && entry.url === canonicalOrigin,
      ),
    );
  }
  if (path.includes("/gallery/")) {
    const photo = tags(html, "img").find((t) =>
      t.src?.startsWith("/_next/image"),
    );
    assert.ok(photo, "album has an optimized image");
    const response = await get(photo.src);
    assert.match(response.headers.get("content-type") || "", /^image\//);
    assert.ok((await response.arrayBuffer()).byteLength > 1000);
  }
  console.log(`PASS metadata ${path}`);
}
for (const path of new Set([...images, "/twitter-image"])) {
  const response = await get(path);
  assert.match(response.headers.get("content-type") || "", /^image\/png/);
  const png = Buffer.from(await response.arrayBuffer());
  assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
}
const sitemap = await (await get("/sitemap.xml")).text();
const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
assert.ok(locations.length > 50, "populated sitemap");
assert.equal(new Set(locations).size, locations.length, "unique sitemap URLs");
for (const location of locations)
  assert.equal(new URL(location).origin, canonicalOrigin);
const robots = await (await get("/robots.txt")).text();
assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`));
assert.equal(
  /^Disallow: \/\s*$/m.test(robots),
  !indexable,
  "robots indexing policy",
);
for (const [source, destination] of [
  ["/match-request", "/request-match"],
  [
    "/activities/community-2019-teza-trip",
    "/activities/community-2019-jenda-excursion",
  ],
  [
    "/events/events-medical-session",
    "/events/events-2018-medical-consultation",
  ],
]) {
  const response = await get(source, {
    redirect: "manual",
    expectedStatus: 308,
  });
  assert.equal(
    new URL(response.headers.get("location"), base).pathname,
    destination,
  );
}
await get("/missing-production-check", { expectedStatus: 404 });
if (new URL(base).origin === canonicalOrigin) {
  const response = await fetch(
    "https://saintespritfootballacademyalumni.com/",
    {
      redirect: "manual",
      signal: AbortSignal.timeout(20000),
    },
  );
  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), `${canonicalOrigin}/`);
}
console.log(
  `PASS production smoke (${checks} responses); indexing=${indexable}; commit=${expectedCommit || "not asserted"}`,
);
