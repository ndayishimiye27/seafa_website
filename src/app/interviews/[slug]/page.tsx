import { notFound } from "next/navigation";
import { getPublishedInterviews } from "@/data/interviews";
import {
  PageIntro,
  Section,
  MediaSlot,
  TextLink,
} from "@/components/ui/editorial";
import { AlbumGallery } from "@/components/albums/album-gallery";
import { getAlbumById } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import { interviewPages } from "@/data/interview-pages";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return getPublishedInterviews().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getPublishedInterviews().find((p) => p.slug === slug);
  return p
    ? pageMetadata(p.fullName, `/interviews/${p.slug}`, p.summary)
    : { title: "Témoignage introuvable", robots: { index: false } };
}
export default async function InterviewPage({ params }: Props) {
  const { slug } = await params;
  const p = getPublishedInterviews().find((p) => p.slug === slug);
  if (!p) notFound();
  const album = p.albumId ? getAlbumById(p.albumId) : null;
  return (
    <main>
      <PageIntro
        eyebrow={
          p.kind === "memory" ? "Mémoire collective" : "Témoignage historique"
        }
        title={p.nickname ? `${p.fullName} · ${p.nickname}` : p.fullName}
        description={p.summary}
      />
      <Section id="temoignage" title={p.highlight}>
        <div className={p.portraitMediaId ? "split" : "reading-copy"}>
          {p.portraitMediaId && (
            <MediaSlot
              mediaId={p.portraitMediaId}
              label={p.fullName}
              portrait
            />
          )}
          <div className="reading-copy">
            <p className="eyebrow">{p.relationship}</p>
            {p.paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
            <p className="source">
              Synthèse éditoriale — {p.source}. Les formulations sont
              paraphrasées.
            </p>
            <TextLink href="/interviews">Tous les témoignages</TextLink>
            {interviewPages[p.id] && (
              <TextLink href={`/interviews/book?page=${interviewPages[p.id]}`}>
                {p.kind === "memory"
                  ? "Consulter la source dans le livret"
                  : "Lire l’entretien dans le livret"}
              </TextLink>
            )}
          </div>
        </div>
        {p.activityMediaId && (
          <MediaSlot
            mediaId={p.activityMediaId}
            label="Un moment de vie au SEAFA"
          />
        )}
        {p.historicalMediaId && (
          <MediaSlot
            mediaId={p.historicalMediaId}
            label="Souvenir historique"
          />
        )}
        {album && <AlbumGallery album={album} />}
      </Section>
    </main>
  );
}

export const dynamicParams = false;
