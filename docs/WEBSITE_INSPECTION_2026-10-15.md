# SEAFA website inspection — 15 October 2026

## Assessment and scope

SEAFA is a coherent, functional public association website with a strong navy/gold identity, readable French copy, reusable components and substantial content/media tests. The membership, match-request and contact journeys correctly prepare WhatsApp/email messages; a database, account system or automatic sending is not required for these journeys. SEAFA_SYSTEM is a separate product and was not audited.

The baseline inspection identified production SEO configuration, dependency maintenance, an error-focus accessibility defect and incomplete social metadata as the main concerns. The owner subsequently authorized all five prioritized improvements, including commit, push and production deployment. The remediation section below supersedes the original open statuses and release limitation; the original observations remain as before-change evidence. Gallery discovery and data maintenance can improve incrementally. No rewrite or additional UI dependency is justified.

## Authorized remediation — implementation and verification

1. **Dependencies (D2):** upgraded Next and eslint-config-next from 16.3.4 to **16.3.8**, retaining React 19.2.8 and the existing Node engine. Refreshed compatible lockfile dependencies to **sharp 0.35.5**, **source-map-js 1.2.2**, **brace-expansion 1.1.21/5.0.12**. No new runtime dependency or major framework upgrade. The fresh production audit reports **zero vulnerabilities**. The full audit still reports **five high development-tool entries**, all through the ESLint → fast-glob → micromatch → **braces 3.0.3** chain. [The braces advisory](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm) lists no patched version; the registry likewise publishes no later braces version. Its input is build/lint glob patterns, with no public visitor-controlled glob input identified. npm's proposed forced eslint-config-next downgrade to 14.2.35 is incompatible with the maintained framework/tooling line and was not applied. These remaining advisory entries are documented, not declared resolved.
2. **Canonical origin (D1):** `src/lib/metadata.ts` now fixes the production/preview canonical origin to **https://www.saintespritfootballacademyalumni.com**, matching the existing apex → www HTTP 308. Stale SITE_URL/NEXT_PUBLIC_SITE_URL values cannot override production metadata. Canonicals, sitemap, robots sitemap and Organization JSON-LD share that origin. Development retains configurable local URLs. Existing **noindex remains intentional and unchanged**; preview builds remain non-indexable even when SITE_INDEXABLE is true. Unit regression checks exercise stale localhost configuration and both Vercel environments.
3. **Error recovery (D3):** `src/components/forms/composer-form.tsx` measures the sticky header at activation time, focuses the summary/error target without automatic browser scrolling, then scrolls the target into view with header clearance. `src/styles/globals.css` adds a shared fallback scroll margin. The same logic covers text fields, Genre, checkbox consents and the positions/delivery fieldsets, without changing validation, recipients or message generation. New browser regressions check actual focused-target geometry via keyboard activation on all three forms at 390, 720 and 1440 px; these are viewport/reflow checks, not a claim of physical-device or browser-zoom certification.
4. **Social previews (D4):** shared Open Graph/Twitter metadata now explicitly includes the existing SEAFA navy/gold branded **1200×630 PNG**, a French description and image alt text. Existing page titles/descriptions remain route-specific, including album pages. No gallery photographs were replaced or cropped. Tests verify emitted absolute tags and actual PNG dimensions rather than assuming metadata inheritance.
5. **Checks and monitoring (E3):** `vercel.json` runs `npm run check` before the production build. The new quality workflow runs lint, types, content/unit checks, production dependency audit, a production build, targeted browser regressions and local HTTP production-contract checks. `scripts/verify-production.mjs` checks representative metadata, canonical origin, JSON-LD, the entire sitemap's origins/uniqueness, robots policy, social-image bytes/dimensions, an optimized album image, old redirects, domain redirect and a real 404. The production workflow runs this read-only check plus a dependency audit every six hours and on successful main-branch Vercel commit statuses. A release meta tag supports exact deployed-commit assertions. The existing integration was verified to publish context **Vercel** and the repository default branch is **main**. No form is submitted by the smoke script.

`src/instrumentation.ts` adds the supported Next `onRequestError` hook for structured server runtime logs, limited to route type and a filtered digest. Its unit test proves that request paths, headers, error messages and personal values are omitted by the hook. It does not claim to centralize client errors or override the framework's own logging. See [PRODUCTION_CHECKS.md](PRODUCTION_CHECKS.md) for commands, trigger behavior, indexing-policy changes and external setup still required: GitHub notification preferences/branch protection, Vercel log retention and alert routing, and real-user performance/client-error telemetry. Workflow operation and deployment evidence are recorded after release below; configuration alone is not proof they have run.

Local verification: **31 unit tests passed**, content validation **zero warnings**, full ESLint, TypeScript and **Next 16.3.8 production build passed**. All **32 distinct targeted browser checks** passed across composer, October regression and production suites, including all nine form/viewport geometry and axe checks. An initial homepage assertion compared raw trailing-slash spelling; it was corrected to compare normalized URLs and passed its isolated rerun. No application code change was needed for that assertion. The HTTP production-contract check passed **16 responses**, including actual branded PNG and optimized-photo bytes. The rendering audit found **no dynamic public pages** and only the three existing dynamic compatibility APIs. The original four modified media-maintenance scripts are excluded from the intended commit. Deployment and hosted workflow results follow after push.

Baseline inspected: original production commit `3b8050d80a4d7e4300c9120a5b547545ff5f85c1`, followed by a fresh inspection of commit `e461741` and the actual working tree on 15 October 2026, installed Next.js documentation, production build output and `https://www.saintespritfootballacademyalumni.com/`. The duplicate-listing regression discovered below was already corrected in `e461741`; the follow-up verifies that correction rather than claiming a new implementation. Other findings remain recommendations for review; no dependencies, indexing settings, DNS or unrelated scripts were changed.

Effort: **small** = localized change and checks; **medium** = several related files/configuration and regression testing; **large** = substantial redesign or migration. Priorities reflect this website's demonstrated exposure and visitor impact, rather than copying advisory severity without checking conditions.

## Confirmed defects and dependency findings

### D1 — Production metadata uses localhost

**Priority: high · Effort: small · Status: open, pre-existing.**

- **Routes/source:** all public routes; `src/lib/metadata.ts:3`, `src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/layout.ts`.
- **Observed/verified:** live `/` canonical is `http://localhost:3000/`; `/gallery` canonical is `http://localhost:3000/gallery`. Live sitemap locations and Organization JSON-LD also use this origin. `/robots.txt` returns `Disallow: /` and `Sitemap: http://localhost:3000/sitemap.xml`; sampled pages return `noindex, follow`. The code's local fallback explains the effective origin, but private Vercel settings were not available to distinguish an unset variable from an explicitly incorrect value.
- **Impact:** canonical and sitemap links identify an inaccessible local origin. The current robots policy prevents normal search discovery. Homepage social-image URLs are also local and cannot be fetched by external sharing services.
- **Recommended fix:** configure the production build's `SITE_URL` as `https://www.saintespritfootballacademyalumni.com`, rebuild, and assert production origins in canonical, JSON-LD, sitemap and social tags. Decide explicitly whether public launch is approved before setting `SITE_INDEXABLE=true`; keep previews non-indexable. Add a production-only missing/invalid-origin guard. Do not infer that the current noindex policy was accidental or change DNS.

### D2 — Production dependency tree has published advisories

**Priority: high · Effort: medium · Status: open, pre-existing.**

- **Routes/source:** framework/image pipeline and build tooling; `package.json`, `package-lock.json`, `src/app/opengraph-image.tsx`, `src/app/twitter-image.tsx`, `next.config.ts`.
- **Observed/verified:** a fresh `npm audit --omit=dev --json` on 15 October reports **four affected package entries: one critical and three high**: Next, sharp, source-map-js and PostCSS. PostCSS is reported through source-map-js, rather than as a fourth independent underlying advisory. The installed tree resolves Next **16.3.4**, sharp **0.35.4**, and source-map-js **1.2.1** through Next's PostCSS dependency. The Next entry includes several advisories; these counts do not represent confirmed attacks against this website.
- **Applicability:** the [critical Next ImageResponse advisory](https://github.com/advisories/GHSA-vcvr-r3jv-pc5j) affects the installed version but requires attacker-controlled image content. This site's social image reads an approved local logo and hard-coded text; it does not accept request input. The [image-optimization SSRF advisory](https://github.com/vercel/next.js/security/advisories/GHSA-cjq9-62q9-8jv4) explicitly excludes applications without remote patterns; none are configured here. The [SSG/ISR advisory](https://github.com/advisories/GHSA-mcj8-r9mp-w47p) requires a root catch-all page, which this route tree does not contain. The [sharp advisory](https://github.com/advisories/GHSA-wq5f-xc86-pv6w) concerns SVG processing under particular Linux runtime conditions; deployed binary conditions were not inspected. The [source-map-js advisory](https://github.com/advisories/GHSA-68fv-2mgg-jv7q) requires processing malicious indexed source maps; no public map-upload path was found.
- **Impact:** confirmed affected dependency versions create maintenance/security risk, even though a working exploit against this website was not established.
- **Recommended fix:** make a reviewed patch release using a supported patched Next version covering the audit's ranges (the reviewed advisory database identifies **16.3.8** for the later listed Next fixes), refresh the compatible lockfile so sharp is at least **0.35.5** and source-map-js at least **1.2.2**, and rerun audit, media optimization, social-image generation, build and Vercel deployment checks. Inspect package compatibility rather than using `npm audit fix --force`. Recheck the existing `NEXT_ENABLE_ADAPTER=0` compatibility setting during the upgrade. No upgrade was applied during this recommendations-only review.

### D3 — Error-summary links focus fields behind the sticky header

**Priority: medium · Effort: small · Status: open, pre-existing.**

- **Routes/source:** `/contact`, same shared pattern on `/join` and `/request-match`; `src/components/forms/composer-form.tsx:110`, `src/styles/globals.css:1182` and `.form-input`.
- **Observed/verified:** submitted the empty live contact form, without sending data, then activated its “Nom complet” error link. The summary correctly received focus and announced French errors. After the link, the focused input's top/bottom were approximately **0/50 px**, while the sticky header's bottom was **77 px**, at both 390 and 1440 px. The entire input was behind the header. This is a manual finding that axe did not flag.
- **Impact:** keyboard and low-vision visitors follow an error link but cannot see the active field.
- **Recommended fix:** add a shared header-aware `scroll-margin-block-start` to form fields, fieldsets and error targets, including Genre, positions and delivery. Test actual field visibility after each error link, not merely `toBeFocused()`, at mobile/desktop sizes and browser zoom.

### D4 — Most inspected child pages omit sharing-image tags

**Priority: medium · Effort: small · Status: open, pre-existing.**

- **Routes/source:** `/gallery`, `/gallery/community-2019-jenda-excursion`, `/join`, `/contact`, `/request-match`, `/activities`, `/events`, `/login`; `src/lib/metadata.ts:19`, `src/app/gallery/[slug]/page.tsx`, root `opengraph-image.tsx` and `twitter-image.tsx`.
- **Observed/verified:** live homepage includes an `og:image` (currently localhost because of D1), but no `og:image` exists on these eight sampled child pages. Their metadata supplies its own Open Graph object without an explicit image fallback. The actual `/opengraph-image` endpoint returns a valid PNG.
- **Impact:** links to albums and application pages lack a dependable intended preview image. Sharing platforms may choose an arbitrary image or none.
- **Recommended fix:** supply an explicit shared absolute OG/Twitter image in `pageMetadata`, with optional verified album covers for detail pages. Check emitted tags and image responses after D1, rather than relying on inheritance. This finding is about missing markup, not a claim to have tested every social crawler.

### D5 — Merged albums produced duplicate activity/event stories — corrected

**Priority: medium · Effort: small · Status: fixed in this inspection release; regression from the preceding changes.**

- **Routes/source:** `/activities`, `/events` and their old detail URLs; `src/data/activities/index.ts`, `src/data/events/index.ts`, `next.config.ts`.
- **Observed/verified:** grouping exported published records by album found **three** “Excursion à Jenda — 2021” activities, **two** “Anniversaire et chutes de Karera — 2021” events, and **two** “Consultations médicales — 2018” events. The preceding reconciliation correctly merged photos/albums but retained separate records whose titles and album references had become identical.
- **Impact:** duplicate cards, separate URLs and sitemap entries made one story look like multiple activities/events.
- **Fix applied:** removed the two redundant Jenda activities and two redundant event records. Four permanent redirects retain old bookmarks: Teza/group-photo activities → Jenda; old Karera event → 2021 anniversary; medical-session event → 2018 consultation. The 45 albums and original media remain unchanged. Added unit and browser checks for single listings and all four HTTP 308 destinations. Content validation and connected detail-route checks pass.

## Optional improvements — review before implementation

### E1 — Bring photographs closer to the gallery entry point

**Priority: medium · Effort: small.**

- **Route/source:** `/gallery`; `src/app/gallery/page.tsx`, `src/components/albums/album-filter-grid.tsx`, `.archive-controls` in `src/styles/globals.css`.
- **Evidence:** at 1440×950, the initial viewport contains the large gallery hero, a second introductory heading/paragraph and the start of the filters; no album photograph is visible. Mobile has the same two introductions followed by wrapping filter buttons. The French hierarchy is clear, but visitors scroll substantially before browsing images.
- **Impact/recommendation:** shorten or combine the two introductions and place the year/filter controls closer to the title. Preserve the existing identity, legible spacing and all filter choices. Aim for a visible first album on a typical desktop viewport; validate mobile with actual covers loaded. This is a browsing improvement, not a broken layout.

### E2 — Consolidate media transformations and reduce client data coupling

**Priority: medium · Effort: medium.**

- **Routes/source:** gallery/detail pages and homepage; `src/data/albums/index.ts:1885–2030`, `src/data/gallery-reconciliation.ts`, `src/data/october-media.ts`, `src/data/correction-media.ts`, `src/lib/media.ts:1`.
- **Evidence:** the 2,030-line album registry builds legacy records, appends multiple photo collections, applies exclusions/cover rankings, then reconstructs ownership in `reconcileGallery`. Some intermediate assignments are intentionally superseded. Client gallery components resolve media through `src/lib/media.ts` → `src/lib/content.ts`; a media lookup is coupled to the general content layer. D5 demonstrates how album and linked-record changes can drift.
- **Impact/recommendation:** preserve the current registries and IDs, but generate/validate one final catalogue at build time, keep source provenance separate, and pass resolved image/card view models into client components. Replace only the redundant transformation layers, with inventory, captions, ordering and redirect assertions. Avoid a CMS migration or broad rewrite. Use measured bundle comparisons to establish whether the change reduces payload.

### E3 — Add production configuration gates and lightweight observability

**Priority: medium · Effort: medium.**

- **Routes/source:** all deployments; `package.json`, `tests/browser/site.spec.ts:158`, `scripts/verify-routes.mjs`, `src/app/error.tsx`, `vercel.json`; no `.github/workflows` directory is present.
- **Evidence:** strong local checks exist, but the metadata browser test verifies only the canonical pathname, so a localhost origin passes. No repository CI workflow or application error reporter was found. The error boundary offers retry but does not use/report its error/digest. External dashboards and branch protection were not available for inspection.
- **Impact/recommendation:** run existing lint/types/content/tests/build as a required deployment gate; add deployed-origin, robots policy, OG image, representative image and redirect smoke checks. Monitor root/www HTTPS and one meaningful page, and collect privacy-conscious error digests and real-user performance. Keep form answers, draft URLs and personal information out of telemetry. Prefer current hosting capabilities before adding a service. Investigate the history test timing observation below before making it a mandatory gate.

### E4 — Make the retained server API's operating boundary explicit

**Priority: medium · Effort: medium; conditional on retaining/enabling automatic delivery.**

- **Routes/source:** `/api/contact`, `/api/join`, `/api/match-requests`; `src/lib/submissions.ts:96`, `src/lib/system-intake.ts`, `src/lib/team-delivery.ts`, `src/lib/submission-storage.ts`, `README.md`.
- **Evidence:** public `ComposerForm` does not call these APIs. They remain reachable: live GET → **405**, empty JSON → **422**, foreign Origin → **403**. Source validates JSON/16 KiB/allowed fields/consents, uses timeouts and validates intake receipts. However, the system-forwarding branch runs before the website's file-backed rate limiter. The limiter shares counters only on the same persistent volume; the README documents this limitation. Current downstream limits and persistent storage were not verified.
- **Impact/recommendation:** no failure of the intended WhatsApp/email journey is implied. For compatibility APIs, document whether they are intentionally active, validate trusted-proxy settings, and enforce an ingress limit before any optional downstream dispatch, or explicitly keep the unused integration disabled. Define data retention and durable storage before activating the outbox on serverless infrastructure. Do not add a database or move application handling into this public site merely for this review.

### E5 — Improve photo descriptions without inventing identities

**Priority: medium · Effort: medium.**

- **Route/source:** e.g. `/gallery/community-2019-jenda-excursion`; `src/data/media-library.json:4120` onward, `src/components/albums/album-gallery.tsx`, `album-lightbox.tsx`.
- **Evidence:** multiple distinct Jenda images share the exact alt text “Excursion à Jenda — 2021”. Images include visually distinct group, football and travel scenes. The lightbox announces image position, and images preserve their full frame; non-empty generic alt passes automated checks.
- **Impact/recommendation:** screen-reader visitors can distinguish position but receive little information about each photo. Curate concise descriptions of visible scenes for featured/new collections, retaining event/year and existing credits. Do not infer a person's identity, date, destination or role from appearance. This is editorial enrichment, not grounds to replace or regenerate photographs.

### E6 — Preserve gallery browsing context in the URL

**Priority: low · Effort: small.**

- **Route/source:** `/gallery`; `src/components/albums/album-filter-grid.tsx:61`.
- **Evidence:** year and theme use component-local `useState`; selecting them leaves the route/query unchanged. A copied link cannot reproduce the selection, and a fresh visit starts with all albums.
- **Impact/recommendation:** sharing a particular year/theme requires instructions and returning visitors may repeat filtering. Use validated query parameters for year/theme, preserving anchor navigation and accessible pressed states. No search dependency is necessary.

### E7 — Clarify the member-access navigation until the separate system is ready

**Priority: low · Effort: small.**

- **Routes/source:** global “Espace membre” → `/login`; `src/components/layout/header.tsx`, `src/app/login/page.tsx`, `src/lib/member-login.ts`.
- **Evidence:** live `/login` shows “Connexion bientôt disponible” and explains that the official login address must be configured. No password form is collected. The source accepts only a validated HTTPS `/login` destination for the separate system.
- **Impact/recommendation:** the prominent navigation action suggests immediate access, although the landing page is honest. Label its current availability more clearly, or connect only the verified SEAFA_SYSTEM login when its owner confirms readiness. Keep assistance/contact available; do not build authentication into SEAFA_WEBSITE.

## Performance, accessibility and user-journey evidence

### Measurements and their limits

Live Chromium inspection covered ten routes at **390×950 and 1440×950**: `/`, `/gallery`, the Jenda album, `/join`, `/contact`, `/request-match`, `/activities`, `/events`, `/login`, and an intentionally missing page. All expected page statuses were correct, no page JavaScript errors or horizontal overflow were recorded, and the 20 axe WCAG 2 A/AA/2.1 AA scans reported zero violations. These scans do not establish complete accessibility conformance; D3 is a counterexample.

| Route, 390 px sample | Observed LCP | Observed CLS | Script encoded bodies | Script decoded bodies | Serialized DOM HTML |
| -------------------- | -----------: | -----------: | --------------------: | --------------------: | ------------------: |
| `/`                  |      1.576 s |            0 |                168 kB |                691 kB |               94 kB |
| `/gallery`           |      0.864 s |            0 |                183 kB |                782 kB |              262 kB |
| Jenda album          |      1.040 s |            0 |                186 kB |                789 kB |               70 kB |
| `/join`              |      0.808 s |            0 |                168 kB |                691 kB |               54 kB |

These are **single unthrottled lab observations from the follow-up run**, using reduced motion, a 1.6-second post-load observation and a shared browser context/cache. Encoded bodies are resource-timing sizes, not guaranteed cold network transfer; DOM HTML is not compressed document transfer. Desktop sampled CLS ranged from approximately 0.0023 to 0.0431, including the missing page. The mobile missing-page sample recorded CLS **0.2684**, while the nine sampled valid mobile routes recorded zero. `/events` recorded mobile LCP **4.556 s**. These observations merit isolated repeated traces of `src/app/not-found.tsx`, shared layout/font loading and `src/app/events/page.tsx`; the run does not identify a confirmed cause or establish a persistent regression. There is no measured INP, representative mobile CPU/network run, p75 field distribution or authenticated CrUX/Search Console evidence. No Core Web Vitals pass/fail claim is justified.

`next/image` responsive delivery, intrinsic/aspect-ratio reservation, initial hero preloading, lazy gallery photos and the 12-photo initial selection are appropriate. The hero loads additional slides progressively and suppresses automatic rotation for reduced motion, hidden tabs and control focus. Videos use controls and metadata/none preloading rather than autoplay. For a later performance pass, inspect album-header `sizes` against actual cover rendering: the Jenda cover is requested with `w=1920` in the header and `w=1080` again in the grid at 1440 px. Confirm useful decoded size and duplicate transfer before changing derivative selection; preserve all original media and quality.

### Journeys traced

- **Membership:** homepage/header CTA → `/join` → deliberate Genre, optional marital status, category-dependent country, up to five positions and consents → selected WhatsApp/email draft → explicit external/manual send. The preceding release's 19 composer browser checks and seven production release checks are applicable: this inspection does not change the form. Both channel URLs preserve French answers and recipients, blank optional fields are omitted, editing invalidates the preview, blocked/long handoffs retain the copy fallback, and no false delivery confirmation or server POST occurs. No real application was sent.
- **Contact and match requests:** `/contact` and `/request-match` share `ComposerForm`, `formFields`, validation and `createDraft`; their own fields and match timezone are preserved. Empty-form error announcements were exercised live. GET/invalid API probes never reached valid delivery. Browser integration tests from the preceding release covered both channels for all three forms at mobile/desktop sizes. Delivery inside native applications remains user-controlled and was not certified.
- **Navigation/history/gallery:** existing mobile drawer and desktop disclosure use buttons, Escape/focus return and link semantics. Lightbox has an announced dialog, Tab trap, restored focus, next/previous, Escape and swipe handling. Existing media-route/lightbox checks pass. One older combined mobile-menu/history test failed during this review when Enter did not close the first details element immediately after navigation; a separate live check after page readiness confirmed focus and open → closed → open behavior. This timing-sensitive test is recorded rather than treated as proof of a broken native disclosure.
- **Content/media:** 735 registered images resolve in the preceding same-session production HTTP audit; 58 moved-image redirects resolve; 45 albums contain 646 displayed photographs with byte-duplicate checks. Names/founder associations and Idane routes are retained. November remains month-only/upcoming. Arnaud's owner-corrected 2014–2022 overlaps the retained Romeo 2020–2022; no dates were altered to hide the overlap. Historical Jenda 2019 testimony and folder-classified 2021 photographs are different evidence and should not be conflated. No newly established missing media or broken current content link was found.
- **SEO/production:** Organization JSON-LD exists; sampled page titles/descriptions are French; correct 404s and recovery links exist. Detailed Event/Breadcrumb structured data is an optional future enhancement only after D1/D4. Root HTTPS redirects to `www` with HTTP 308; `www` and the public Vercel alias serve the site. HSTS was present. CSP, frame and referrer policy headers were absent on the sampled HTML responses; staged hardening is reasonable, but their absence alone was not treated as a demonstrated exploit. Vercel production status for the baseline commit was successful. Static/SSG public pages and hourly event/gallery regeneration remain; only the three compatibility APIs require request-dependent server execution.

## Five prioritized improvements from the original inspection

| Order | Improvement                                                          | Priority / effort | Why next / acceptance evidence                                                                                                                                                                                             |
| ----- | -------------------------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | Reviewed dependency patch release (D2)                               | High / medium     | Known affected versions are confirmed. Require compatible patched lockfile, a fresh advisory audit, image/social endpoints, full checks and a successful Vercel release; do not assume each advisory is exploitable here.  |
| 2     | Correct production metadata origin and approve indexing policy (D1)  | High / small      | Every canonical/sitemap link currently identifies localhost. Verify the actual deployed HTML/XML, not only source defaults; retain preview noindex and make launch indexing an explicit decision.                          |
| 3     | Keep focused error fields visible below the header (D3)              | Medium / small    | A reproduced accessibility failure affects recovery in all three important forms. Verify geometry/visibility, keyboard focus and announcements on mobile/desktop.                                                          |
| 4     | Add dependable shared/album social previews (D4)                     | Medium / small    | The root image exists but most child pages omit its tags. Validate absolute URLs, sizes, alt text and real image responses on representative shared routes.                                                                |
| 5     | Add production-origin/advisory smoke gates and basic monitoring (E3) | Medium / medium   | Current pathname-only tests missed the production configuration defect. Reuse existing tests, stabilize readiness checks, watch domain/HTTPS and collect privacy-safe errors/performance before optimizing from guesswork. |

D5 is already corrected and therefore does not consume a recommendation slot. Gallery entry-point simplification (E1) is the next UI improvement after these reliability/accessibility fixes.

## Validation of the correction and inspection limitations

The D5 correction passes content validation with **zero warnings**, the **29-test unit suite**, ESLint, TypeScript and the production build. The browser regression checks single listings and four old-URL redirects; the all-album/connected-detail browser check passes. The combined history keyboard test passed both isolated reruns after the initial timing-sensitive failure; the live page-readiness check also passed. No photograph, recipient, form workflow, dependency or unrelated script is changed by this correction.

Evidence collected locally is in ignored `tmp/inspection/live.json`, `focus.json`, `npm-audit.json` and screenshots; the report records the material results so its findings remain understandable independently of those temporary files. Prior same-session production media evidence is in `tmp/oct15/http-media-audit.json` and `production-pages.json`.

Could not verify: private Vercel environment variables/build logs/WAF/monitoring and branch-protection settings; registrar-account state; native WhatsApp/email installation and final delivery; SEAFA_SYSTEM internals, receipts or rate limits; production persistent storage/outbox setup; screen-reader behavior with NVDA/VoiceOver; physical iOS/Android and Safari/Firefox behavior; field Core Web Vitals, search indexing status or social-platform caches; deployment-native sharp/libvips/librsvg binary mitigations; historical details beyond the supplied sources/owner corrections. No exploit, load test, valid API submission or production failure injection was attempted. These limits do not justify claiming those systems are broken or secure.

### Follow-up verification of the existing release

The follow-up inspection reran **29 unit tests**, content validation (**zero warnings**), ESLint, TypeScript and the production build successfully. It also ran **22 targeted browser tests directly against the custom domain**, covering composer journeys, optional omissions, deliberate gender selection, five-position and keyboard behavior, long/blocked handoffs, merged-story listings, four permanent redirects, presidency dates, November scheduling and reorganized gallery browsing at mobile/desktop widths. All passed; no application was sent. The four pre-existing modified media-maintenance scripts remain untouched.

Fresh live inspection again covered the ten routes at both viewport sizes: all expected HTTP statuses, no JavaScript page errors, no horizontal overflow and zero violations in all 20 axe scans. Manual screenshots and source tracing support the visual/gallery observations; the separate error-link geometry check reproduced D3. Fresh HTTP requests confirmed localhost sitemap URLs and `Disallow: /`. The GitHub commit-status API reports Vercel **success**, “Deployment has completed”, for existing correction commit `e461741`, with [its deployment status](https://vercel.com/tech-vision-labs-projects/seafa-website/HpuDpjzGmm13ZXU5xzPKmrF8sWh2). This public status does not expose private deployment settings or logs.

The performance table above uses the refreshed browser measurements. The prior all-media HTTP audit is retained as earlier release evidence; it was **not** repeated in this follow-up. Current unit checks did independently recheck catalogue paths, dimensions, folder ownership and duplicate bytes. `tmp/inspection/npm-audit-refresh.json` contains the fresh four-entry advisory result. No additional application defect introduced by the requested changes was established beyond D5, already fixed in the existing release. Broader D1–D4 and E1–E7 remain for review before implementation.

Historical release limitation: the earlier report-only follow-up was initially saved locally because automatic approval review required additional authorization for the production branch. The owner has since explicitly authorized committing/pushing the report and all five improvements to `personal/main`, including triggering and verifying Vercel production. Current release status is recorded in the remediation section; the earlier successful deployment evidence above concerns `e461741`.
