import { mediaAssets } from "@/data/media";
import type { MediaAsset } from "@/types/content";

/** Approved variants reuse the central catalogue's URLs and dimensions. */
function logo(role: string): MediaAsset {
  const asset = mediaAssets.find(
    (item) => item.id === `media-brand-logos-${role}`,
  );
  if (!asset) throw new Error(`Missing approved SEAFA logo: ${role}`);
  return asset;
}
export const brandLogos = {
  main: logo("main"),
  white: logo("white"),
  black: logo("black"),
  stacked: logo("stacked"),
  icon: logo("icon"),
  favicon: logo("favicon"),
  apple: logo("apple"),
};
export const brandAssetStatus = "supplied";
