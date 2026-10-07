import { AlbumGallery } from "@/components/albums/album-gallery";
import { AlbumHeader } from "@/components/albums/album-header";
import type { Album } from "@/types/content";
import { resolveAlbumCover, resolveMedia } from "@/lib/media";

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
  const cover = resolveAlbumCover(album);
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
        {album.videos?.length ? (
          <section className="mt-12" aria-label="Vidéos de l’album">
            <h2 className="mb-6 text-2xl font-bold text-[#071d3b]">
              Le match en vidéo
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {album.videos.map((video) => (
                <figure key={video.src}>
                  <video
                    controls
                    playsInline
                    preload="none"
                    poster={
                      resolveMedia(video.posterMediaId)?.src ?? cover?.src
                    }
                    aria-label={video.title}
                    className="aspect-video w-full bg-[#071d3b]"
                  >
                    <source src={video.src} type="video/mp4" />
                    Votre navigateur ne prend pas en charge cette vidéo.
                  </video>
                  <figcaption className="mt-2 text-sm text-slate-600">
                    {video.title}
                    {video.originalSrc && (
                      <a
                        href={video.originalSrc}
                        download
                        className="mt-1 block underline underline-offset-4"
                      >
                        Télécharger la vidéo originale
                      </a>
                    )}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
