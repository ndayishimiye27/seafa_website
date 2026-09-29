import { AlbumGallery } from "@/components/albums/album-gallery";
import { AlbumHeader } from "@/components/albums/album-header";
import type { Album } from "@/types/content";

interface AlbumViewProps {
  album: Album;
  backHref?: string;
  backLabel?: string;
}

export function AlbumView({
  album,
  backHref = "/gallery",
  backLabel = "Retour à la galerie",
}: AlbumViewProps) {
  return (
    <main>
      <AlbumHeader album={album} backHref={backHref} backLabel={backLabel} />

      <section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="album-content-title"
      >
        {album.description ? (
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
              À propos de cette collection
            </p>

            <h2
              id="album-content-title"
              className="mt-3 text-3xl font-black tracking-tight text-[#071d3b]"
            >
              Revivez ce moment
            </h2>

            <div className="mt-5 whitespace-pre-line text-base leading-8 text-slate-600">
              {album.description}
            </div>
          </div>
        ) : (
          <h2 id="album-content-title" className="sr-only">
            Photographies de l’album
          </h2>
        )}

        <AlbumGallery album={album} />
      </section>
    </main>
  );
}
