import Image from "next/image";
import Link from "next/link";

import { getAlbumForAward } from "@/lib/content";
import { resolveAlbumCover, resolveMedia } from "@/lib/media";
import type { Award } from "@/types/content";

interface AwardCardProps {
  award: Award;
  priority?: boolean;
}

const categoryLabels: Record<Award["category"], string> = {
  "team-trophy": "Trophée collectif",
  "challenge-champion": "Champion de Challenge",
  "player-of-year": "Joueur de l’année",
  "top-scorer": "Meilleur buteur",
  "best-goalkeeper": "Meilleur gardien",
  "best-captain": "Meilleur capitaine",
  "fair-play": "Fair-play",
  leadership: "Direction",
  "long-service": "Engagement durable",
  "community-contribution": "Contribution communautaire",
  ceremony: "Cérémonie",
  "season-collection": "Distinctions de la saison",
  other: "Autre distinction",
};

export function AwardCard({ award, priority = false }: AwardCardProps) {
  const album = getAlbumForAward(award);
  const cover =
    resolveMedia(award.actionMediaId) ??
    resolveMedia(award.recipientMediaId) ??
    resolveMedia(award.presentationMediaId) ??
    (album ? resolveAlbumCover(album) : null);

  const period = award.season ?? (award.year ? String(award.year) : null);

  const recipientsLabel = award.recipients
    .map((recipient) => recipient.name)
    .join(", ");

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#b7923d]/60 hover:shadow-xl focus-within:ring-2 focus-within:ring-[#b7923d] focus-within:ring-offset-4">
      <Link
        href={`/awards/${award.slug}`}
        className="block focus:outline-none"
        aria-label={`Découvrir la distinction ${award.title}`}
      >
        {cover && (
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              preload={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain transition duration-500 group-hover:scale-[1.04]"
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-[#071d3b]/80 via-transparent to-transparent"
              aria-hidden="true"
            />

            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-[#806026] px-3 py-1 text-xs font-semibold text-white">
                {categoryLabels[award.category]}
              </span>

              {award.featured ? (
                <span className="rounded-full bg-[#071d3b]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                  À la une
                </span>
              ) : null}
            </div>

            {period ? (
              <span className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
                {period}
              </span>
            ) : null}
          </div>
        )}

        <div className="p-5 sm:p-6">
          <h2 className="text-xl font-bold leading-tight text-[#071d3b] transition group-hover:text-[#173f73]">
            {award.title}
          </h2>

          {recipientsLabel ? (
            <p className="mt-2 text-sm font-semibold text-[#806026]">
              {recipientsLabel}
            </p>
          ) : null}

          {award.description ? (
            <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
              {award.description}
            </p>
          ) : null}

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#173f73]">
            Découvrir cette distinction
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
