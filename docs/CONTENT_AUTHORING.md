> Document historique de la phase initiale. Pour l’état actuel, consulter README.md, CONTENT_PENDING.md, EDITORIAL_SOURCES.md et IMPLEMENTATION_REPORT.md. Les mentions anciennes de dates, de fonctionnalités ou de blocages sont remplacées par ces documents.

# Adding recurring content without component edits

This is a future authoring workflow; the current pages remain shells and the repository is an interface. No example below is imported or published. Once the local repository and generic views are implemented, adding records requires data edits only; a later CMS adapter preserves the same shapes.

1. Register an approved photograph once in src/data/media.ts, with an opaque ID, real file path, factual alt text, intrinsic dimensions and optional credit. Do not add an asset until the file and permissions exist.
2. Add one Album in src/data/albums/index.ts. Set coverMediaId and images[].mediaId to registry IDs, adding factual usage captions. Unknown dates/locations remain omitted.
3. Add an Activity, Event or Award in its matching data folder referencing albumId. Set appropriate category, status, description, featured choice and related IDs. Maintain matching Album.relatedContent references.
4. For an internal Challenge, add the public Challenge record in data/activities/challenges.ts and reference it from its Activity. Team selection and private records stay outside these files.
5. Add a HomepageHighlight in data/highlights/index.ts only when approved copy/media/CTA and publication windows are supplied. It can reference existing media and content IDs.
6. Validate references, unique IDs/slugs, consent and publication requirements. Publish both owner and album deliberately. Gallery deduplicates by album ID. Do not expose a draft by linking it from a published owner or highlight.

## Neutral draft example (documentation only)

```ts
import type { Album, Activity } from "@/types/content";

const exampleAlbum: Album = {
  id: "placeholder-album",
  slug: "collection-a-confirmer",
  title: "Collection à confirmer — exemple non publié",
  images: [], // Add approved media IDs once files exist; no fictitious image path.
  relatedContent: [{ type: "activity", id: "placeholder-activity" }],
  featured: false,
  publicationStatus: "draft",
};
const exampleActivity: Activity = {
  id: "placeholder-activity",
  slug: "activite-a-confirmer",
  title: "Activité à confirmer — exemple non publié",
  category: "other",
  albumId: exampleAlbum.id,
  participants: [],
  featured: false,
  publicationStatus: "draft",
};
```

Use the same album ID for a related event or award when it is genuinely the same collection. Add its typed reverse relationship to the album. Event adds an approved schedule and lifecycle status; Award adds approved recipients and year/season (ceremony/season containers may have no direct recipients and reference awardIds). Never copy the album’s photograph list into these records.

Highlights require real desktopMediaId before authoring a valid record; optional mobileMediaId enables art direction. A draft planning note belongs in the content requirements until those inputs exist. The highlights array is intentionally empty. Setting active=true later is not enough: publication window, media approval and related-record publication must also pass. CTA destinations are content, so adding another announcement or memory does not require a new component branch.
