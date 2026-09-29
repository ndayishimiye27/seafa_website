> Document historique de la phase initiale. Pour l’état actuel, consulter README.md, CONTENT_PENDING.md, EDITORIAL_SOURCES.md et IMPLEMENTATION_REPORT.md. Les mentions anciennes de dates, de fonctionnalités ou de blocages sont remplacées par ces documents.

# Implementation roadmap

## Phase 1 — foundation (current scope)

Create route shells, reusable section placeholders, slideshow interface, French content boundary, typed models, empty/draft data, asset folders and architecture documents. Validate start, type checking, lint, production build and all route shells. Stop for approval before full page code.

## Phase 2 — official content and design approval

Resolve founding year and brand assets. Collect CONTENT_REQUIREMENTS inputs, approve sitemap and homepage wireframe, typography, colours and responsive navigation. Approve membership process, conduct/privacy wording and publication permissions. Exit: signed-off content inventory and page/design specification; unknown content remains explicitly absent.

## Phase 3 — shared public UI and homepage

Implement accessible navigation, footer, buttons/cards and images; then the approved 14-section homepage, editorial highlights and shared album slideshow. Verify keyboard, swipe, focus, reduced motion, contrast, responsive reflow and image loading. Exit: reviewed public shell and homepage with approved content and no invented statistics.

## Phase 4 — public content pages

Implement about/history/team, recurring activities/Challenges, events, awards, and conduct, album index/detail and news index/detail using published-only adapters. Add usable filters and empty states; replace /apercu gates with actual published lookups and record-specific metadata. Verify unknown/draft slugs return 404.

## Phase 5 — reviewed applications and enquiries

Choose server/database provider only after data ownership/retention decisions. Implement server validation, consent versions/timestamps, upload validation, rate limiting and reviewer access. Submission creates pending-review records. Acceptance and membership provisioning are separate authorized operations. Confirm notification recipients before integration. No database or auth is implemented in the current phase.

## Phase 6 — launch readiness

Confirm domain, canonical URLs, social image, published metadata, sitemap/robots and remove noindex only for approved public content. Audit accessibility, performance, privacy, content accuracy, forms, error handling and deployment configuration. Run production build and smoke checks. Agree maintenance/content ownership and backups if storage is introduced.

## Separate future project — private member portal

Define roles and access control for membership administration, internal team selection, private statistics and captain records. Authentication, authorization and audit requirements need their own design and approval. Public content models must not expose personal submission data.

Recommended next action: review the foundation and provide the official logo plus a decision on 2012 versus 2013, then approve Phase 2 content/design work before any complete page implementation.

First implementation step after structural approval: implement and validate the local ContentRepository adapter resolving MediaAsset → Album → recurring records, with publication and reference checks. Use neutral drafts to verify one shared album can appear in gallery and a section without copied media; then build the shared AlbumView and editorial HighlightsSlideshow against that contract. Do not implement the adapter or full frontend during this structural update.
