import { AlbumCard } from "@/components/albums/album-card";
import { EmptyAlbumState } from "@/components/albums/empty-album-state";
import type { Album } from "@/types/content";

interface AlbumGridProps {
  albums: readonly Album[];
  basePath?: string;
  emptyTitle?: string;
  emptyMessage?: string;
}

export function AlbumGrid({
  albums,
  basePath = "/gallery",
  emptyTitle = "Aucun album publié",
  emptyMessage = "Les photographies et les informations officielles seront ajoutées prochainement.",
}: AlbumGridProps) {
  if (albums.length === 0) {
    return <EmptyAlbumState title={emptyTitle} message={emptyMessage} />;
  }

  const normalizedBasePath = basePath.endsWith("/")
    ? basePath.slice(0, -1)
    : basePath;

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {albums.map((album) => (
        <AlbumCard
          key={album.id}
          album={album}
          href={`${normalizedBasePath}/${album.slug}`}
        />
      ))}
    </div>
  );
}
