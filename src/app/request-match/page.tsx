import { PageIntro, Section } from "@/components/ui/editorial";
import { MatchRequestForm } from "@/components/forms/match-request-form";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Proposer un match",
  "/request-match",
  "Proposez une rencontre amicale à SEAFA. Chaque proposition reste soumise à confirmation.",
);
export default function MatchPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Rencontrons-nous sur le terrain"
        title="Proposer un match amical."
        description="Présentez votre équipe et vos disponibilités. SEAFA examinera votre proposition avant toute confirmation."
      />
      <Section id="proposition" title="Votre proposition de rencontre.">
        <div className="reading-copy">
          <MatchRequestForm />
        </div>
      </Section>
    </main>
  );
}
