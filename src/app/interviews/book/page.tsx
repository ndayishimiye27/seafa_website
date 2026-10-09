import { BookReader } from "@/components/interviews/book-reader";
import { PageIntro, Section, TextLink } from "@/components/ui/editorial";
import { pageMetadata } from "@/lib/metadata";
import { Suspense } from "react";
export const metadata = pageMetadata(
  "Le livret SEAFA",
  "/interviews/book",
  "Lisez les entretiens et les archives du livret SEAFA.",
);
export default function BookPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Notre mémoire"
        title="Le livret SEAFA"
        description="Les entretiens et le récit des premières années, dans une édition publique du livret historique."
      />
      <Section id="livret" title="Lire le livret">
        <div className="mb-8 flex flex-wrap gap-4">
          <a className="button" href="/book/newsletter-seafa.pdf" download>
            Télécharger le livret (PDF · édition publique)
          </a>
          <TextLink href="/interviews">Tous les témoignages</TextLink>
        </div>
        <Suspense fallback={<p role="status">Ouverture du livret…</p>}>
          <BookReader />
        </Suspense>
      </Section>
    </main>
  );
}
