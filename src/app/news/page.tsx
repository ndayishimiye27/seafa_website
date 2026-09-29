import {
  PageIntro,
  Section,
  MediaSlot,
  TextLink,
} from "@/components/ui/editorial";
import { getAllNewsArticles, formatNewsDate } from "@/data/news";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Actualités",
  "/news",
  "Les nouvelles et annonces vérifiées de la communauté SEAFA.",
);
export default function NewsPage() {
  const articles = getAllNewsArticles();
  return (
    <main>
      <PageIntro
        eyebrow="La vie de SEAFA"
        title="Nouvelles de notre famille."
        description="Retrouvez nos annonces, les récits de nos activités et les initiatives de notre communauté."
      />
      <Section id="articles" title="Les dernières actualités.">
        {articles.length ? (
          <div className="cards-three">
            {articles.map((p) => (
              <article className="interview-card" key={p.id}>
                <MediaSlot mediaId={p.coverMediaId} label={p.title} />
                <div className="card-body">
                  <p className="eyebrow">{p.category ?? "Actualité"}</p>
                  <h3>{p.title}</h3>
                  {p.publishedAt && (
                    <time dateTime={p.publishedAt}>
                      {formatNewsDate(p.publishedAt)}
                    </time>
                  )}
                  <p>{p.summary}</p>
                  <TextLink href={`/news/${p.slug}`}>Lire l’article</TextLink>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-note">
            <h3>Les prochaines nouvelles se préparent</h3>
            <p>
              Aucune actualité n’est encore publiée. Découvrez en attendant
              notre histoire et les voix de celles et ceux qui l’ont construite.
            </p>
            <TextLink href="/history">Découvrir notre histoire</TextLink>
          </div>
        )}
      </Section>
    </main>
  );
}
