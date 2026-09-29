> Document historique de la phase initiale. Pour l’état actuel, consulter README.md, CONTENT_PENDING.md, EDITORIAL_SOURCES.md et IMPLEMENTATION_REPORT.md. Les mentions anciennes de dates, de fonctionnalités ou de blocages sont remplacées par ces documents.

# Data models and storage boundary

src/types/content.ts defines public models; src/types/submissions.ts defines private submission shapes only. src/data holds empty collections and explicitly draft planning albums separately from UI. src/lib/content-repository.ts is a future async adapter contract for published albums, activities, events, awards, news, Challenges, media and scheduled highlights; it has no database implementation. Extend it per content domain when actual requirements are approved.

| Model                   | Core fields and purpose                                                                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Player                  | ID/name, optional photograph, shirt number, position, foot, joined year, captaincy, biography, approved public statistics                                           |
| LeadershipMember        | Name, constrained role, optional role label, photograph, biography, term dates                                                                                      |
| SupportMember           | Name, constrained technical/support role, photograph, biography                                                                                                     |
| HonoraryMember          | Name, heritage category, description/photo, mandatory publication approval timestamp                                                                                |
| FormerPresident         | Name, optional term dates/photo/biography                                                                                                                           |
| HistoricalMilestone     | Title, optional precision-aware date, description, source, verification flag                                                                                        |
| Activity                | Slug/title/category, required albumId, summary/description, related match/Challenge/news/event, approved participants, featured/publication/SEO                     |
| Album                   | Canonical album: slug/title, coverMediaId, AlbumImage entries, date/period/location, summary/description, typed relatedContent, featured/publication/SEO            |
| MediaAsset / AlbumImage | Asset stores ID/source/alt/dimensions/credit once; album usage stores mediaId/caption/date/order                                                                    |
| Award                   | Slug/title/category, albumId, recipient array, year/season, official description, related event/Challenge/members/awards, featured/publication                      |
| Match                   | Title, two teams, optional date/location/score, lifecycle status, activity reference                                                                                |
| Challenge               | Internal best-of-three record linked to activityId; two captains/teams, matches, winner, lifecycle and publication statuses                                         |
| NewsArticle             | Locale/slug/title, summary/body/cover/date, publication status, related activity/album                                                                              |
| MembershipApplication   | Personal/contact fields, football experience, motivation/referral, optional private upload ID, conduct acceptance/version, privacy consent, review status/timestamp |
| MatchRequest            | Organization/contact, date-time/time zone/location/format, optional message, privacy consent, status/timestamp                                                      |
| ContactEnquiry          | Name/email/subject/message, privacy consent, status/timestamp                                                                                                       |
| SiteSettings            | Name, locale settings, nullable founding year and verification state, optional slogan/logo/contact/domain, social links                                             |

IDs are opaque strings; references are IDs, not nested private records. EventDate preserves year/month/day/datetime precision; datetime requires a confirmed time zone at the validation layer. Optional means unknown/not supplied; do not replace unknown with fictional defaults. Date formats, uniqueness, cross-reference validity and permissions must be validated at future ingestion/server boundaries; TypeScript alone is not runtime validation.

Enum categories cover every requested playing position, leadership/support/heritage role, activity and award category. Award other requires an official descriptive title. Challenge matchIds should reference at most three official matches; validate distinct captains, score consistency, first-to-two completion and tie rules when result logic is authorized. Do not calculate private records in public components.

Site foundingYear remains null because 2012/2013 is unresolved. The August 2018 anniversary is a draft album with month precision supplied in the brief; the remaining draft albums have no event dates. No members, leaders, awards, results or statistics are seeded.

Form planning fields are in src/content/form-fields.ts. They define labels/types and provisional requiredness, not live inputs or validation. Consent fields represent accepted submissions; unchecked draft form state must be handled separately. Future server code generates IDs/timestamps and always assigns pending-review; never trust a client-supplied status. Review acceptance is not automatic membership provisioning. Store uploads privately and never serialize submission records into public pages.

Future translations: Locale includes fr/en while settings enable only fr. Add localized content and a chosen URL strategy before enabling English; do not claim untranslated pages are bilingual.

## Canonical recurring-content relationships

Event stores slug/title/category, albumId, start/end schedule, location through Album, upcoming/ongoing/completed status, summary/full description, activityId, featured/publication/SEO and optional CTA. HomepageHighlight is the independent editorial model described in SITE_STRUCTURE.md. Both Event status and publication status are required: a completed event may still be an unpublished draft.

MediaAsset is the canonical stored media record. ImageAsset remains a reusable value shape for existing brand/profile interfaces, not a second media registry. GalleryAlbum and SEAFAChallenge are compatibility type aliases to Album and Challenge; GalleryImage is a resolved slideshow view. src/data/gallery-albums.ts and the relevant exports in placeholders.ts only re-export canonical arrays. There are no duplicate record stores.

Album owns photographs, cover, captions, captured event date/period and location. Activity/Award/Event reference albumId; activity date/period and location are resolved from its album. Event start/end fields are scheduling data; album dates describe captured media and may differ. An award ceremony or season record uses awardIds to reference individual award entries, without copying them. Challenge references its Activity, which resolves the album. HistoricalMilestone links are supported by Album.relatedContent. General gallery albums need no section owner.

ContentRepository is an interface only; a future local-data adapter and CMS adapter must return the same public shapes. Filter both section publicationStatus and associated album publicationStatus. References are not authorization: never expose draft owners, unapproved participants or private statistics through gallery related links. Album.relatedContent is the reverse discovery index; ingestion must validate that owner albumId and reverse association agree. Enforce unique IDs and per-section slugs, valid media/cover IDs and ordered images. Compatibility exports are not additional sources to edit.

Canonical arrays: data/media.ts, data/albums/index.ts, data/activities/index.ts, data/activities/challenges.ts, data/events/index.ts, data/awards/index.ts and data/highlights/index.ts. The anniversary remains its existing draft album, month 2018-08 only; create its historical Event later when official details are supplied. See CONTENT_AUTHORING.md for a neutral structured-content example.
