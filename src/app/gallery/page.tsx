import { pageMetadata } from "@/lib/metadata";

import { AlbumFilterGrid } from "@/components/albums/album-filter-grid";
import { getPublishedAlbums } from "@/lib/content";

export const metadata = pageMetadata(
  "Galerie",
  "/gallery",
  "Découvrez les albums officiels des activités, événements, Challenges, distinctions et moments historiques de SEAFA.",
);

export default function GalleryPage() {
  const albums = getPublishedAlbums();

  return (
    <main>
      <section className="bg-[#071d3b] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d0ad59]">
            Notre mémoire collective
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Galerie SEAFA
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
            Retrouvez les activités, les événements, les Challenges, les
            distinctions et les moments qui construisent l’histoire de SEAFA.
          </p>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="gallery-title"
      >
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
            Albums officiels
          </p>

          <h2
            id="gallery-title"
            className="mt-3 text-3xl font-black tracking-tight text-[#071d3b] sm:text-4xl"
          >
            Explorez nos collections
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Parcourez les années ou les événements d’une même collection. Les
            photographies sans date vérifiée sont réunies dans « Date à
            confirmer ».
          </p>
        </div>

        <AlbumFilterGrid albums={albums} />
      </section>
    </main>
  );
}
