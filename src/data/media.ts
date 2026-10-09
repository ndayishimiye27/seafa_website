import type { MediaAsset } from "@/types/content";
import catalogue from "@/data/media-library.json";

/** Current filesystem catalogue; publication is curated independently in albums. */
export const mediaAssets: MediaAsset[] = catalogue;

export const trainingVideo = {
  src: "/media/videos/training.mp4",
  title: "Entraînement SEAFA",
} as const;
