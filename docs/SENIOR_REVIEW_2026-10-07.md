# SEAFA final site and content review

Review date: 7 October 2026. Changes are staged on `main` for owner review. No commit, push, Vercel deployment, DNS change or project reconfiguration was performed during this pass. The existing October integration report is preserved.

## Media

The current filesystem was inventoried before editing. It contains **53 folders with files, 638 photographs, 17 video files and two original source descriptions**. The video files comprise eight original match clips, eight compatible copies and the existing training video; they are not 17 separate recorded moments.

`CURRENT_MEDIA_INVENTORY.json` records filenames, folders, types, extensions, dimensions, orientation, byte hashes, source-folder year evidence, album associations, reference/publication status, duplicate candidates, low-resolution flags and featured/archive uses. It is an internal document outside `public`. Portrait years and unverified capture timestamps are not treated as event dates.

`MEDIA_RENAME_PLAN.json` records **437 descriptive filename changes**, original/current paths, reference mappings and SHA-256 provenance. Git recognizes 436 media renames; Jimmy's PNG was already a newly supplied replacement for the removed JPEG before this pass. Folder organization supplied by SEAFA is retained. No event, location, score or person's identity was invented in a filename.

Five obsolete catalogue entries were removed: the deleted Lumitel photograph and the old Biggie, Jules, Placide and Romeo portraits. The separately supplied Romeo portrait remains available. Jimmy's portrait now uses the supplied PNG and its actual dimensions. Eight original-download links and the old encoded tournament filenames were reconciled with the new paths.

All **657 retained media/source files have unchanged source bytes** compared with the initial filesystem scan. No faces or photographs were edited, reconstructed or generated. Source files were not deleted for curation. The current duplicate review identifies **54 exact/near-duplicate candidate pairs**; **61 catalogue images are excluded from album presentation** by the established curation rules. Fourteen low-resolution images are flagged for review rather than automatically discarded. The published albums contain 562 distinct photographs; logos, video posters and excluded archive sources are accounted for separately.

Two incorrect associations were corrected using the reorganized folders: Songa photographs were moved out of the 2019 tournament into the 2018 Songa album, and the image formerly labelled as a 2015 match now belongs to the 2016 anniversary. The old `/gallery/match-2015` URL redirects permanently to that anniversary album.

## Gallery

The gallery retains its existing card design and presents **49 contextual albums**, grouped by verified/source-supported year, newest first. A single year selector and eight compact thematic filters replace overlapping type/category controls: Tous, Football, Compétitions, Événements, Communauté & fraternité, Distinctions, Présidence & identité, and Archives. Undated collections remain under Date à confirmer; no 2023 activity was invented.

| Collection               | Published photographs | Videos | Date precision                                            |
| ------------------------ | --------------------: | -----: | --------------------------------------------------------- |
| 13th anniversary         |                   173 |      0 | 26 September 2026, previously confirmed by SEAFA          |
| SEAFA–Lumitel            |                    55 |      0 | March 2026                                                |
| Sages–jeunes             |                    40 |      8 | December 2025                                             |
| Saint Esprit tournament  |                    22 |      0 | 4 October–3 November 2024, supplied description           |
| Health conference        |                    10 |      0 | 3 June 2022, supplied description                         |
| Songa match              |                    24 |      0 | 2018 source folder                                        |
| Badogomba gathering      |                    32 |      0 | 2020 source folder                                        |
| Anniversary distinctions |                     2 |      0 | 2026 source collection; recipients/categories unconfirmed |

Recent covers and leading photographs were selected from inspected source contact sheets, emphasizing teams, football, gathering and knowledge sharing. Stable media IDs are retained. Larger albums initially render twelve photographs with an explicit button to expand the remaining archive. The lightbox can still traverse the complete curated collection. Videos retain controls, real frame posters, original downloads and `preload="none"`.

The two Kirundi-to-French event descriptions remain intact. Original Kirundi files are preserved byte-for-byte.

## History and evidence

The timeline now contains **14 milestones**. The original seven entries from 2013–2019 retain their historical booklet sources. Seven entries extend continuity through 2026:

| Entry                               | Evidence                                                             |
| ----------------------------------- | -------------------------------------------------------------------- |
| Badogomba gathering, 2020           | Supplied `activities/2020/kuramukanya chez les badogomba` collection |
| Placide conference, 2021            | Existing dated conference album                                      |
| Health conference, 3 June 2022      | Original Kirundi description and photographs                         |
| Saint Esprit tournament, 2024       | Original Kirundi description and photographs                         |
| Sages–jeunes, December 2025         | Supplied dated collection, photographs and eight clips               |
| Lumitel, March 2026                 | Supplied dated collection                                            |
| 13th anniversary, 26 September 2026 | Previously confirmed SEAFA date and anniversary photographs          |

The anniversary folder's reference to October does not override the previously confirmed September date. Each expanded milestone presents concise editorial text, source attribution, one representative image and an album link. It no longer embeds an entire photo collection. Year labels fit the timeline's narrow column; precise dates appear inside expanded entries. Historical presidents remain primarily in history/leadership.

## Homepage and conversion

The homepage was reduced from **19 sections to eight**:

1. Real anniversary photograph, SEAFA identity, motto and membership/history links.
2. Concise identity and community image.
3. Five factual pillars: football, fraternity, transmission, community development and diaspora participation.
4. Three short milestones introducing the full history.
5. Current president, with an organization link.
6. Four gallery stories: anniversary, Lumitel, sages–jeunes and the 2024 tournament.
7. Membership invitation and shared commitments.
8. Partnership and friendly-match contact paths.

Separate homepage statistics, mission/vision, values, highlight slideshow, activity previews/training video, member directory preview, diaspora/community essays, interview grid, awards, events, empty news and duplicate contact sections were removed or consolidated into these previews. Their dedicated pages remain available. Membership is the primary hero action. Partnership language invites discussion without inventing sponsors, investment returns or packages.

The narrative now gives newcomers an identity and participation path, alumni a history and archive path, diaspora members a contribution path, and partners documented activity and a contact path. The public site remains the story/discovery layer; it does not become a member-management dashboard.

## Registration and contact

- The visual pitch is the primary selector. The duplicate checkbox grid and view toggle are removed from the rendered interface.
- All 21 position definitions, legacy choices, form state and API validation remain supported.
- Native labelled toggle buttons support mouse, touch, Tab, Enter and Space. They expose selected state with `aria-pressed`, provide visible focus and retain touch targets.
- A live selected count and compact, individually labelled removal chips replace the repeated list. The chip container has an explicit named group role, including when empty.
- The maximum remains **five distinct positions**. At five, additional markers are disabled; selected markers and chips remain removable. Nothing is silently replaced.
- Markers remain inactive during initial server rendering until their client handlers are attached, preventing an early click from being lost. No validation or accessibility rule was disabled.
- Pitch selections are verified in the generated French WhatsApp/email drafts. Draft editing, copy fallback and honest sending instructions remain available.
- **WhatsApp destination hidden: YES. Email destination hidden: YES. Underlying routing preserved: YES.** Delivery cards display only the channel and action. The destination is also omitted from the visible draft preview; configured `wa.me`/`mailto` routing is unchanged.
- Browser checks prepare drafts and mock opening applications. Real sending and membership-system persistence are not claimed.

## Design, accessibility and performance

SEAFA's navy, white and restrained gold palette, logos, navigation and established gallery identity are retained. New controls use consistent small radii, spacing, typography and focus treatment. Homepage album headings were corrected so the section heading scale does not overwhelm individual story cards. Portraits and archival images preserve their subjects with contained presentation; the hero uses a deliberate wide crop of a real photograph.

Only critical hero imagery is preloaded. Next.js image optimization, actual intrinsic dimensions and responsive sizes remain enabled. The simplified homepage removes repeated media/sections, and large albums defer the remaining image elements until the archive is expanded. Compatible match videos do not all preload. No source-media processing or video conversion runs during `next build`.

Keyboard, touch, disabled-limit behavior, selected-chip removal, screen-reader labels, reduced motion, contrast and automated WCAG checks were exercised. Screenshots of homepage, identity, presidency, gallery stories, album, history, team, pitch and delivery cards were inspected at phone and desktop widths. Responsive integration screenshots/checks cover 375, 390, 430, 768, 1024, 1280 and 1440 px; existing keyboard checks also cover 320 px. No horizontal overflow remains in these checks. No fabricated Lighthouse, CLS or LCP score is reported.

## Clean Git-tree build and deployment investigation

The staged Git tree was exported without making a commit. Dependencies were installed from `package-lock.json` using `npm ci` in an isolated temporary checkout outside the parent workspace. No application `.env`, existing `node_modules`, build cache or local-only source was supplied to that checkout. The tested environment is Windows, Node **24.17.0**, npm **11.17.0**; this approximates a fresh checkout but is not a Linux/Vercel execution.

Fresh production compilation, TypeScript checking and static generation succeed with **124 pages**. The net increase from 123 comes from adding two separate album routes (Songa and anniversary distinctions) and replacing the misdated 2015 album route with a redirect. Subsequent focused corrections also build successfully.

All **654 distinct referenced media paths are staged with exact case**. Alias and relative source imports were checked against actual source entries. No credentials, generated build artifacts or temporary Vercel audit tooling are staged.

### Confirmed Vercel function-limit follow-up

The owner subsequently supplied the exact error: the Hobby deployment exceeded its 12-function allowance. This supersedes the earlier “root cause not established” assessment. The failed remote deployment’s precise function count is not available; the supplied error establishes more than 12.

The follow-up makes `/join`, `/request-match`, `/contact`, `/privacy`, `/login` and `/interviews/book` static. All public content pages now prerender; only the three secured submission APIs retain application request-time logic. The booklet preserves direct page links and original-page navigation through a client URL hook under Suspense. Privacy text no longer visibly displays the sending destinations.

`vercel.json` explicitly selects Next.js and applies build-only `NEXT_ENABLE_ADAPTER=0`, choosing the official bundled builder rather than per-route adapter emission. Its configuration passes the current Vercel CLI schema. Local official packaging produces **five unique function bundles**, including prerender fallbacks and aliases, below the 12-function limit. The same local bundled baseline also produced five, so this is a packaging compatibility proposal plus a static-first improvement, not an invented cloud before/after count. Cloud acceptance remains pending owner-approved deployment.

The final isolated build produces **129 generation units**, with **26 static route entries**, **six SSG patterns**, **zero dynamic public pages** and **three API endpoints**. The complete existing browser suite now passes in a single run (**84/84**), and the new static-booklet regression test passes (**1/1**). All 126 route checks, formatting, lint, TypeScript, 22 unit tests, content validation and media/casing checks pass.

Read the detailed route inventory, API usage evidence, retained-bundle purposes, compatibility-setting caveat and environment limitations in [the Vercel function audit](./VERCEL_FUNCTION_AUDIT_2026-10-07.md). The native Linux attempt was incomplete and is not a claimed passing check.

## Validation and Git review

- Formatting: pass. ESLint: pass, zero warnings. Explicit TypeScript: pass. Content validation: pass, zero warnings.
- Unit tests: **22/22 pass**.
- Route audit: **126/126 pass**, including expected missing-route 404s. The documented Next.js `NoFallbackError` logging for unknown static slugs remains separate from successful production generation.
- Media/import audit: zero missing, untracked or differently cased references; all retained source hashes preserved.
- Browser verification: the full run passed **78/84**. Targeted reruns updated intentional UI expectations, verified cold image loading and link traversal, and exposed/corrected early pitch readiness and empty-chip ARIA semantics. The final functional set passed **25/26**, with the remaining empty-state accessibility failure corrected; the final keyboard/seven-width/empty-state run passes **11/11**. All 84 original checks are verified across these runs, not claimed as one uninterrupted 84-pass run.
- All eight match clips load real frames; poster and original-download requests pass. Training-video playback and lightbox keyboard/touch behavior are verified.
- Credential-pattern scan: zero findings. No real environment files, logs, screenshots, browser artifacts, caches or temporary files are staged. The existing `.env.example` template remains unchanged.
- Changes are staged on `main` for review, including the current inventories, filename/reference migration, media catalogue, album curation/organization, timeline, homepage, registration controls, stylesheet, redirect and adjusted verification expectations. The historical October integration report is unchanged.
- Local preview of the final verified build: `http://localhost:41988`.

## Outstanding

The exact failed-deployment function list/settings and the first approved deployment are still required to certify cloud acceptance of the proposed packaging fix. Content uncertainties remain: complete committee hierarchy, Romeo's full name, conflicting Arnaud mandate dates, the missing Malolo portrait, precise details for some matches and real external sending/persistence verification. No unsupported information was added to resolve them.

Stop here for owner review. Commit, push, deployment and DNS changes require the owner's explicit approval under this task's instructions.
