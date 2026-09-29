const base = process.env.BASE_URL || "http://localhost:3000";
const sitemap = await (await fetch(new URL("/sitemap.xml", base))).text();
const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (m) => new URL(m[1]).pathname,
);
let failures = 0;
for (const route of [
  ...new Set(routes),
  "/missing-page",
  "/gallery/apercu",
  "/news/apercu",
  "/activities/missing",
  "/events/missing",
  "/awards/missing",
  "/interviews/missing",
]) {
  const expected = routes.includes(route) ? 200 : 404;
  try {
    const response = await fetch(new URL(route, base));
    const html = await response.text();
    const valid = response.status === expected && html.includes('lang="fr-BI"');
    console.log(`${valid ? "PASS" : "FAIL"} ${route}: ${response.status}`);
    if (!valid) failures++;
  } catch (error) {
    console.error(route, error.message);
    failures++;
  }
}
if (!routes.length) failures++;
process.exitCode = failures ? 1 : 0;
