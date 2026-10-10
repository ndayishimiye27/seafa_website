# SEAFA screenshot refinement — 10 October 2026

This release follows the owner's four screenshots and latest corrections. It supersedes the presidency questions and gallery counts in `PREMIUM_REVIEW_2026-10-10.md`.

## Result

- Arnaud Badogomba → Romeo Badogomba → Tony Ezako → Jimmy Jambo remains the presidential order, using the existing correctly assigned portraits. Concise descriptions convey foundations, progression, consolidation and continuation. Public presidential dates and unfinished editorial notes are removed; Romeo's full name is owner-confirmed.
- The desktop header uses horizontal navigation from 1024 CSS pixels, central navigation, restrained membership actions and compact anchored dropdowns. The previous 1280 px threshold could produce a drawer on a 1920 px display with browser zoom. A regression check covers the approximately 1273 px CSS viewport represented by that screenshot. Mobile focus trapping, Escape, outside-click closing, breakpoint changes and scroll restoration remain supported.
- The hero rotates approximately every six seconds with a one-second crossfade. Previous/next buttons are removed. Small indicators remain; the keyboard-accessible pause/resume control becomes visible on focus. Reduced motion disables automatic rotation and transitions; document visibility suspends rotation. Images load progressively, retaining their originals.
- History presents 15 verified records in 13 year entries. Both March 2026 Lumitel photographs and the owner-confirmed 26 September 2026 anniversary remain within the single 2026 entry. Distinct events retain their descriptions, images and album links. Phone entries use the full content width.
- The corrected, labelled founders montage appears only in the 2013 history entry. Its caption lists the twelve names row by row, left to right. There is no public founders album or repeated founders image on the homepage or team page. The original interview booklet reader and PDF download are preserved.

## Owner's media changes

The two former `/media/events/2022/anniversary/` photographs were moved by the owner to `/media/activities/bonne annee 2018/anniversary/`. Their SHA-256 hashes match the former tracked originals byte for byte. They now form **Retrouvailles du Nouvel An — 2018** and a corresponding history event. Stable media IDs remain internal; paths, captions, album/event names and date precision follow the corrected allocation.

The owner supplied identical 1174 × 1339 corrected montages at `/media/history/2013/founders.png` and `/media/history/founders.png`. The former is the sole public historical placement. Both originals remain on disk; the duplicate is excluded from public gallery curation. The stale small founders image was already removed by the owner. The catalogue was edited selectively, not regenerated.

The public gallery now has **46 albums and 548 photographs**. All catalogue paths and dimensions match the actual filesystem. Existing hero slides and featured moments retain their valid media allocations. Redirects preserve old founders album/media URLs and old 2022 album/event/media URLs. Their destinations return HTTP 200.

The owner's unrelated changes to `scripts/audit-media.ts`, `scripts/integrate-october-media.ts`, `scripts/preview-october-media.mjs` and `scripts/review-october.mjs` remain untouched and excluded from this release.

## Factual limits retained in this report

- Historical presidency term records conflict with earlier supplied filenames. This release does not reconcile those dates or expose them publicly.
- The labelled montage is authoritative for names and order. It corrects Axel to **Ndayizeye** and includes **Ghislain Mugisha**. The historical booklet supplies context on pages 5–6; identities are not inferred from appearance. **Butunungu, Urlich and Fidèle** retain only the names supplied, without guessed surnames.
- The Lumitel collection establishes March 2026, not an exact match day. The New Year allocation establishes 2018, without asserting a precise date.
- A current playing roster and full coaching/executive roster are not established by these historical photographs. No current appointments are inferred from them.

## Verification

The production build remains static-first, with no dynamic public pages and the same three submission API routes. The Vercel Hobby configuration, dependencies, domain/DNS settings and existing membership and enquiry integrations are unchanged.

Visual evidence is retained in ignored `tmp/refinement/`: home, navigation, presidency, 2013 founders and grouped 2026 history at 390, 768, 1440 and 1920 px. All five hero photographs were also inspected at phone and desktop widths. Captures preserve the original photographs and natural montage proportions.

Local verification passes: 25/25 unit tests; content validation with zero warnings; ESLint with zero warnings; TypeScript; formatting of changed files; the final production build; and whitespace validation. All 115 sitemap routes expose the accessible homepage brand link. Existing and newly affected redirects return 308, with working destinations.

All 99 browser checks pass across runs: the initial focused run passed 16/16; the wider run passed 76/82; and the final production-preview rerun passed 28/28. The six initial failures were two stale archive-count expectations, three manifestations of the new team history link's contrast issue, and a history keyboard test expecting the initially open 2013 entry to be closed. All were corrected and rerun. The final run also repeated the requested layout widths, mobile/desktop menus, autoplay/pause/reduced motion, hidden-document suspension, all-public-page overflow/image checks, gallery/lightbox/video, and team accessibility. This is verification across runs, not a claim of one uninterrupted 99-pass run.

Booklet reading, page navigation and PDF download, gallery filters and lightbox controls, membership choices and position limits, login entry, and WhatsApp/e-mail draft composition pass. Enquiry tests prepare drafts without sending messages to recipients.

Push, deployment status and custom-domain verification are reported in the final handoff after their actual completion. Temporary screenshots, browser reports and deployment responses are excluded from Git.
