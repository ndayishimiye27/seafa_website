import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AlbumGallery } from "@/components/albums/album-gallery";
import { EmptyAlbumState } from "@/components/albums/empty-album-state";
import {
  getAlbumForEvent,
  getEventBySlug,
  getPublishedEvents,
} from "@/lib/content";
import { formatEventDate } from "@/lib/content-utils";
import { resolveAlbumCover } from "@/lib/media";
import type { Event } from "@/types/content";

interface EventPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const categoryLabels: Record<Event["category"], string> = {
  anniversary: "Anniversaire",
  meeting: "Réunion",
  celebration: "Célébration",
  "community-gathering": "Rassemblement communautaire",
  "special-visit": "Visite spéciale",
  trip: "Voyage et excursion",
  social: "Événement social",
  other: "Autre événement",
};

const statusLabels: Record<Event["status"], string> = {
  upcoming: "À venir",
  ongoing: "En cours",
  completed: "Terminé",
};

const statusStyles: Record<Event["status"], string> = {
  upcoming: "bg-emerald-600 text-white",
  ongoing: "bg-[#806026] text-white",
  completed: "bg-white/15 text-white",
};

export function generateStaticParams() {
  return getPublishedEvents().map((event) => ({
    slug: event.slug,
  }));
}

export async function generateMetadata({
  params,
}: EventPageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: "Événement introuvable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const album = getAlbumForEvent(event);
  const cover = album ? resolveAlbumCover(album) : null;

  const description =
    event.seo?.description ??
    event.summary ??
    `Découvrez cet événement officiel de SEAFA : ${event.title}.`;

  return {
    title: event.seo?.title ?? `${event.title}`,
    description,
    alternates: {
      canonical: event.seo?.canonicalPath ?? `/events/${event.slug}`,
    },
    openGraph: {
      title: event.seo?.title ?? event.title,
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

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  const album = getAlbumForEvent(event);
  const startDate = formatEventDate(event.startDate ?? album?.eventDate);
  const endDate = formatEventDate(event.endDate ?? album?.endDate);

  const dateLabel =
    startDate && endDate && startDate !== endDate
      ? `${startDate} – ${endDate}`
      : startDate;

  const location = event.location ?? album?.location;

  return (
    <main>
      <header className="bg-[#071d3b] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <Link
            href="/events"
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
            Retour aux événements
          </Link>

          <div className="mt-8">
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/85">
                {categoryLabels[event.category]}
              </span>

              <span
                className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] ${statusStyles[event.status]}`}
              >
                {statusLabels[event.status]}
              </span>
            </div>

            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {event.title}
            </h1>

            {event.summary ? (
              <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">
                {event.summary}
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

            {event.cta ? (
              <Link
                href={event.cta.href}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#806026] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#806026] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-[#071d3b]"
              >
                {event.cta.label}
              </Link>
            ) : null}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {event.description ? (
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
              À propos de cet événement
            </p>

            <div className="mt-4 whitespace-pre-line text-lg leading-8 text-slate-600">
              {event.description}
            </div>
          </div>
        ) : null}

        <h2 className="mb-8 text-3xl font-black tracking-tight text-[#071d3b]">
          Galerie de l’événement
        </h2>

        {album ? (
          <AlbumGallery album={album} />
        ) : (
          <EmptyAlbumState
            title="Galerie en préparation"
            message="Les photographies officielles de cet événement n’ont pas encore été publiées."
            actionLabel="Voir tous les événements"
            actionHref="/events"
          />
        )}
      </section>
    </main>
  );
}

export const dynamicParams = false;
