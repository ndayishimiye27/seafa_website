import Image from "next/image";
import { Section, TextLink } from "@/components/ui/editorial";
import { currentPresident, presidentialSuccession } from "@/data/presidency";

export function Presidency({ history = false }: { history?: boolean }) {
  const members = [...presidentialSuccession, currentPresident];
  return (
    <Section
      id={history ? "presidents" : "presidence"}
      eyebrow="Responsabilité et transmission"
      title="Les présidents de SEAFA"
      tone="warm"
    >
      <ol
        className="presidency-timeline"
        aria-label="Succession présidentielle, dans l’ordre chronologique"
      >
        {members.map((member, index) => {
          const current = member.id === currentPresident.id;
          return (
            <li key={member.id} className={current ? "is-current" : undefined}>
              <span className="presidency-step" aria-hidden="true">
                0{index + 1}
              </span>
              {member.photograph && (
                <Image
                  {...member.photograph}
                  alt={member.photograph.alt}
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 280px"
                  className="president-photo"
                />
              )}
              <p className="eyebrow">
                {current ? "Président actuel" : "Ancien président"}
              </p>
              <h3>{member.fullName}</h3>
              <p className="presidency-term">
                {current
                  ? "Depuis 2024"
                  : member.termStart?.value +
                    "–" +
                    ("termEnd" in member ? member.termEnd?.value : "")}
              </p>
              <p>
                {current
                  ? "Tugire Iteka. Une communauté réunie autour du football, de la dignité et du partage entre générations."
                  : member.id === "president-arnaud"
                    ? "Premier président. Les dates de son mandat restent à réconcilier avec les archives fournies."
                    : member.id === "president-romeo"
                      ? "La transmission se poursuit. Son nom complet reste à confirmer."
                      : "Une présidence qui précède celle de Jimmy Jambo."}
              </p>
              {history && member.id === "president-arnaud" && (
                <TextLink href="/interviews/arnaud-bados-badogomba">
                  Lire son témoignage
                </TextLink>
              )}
            </li>
          );
        })}
      </ol>
      <p className="presidency-note">
        La succession présentée reprend les quatre présidents identifiés dans
        les archives disponibles. Le mandat d’Arnaud est documenté comme
        2013–2019 ; un ancien nom de fichier indique 2015–2022. La période entre
        2019 et 2020 reste à préciser.
      </p>
      {!history && (
        <TextLink href="/history#presidents">
          Découvrir notre histoire et ses sources
        </TextLink>
      )}
    </Section>
  );
}
