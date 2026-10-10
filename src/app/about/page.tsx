import { PageIntro, Section, MediaSlot } from "@/components/ui/editorial";
import {
  MissionVision,
  IdentityValues,
  ClubStatistics,
} from "@/components/home/sections";
import { introduction } from "@/content/identity";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "À propos de SEAFA",
  "/about",
  introduction,
);
export default function AboutPage() {
  return (
    <main>
      <PageIntro
        eyebrow="L’esprit SEAFA"
        title="Un lien qui grandit avec nous."
        description={introduction}
      />
      <Section
        id="raison-etre"
        eyebrow="Notre raison d’être"
        title="Le sport comme école de la vie."
      >
        <div className="split purpose-composition">
          <div>
            <p className="lead-copy">
              À la SEAFA, nous ne jouons pas seulement au football : nous
              partageons des idées, des valeurs et une vision.
            </p>
            <p>
              Le football entretient les amitiés et ouvre un espace d’éducation
              entre pairs. L’entraide, l’orientation des plus jeunes, les
              échanges sur la santé et les actions sociales prolongent ce qui
              commence sur le terrain.
            </p>
            <p>
              Issue des anciens du Lycée du Saint Esprit, notre communauté
              accueille aussi celles et ceux qui partagent ses engagements sans
              avoir fréquenté le Lycée.
            </p>
          </div>
          <MediaSlot
            mediaId="media-community-2019-gitega-trip-gitega-trip-01"
            label="La communauté SEAFA réunie"
          />
        </div>
      </Section>
      <ClubStatistics />
      <MissionVision />
      <IdentityValues />
    </main>
  );
}
