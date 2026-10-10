# SEAFA — focused design and media review, 10 October 2026

The current checkout and catalogue were used. Four pre-existing media-script edits were left unchanged and excluded from this release. No screenshots accompanied the supplied text attachment; local before/after captures were produced from the existing production build and updated source.

## Corrections

- Compact sticky desktop navigation, restrained dropdowns, active states and direct member actions. The mobile drawer scrolls independently, locks background scrolling, moves focus into its actions, cycles keyboard focus through the header (including the homepage logo), closes with Escape and resets after navigation.
- The entire brand area links to `/` with the accessible name `SEAFA — Accueil`; it remains exposed when navigation is open.
- Balanced image/text composition for « Notre raison d’être », corrected « À la SEAFA », and cleaner existing community photographs without the old logo/padded photo panel.
- A shared chronological presidency row on home, history and team: Arnaud Badogomba, Romeo, Tony Ezako and Jimmy Jambo. Desktop has four equal portraits; tablet uses two columns and phones stack chronologically. Jimmy's supplied PNG and 2024 start are retained.
- Removed the « Les visages de SEAFA » public album and redundant team portrait promotion. `/gallery/people` redirects to `/history#presidents`. The interview album remains accessible from a modest inline link after the actual testimonies.
- Five distinct hero photographs with six-second rotation, crossfades, indicators, previous/next and pause/play. Reduced motion disables automatic changes and transitions; hidden pages and focused controls pause automatic activity. Only the first image is present/preloaded initially; other optimized images mount when requested. Stable hero dimensions prevent transition-induced layout changes.
- « Nos meilleurs moments » features football against Lumitel, the confirmed September 2026 anniversary, the Karera excursion and the health conference. These covers are different from the hero images and link to their actual albums.
- Gallery descriptions use natural French grounded in existing records. Existing year/theme filters, counts, complete albums, lightbox and image navigation are retained. Portrait media and originals remain in the catalogue independently of gallery publication.

## Deduplication and uncertain context

The baseline had 49 public albums and 562 displayed photographs. The revised gallery has **47 albums and 549 photographs**: four presidency portraits moved out of gallery listings and nine additional duplicate variants removed from public display. Three Lumitel recompressed copies, three tournament variants, one waterfall copy, one physiotherapy copy and one duplicated conference composition were reviewed. SHA-256 hashing found no remaining byte-identical public copies; a 24 × 24 RGB comparison found no remaining candidate pairs below the audit threshold of 5 mean absolute levels. This heuristic is a duplicate candidate check, not proof that no similar photograph exists.

The public Lumitel album now has 52 photographs; tournament 2024 has 19. All original image bytes are preserved. Romeo's existing on-disk filename was reconciled with the two source registries; a redirect retains the previous media URL.

The waterfall image formerly used as the 2021 anniversary cover is a repeated Karera composition and is excluded there. A different waterfall photograph is collected in the Karera album with a caption explicitly leaving its own date unconfirmed. Five remaining photographs stay at the existing former anniversary URL under « Souvenirs de rencontres », with no asserted year or anniversary identity. The matching event title, summary, category and date were corrected. The duplicated mentoring/conference listing was consolidated into the existing conference album, with old URLs redirected.

The physiotherapy photograph is retained once in its dedicated album with a natural caption and no guessed date. The separate 2018 consultation album retains its other photographs.

## Remaining editorial questions

- Arnaud's historical record says 2013–2019; the original supplied portrait filename said 2015–2022. Both are disclosed on the site rather than silently treating either as resolved.
- The interval between 2019 and 2020 is not documented as an uninterrupted term. The succession is explicitly limited to the four identified presidents.
- Romeo's full public name remains unconfirmed in the original presidency records. A later descriptive filename is not treated as independent identity verification.
- Dates and event identity for the remaining formerly 2021 anniversary photographs are unknown.

## Verification evidence

Screenshots are in ignored `tmp/premium/`, named `before-` and `after-` for home, navigation, presidency, gallery and about at 390, 768, 1440 and 1920 pixels. `*-top-*` images provide readable viewport extracts of the full-page home/gallery captures. Lazy images were brought into view before the updated full-page captures. Contact sheets and machine-readable duplicate candidates are also retained there, excluded from Git.

The production build remains static-first, with no request-time public pages and the same three submission API routes. No dependencies, domain/DNS settings, Vercel bundling configuration, hidden enquiry recipients or five-position constraints were changed.

Final local checks: 22/22 unit tests; content validation with zero warnings; ESLint with zero warnings; TypeScript; formatting; production build; and whitespace validation all pass. All 116 sitemap routes expose the accessible homepage brand link; all four legacy URL redirects return 308. Rendering audit reports no dynamic public pages and the unchanged three APIs.

The 95-test browser suite passed 91 checks in its full run. Two stale team selectors were reconciled with the consolidated presidency section; two tablet image requests were stalled in the local preview optimizer and passed after restarting the final production preview. All four failures passed in an 11/11 targeted rerun, which also repeated all requested layout widths, autoplay/pause/reduced-motion, drawer keyboard behavior and team accessibility. This is verification across runs, not a claim of an uninterrupted 95-pass run. Forms are tested by preparing drafts, without sending enquiries to recipients.

Desktop and phone overview comparisons are `tmp/premium/comparison-1440.png` and `tmp/premium/comparison-390.png`. Deployment and custom-domain verification are reported in the release handoff after their actual completion.
