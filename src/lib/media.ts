import { getMediaAssetById } from "@/lib/content";
import type { Album, AlbumImage, MediaAsset } from "@/types/content";

export interface ResolvedAlbumImage {
  media: MediaAsset;
  caption?: string;
  order: number;
}

export function resolveMedia(mediaId: string | undefined): MediaAsset | null {
  if (!mediaId) {
    return null;
  }

  return getMediaAssetById(mediaId);
}

export function resolveAlbumImage(
  albumImage: AlbumImage,
): ResolvedAlbumImage | null {
  const media = resolveMedia(albumImage.mediaId);

  if (!media) {
    return null;
  }

  return {
    media,
    caption: albumImage.caption ?? media.caption,
    order: albumImage.order,
  };
}

export function resolveAlbumImages(album: Album): ResolvedAlbumImage[] {
  return album.images
    .map(resolveAlbumImage)
    .filter((image): image is ResolvedAlbumImage => image !== null)
    .sort((first, second) => first.order - second.order);
}

export function resolveAlbumCover(album: Album): MediaAsset | null {
  if (album.coverMediaId) {
    return resolveMedia(album.coverMediaId);
  }

  return resolveAlbumImages(album)[0]?.media ?? null;
}

export function getImageAspectRatio(
  media: Pick<MediaAsset, "width" | "height">,
): number {
  if (media.width <= 0 || media.height <= 0) {
    return 1;
  }

  return media.width / media.height;
}

export function getImageOrientation(
  media: Pick<MediaAsset, "width" | "height">,
): "landscape" | "portrait" | "square" {
  const ratio = getImageAspectRatio(media);

  if (ratio > 1.05) {
    return "landscape";
  }

  if (ratio < 0.95) {
    return "portrait";
  }

  return "square";
}
