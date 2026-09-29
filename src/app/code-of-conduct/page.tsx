import { PageIntro, Section, TextLink } from "@/components/ui/editorial";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Code de conduite",
  "/code-of-conduct",
  "Les engagements de respect, discipline, solidarité et responsabilité qui guident la communauté SEAFA.",
);
const principles = [
  [
    "Respect et dignité",
    "Traiter chaque personne avec considération, quels que soient son origine, son genre, son âge, ses convictions, ses capacités ou son parcours. Refuser les insultes, le harcèlement, l’intimidation et toute discrimination.",
  ],
  [
    "Discipline et participation",
    "Respecter les horaires, prévenir en cas d’absence et tenir ses engagements. Prendre soin du matériel et des lieux mis à disposition. Participer selon ses possibilités avec constance et esprit collectif.",
  ],
  [
    "Esprit sportif",
    "Jouer loyalement, respecter les adversaires et les décisions arbitrales. Éviter les gestes dangereux, les provocations et la violence. Chercher à progresser sans sacrifier la dignité d’autrui.",
  ],
  [
    "Sécurité et attention aux autres",
    "Signaler une blessure ou une situation dangereuse. Adapter sa participation à ses capacités et ne pas participer sous l’effet de substances qui compromettent la sécurité. Veiller particulièrement à un encadrement approprié des plus jeunes.",
  ],
  [
    "Communication responsable",
    "Échanger avec calme, même en cas de désaccord. Respecter la vie privée, demander l’autorisation avant de partager des images et ne pas diffuser d’informations confidentielles. Réserver les annonces officielles aux personnes autorisées.",
  ],
  [
    "Intégrité financière",
    "Utiliser les contributions et les biens communs uniquement pour leur destination convenue. Conserver des justificatifs, rendre compte des sommes confiées et déclarer les conflits d’intérêts.",
  ],
  [
    "Signaler une difficulté",
    "Présenter les faits à une personne responsable de SEAFA, avec les éléments utiles, sans exposer publiquement les personnes concernées. Un signalement de bonne foi doit être accueilli sans représailles. En cas de danger immédiat, solliciter les services locaux compétents.",
  ],
  [
    "Un examen équitable",
    "Écouter les personnes concernées, informer la personne mise en cause et lui permettre de répondre. Examiner les faits avec impartialité, protéger la confidentialité et rechercher une réponse proportionnée. Toute mesure doit être expliquée et permettre une demande de réexamen auprès d’un responsable non impliqué.",
  ],
  [
    "La responsabilité des dirigeants",
    "Montrer l’exemple, rendre compte des décisions et appliquer les règles sans favoritisme ni abus d’autorité. Prévenir les conflits d’intérêts et préparer la transmission des responsabilités.",
  ],
];
export default function ConductPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Tugire Iteka"
        title="Notre engagement les uns envers les autres."
        description="Ce code exprime les repères communs des membres, joueurs, responsables, bénévoles et participants aux activités de SEAFA."
      />
      <Section id="engagements" title="Faire vivre nos valeurs.">
        <div className="reading-copy">
          {principles.map(([title, text], i) => (
            <section key={title} className="border-b border-slate-200 py-6">
              <h3>
                {String(i + 1).padStart(2, "0")} · {title}
              </h3>
              <p>{text}</p>
            </section>
          ))}
          <p>
            Les modalités internes de signalement et de discipline seront
            précisées par SEAFA. Ce texte présente les engagements de la
            communauté sans attribuer de mandat actuel à une personne.
          </p>
          <TextLink href="/contact">Contacter SEAFA</TextLink>
        </div>
      </Section>
    </main>
  );
}
