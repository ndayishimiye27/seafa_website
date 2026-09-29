import Image from "next/image";
import Link from "next/link";

import { BrandedMediaPlaceholder } from "@/components/albums/branded-media-placeholder";
import { formatEventDate } from "@/lib/content-utils";
import { getAlbumForActivity } from "@/lib/content";
import { resolveAlbumCover } from "@/lib/media";
import type { Activity } from "@/types/content";

interface ActivityCardProps {
  activity: Activity;
  priority?: boolean;
}

const categoryLabels: Record<Activity["category"], string> = {
  football: "Football",
  challenge: "SEAFA Challenge",
  training: "Entraînement",
  wellness: "Santé et bien-être",
  "community-project": "Projet communautaire",
  "women-community": "Communauté et femmes",
  excursion: "Visite et excursion",
  "friendly-match": "Match amical",
  other: "Autre activité",
};

export function ActivityCard({
  activity,
  priority = false,
}: ActivityCardProps) {
  const album = getAlbumForActivity(activity);
  const cover = album ? resolveAlbumCover(album) : null;
  const date = formatEventDate(activity.date ?? album?.eventDate);
  const location = activity.location ?? album?.location;
  const photoCount = album?.images.length ?? 0;

  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#b7923d]/50 hover:shadow-xl focus-within:ring-2 focus-within:ring-[#b7923d] focus-within:ring-offset-4">
      <Link
        href={`/activities/${activity.slug}`}
        className="block focus:outline-none"
        aria-label={`Découvrir l’activité ${activity.title}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
          {cover ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              preload={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-contain transition duration-500 group-hover:scale-[1.04]"
            />
          ) : (
            <BrandedMediaPlaceholder
              label={`Photographies à venir pour ${activity.title}`}
              className="h-full min-h-0"
            />
          )}

          <div
            className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#071d3b]/75 to-transparent"
            aria-hidden="true"
          />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#071d3b]/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
              {categoryLabels[activity.category]}
            </span>

            {activity.featured ? (
              <span className="rounded-full bg-[#806026] px-3 py-1 text-xs font-semibold text-white">
                À la une
              </span>
            ) : null}
          </div>

          <span className="absolute bottom-4 right-4 rounded-full bg-black/55 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {photoCount} {photoCount === 1 ? "photo" : "photos"}
          </span>
        </div>

        <div className="p-5 sm:p-6">
          {(date || location) && (
            <div className="mb-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
              {date ? <span>{date}</span> : null}
              {location ? <span>{location}</span> : null}
            </div>
          )}

          <h2 className="text-xl font-bold leading-tight text-[#071d3b] transition group-hover:text-[#173f73]">
            {activity.title}
          </h2>

          {activity.summary ? (
            <p className="mt-3 line-clamp-3 leading-7 text-slate-600">
              {activity.summary}
            </p>
          ) : null}

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#173f73]">
            Découvrir
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
