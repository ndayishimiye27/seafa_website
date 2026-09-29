> Document historique de la phase initiale. Pour l’état actuel, consulter README.md, CONTENT_PENDING.md, EDITORIAL_SOURCES.md et IMPLEMENTATION_REPORT.md. Les mentions anciennes de dates, de fonctionnalités ou de blocages sont remplacées par ces documents.

# SEAFA information architecture

Phase one: minimal identifiable French route shells only. Section components are prepared but deliberately not composed into full pages. Header and footer wrap the main landmark; the skip link targets main. French copy lives in src/content. English support will require a routing/translation decision before adding a locale prefix.

| Route              | Planned page sections                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| /                  | Ordered homepage composition below                                                                                             |
| /about             | Introduction, mission, football and community identity, values, community/women’s section, links to history and membership     |
| /history           | Confirmed foundation date, verified timeline, historical photographs, legacy, heritage recognition                             |
| /team              | Current squad, position/captain filters, leadership, technical/support team, heritage/honorary members                         |
| /activities        | Recurring Activities & Challenges collections, category filters, featured albums                                               |
| /activities/[slug] | Activity or Challenge description, shared visual album, approved participants, related content                                 |
| /events            | Recurring event albums, upcoming/ongoing/completed filters                                                                     |
| /events/[slug]     | Schedule, summary, description, shared album, related activity and optional CTA                                                |
| /awards            | Recurring honours, ceremony and seasonal collections                                                                           |
| /awards/[slug]     | Award/ceremony/season description, recipients, shared album and related records                                                |
| /gallery           | Album cards organized by event/category; no mixed image wall                                                                   |
| /gallery/[slug]    | Album title, supplied date/location, description, images, captions, fullscreen slideshow, related activity/news                |
| /challenges        | Best-of-three explanation, approved series results, winners and public captain records                                         |
| /code-of-conduct   | Football, friendship, discipline, brotherhood, leadership, solidarity, wellness, community involvement; approved conduct rules |
| /join              | Eligibility/process, application fields, code acceptance, privacy consent, review expectations                                 |
| /request-match     | Invitation/process, organization/contact fields, proposed match details, privacy consent                                       |
| /news              | News/event index and article summaries                                                                                         |
| /news/[slug]       | Article title, approved publication date, body, media, related activity/album                                                  |
| /contact           | Verified contacts, enquiry fields, approved location information                                                               |
| /privacy           | Official privacy policy, purposes, retention, rights/contact, consent and photograph handling                                  |

Dynamic routes accept only /activities/apercu, /events/apercu, /awards/apercu, /gallery/apercu and /news/apercu in this phase; these are explicitly structural previews, not published records. Only preview slugs are generated; dynamicParams=false returns HTTP 404 for other slugs, with a defensive notFound() guard. Replace this gate with published-only repository lookup in the content phase. Root loading.tsx, error.tsx and not-found.tsx cover route loading, recoverable rendering failures and missing content. No API or form action exists.

## Homepage hierarchy (ordered)

1. Header and navigation.
2. Hero background with primary SEAFA logo.
3. Main headline, slogan and calls to action.
4. Introduction explaining what SEAFA is.
5. Editorial highlights slideshow — immediately after introduction.
6. History and legacy preview.
7. Current team preview.
8. Activities and Challenges preview.
9. Events preview.
10. Awards and honours preview.
11. Community/women’s section.
12. Code-of-conduct preview.
13. Join SEAFA call to action.
14. Contact and footer.

The authoritative ordered plan is src/content/homepage.ts. RootLayout owns Header/Footer; the future homepage composes domain sections and HighlightsSlideshow. Earlier named section shells remain available for compatibility but are not a competing homepage order. Do not insert statistics, a second introduction or photo carousel into this plan without approval.

## Recurring collections and shared albums

Activities & Challenges, Events, and Awards & Honours are the three principal recurring sections. Their index pages will list structured records and their detail pages resolve albumId through the shared Album registry. Gallery lists published albums once by ID, with filtered presentations for each section. Album.relatedContent supports activity, Challenge, event, award, milestone, general album and news references. No image arrays are copied into section records. /challenges stays as the existing best-of-three overview, linking to Challenge activities; it is not a competing archive.

Component hierarchy: section index → future collection cards; section detail → AlbumView → resolved MediaAsset/AlbumImage → existing photo Slideshow/lightbox. Homepage → HighlightsSlideshow → HomepageHighlight + referenced MediaAsset. Editorial highlights and documentary album photographs have different content contracts but share media storage and future accessible playback primitives.

## Navigation plan

Desktop: Accueil, À propos, Histoire, Équipe, Club (Activités et Challenges, Événements, Prix et distinctions, Code de conduite), Galerie, Rejoindre SEAFA, Contact. Proposer un match remains a separate visible header action. Actualités and Confidentialité are available as secondary/footer destinations. src/content/fr.ts is the single navigation configuration.

Mobile must expose the same destinations through a labelled toggle with aria-expanded/aria-controls, ordinary link lists and a Club disclosure. Support Escape, focus return, keyboard activation and logical tab order; if a modal drawer is chosen, trap focus only while open. Desktop Club uses a button/disclosure, not hover-only interaction or application menu roles. This phase prepares configuration and retains a minimal header; complete menus are deferred.

## Team detail contract

Player fields and filters are typed in src/types/content.ts: photograph, full name, shirt number, playing position, preferred foot, year joined, captaincy, biography and approved public statistics. Filters: goalkeepers, defenders, midfielders, forwards and captains. Leadership positions: president, vice-president, secretary, treasurer, disciplinary committee, match/statistics administrator, other executive members. Support roles: coach/coordinator, assistant coach, physiotherapy/medical representative, equipment manager and match support. Heritage: founders, previous presidents, former captains, long-serving members, honorary members, contributors and officially approved memorial recognition.

## Album-photo slideshow implementation contract (future)

The present Slideshow component is a non-interactive shell. SlideshowProps defines inputs, initial index, optional playback, interval, indicators, captions, fullscreen, keyboard/swipe options and an index-change callback. Defaults in the implementation phase: manual playback, keyboard/swipe enabled and reduced motion respected unconditionally.

Use next/image with intrinsic dimensions and responsive sizes; load the initial above-fold image with appropriate priority and lazy-load subsequent images. Use labelled previous/next buttons and slide indicators, current slide state, captions, optional precise dates and related links. Arrow keys work only within the slideshow; do not intercept page-wide keys. Swipe must preserve vertical scrolling. If playback is offered, include persistent pause/resume and pause on focus/hover; reduced motion disables automatic advancement. Announce user-initiated slide changes without repetitive autoplay announcements. Fullscreen/lightbox needs dialog semantics, focus trapping/restoration, Escape close and a visible close button. Zero-image state shows honest empty content; one-image state hides unnecessary navigation. Keyboard, touch, screen-reader and reduced-motion checks are acceptance criteria for that later phase.

## Public/private boundaries

Public: verified history, profiles approved for publication, activities, albums, distinctions, approved match/Challenge results, news and application entry points. A Challenge has two captains selecting teammates; first to two match wins wins the series. Ties/abandonments need official rules before result logic is implemented.

Future private portal: team selection, authentication, membership administration, review queues, private contact/birth data, detailed match statistics and private captain records. No database, authentication, portal or submission processing is included here. Public pages must never import private submission records.

## Editorial highlights contract (future)

Highlights communicate recruitment, recent activities, historical memories of any approved period, match invitations, upcoming events, awards and important announcements. The types and CTA are structured content, not component conditionals. Typical CTA destinations: /join, /activities/<slug>, /gallery/<slug>, /request-match, /events/<slug>, /awards/<slug>, /news/<slug>. These are editorial examples, not seeded claims.

HomepageHighlight stores title/message, desktop/mobile media IDs (alt/dimensions from MediaAsset), type, optional date or approved relative-time label, CTA label/URL, alignment, overlay strength, order, start/end publication instants, active flag and optional related content. Filter active items with start <= now < end (missing bound is open), sort displayOrder then ID. Validate time zones, end after start, overlay in [0,1], usable safe CTA URLs, required alt, approved media and published related records. Relative-time copy must be reviewed at each publication window; never automatically claim an anniversary from an uncertain date.

Default proposed rotation is 8 seconds, with manual previous/next, indicators and persistent pause/play. Pause on hover/focus; manual pause persists and focus leaving must not override it. Reduced-motion preference disables automatic rotation and animation; zero/one slide has no rotation. Keyboard controls are scoped to the focused component; swipe preserves vertical scrolling. Announce manual changes politely, avoid autoplay announcements, and keep links accessible. Reserve image aspect ratio to prevent layout shifts; use responsive art direction for optional mobile image and optimized loading. Verify overlay/text contrast for every image and breakpoint; a numeric overlay value alone does not guarantee readability. No actual rotation, dialog or controls are implemented in this phase.
