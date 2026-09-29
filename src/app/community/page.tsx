import { AlbumCollection } from "@/components/gallery/album-collection";
import {
  PageIntro,
  Section,
  MediaSlot,
  TextLink,
} from "@/components/ui/editorial";
import { sagesDescription } from "@/content/identity";
import { siteSettings } from "@/data/site-settings";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Communauté",
  "/community",
  "Femmes, sages, familles et amis : découvrez la communauté intergénérationnelle et solidaire de SEAFA.",
);
export default function CommunityPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Grandir ensemble"
        title="Une communauté, tant de façons de participer."
        description="Femmes, hommes, jeunes générations, sages, familles et amis : chacun peut apporter ses compétences, son expérience et son attention aux autres."
      />
      <Section
        id="femmes"
        eyebrow="Des contributions essentielles"
        title="Les femmes prennent toute leur place."
      >
        <div className="split">
          <div>
            <p className="lead-copy">
              Organisation sociale, formation, santé, échanges et activités
              sportives : leur participation enrichit le développement de SEAFA.
            </p>
            <p>
              Le livret documente l’arrivée des premières femmes en 2016, leur
              contribution aux activités médicales et leur rôle dans
              l’organisation de la sortie à Jenda en 2019.
            </p>
            <p>
              Dans son témoignage, Idan invite à élargir les possibilités de
              participation et les pratiques sportives. Cette ambition nourrit
              une communauté où les idées de chacun comptent.
            </p>
            <TextLink href="/interviews/idan">
              Lire le témoignage d’Idan
            </TextLink>
          </div>
          <MediaSlot
            mediaId={siteSettings.communityMediaId}
            label="La communauté en action"
          />
        </div>
      </Section>
      <Section
        id="sages"
        eyebrow="Le dialogue entre les générations"
        title="Les sages, des repères dans notre famille."
        tone="warm"
      >
        <p className="lead-copy">{sagesDescription}</p>
      </Section>
      <Section id="solidarite" title="Présents dans les moments qui comptent.">
        <div className="cards-three">
          {[
            [
              "S’entraider",
              "Accompagner les membres dans les joies comme dans les épreuves et faire vivre une solidarité concrète.",
            ],
            [
              "Partager les connaissances",
              "Apprendre les uns des autres et ouvrir des perspectives aux plus jeunes.",
            ],
            [
              "Servir la communauté",
              "Mettre les compétences et les énergies en commun pour contribuer au bien-être collectif.",
            ],
          ].map(([title, text]) => (
            <article className="inset-card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <TextLink href="/join">Prendre part à cette histoire</TextLink>
      </Section>
      <section className="wrap py-16" aria-labelledby="albums-communaute">
        <h2
          id="albums-communaute"
          className="mb-8 text-3xl font-bold text-[#071d3b]"
        >
          Voyages, rencontres et transmission
        </h2>
        <AlbumCollection
          types={["community"]}
          categories={["community", "trips", "education"]}
        />
      </section>
    </main>
  );
}
