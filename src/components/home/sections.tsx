import { Section, TextLink } from "@/components/ui/editorial";
import {
  values,
  mission,
  vision,
  activityDimensions,
} from "@/content/identity";
export function ClubStatistics() {
  return (
    <section className="statistics" aria-label="SEAFA en chiffres">
      <div className="wrap">
        <dl>
          {[
            ["200+", "membres"],
            ["50", "membres de la diaspora"],
            ["30", "sages"],
            ["2013", "le début de notre histoire"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p>
          Les membres de la diaspora et les sages font partie des plus de 200
          membres de SEAFA.
        </p>
      </div>
    </section>
  );
}
export function MissionVision() {
  return (
    <Section
      id="mission-vision"
      eyebrow="Notre devise · Tugire Iteka"
      title="Un même esprit. Une ambition partagée."
      tone="navy"
    >
      <div className="split">
        <article>
          <h3>Notre mission</h3>
          <p>{mission}</p>
        </article>
        <article>
          <h3>Notre vision</h3>
          <p>{vision}</p>
        </article>
      </div>
    </Section>
  );
}
export function IdentityValues() {
  return (
    <Section
      id="valeurs"
      eyebrow="Ce qui nous guide"
      title="Six valeurs, une manière d’être."
    >
      <div className="values-grid">
        {values.map((value, i) => (
          <article key={value.title}>
            <span className="value-number" aria-hidden="true">
              0{i + 1}
            </span>
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
export function ActivityDimensions() {
  return (
    <div className="values-grid">
      {activityDimensions.map((item, i) => (
        <article key={item.title}>
          <span className="value-number" aria-hidden="true">
            0{i + 1}
          </span>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <TextLink href={item.href}>En savoir plus</TextLink>
        </article>
      ))}
    </div>
  );
}
