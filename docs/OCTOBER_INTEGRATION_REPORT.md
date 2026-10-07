# SEAFA integration review — 6 October 2026

Implementation extends the existing Next.js application, centralized registries, public intake composer, gallery filters, and lightbox. No GitHub push or deployment has been performed.

## Media and public content

| Supplied folder                                               | Integration                                                                | Published media                      |
| ------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------------------------ |
| `public/media/activities/2022`                                | New health conference album, activity and event; 3 June 2022               | 10 photographs                       |
| `public/media/activities/2024/tournament`                     | Existing tournament album and activity extended; 4 October–3 November 2024 | 23 photographs in the complete album |
| `public/media/match contre lumitel en mars 2026`              | Existing Lumitel draft published, connected activity updated, event added  | 56 photographs                       |
| `public/media/match de sages contre les jeunes decembre 2025` | New album, activity and event; December 2025                               | 40 photographs and 8 videos          |
| `public/media/president hierachy`                             | Current president and historical succession                                | All 4 supplied portraits             |

The four gallery folders supplied 120 newly added photograph files. Two byte-identical duplicates remain on disk and in the asset catalogue, but are displayed once in their albums. Existing photographs remain registered under their existing IDs. Covers were selected after reviewing contact sheets; similar compositions remain accessible in the full albums. The already-published September 2026 anniversary is preserved.

Two Kirundi descriptions were read: `activities/2022/description of the event.txt` and `activities/2024/tournament/event description.txt`. Professional French descriptions are centralized in `src/data/october-content.ts` and shown in album and connected detail pages. Original source texts are unchanged. Names, dates, locations, community context, the tournament final and the medical equipment donation are preserved. The source's team-count ambiguity is handled without inventing a team roster. No scores or precise match days have been invented.

Photos retain their original files and proportions; no faces have been modified and no substitute photography has been generated. Four filenames containing `&#039;` plus an exact-duplicate alias are URL-encoded for the image optimizer. All 643 image files are registered; dimensions and local paths are checked by the media tests. Eight real video-frame posters are registered separately from album photographs.

Three original videos use HEVC Main 10 HDR, which did not provide playable video dimensions in the Chromium audit. H.264/AAC copies of all eight clips now use compatible pixel formats, correct orientation, a maximum 1280 × 720 bounding box without upscaling, fast-start metadata, and HDR-to-SDR conversion where necessary. Original videos are retained and linked for download. Players use controls, inline playback, `preload="none"`, fixed layout space, and actual frame previews. The temporary FFmpeg binary is under ignored `tmp/`; no application dependency was added.

## Presidency and homepage

Jimmy Jambo is displayed prominently as current president since 2024 using the supplied portrait. Historical succession is separate: Arnaud Badogomba (existing documented 2013–2019 term), Romeo (2020–2022), and Tony Ezako (2022–2024). The homepage links to the expanded history section. The team page also keeps current leadership and previous presidency archives visible.

Homepage previews avoid repeating albums across events, activities and gallery cards. Presidency spacing and typography follow SEAFA's navy, white and restrained gold identity. Gallery browsing starts with the newest years; album covers, counts, hero imagery, keyboard focus and moderate corner radii follow the existing design system.

## Registration

The existing selector is extended, with all 21 positional codes on a responsive pitch. A visible checkbox list uses the same controlled array. Markers have French names on hover/focus, keyboard controls, 44–48 px touch targets, and selected/unselected styles. The dynamic counter uses singular/plural French labels. At five selections, additional choices are disabled while selected choices remain available for deselection.

Existing validation already rejects zero positions, more than five, duplicates and unsupported codes. It continues to protect direct API input and legacy choices. The existing WhatsApp/email composer includes all chosen codes and French labels; it does not create a member account or claim server persistence. Category, diaspora country, profession, qualifications, birth date, contact and application fields remain in the existing workflow. Browser tests check actual draft contents and preserve editable responses.

## Material changes

- Data: album/activity/event/media registries, gallery curation, presidency records and portrait metadata, October descriptions, video metadata and frame assets.
- UI: homepage, history and team; presidency component; album cards, filter order, header, metadata, gallery and video presentation; position selector and shared styles.
- Validation: filesystem and poster checks for video records; encoded media paths; media inventory script.
- Verification: existing album/year/filter expectations updated; selector tests updated for disabled choices; new viewport, synchronized selection, optimizer and video-frame tests; media import, preview and conversion scripts.
- Editorial tracking: `docs/CONTENT_PENDING.md`; media, original-video, conversion and browser-video audit files.

## Verification

- Formatting and format check: pass. ESLint: pass with zero warnings. Explicit TypeScript check: pass.
- Unit tests: **22 / 22 pass**, including five-position validation, draft contents, media paths/dimensions, data relationships and intake failure handling.
- Browser suite: **80 / 84 passed** in the full final run; after correcting encoded URLs and narrowing the historical-name locator, **all 4 remaining checks passed** in the targeted rerun. The book-navigation check passed unchanged in that rerun. All 84 checks are therefore verified across these runs; this is not a claim of one uninterrupted 84-pass run.
- The seven requested viewports—375, 390, 430, 768, 1024, 1280 and 1440 px—pass the new integration tests. Existing tests also cover 320 px. Pitch/list synchronization, disabled sixth choices, keyboard selection and automated contrast/accessibility checks pass.
- All eight compatible clips load actual video frames in Chromium; every original download and poster request succeeds. Browser metadata, original HEVC findings and conversion details are saved in the three video audit files.
- Sitemap route audit: all listed routes return 200, all tested missing routes return 404, and French language metadata is present. Local media inventory: **643 images, 0 unregistered**. `verify:content`: pass with zero warnings. `git diff --check`: pass.
- Production compilation, strict TypeScript and static generation: pass, **123 generated pages**. No application dependency, push or deployment was added.
- Manual rendered review: desktop and phone screenshots of home, presidency, history, gallery, album, event, registration pitch, video players and mobile navigation were inspected. Source contact sheets and all eight real frame previews were also reviewed. Screenshots are under ignored `tmp/october/`.

## Information still missing

- The new Arnaud portrait filename says **2015–2022**, while the existing historical section documents **2013–2019**. Existing historical dates were preserved; owner clarification is required to reconcile them.
- No vice-president, secretary, treasurer or executive committee hierarchy was supplied. These roles have not been invented. Romeo's full name is also not supplied.
- The deleted `public/media/malolo.jpeg` has no matching replacement file. Its broken gallery reference was removed; Malolo's historical award remains published.
- Exact days, confirmed venues and scores for the Lumitel and sages–jeunes matches are not supplied. Month-level dates are retained.
- Real sending, membership-system persistence, production hosting configuration and deployment have not been exercised; tests use local synthetic data. Existing launch items remain tracked in `CONTENT_PENDING.md`.
