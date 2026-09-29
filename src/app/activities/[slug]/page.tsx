import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AlbumGallery } from "@/components/albums/album-gallery";
import { EmptyAlbumState } from "@/components/albums/empty-album-state";
import {
  getActivityBySlug,
  getAlbumForActivity,
  getPublishedActivities,
} from "@/lib/content";
import { formatEventDate } from "@/lib/content-utils";
import { resolveAlbumCover } from "@/lib/media";
import type { Activity } from "@/types/content";

interface ActivityPageProps {
  params: Promise<{
    slug: string;
  }>;
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

export function generateStaticParams() {
  return getPublishedActivities().map((activity) => ({
    slug: activity.slug,
  }));
}

export async function generateMetadata({
  params,
}: ActivityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);

  if (!activity) {
    return {
      title: "Activité introuvable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const album = getAlbumForActivity(activity);
  const cover = album ? resolveAlbumCover(album) : null;

  const description =
    activity.seo?.description ??
    activity.summary ??
    `Découvrez cette activité officielle de SEAFA : ${activity.title}.`;

  return {
    title: activity.seo?.title ?? `${activity.title}`,
    description,
    alternates: {
      canonical: activity.seo?.canonicalPath ?? `/activities/${activity.slug}`,
    },
    openGraph: {
      title: activity.seo?.title ?? activity.title,
      description,
      type: "article",
      images: cover
        ? [
            {
              url: cover.src,
              width: cover.width,
              height: cover.height,
              alt: cover.alt,
            },
          ]
        : undefined,
    },
  };
}

export default async function ActivityPage({ params }: ActivityPageProps) {
  const { slug } = await params;
  const activity = getActivityBySlug(slug);

  if (!activity) {
    notFound();
  }

  const album = getAlbumForActivity(activity);
  const date = formatEventDate(activity.date ?? album?.eventDate);
  const endDate = formatEventDate(activity.endDate ?? album?.endDate);
  const location = activity.location ?? album?.location;

  const dateLabel =
    date && endDate && date !== endDate ? `${date} – ${endDate}` : date;

  return (
    <main>
      <header className="bg-[#071d3b] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <Link
            href="/activities"
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
            Retour aux activités
          </Link>

          <div className="mt-8">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/85">
              {categoryLabels[activity.category]}
            </span>

            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {activity.title}
            </h1>

            {activity.summary ? (
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
                {activity.summary}
              </p>
            ) : null}

            {(dateLabel || location) && (
              <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/15 pt-6 text-sm">
                {dateLabel ? (
                  <div>
                    <dt className="font-semibold text-white">Date</dt>
                    <dd className="mt-1 text-white/65">{dateLabel}</dd>
                  </div>
                ) : null}

                {location ? (
                  <div>
                    <dt className="font-semibold text-white">Lieu</dt>
                    <dd className="mt-1 text-white/65">{location}</dd>
                  </div>
                ) : null}
              </dl>
            )}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {activity.description ? (
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
              À propos de cette activité
            </p>

            <div className="mt-4 whitespace-pre-line text-lg leading-8 text-slate-600">
              {activity.description}
            </div>
          </div>
        ) : null}

        <div>
          <h2 className="mb-8 text-3xl font-black tracking-tight text-[#071d3b]">
            Galerie de l’activité
          </h2>

          {album ? (
            <AlbumGallery album={album} />
          ) : (
            <EmptyAlbumState
              title="Galerie en préparation"
              message="Les photographies officielles de cette activité n’ont pas encore été publiées."
              actionLabel="Voir toutes les activités"
              actionHref="/activities"
            />
          )}
        </div>
      </section>
    </main>
  );
}

export const dynamicParams = false;
