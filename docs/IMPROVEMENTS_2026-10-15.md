# SEAFA improvements — 15 October 2026

## Content and evidence

- Arnaud Badogomba: **2014–2022**, following the owner's explicit correction. The shared presidency component covers the homepage, history and team pages. Romeo's existing 2020–2022, Tony's 2022–2024 and Jimmy's start in 2024 remain unchanged. Arnaud's corrected term overlaps Romeo's existing term; no additional interpretation or dates have been invented. This historical overlap is recorded here, outside public copy.
- Basketball: **Novembre 2026**, with month precision in the album, event, activity, media descriptions and ordering. No day is assigned. Upcoming status lasts through November; event and gallery pages revalidate hourly so calendar labels can expire without another deployment.
- Public editorial uncertainty notes were removed while useful historical descriptions were retained. Interview source testimony was preserved.

## Media reconciliation

The current owner-organized folders determine the assignments. The catalogue contains **735 images**, with **45 published albums**. Fifty-eight newly located image paths are byte-identical moves, rather than new unique photographs. Jenda is classified under 2021, the renamed anniversary folder under 2019, Karera under 2021, the relocated walk under 2020, and the moved medicine/gala pictures under their current 2020/2018 folders. Truly unidentified images remain in Archives.

Six obsolete gallery collections merge into their current collections with permanent redirects. Fifty-eight moved image URLs also have permanent redirects; older redirects are flattened to current destinations. Stable content IDs and existing detail URLs are preserved.

Four legacy images and one description file removed during the owner's reorganization have no byte-identical current replacement. Their original committed bytes are retained under `sources/media-originals/`, without restoring stale public references. The owner's replacement history photograph remains intact. The reconciliation manifest records hashes for all 58 moves and five preserved originals: [MEDIA_RECONCILIATION_2026-10-15.json](MEDIA_RECONCILIATION_2026-10-15.json).

Gallery covers and photos use complete-image framing. Jenda uses a clearer existing group photograph as its cover. Year links, existing filters, expansion, lightbox, captions, keyboard navigation, responsive layouts and reduced-motion support are preserved.

## Membership

Genre requires a deliberate Homme/Femme selection; Situation matrimoniale is optional with all four requested choices. State, validation and types use the same allowed values. Both WhatsApp and email drafts include French labels for selected answers and omit unanswered optional fields. Existing recipients, membership fields and the five-position limit remain. Tests intercept application opening; no real application is sent and the site does not claim delivery.

## Validation and release

- Content validation: zero warnings; 28 unit tests pass, including full media inventory/dimensions, unique gallery image bytes, folder ownership, month-only scheduling and both draft formats.
- ESLint, TypeScript and production build pass. Event/gallery routes retain prerendering with hourly regeneration.
- HTTP audit: all 735 current image URLs and all 58 moved-image redirects resolve.
- Desktop/mobile browser checks cover presidency, names, gallery collections/filters, lightbox controls, reduced motion, membership drafts, position limits, accessibility and horizontal overflow. Screenshots are retained in ignored `tmp/oct15/`.
- Route verification checks the sitemap, detail pages, redirects and expected missing-page responses; rendering audit checks prerendering boundaries.
- Both custom-domain hosts were verified over HTTPS before release; the root redirects to `www`. No DNS settings were changed.

The four pre-existing modified media-maintenance scripts are intentionally excluded from this release.
