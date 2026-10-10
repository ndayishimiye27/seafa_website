import Image from "next/image";
import Link from "next/link";

import { BrandedMediaPlaceholder } from "@/components/albums/branded-media-placeholder";
import { formatEventDate } from "@/lib/content-utils";
import { resolveAlbumCover } from "@/lib/media";
import type { Album } from "@/types/content";

interface AlbumCardProps {
  album: Album;
  href?: string;
  priority?: boolean;
}

const albumTypeLabels: Record<Album["type"], string> = {
  activity: "Activité",
  challenge: "Challenge",
  event: "Événement",
  award: "Prix et distinction",
  history: "Histoire",
  community: "Communauté",
  general: "Galerie",
};

export function AlbumCard({
  album,
  href = `/gallery/${album.slug}`,
  priority = false,
}: AlbumCardProps) {
  const cover = resolveAlbumCover(album);
  const formattedDate = formatEventDate(album.eventDate);
  const category = album.categoryLabel ?? albumTypeLabels[album.type];

  return (
    <article className="group overflow-hidden rounded-md border border-slate-200 bg-white transition duration-300 hover:border-[#b7923d] focus-within:ring-2 focus-within:ring-[#b7923d] focus-within:ring-offset-4">
      <Link
        href={href}
        className="block focus:outline-none"
        aria-label={`Découvrir l’album ${album.title}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          {cover ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              preload={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition duration-500 group-hover:scale-[1.04]"
              style={{ objectPosition: "center 40%" }}
            />
          ) : (
            <BrandedMediaPlaceholder
              label={`Photographies à venir pour ${album.title}`}
              className="h-full min-h-0"
            />
          )}

          <div
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#071d3b]/70 to-transparent"
            aria-hidden="true"
          />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#071d3b]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {category}
            </span>

            {album.featured ? (
              <span className="rounded-full bg-[#806026] px-3 py-1 text-xs font-semibold text-white">
                À la une
              </span>
            ) : null}
          </div>

          <span className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {album.images.length}{" "}
            {album.images.length === 1 ? "photo" : "photos"}
            {album.videos?.length ? ` / ${album.videos.length} vidéos` : ""}
          </span>
        </div>

        <div className="p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
            {formattedDate ? <span>{formattedDate}</span> : null}

            {album.location ? (
              <span className="inline-flex items-center gap-1.5">
                <svg
                  viewBox="0 0 24 24"
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>

                {album.location}
              </span>
            ) : null}
          </div>

          <h2 className="text-xl font-bold leading-tight text-[#071d3b] transition group-hover:text-[#173f73]">
            {album.title}
          </h2>

          {album.summary ? (
            <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
              {album.summary}
            </p>
          ) : null}

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#173f73]">
            Voir l’album
            <svg
              viewBox="0 0 24 24"
              className="size-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}
