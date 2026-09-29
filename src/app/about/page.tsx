import { PageIntro, Section } from "@/components/ui/editorial";
import { BrandLogo } from "@/components/ui/brand-logo";
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
        <p className="lead-copy">
          <BrandLogo
            variant="stacked"
            sizes="(max-width: 640px) 160px, 200px"
            className="mb-8 block h-auto w-40 sm:w-50"
          />
          Au SEAFA, nous ne jouons pas seulement au football : nous partageons
          des idées, des valeurs et une vision.
        </p>
        <p>
          Le football entretient les amitiés et ouvre un espace d’éducation
          entre pairs. L’entraide, l’orientation des plus jeunes, les échanges
          sur la santé et les actions sociales prolongent ce qui commence sur le
          terrain.
        </p>
        <p>
          Issue des anciens du Lycée du Saint Esprit, notre communauté accueille
          aussi celles et ceux qui partagent ses engagements sans avoir
          fréquenté le Lycée.
        </p>
      </Section>
      <ClubStatistics />
      <MissionVision />
      <IdentityValues />
    </main>
  );
}
