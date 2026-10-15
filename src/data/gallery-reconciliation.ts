import type { Album } from "@/types/content";
import { mediaAssets } from "@/data/media";
import { excludedPhotoSources } from "@/data/gallery-curation";
import {
  basketballDate,
  basketballTitle,
  basketballSummary,
} from "@/data/basketball";
import { getDateRangeEnd } from "@/lib/content-utils";

/** The owner's current folder organization is authoritative (15 October 2026). */
export const mergedAlbumIds: Record<string, string> = {
  "community-2019-teza-trip": "community-2019-jenda-excursion",
  "community-2019-walk": "marche-bujumbura-2020",
  "events-2018-karera-falls": "events-2021-anniversary",
  "community-jenda-group-photo": "community-2019-jenda-excursion",
  "community-kibimba-group-photo": "history-archives",
  "events-medical-session": "events-2018-medical-consultation",
};
const folderOwners: Record<string, string> = {
  "activities/2020/marche aller retour jusqu'a la lpage de bujumbura":
    "marche-bujumbura-2020",
  "activities/2020/SEAFA MEDICINE 2020": "medecine-2020",
  "activities/2021/jenda-excursion 2021": "community-2019-jenda-excursion",
  "activities/2022/conference": "conference-sante-2022",
  "events/2018/gala-match": "events-2018-gala-match",
  "events/2019/anniversary 2019": "events-2019-anniversary",
  "events/2021/karera-falls-anniversary 2021": "events-2021-anniversary",
  "community/2019/mabanda-trip": "community-2019-gitega-trip",
  archives: "archives-ajoutees",
};
const revisedAlbums: Record<string, Partial<Album>> = {
  "community-2019-gitega-trip": {
    title: "Voyage à Mabanda — 2019",
    summary:
      "Les souvenirs d’un voyage à Mabanda, entre rencontres et découverte.",
    eventDate: { value: "2019", precision: "year" },
    categoryLabel: "Voyages",
  },
  "community-2019-jenda-excursion": {
    title: "Excursion à Jenda — 2021",
    coverMediaId: "media-community-2019-teza-trip-teza-trip-08",
    summary:
      "Une excursion à Jenda et des moments de fraternité partagés par la communauté SEAFA.",
    eventDate: { value: "2021", precision: "year" },
    categoryLabel: "Voyages",
  },
  "events-2019-anniversary": {
    title: "Anniversaire SEAFA — 2019",
    summary:
      "Football, retrouvailles et célébration de l’anniversaire de SEAFA.",
    eventDate: { value: "2019", precision: "year" },
    categoryLabel: "Anniversaire",
  },
  "events-2021-anniversary": {
    title: "Anniversaire et chutes de Karera — 2021",
    summary:
      "Une célébration de l’anniversaire de SEAFA, des retrouvailles et une sortie aux chutes de Karera.",
    eventDate: { value: "2021", precision: "year" },
    categoryLabel: "Anniversaire & voyage",
  },
  "match-basketteurs-2026": {
    title: basketballTitle,
    summary: basketballSummary,
    eventDate: basketballDate,
    status:
      getDateRangeEnd(basketballDate) >= Date.now() ? "upcoming" : "completed",
    categoryLabel: "Rencontre sportive",
    relatedContent: [
      { type: "event", id: "event-basketteurs-2026" },
      { type: "activity", id: "activity-basketteurs-2026" },
    ],
  },
};

export function reconcileGallery(input: Album[]): Album[] {
  const owners = new Map<string, string>();
  const byId = new Map(mediaAssets.map((media) => [media.id, media]));
  for (const album of input)
    for (const image of album.images) {
      const src = byId.get(image.mediaId)?.src;
      if (!src) continue;
      const folder = decodeURIComponent(src).slice(
        7,
        decodeURIComponent(src).lastIndexOf("/"),
      );
      if (!owners.has(folder))
        owners.set(folder, mergedAlbumIds[album.id] ?? album.id);
    }
  const result = input
    .filter((album) => !mergedAlbumIds[album.id])
    .map((album) => ({
      ...album,
      ...revisedAlbums[album.id],
      images: [] as Album["images"],
    }));
  const albumsById = new Map(result.map((album) => [album.id, album]));
  const previousOrder = new Map(
    input.flatMap((album) =>
      album.images.map((image, index) => [image.mediaId, index] as const),
    ),
  );
  const previousImages = new Map(
    input.flatMap((album) =>
      album.images.map((image) => [image.mediaId, image] as const),
    ),
  );
  for (const media of mediaAssets) {
    const src = decodeURIComponent(media.src);
    if (
      excludedPhotoSources[media.src] ||
      src.startsWith("/media/brand/logos/") ||
      src.startsWith("/media/president hierachy/") ||
      src.startsWith("/media/history/2013/") ||
      src === "/media/history/founders.png" ||
      src.startsWith("/media/video-posters/")
    )
      continue;
    const folder = src.slice(7, src.lastIndexOf("/"));
    const owner =
      folderOwners[folder] ?? owners.get(folder) ?? "archives-ajoutees";
    const album = albumsById.get(owner);
    if (!album) throw new Error(`Missing album ${owner} for ${src}`);
    album.images.push({
      ...previousImages.get(media.id),
      mediaId: media.id,
      order: album.images.length + 1,
    });
  }
  for (const album of result) {
    album.images.sort((a, b) =>
      a.mediaId === album.coverMediaId
        ? -1
        : b.mediaId === album.coverMediaId
          ? 1
          : (previousOrder.get(a.mediaId) ?? Infinity) -
            (previousOrder.get(b.mediaId) ?? Infinity),
    );
    album.images = album.images.map((image, index) => ({
      ...image,
      order: index + 1,
    }));
    if (!album.images.some((image) => image.mediaId === album.coverMediaId))
      album.coverMediaId = album.images[0]?.mediaId;
  }
  return result.filter(
    (album) =>
      album.publicationStatus !== "published" || album.images.length > 0,
  );
}
