import type { Album } from "@/types/content";
import { mediaAssets } from "@/data/media";

const collection = (
  id: string,
  title: string,
  prefix: string,
  year: string,
  type: Album["type"],
  summary: string,
): Album => ({
  id,
  slug: id,
  title,
  type,
  categoryLabel: type === "award" ? "Distinctions" : "Match amical",
  eventDate: { value: year, precision: "year" },
  summary,
  description: summary,
  images: mediaAssets
    .filter((m) => m.src.startsWith(prefix))
    .map((m, index) => ({ mediaId: m.id, order: index + 1 })),
  relatedContent: [],
  featured: false,
  publicationStatus: "published",
});
export const reorganizedAlbums: Album[] = [
  collection(
    "match-songa-2018",
    "Match contre Songa — 2018",
    "/media/activities/2018/match contre songa/",
    "2018",
    "activity",
    "Les archives du match contre Songa, conservées dans le dossier de 2018. Elles témoignent des rencontres sportives de SEAFA ; le jour, le lieu et le score ne sont pas confirmés.",
  ),
  collection(
    "distinctions-anniversaire-2026",
    "Distinctions du 13e anniversaire",
    "/media/awards/awards anniversaire de 2026/",
    "2026",
    "award",
    "Deux photographies de distinctions, réunies avec les archives de l’anniversaire 2026. Les noms des lauréats et les catégories ne sont pas confirmés.",
  ),
];
