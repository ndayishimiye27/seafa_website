import Image from "next/image";
import { Section, TextLink } from "@/components/ui/editorial";
import { currentPresident, presidentialSuccession } from "@/data/presidency";

export function Presidency({ history = false }: { history?: boolean }) {
  const president = currentPresident;
  return (
    <Section
      id={history ? "presidents" : "presidence"}
      eyebrow="Responsabilité et transmission"
      title={history ? "Les présidents de SEAFA" : "Notre présidence"}
      tone="warm"
    >
      <article className="president-feature">
        {president.photograph && (
          <Image
            {...president.photograph}
            alt={president.photograph.alt}
            sizes="(max-width: 768px) 90vw, 360px"
            className="president-photo"
          />
        )}
        <div>
          <p className="eyebrow">Président actuel · depuis 2024</p>
          <h3>{president.fullName}</h3>
          <p className="lead-copy">Tugire Iteka</p>
          <p>
            Une communauté réunie autour du football, de la dignité et du
            partage entre générations.
          </p>
          {!history && (
            <TextLink href="/team">Découvrir notre organisation</TextLink>
          )}
        </div>
      </article>
      {history && (
        <>
          <h3 className="succession-title">Les présidences précédentes</h3>
          <div className="president-succession">
            {presidentialSuccession.map((member) => (
              <article key={member.id}>
                {member.photograph && (
                  <Image
                    {...member.photograph}
                    alt={member.photograph.alt}
                    sizes="(max-width: 640px) 90vw, 320px"
                    className="president-photo"
                  />
                )}
                <h4>{member.fullName}</h4>
                <p>{member.biography}</p>
                {member.id === "president-arnaud" && (
                  <TextLink href="/interviews/arnaud-bados-badogomba">
                    Lire son témoignage
                  </TextLink>
                )}
              </article>
            ))}
          </div>
        </>
      )}
    </Section>
  );
}
