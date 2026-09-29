import Link from "next/link";

import { AlbumMetadata } from "@/components/albums/album-metadata";
import type { Album } from "@/types/content";

interface AlbumHeaderProps {
  album: Album;
  backHref?: string;
  backLabel?: string;
}

const albumTypeLabels: Record<Album["type"], string> = {
  activity: "Activité",
  challenge: "SEAFA Challenge",
  event: "Événement",
  award: "Prix et distinction",
  history: "Histoire et héritage",
  community: "Communauté",
  general: "Galerie",
};

export function AlbumHeader({
  album,
  backHref = "/gallery",
  backLabel = "Retour à la galerie",
}: AlbumHeaderProps) {
  const category = album.categoryLabel ?? albumTypeLabels[album.type];

  return (
    <header className="bg-[#071d3b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white/70 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#d0ad59] focus:ring-offset-4 focus:ring-offset-[#071d3b]"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>

          {backLabel}
        </Link>

        <div className="mt-8">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/85">
            {category}
          </span>

          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            {album.title}
          </h1>

          {album.summary ? (
            <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
              {album.summary}
            </p>
          ) : null}

          <div className="mt-8 border-t border-white/15 pt-6 [&_dd]:text-white/65 [&_dt]:text-white">
            <AlbumMetadata album={album} />
          </div>
        </div>
      </div>
    </header>
  );
}
