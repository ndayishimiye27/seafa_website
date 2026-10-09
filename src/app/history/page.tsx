import { Presidency } from "@/components/home/presidency";
import { AlbumCollection } from "@/components/gallery/album-collection";
import { BrandLogo } from "@/components/ui/brand-logo";
import { PageIntro, Section, TextLink } from "@/components/ui/editorial";
import { Timeline } from "@/components/history/timeline";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Notre histoire",
  "/history",
  "Des premiers rendez-vous en 2013 à une communauté de transmission : découvrez l’histoire documentée de SEAFA.",
);
export default function HistoryPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Depuis 2013"
        title="Les racines d’une famille."
        description="D’abord des retrouvailles autour du ballon. Puis une organisation, des valeurs partagées et une communauté qui se transmet de génération en génération."
      />
      <Section
        id="chronologie"
        eyebrow="Notre mémoire"
        title="Les étapes de notre parcours."
      >
        <p>Ouvrez chaque étape pour découvrir le récit et ses sources.</p>
        <BrandLogo
          variant="stacked"
          sizes="(max-width: 640px) 160px, 200px"
          className="my-8 h-auto w-40 sm:w-50"
        />
        <Timeline />
        <div className="empty-note">
          <h3>Une histoire toujours en mouvement</h3>
          <p>
            Ces étapes s’appuient sur le livret historique et les archives
            disponibles jusqu’en 2026. Vos photographies et vos souvenirs
            peuvent aider à préciser les dates et à enrichir ce récit collectif.
          </p>
          <TextLink href="/contact">Contribuer à notre mémoire</TextLink>
        </div>
      </Section>
      <Presidency history />
      <Section id="archives" title="Les souvenirs se partagent." tone="warm">
        <p>
          Retrouvez les photographies des premières années et les archives de
          SEAFA.
        </p>
        <AlbumCollection types={["history"]} />
        <TextLink href="/gallery">Explorer la galerie</TextLink>
      </Section>
    </main>
  );
}
