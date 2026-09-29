> Document historique de la phase initiale. Pour l’état actuel, consulter README.md, CONTENT_PENDING.md, EDITORIAL_SOURCES.md et IMPLEMENTATION_REPORT.md. Les mentions anciennes de dates, de fonctionnalités ou de blocages sont remplacées par ces documents.

# Design-system foundation

Direction: navy and white, disciplined typography, generous spacing, restrained historical gold. This is a proposal derived from the supplied brand direction, not a copied club identity. Tokens live in src/styles/globals.css using Tailwind CSS theme variables.

| Token       | Value                        | Intended use                                        |
| ----------- | ---------------------------- | --------------------------------------------------- |
| navy        | #10243a                      | Primary text, future primary buttons, dark surfaces |
| white       | #ffffff                      | Main background, inverse text                       |
| slate       | #42566b                      | Supporting copy                                     |
| mist        | #edf2f7                      | Subtle surfaces and dividers                        |
| gold        | #806019                      | Restrained award/heritage emphasis on white         |
| font-sans   | Arial, Helvetica, sans-serif | Local system typography; no remote font fetch       |
| spacing     | 0.25rem                      | Four-pixel scale                                    |
| radius-card | 0.75rem                      | Future card corners                                 |

Use white/navy, slate/white and gold/white text pairs; verify WCAG AA contrast for every final use (4.5:1 body, 3:1 large text/UI boundaries). Do not use mist as a control boundary or text on white. Navy focus outlines require a white offset/outer ring on dark backgrounds in future inverse components.

Mobile first: base styles then Tailwind sm 40rem, md 48rem, lg 64rem, xl 80rem, 2xl 96rem. Container max width 72rem; horizontal padding 1rem, 1.5rem from sm, 2rem from lg. Typical section spacing 3–5rem, related content 1–1.5rem, control gaps 0.5–0.75rem. Typography proposal: body 1rem/1.6, supporting copy no smaller than 0.875rem, headings responsive with logical h1/h2 order.

Future buttons: semantic button for actions, Link for navigation, at least 44px target, navy/white primary, outlined secondary, visible disabled state and focus. Cards: semantic article when appropriate, consistent image ratio and spacing, one clear primary link. Forms: visible labels, required/optional markers, grouped related controls, error summaries linked to fields, aria-describedby for help/errors and clear submission status. Do not render functional-looking inactive fields in this phase.

Images: preserve intrinsic dimensions, choose crop intentionally (3:2 albums, portrait players, wide hero), avoid cropping faces/logos, supply factual alt text; decorative images use empty alt. No text embedded in images. Overlay copy requires a verified contrast layer.

The foundation includes skip navigation, landmarks, lang=fr, focus-visible treatment and reduced-motion CSS. Full keyboard, screen-reader, zoom/reflow, touch and contrast review belongs to each implemented component. It is not claimed complete merely because foundations exist. Slideshow motion/interaction contract is in SITE_STRUCTURE.md.

Measured token contrast against white (WCAG relative luminance): navy 15.72:1, slate 7.57:1, gold 5.83:1. All three pass 4.5:1 for normal text on white.

## Revised homepage and editorial media

Follow the 14-section order in SITE_STRUCTURE.md and src/content/homepage.ts: introduction precedes highlights. Editorial highlights use responsive desktop/mobile media, stable aspect-ratio containers, readable overlays, visible CTA/focus and a pause/play control. Eight-second proposed rotation must stop for reduced motion, focus, hover or explicit pause. Album slideshows remain documentary media viewers with captions and fullscreen controls. Both are structural shells pending implementation.

Use the supplied approved PNG main/white/black/stacked/icon variants under `/media/brand/logos`, with preserved aspect ratio and padding. Never use CSS filters to simulate a logo variant. The supplied stacked lockup is used on About and History. See ASSET_GUIDE.md for integration details.
