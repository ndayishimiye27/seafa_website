import { PageIntro, Section } from "@/components/ui/editorial";
import { InterviewGrid } from "@/components/interviews/interview-grid";
import { TextLink } from "@/components/ui/editorial";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata("Témoignages et souvenirs", "/interviews");
export default function InterviewsPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Paroles de SEAFA"
        title="Des voix, une mémoire commune."
        description="Une sélection de témoignages et de souvenirs du livret historique, pour comprendre ce que SEAFA représente dans la vie de ses membres."
      />
      <Section id="recits" title="Leurs regards sur notre famille.">
        <p>
          Ces synthèses restituent les idées du livret sans les présenter comme
          des citations. Les situations personnelles et les fonctions évoquées
          appartiennent à l’époque des entretiens.
        </p>
        <InterviewGrid />
        <TextLink href="/gallery/interviews">
          Voir les portraits des témoins
        </TextLink>
      </Section>
    </main>
  );
}
