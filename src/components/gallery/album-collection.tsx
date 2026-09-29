import { AlbumGrid } from "@/components/albums/album-grid";
import { getPublishedAlbums } from "@/lib/content";
import type { Album, AlbumType } from "@/types/content";
export function AlbumCollection({
  types,
  categories = [],
}: {
  types: AlbumType[];
  categories?: NonNullable<Album["category"]>[];
}) {
  return (
    <AlbumGrid
      albums={getPublishedAlbums().filter(
        (album) =>
          types.includes(album.type) ||
          (album.category && categories.includes(album.category)),
      )}
    />
  );
}
