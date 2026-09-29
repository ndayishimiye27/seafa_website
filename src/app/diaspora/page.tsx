import {
  PageIntro,
  Section,
  MediaSlot,
  TextLink,
} from "@/components/ui/editorial";
import { diasporaProfiles, diasporaInitiatives } from "@/data/diaspora";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Diaspora",
  "/diaspora",
  "Une famille au-delà des frontières : les membres de la diaspora partagent leur expérience et font vivre SEAFA au-delà du Burundi.",
);
export default function DiasporaPage() {
  const profiles = diasporaProfiles.filter(
    (p) => p.publicationStatus === "published",
  );
  const initiatives = diasporaInitiatives.filter(
    (p) => p.publicationStatus === "published",
  );
  const countries = [...new Set(profiles.map((p) => p.country))];
  return (
    <main>
      <PageIntro
        eyebrow="SEAFA, ici et ailleurs"
        title="Une famille au-delà des frontières."
        description="Nos 50 membres de la diaspora font partie des plus de 200 membres de SEAFA. La distance n’efface ni les amitiés, ni l’envie de contribuer."
      />
      <Section id="liens" title="Rester proches, continuer à donner.">
        <div className="reading-copy">
          <div>
            <p className="lead-copy">
              Partager une expérience, soutenir une initiative, retrouver les
              siens : l’appartenance se vit de plusieurs façons.
            </p>
            <p>
              Le livret historique raconte déjà ce lien : Arcus Makaza évoque le
              plaisir de retrouver sa famille SEAFA lors de ses retours au
              Burundi et de suivre la vie du groupe à distance.
            </p>
            <p className="source">
              Souvenir historique, Newsletter SEAFA, p. 22–23. Ce récit ne
              décrit pas sa résidence actuelle.
            </p>
            <TextLink href="/contact">Partager une initiative</TextLink>
          </div>
        </div>
      </Section>
      <Section id="portraits" title="Nos liens à travers le monde." tone="warm">
        {countries.length > 0 && (
          <p>
            Pays représentés dans les profils publiés : {countries.join(", ")}.
          </p>
        )}
        {profiles.length ? (
          <div className="cards-three">
            {profiles.map((p) => (
              <article key={p.id}>
                <MediaSlot
                  mediaId={p.portraitMediaId}
                  label={p.fullName}
                  portrait
                />
                <h3>{p.fullName}</h3>
                <p>{p.country}</p>
                {p.testimonial && <blockquote>{p.testimonial}</blockquote>}
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-note">
            Les portraits, les pays représentés et les témoignages seront
            présentés avec l’accord des membres concernés.
          </p>
        )}
      </Section>
      <Section id="initiatives" title="Contribuer à la vie de SEAFA.">
        {initiatives.length ? (
          initiatives.map((p) => (
            <article className="inset-card" key={p.id}>
              <h3>{p.title}</h3>
              <p>{p.description}</p>
            </article>
          ))
        ) : (
          <p>
            Les initiatives de la diaspora seront partagées ici après
            confirmation.
          </p>
        )}
      </Section>
    </main>
  );
}
