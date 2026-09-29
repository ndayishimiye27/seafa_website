# SEAFA public website — final review, 29 September 2026

Prepared locally for content and technical review. Nothing deployed. This report supersedes older review reports for the changes described here.

## Anniversary and photograph curation

- Event: **13e anniversaire de SEAFA**, **26 September 2026**, `/events/anniversaire-2026`.
- Album: `/gallery/anniversaire-2026`, linked from the event, gallery and 2026 filter; the event appears among recent homepage events.
- Inspected all 182 JPEGs in `public/media/anniversaire 2026 au 26 octobre`. There are no videos and no identical SHA-256 hashes. The September date comes from SEAFA's explicit instruction, not the misleading folder name.
- Visual contact-sheet review, perceptual comparisons and enlarged candidate pairs identified seven repeated compositions. The public album contains **175 photos**; all 182 supplied originals remain unchanged. Distinct football action shots remain.
- Exact exclusion-to-retained-file mappings are recorded in `src/data/gallery-curation.ts`. These are near-duplicate editorial exclusions, not claims that the files are byte-identical.
- Captions describe visible football, group photographs and gathering scenes. No player names, opponents, results, speeches or venue identities were inferred.
- Real image dimensions, descriptive French alternatives, responsive sizing, image containment, lightbox navigation and stronger caption backgrounds preserve legibility.
- Completed events no longer also appear as upcoming events simply because of the date used to evaluate the list.

## Interviews and public reader

Darcy's interview record, reader shortcut, generated detail route and sitemap entry are removed. `/interviews/darcy-nibogora` returns 404. **Claver, Bados, Alain and Idan remain**, with their detail pages and verified reader links.

The interview passage also appeared across pages 26–27 of the public newsletter. It was removed from the public PDF, corresponding page images and extracted reader text. The 29-page numbering remains intact. Other pages were checked against the original and retained. An unrelated historical roster mention is not an interview and was preserved.

The original PDF, page images and extracted text are preserved under `sources/newsletter-original/`, outside the public directory. Its attempted public URL returns 404. The edited pages were rendered and visually checked.

The four remaining portrait files were missing from the source folder at inspection. Verified image-cache variants tied to their original URLs were recovered and restored. These are optimized recovered copies; SEAFA should supply the original portraits for best quality.

## Final navigation and TechVision Labs

The approved logo links to `/`. Desktop navigation uses two named disclosure menus, two direct destinations and member actions on the right. The same destinations remain accessible on mobile, without duplicated navigation links. Keyboard activation, Escape, outside touch, focus return and breakpoint changes are checked.

| Label                          | Destination                                                                    |
| ------------------------------ | ------------------------------------------------------------------------------ |
| Le club → À propos             | `/about`                                                                       |
| Le club → Notre histoire       | `/history`                                                                     |
| Le club → Équipe               | `/team`                                                                        |
| Le club → Activités            | `/activities`                                                                  |
| Le club → Défis sportifs       | `/challenges`                                                                  |
| Le club → Prix et distinctions | `/awards`                                                                      |
| Le club → Proposer un match    | `/request-match`                                                               |
| Vie associative → Événements   | `/events`                                                                      |
| Vie associative → Communauté   | `/community`                                                                   |
| Vie associative → Diaspora     | `/diaspora`                                                                    |
| Vie associative → Témoignages  | `/interviews`                                                                  |
| Vie associative → Actualités   | `/news`                                                                        |
| Galerie                        | `/gallery`                                                                     |
| Contact                        | `/contact`                                                                     |
| Se connecter                   | `/login`, or the explicitly configured verified HTTPS `SEAFA_SYSTEM_LOGIN_URL` |
| Devenir membre                 | `/join`                                                                        |

`/join` is a membership application, not automatic account registration or admission. `/login` is an honest entry page while the external member service is unconfigured. Authentication and account creation have not been verified end to end.

The footer credit remains **Conçu et développé par TechVision Labs**, with `https://www.techvlabs.org`. Source and metadata searches found no remaining `techvlabs.com` or `www.techvlabs.com` website link; the footer was the actual application occurrence corrected. No unrelated metadata credit was invented.

## The three public forms

| Form                   | Page             | Existing endpoint     |
| ---------------------- | ---------------- | --------------------- |
| Match request          | `/request-match` | `/api/match-requests` |
| Contact message        | `/contact`       | `/api/contact`        |
| Membership application | `/join`          | `/api/join`           |

All use the shared validated submission flow. The configured SEAFA system remains the primary receiver and must return a matching committed receipt. A system failure does not silently bypass that receiver. Development-only local storage remains available; it is not presented as automatic delivery to the team.

Added configurable full email delivery through Resend, optional minimal WhatsApp notifications through Meta, private durable delivery records, concurrency protection, idempotent email retries, an operator retry script and explicit failure handling. Email can be the primary method when no SEAFA system is configured. WhatsApp is an alert containing form type and reference after primary acceptance; it is not a replacement for storing or emailing the full application.

No recipient or real credential is hard-coded. Without a configured receiver, fields remain editable and submission is disabled with an explanation. Failed submissions retain entered values. A new submission clears any stale receipt. Positive responses require acceptance by the configured primary service; provider acceptance does not prove arrival or reading. Optional notification failures do not invalidate an already accepted system receipt.

See [FORM_DELIVERY.md](FORM_DELIVERY.md) for every environment variable, the current flow, retry behavior and activation requirements. The privacy page now describes these configured processing paths.

SEAFA must provide:

1. Official recipient email address, verified sending address/domain and Resend API key through protected environment configuration.
2. Recipient WhatsApp number in international format, plus Meta Business sender phone-number ID, access token, supported API version, approved two-parameter template name/language and recipient agreement.
3. Hosting with a private persistent writable directory, retry scheduling and an operator responsible for failures and retention.
4. If used, the real SEAFA system intake URL/shared secret and independently verified member-login URL.
5. Production domain, privacy contact and retention policy.

No real email or WhatsApp message was sent. Live acceptance, delivery, bounce handling and authentication still require service configuration and operational verification. The worker is prepared but not scheduled or deployed.

## Verification

| Check                                  | Result                                                                                                         |
| -------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Content validation                     | Passed; 0 warnings                                                                                             |
| Unit tests                             | 20 passed, 0 failed; delivery tests also rerun after the final configuration diagnostic change (2 passed)      |
| ESLint                                 | Passed; 0 warnings                                                                                             |
| TypeScript                             | Passed; route type generation and strict type check                                                            |
| Prettier                               | Passed                                                                                                         |
| Production build used by browser suite | Passed; 114 generated pages                                                                                    |
| Complete browser suite                 | 64 passed, 0 failed, 6.7 minutes                                                                               |
| Route smoke checks                     | 116 passed, including expected 404s                                                                            |
| Visual inspection                      | Desktop, tablet and mobile navbar/gallery; all photo contact sheets and candidate duplicates; edited PDF pages |

The final standalone production build, without synthetic test delivery configuration, also passed with exit 0 and 114 generated pages. Final browser smoke checks passed for all three unconfigured forms (editable fields, disabled submission), Darcy's 404, the private source URL's 404, and the anniversary date/175-photo count. The smoke script was adjusted to wait for the streaming loading view to finish before asserting the single main landmark. Logs: `tmp/final-review/final-production-build.log` and `final-unconfigured.log`. Temporary production servers were stopped.

The PowerShell wrapper around the redirected browser run reported exit 1 after treating the inherited `NO_COLOR`/`FORCE_COLOR` warning as a NativeCommandError. The actual Playwright summary is **64 passed**, with no failed tests. The warning is recorded rather than represented as a test failure or concealed. Logs: `tmp/final-review/final-browser.log`, `final-routes.log`, `final-delivery-tests.log`.

The browser suite covers navigation at 320, 375, 768, 1024, 1280 and 1440 pixels; public layouts, French metadata, internal links, image loading, form validation/receipts/failure states, gallery filters, reader behavior, reduced motion and automated WCAG checks. Anniversary-specific checks cover 375, 768 and 1440 pixels. Screenshots and logs are under `tmp/final-review/` and `tmp/navigation/`.

Earlier checks exposed stale gallery-count assertions, an aggregate accessibility-test timeout and one transient client-navigation timeout. Counts were corrected for the added album; accessibility assertions were split into individual route tests without weakening them. The final results above distinguish these earlier failures from the final run.

Known framework behavior: rejected unknown static slugs can log Next.js `Internal: NoFallbackError`; the responses are correct 404s. This behavior predates this change.

## Exact changed project files

Navigation/domain work retained from the preceding task:

- `src/components/layout/header.tsx`
- `src/components/layout/footer.tsx`
- `src/content/fr.ts`
- `src/styles/globals.css`
- `tests/browser/navigation.spec.ts`
- `tests/browser/journeys.spec.ts`

This review — application and content:

- `src/app/interviews/book/page.tsx`
- `src/app/privacy/page.tsx`
- `src/components/albums/album-gallery.tsx`
- `src/components/forms/public-form.tsx`
- `src/components/interviews/book-reader.tsx`
- `src/data/anniversary-2026.ts` (new)
- `src/data/albums/index.ts`
- `src/data/events/index.ts`
- `src/data/gallery-curation.ts`
- `src/data/interview-book.json`
- `src/data/interview-pages.ts`
- `src/data/interviews.ts`
- `src/data/media.ts`
- `src/lib/content.ts`
- `src/lib/delivery-config.ts` (new)
- `src/lib/submission-storage.ts` (new; extracted existing storage/rate-limit behavior)
- `src/lib/submissions.ts`
- `src/lib/team-delivery.ts` (new)

Configuration, checks and documentation:

- `.env.example`
- `package.json`
- `scripts/retry-deliveries.ts` (new)
- `tests/content.test.ts`
- `tests/final-review.test.ts` (new)
- `tests/finishing.test.ts`
- `tests/media.test.ts`
- `tests/team-delivery.test.ts` (new)
- `tests/browser/final-review.spec.ts` (new)
- `tests/browser/finishing.spec.ts`
- `tests/browser/media.spec.ts`
- `tests/browser/site.spec.ts`
- `docs/CONTENT_PENDING.md`
- `docs/FORM_DELIVERY.md` (new)
- `docs/SYSTEM_INTEGRATION.md`
- `docs/FINAL_REVIEW_2026-09-29.md` (new)

Public assets changed or restored:

- `public/book/newsletter-seafa.pdf`
- `public/book/page-26.jpg`
- `public/book/page-27.jpg`
- `public/media/interviews/alain-nduwimana.png`
- `public/media/interviews/arnaud-badogomba-first-president.png`
- `public/media/interviews/claver-kazobavamwo.png`
- `public/media/interviews/idane.png`

Private original copies added:

- `sources/newsletter-original/newsletter-seafa.pdf`
- `sources/newsletter-original/page-26.jpg`
- `sources/newsletter-original/page-27.jpg`
- `sources/newsletter-original/interview-book.json`

Temporary inspection scripts, rendered previews, test logs and local PDF tooling under `tmp/`, and generated build/test outputs, are review artifacts rather than website source. Supplied anniversary photos were not modified or deleted. No dependency was added to the application.

## Content still requiring SEAFA review

See [CONTENT_PENDING.md](CONTENT_PENDING.md): current leadership/roster/diaspora information, approved quotations and identities, historical award-year conflicts, missing historical updates, Idan's preferred public spelling and original portrait files. Unknown facts remain explicitly unconfirmed instead of being invented. Production indexing and delivery activation remain configuration tasks.
