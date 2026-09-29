import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AlbumGallery } from "@/components/albums/album-gallery";
import { MediaSlot, TextLink } from "@/components/ui/editorial";
import { AwardCard } from "@/components/awards/award-card";
import { EmptyAlbumState } from "@/components/albums/empty-album-state";
import {
  getAlbumForAward,
  getAwardBySlug,
  getPublishedAwards,
} from "@/lib/content";
import { resolveAlbumCover } from "@/lib/media";
import type { Award } from "@/types/content";

interface AwardPageProps {
  params: Promise<{
    slug: string;
  }>;
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

export function generateStaticParams() {
  return getPublishedAwards().map((award) => ({
    slug: award.slug,
  }));
}

export async function generateMetadata({
  params,
}: AwardPageProps): Promise<Metadata> {
  const { slug } = await params;
  const award = getAwardBySlug(slug);

  if (!award) {
    return {
      title: "Distinction introuvable",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const album = getAlbumForAward(award);
  const cover = album ? resolveAlbumCover(album) : null;

  const description =
    award.seo?.description ??
    award.description ??
    `Découvrez cette distinction officielle de SEAFA : ${award.title}.`;

  return {
    title: award.seo?.title ?? `${award.title}`,
    description,
    alternates: {
      canonical: award.seo?.canonicalPath ?? `/awards/${award.slug}`,
    },
    openGraph: {
      title: award.seo?.title ?? award.title,
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

export default async function AwardPage({ params }: AwardPageProps) {
  const { slug } = await params;
  const award = getAwardBySlug(slug);

  if (!award) {
    notFound();
  }

  const album = getAlbumForAward(award);
  const period = award.season ?? (award.year ? String(award.year) : null);
  const related = getPublishedAwards()
    .filter(
      (item) =>
        item.id !== award.id &&
        (award.relatedAwardIds?.includes(item.id) ||
          item.category === award.category),
    )
    .slice(0, 3);

  return (
    <main>
      <header className="bg-[#071d3b] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <Link
            href="/awards"
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
            Retour aux distinctions
          </Link>

          <div className="mt-8">
            <span className="inline-flex rounded-full bg-[#806026] px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white">
              {categoryLabels[award.category]}
            </span>

            <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {award.title}
            </h1>

            {period ? (
              <p className="mt-4 text-lg font-semibold text-[#d0ad59]">
                {period}
              </p>
            ) : null}

            {award.recipients.length > 0 ? (
              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="text-sm font-semibold text-white/60">
                  {award.recipients.length === 1
                    ? "Bénéficiaire"
                    : "Bénéficiaires"}
                </p>

                <ul className="mt-3 flex flex-wrap gap-2">
                  {award.recipients.map((recipient, index) => (
                    <li
                      key={`${recipient.name}-${index}`}
                      className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white"
                    >
                      {recipient.name}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {award.presentationMediaId && (
          <MediaSlot
            mediaId={award.presentationMediaId}
            label="Remise de la récompense"
          />
        )}
        {award.recipientMediaId && (
          <div className="mt-8 max-w-sm">
            <MediaSlot
              mediaId={award.recipientMediaId}
              label="Portrait du lauréat"
              portrait
            />
          </div>
        )}
        {award.description ? (
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
              Description officielle
            </p>

            <div className="mt-4 whitespace-pre-line text-lg leading-8 text-slate-600">
              {award.description}
            </div>
          </div>
        ) : null}

        {award.source && <p className="source mb-8">{award.source}</p>}
        {album && (
          <TextLink href={`/gallery/${album.slug}`}>
            Consulter l’album de la cérémonie
          </TextLink>
        )}
        <h2 className="mb-8 text-3xl font-black tracking-tight text-[#071d3b]">
          Galerie de la distinction
        </h2>

        {album ? (
          <AlbumGallery album={album} />
        ) : (
          <EmptyAlbumState
            title="Galerie en préparation"
            message="Les photographies officielles de cette distinction n’ont pas encore été publiées."
            actionLabel="Voir toutes les distinctions"
            actionHref="/awards"
          />
        )}
      </section>
      {related.length > 0 && (
        <section className="editorial-section warm">
          <div className="wrap">
            <h2>À découvrir également</h2>
            <div className="cards-three">
              {related.map((item) => (
                <AwardCard key={item.id} award={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export const dynamicParams = false;
