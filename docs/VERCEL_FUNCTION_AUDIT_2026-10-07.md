# SEAFA Vercel function and rendering audit

Review date: 7 October 2026. No commit, push, deployment, plan upgrade or DNS change has been performed.

## Confirmed blocker and count boundaries

The owner supplied the exact deployment error: the Hobby deployment exceeded the 12-function allowance. That is the confirmed blocker. Its exact remote function count and emitted function list are not available without the failed deployment artifacts; the error establishes **more than 12**, not an exact number. No engine/deprecation/install-script warning is treated as the cause.

| Measurement                                                 | Before this refactor                  | After                   |
| ----------------------------------------------------------- | ------------------------------------- | ----------------------- |
| Public pages needing request-time rendering                 | 6                                     | 0                       |
| Submission API routes                                       | 3                                     | 3                       |
| Unique function bundles from official local bundled builder | 5                                     | 5                       |
| Failed remote deployment function count                     | More than 12; exact count unavailable | No deployment performed |

**Local bundled-builder budget: PASS (5 <= 12). Cloud acceptance: pending the owner-approved deployment.** The local baseline already bundled to five; therefore the static-page refactor alone cannot honestly be described as a proven reduction from the failed cloud count.

## Deployment packaging change

`vercel.json` explicitly selects the Next.js framework and sets the build-only `NEXT_ENABLE_ADAPTER=0` compatibility switch. The installed official `@vercel/next` 21.0.0 source selects its per-route adapter only when that switch is `1`; with `0` it uses its existing bundled-function path. This retains normal Next.js routing, image optimization, prerendering and server-side API validation. It does not introduce a custom backend or strip framework functions.

A local run started with the switch at `1`, applied the repository build configuration, and verified that it became `0`. Official packaging succeeded with **5 distinct Lambda objects**, covering **753 HTML/RSC/prefetch/runtime aliases**. Aliases and individual Next.js dynamic routes are not counted as independent physical bundles. Vercel CLI 62.7.0 configuration schema validation passed.

The newer adapter was also exercised locally. It writes individual node-function directories for content-route fallbacks, including routes whose main response is prerendered. Its Windows packaging could not complete because the required directory symlinks were denied; that partial run is not presented as a certified deployable artifact or the failed cloud count.

The compatibility switch is an internal builder flag observed in the current official source, rather than a permanent documented Next.js API. It should be rechecked when Vercel changes its builder. Vercel supports `build.env` but recommends configuring build environment variables in project settings; the repository setting makes the proposed non-secret change reviewable without changing the external project before approval.

References: [Vercel configuration](https://vercel.com/docs/project-configuration/vercel-json), [Build Output API function primitives](https://vercel.com/docs/build-output-api/primitives), [official Vercel Next.js builder source](https://github.com/vercel/vercel/tree/main/packages/next).

## Routes converted to static

| Route              | Previous dynamic reason         | Solution                                                                                                |
| ------------------ | ------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `/join`            | Explicit `force-dynamic`        | Removed override; drafts and pitch state stay client-side                                               |
| `/request-match`   | Explicit `force-dynamic`        | Removed override; validated WhatsApp/mailto composer preserved                                          |
| `/contact`         | Explicit `force-dynamic`        | Prerender deployment-configured availability; submission remains server-side                            |
| `/privacy`         | Explicit `force-dynamic`        | Prerender deployment-configured notice; removed visible destination details                             |
| `/login`           | Explicit `force-dynamic`        | Build-configured validated login destination; no per-request user logic                                 |
| `/interviews/book` | Awaiting request `searchParams` | Client reader reads URL under Suspense; direct links, bounds, controls and original-page mode preserved |

Contact availability, privacy wording and the login destination now reflect configuration at build time. Changing these deployment settings requires a rebuild. No secret is passed into a client component.

## Complete route inventory

| Route                   | Rendering          | Generated paths | Per-request page execution required? | Action                                                          |
| ----------------------- | ------------------ | --------------: | ------------------------------------ | --------------------------------------------------------------- |
| `/`                     | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/_global-error`        | FRAMEWORK_INTERNAL |               1 | No                                   | Keep framework handling                                         |
| `/_not-found`           | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/about`                | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/activities`           | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/activities/[slug]`    | SSG                |              22 | No                                   | Keep centralized generateStaticParams; unknown slugs return 404 |
| `/api/contact`          | API_RUNTIME        |               0 | Yes, POST only                       | Keep server-side validation and secret-dependent delivery       |
| `/api/join`             | API_RUNTIME        |               0 | Yes, POST only                       | Keep server-side validation and secret-dependent delivery       |
| `/api/match-requests`   | API_RUNTIME        |               0 | Yes, POST only                       | Keep server-side validation and secret-dependent delivery       |
| `/awards`               | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/awards/[slug]`        | SSG                |               6 | No                                   | Keep centralized generateStaticParams; unknown slugs return 404 |
| `/challenges`           | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/code-of-conduct`      | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/community`            | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/contact`              | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/diaspora`             | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/events`               | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/events/[slug]`        | SSG                |              18 | No                                   | Keep centralized generateStaticParams; unknown slugs return 404 |
| `/gallery`              | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/gallery/[slug]`       | SSG                |              49 | No                                   | Keep centralized generateStaticParams; unknown slugs return 404 |
| `/history`              | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/interviews`           | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/interviews/[slug]`    | SSG                |               4 | No                                   | Keep centralized generateStaticParams; unknown slugs return 404 |
| `/interviews/book`      | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/join`                 | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/login`                | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/manifest.webmanifest` | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/news`                 | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/news/[slug]`          | SSG                |               0 | No                                   | Keep centralized generateStaticParams; unknown slugs return 404 |
| `/opengraph-image`      | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/privacy`              | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/request-match`        | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/robots.txt`           | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/sitemap.xml`          | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/team`                 | STATIC             |               1 | No                                   | Keep prerendered content                                        |
| `/twitter-image`        | STATIC             |               1 | No                                   | Keep prerendered content                                        |

The six SSG patterns cover 22 activity details, six award details, 18 event details, 49 gallery albums and four interviews. News has no published detail slugs; its centralized route remains available for verified future content. All six patterns already use `generateStaticParams` with `dynamicParams=false`. Homepage and history were already static and remain static. Metadata routes and the not-found page are included in the static inventory.

Build totals: **26 static route entries, six SSG patterns, zero dynamic public pages, three API routes**. Next.js reports **129 generation units**; the prerender manifest contains **125 concrete static/SSG paths**, plus the internal global-error output. These totals differ because generation units include framework/handler work.

## API audit and runtime functions retained

| Endpoint              | Usage                                                                        | Why server-side                                                                                                                           | Action                 |
| --------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| `/api/contact`        | Active contact intake form                                                   | Body limits, origin/content-type/schema validation, spam field, receipt verification, optional secret-authenticated intake/email delivery | Preserve               |
| `/api/join`           | Legacy submission contract and tests; current public UI uses local composers | Existing secured submission interface; external callers cannot be disproved                                                               | Preserve compatibility |
| `/api/match-requests` | Legacy submission contract and tests; current public UI uses local composers | Existing secured submission interface; external callers cannot be disproved                                                               | Preserve compatibility |

**Removed API routes: none.** There are no `pages/api` endpoints, operational account/database endpoints, or server actions in this website. The request-dependent logic and uncached backend fetches occur in submission delivery, where they are required. No public-page `cookies`, `headers`, `draftMode`, `noStore`, `revalidate=0` or `force-dynamic` remains. Request headers inside the POST handler are retained for security.

WhatsApp and e-mail drafts continue to construct properly encoded `wa.me` and `mailto` URLs locally. They do not submit to the API or claim successful delivery. Contact intake continues to use the backend. Existing validation, optional system delivery, email/WhatsApp notification secrets, rate limiting and retry/receipt behavior remain unchanged.

## Five bundles emitted by the selected official packager

| Bundle                     | Representative route(s)                                                                                                | Purpose                                                | Why retained                                                                            |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Shared content fallback    | `/gallery/[slug]`, `/events/[slug]`, `/activities/[slug]`, `/awards/[slug]`, `/interviews/[slug]`, static page aliases | Next.js fallback/RSC/framework handling                | Official runtime protocol support; normal known content is prerendered                  |
| Empty news-detail fallback | `/news/[slug]`, RSC alias                                                                                              | Known centralized news route with zero published slugs | Preserve route architecture and 404 behavior; do not delete the feature to meet a limit |
| Shared submissions         | `/api/contact`, `/api/join`, `/api/match-requests`                                                                     | Validated request-dependent delivery                   | Credentials and validation must remain on the server                                    |
| Shared metadata handling   | Manifest, Open Graph/Twitter images, robots, sitemap and RSC aliases                                                   | Framework metadata protocol                            | Preserve social previews, indexing and manifest behavior                                |
| Homepage fallback          | `/`, RSC/prefetch aliases                                                                                              | Framework homepage handling                            | Preserve framework routing; regular homepage content is prerendered                     |

This is the actual grouping returned by the official local bundled builder, including prerender fallback Lambdas. The packager groups by shared Lambda identity; the CLI serializer reuses those identities as aliases. Its outputs retain fallback bundles even when no application-specific server rendering is required. There is no manual deletion of generated functions.

Detailed rendering inventory is in `docs/VERCEL_RENDERING_INVENTORY.json`. Reproduce the rendering check after a build with `npm run verify:rendering`. This command fails if a public page becomes dynamic; it intentionally does not mistake the Next.js route table for the Vercel function count. Full temporary before/after packaging records are under `tmp/function-audit/`.

## Validation

- Formatting, ESLint, TypeScript, 22 unit tests and content validation pass.
- The entire existing browser suite passes in one uninterrupted run: **84/84**. A new booklet direct-link/bounds/reload/original-mode regression test also passes: **1/1**.
- All **126 route checks** pass against the reviewed server, including genuine unknown-slug 404 responses. An initial invocation accidentally inspected a different application on default port 3000; it was rerun against the explicit SEAFA preview URL.
- All **654 distinct media references**, **638 tracked images**, exact-case source imports and **657 preserved source hashes** pass.
- The isolated lockfile-installed Windows checkout builds successfully without application environment files, producing 129 generation units. The separate browser build uses synthetic test-only intake configuration, so enabled contact intake can also be exercised without sending real messages.
- No dependencies or Node engine range were changed. Isolated Vercel tooling is ignored under `tmp/`; it is not shipped with the website.

## Environment limitations and next verification

The failed deployment function list, its framework/root settings and authenticated logs are still unavailable. The owner has been asked for those specific details. Once approved, the first deployment must verify that the repository build configuration is honored and that Vercel records no more than 12 functions. No successful cloud deployment or precise old cloud count is claimed.

A separate native Linux audit attempt ran out of space while extracting Node into the small Docker Desktop distribution. WSL then mounted that distribution read-only. Approximately 61 MB of audit-owned files remain at `/tmp/seafa-functions-20261007`; a guarded cleanup was attempted but the read-only mount prevented removal. No Docker/WSL repair, disk resize or unrelated filesystem deletion was attempted. This incomplete Linux attempt is excluded from all passing-build claims.

The complete media/gallery/history/homepage/registration/contact/UI review remains in `docs/SENIOR_REVIEW_2026-10-07.md`, updated to reference this function audit. Commit, push, deployment and DNS changes remain subject to the owner’s explicit approval.
