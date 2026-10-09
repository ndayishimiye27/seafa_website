import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const buildDirectory = resolve(process.argv[2] ?? ".next");
const read = (name) =>
  JSON.parse(readFileSync(resolve(buildDirectory, name), "utf8"));
const prerender = read("prerender-manifest.json");
const appRoutes = read("app-path-routes-manifest.json");
const allowedRuntimeRoutes = new Set([
  "/api/contact",
  "/api/join",
  "/api/match-requests",
]);
const routes = [...new Set(Object.values(appRoutes))].sort().map((route) => {
  const generated = Object.entries(prerender.routes)
    .filter(([path, entry]) => path === route || entry.srcRoute === route)
    .map(([path]) => path);
  const parameters = prerender.dynamicRoutes[route];
  const internal = route === "/_global-error";
  const mode = internal
    ? "FRAMEWORK_INTERNAL"
    : allowedRuntimeRoutes.has(route)
      ? "API_RUNTIME"
      : parameters
        ? "SSG"
        : generated.length
          ? "STATIC"
          : "DYNAMIC";
  return {
    route,
    mode,
    generatedPaths: generated,
    generatedPathCount: generated.length,
    fallback: parameters?.fallback ?? null,
    needsPublicPageSSR: mode === "DYNAMIC",
  };
});
const summary = {
  source:
    "Next.js production manifests; these are rendering modes, not Vercel function counts",
  routes,
  staticRoutes: routes.filter((route) => route.mode === "STATIC").length,
  ssgPatterns: routes.filter((route) => route.mode === "SSG").length,
  generatedContentPaths: routes
    .filter((route) => route.mode === "STATIC" || route.mode === "SSG")
    .reduce((total, route) => total + route.generatedPathCount, 0),
  dynamicPublicPages: routes
    .filter((route) => route.mode === "DYNAMIC")
    .map((route) => route.route),
  apiRoutes: routes
    .filter((route) => route.mode === "API_RUNTIME")
    .map((route) => route.route),
};
if (process.argv[3])
  writeFileSync(process.argv[3], JSON.stringify(summary, null, 2) + "\n");
console.log(JSON.stringify({ ...summary, routes: undefined }, null, 2));
if (summary.dynamicPublicPages.length) process.exitCode = 1;
