# SEAFA media library

The canonical image catalogue is `src/data/media.ts`. Browser paths start with `/media/`; never add `/public`. Intrinsic dimensions were read from the original files. Video metadata is exported as `trainingVideo` from the same module.

| Supplied directory           | Integration                                                                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `/media/brand`               | Homepage hero, introduction, shared gallery album                                                                       |
| `/media/brand/logos`         | Approved main/white/black/stacked/icon variants, favicon and Apple icon; registered separately from photographic albums |
| `/media/history`             | History timeline, historical albums and full-frame archive lightbox                                                     |
| `/media/activities/{year}`   | Activities overview and detail routes, homepage, football links from Challenges                                         |
| `/media/events/{year}`       | Events overview and detail routes, homepage; excursions and visits also appear on Community                             |
| `/media/community`           | Community albums, Activities routes, homepage                                                                           |
| `/media/awards/{year}`       | Separate photographic collection records on Awards and their detail routes                                              |
| `/media/interviews`          | Restored PNG portraits for four interviews, including Claver's card and detail, complete portrait album                 |
| `/media/people`              | Named portrait archives on Team, complete portrait album                                                                |
| `/media/videos/training.mp4` | Accessible native video on Activities and homepage                                                                      |

Photographs are registered once. Albums reference media IDs, and activities, events and awards reference album IDs. Album image order follows exact filename order; reviewed cover choices can differ from the first photograph. Overview collections sort newest first and place undated archives last. Galleries and portrait slots preserve the full frame to protect faces, embedded borders and historical collages. Only the homepage hero is preloaded.

Do not modify, rename, move, delete, regenerate or overwrite the supplied assets. Approved logos are resolved from the central catalogue through `src/content/brand.ts`. Main is used in the header, white in the dark footer, stacked on About and History, icon in social previews and the app manifest. Black is available as the approved monochrome fallback through site settings and the reusable BrandLogo component. Metadata points directly to the supplied favicon and Apple icon. Do not substitute a portrait for another person or infer current leadership, playing positions, scores, or Challenge results from photographs. No supplied photograph establishes a diaspora identity.

Known uncertainties: undated `history/archive-photo-*`, undated `events/medical-session.png`, dates of the standalone Jenda and Kibimba photographs, and conflicts between award filenames and historical narratives. Some photographs filed under Teza visibly contain Jenda signage: the album retains the supplied classification, which needs confirmation. Claver's interview is paraphrased from Newsletter SEAFA p. 21, with historical context from p. 5 and 8. Tony's portrait is labelled 2024 and does not establish current office.

Run `npm run verify:content`, `npm test`, `npm run typecheck`, `npm run lint`, `npm run format:check`, `npm run build`, and browser tests against a running site. `tests/media.test.ts` verifies exact case-sensitive paths, intrinsic dimensions, complete folder coverage, chronological ordering, restored interview PNGs and unknown dates. Browser media tests exercise every supplied album and connected route, real-image lightboxes, filters and video playback at mobile and desktop sizes.
