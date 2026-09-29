import { notFound } from "next/navigation";
import {
  getAllNewsArticles,
  getNewsArticleBySlug,
  getRelatedNewsArticles,
  formatNewsDate,
} from "@/data/news";
import {
  PageIntro,
  Section,
  MediaSlot,
  TextLink,
} from "@/components/ui/editorial";
import { pageMetadata, siteUrl } from "@/lib/metadata";
import { getAlbumById } from "@/lib/content";
import { AlbumGallery } from "@/components/albums/album-gallery";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return getAllNewsArticles().map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: Props) {
  const p = getNewsArticleBySlug((await params).slug);
  if (!p) return { title: "Article introuvable", robots: { index: false } };
  const meta = pageMetadata(
    p.seo?.title ?? p.title,
    `/news/${p.slug}`,
    p.seo?.description ?? p.summary,
  );
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      type: "article",
      publishedTime: p.publishedAt,
      authors: p.author ? [p.author] : undefined,
    },
  };
}
export default async function NewsDetail({ params }: Props) {
  const p = getNewsArticleBySlug((await params).slug);
  if (!p) notFound();
  const album = p.albumId ? getAlbumById(p.albumId) : null;
  const related = getRelatedNewsArticles(p.slug, p.category);
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: p.title,
    description: p.summary,
    datePublished: p.publishedAt,
    inLanguage: "fr-BI",
    mainEntityOfPage: `${siteUrl}/news/${p.slug}`,
    ...(p.author ? { author: { "@type": "Person", name: p.author } } : {}),
  };
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <PageIntro
        eyebrow={p.category ?? "Actualité"}
        title={p.title}
        description={p.summary ?? ""}
      />
      <Section id="article" title="Le récit">
        <div className="reading-copy">
          {p.publishedAt && (
            <p>
              <time dateTime={p.publishedAt}>
                {formatNewsDate(p.publishedAt)}
              </time>
              {p.author && ` · ${p.author}`}
            </p>
          )}
          {p.coverMediaId && (
            <MediaSlot mediaId={p.coverMediaId} label={p.title} />
          )}
          {p.sections?.length ? (
            p.sections.map((s, i) => (
              <section key={i}>
                {s.heading && <h3>{s.heading}</h3>}
                {s.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </section>
            ))
          ) : (
            <p className="whitespace-pre-line">{p.body}</p>
          )}
          {album && <AlbumGallery album={album} />}
          <TextLink href="/news">Toutes les actualités</TextLink>
        </div>
      </Section>
      {related.length > 0 && (
        <Section id="suite" title="À lire aussi.">
          {related.map((a) => (
            <TextLink key={a.id} href={`/news/${a.slug}`}>
              {a.title}
            </TextLink>
          ))}
        </Section>
      )}
    </main>
  );
}

export const dynamicParams = false;
