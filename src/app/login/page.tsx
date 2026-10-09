import { PageIntro, Section, TextLink } from "@/components/ui/editorial";
import { pageMetadata } from "@/lib/metadata";
import { memberLoginUrl } from "@/lib/member-login";
import { redirect } from "next/navigation";

export const metadata = pageMetadata(
  "Espace membre",
  "/login",
  "Accès à votre espace membre SEAFA et assistance à la connexion.",
);

export default function LoginPage() {
  const loginUrl = memberLoginUrl();
  if (loginUrl) redirect(loginUrl);
  return (
    <main>
      <PageIntro
        eyebrow="SEAFA · Espace membre"
        title="Retrouvons-nous dans votre espace."
        description="Votre numéro d’accès SEAFA et votre mot de passe vous permettront de rejoindre l’espace privé des membres."
      />
      <Section
        id="connexion"
        title={
          loginUrl ? "Accéder à mon compte" : "Connexion bientôt disponible"
        }
      >
        <div className="reading-copy">
          {loginUrl ? (
            <a className="button" href={loginUrl}>
              Se connecter à SEAFA
            </a>
          ) : (
            <p role="status">
              L’adresse officielle de connexion doit encore être configurée pour
              ouvrir l’accès depuis ce site.
            </p>
          )}
          <p>
            Conservez votre numéro d’accès SEAFA. Pour obtenir de l’aide,
            contactez le Secrétariat. Ne communiquez jamais votre mot de passe
            dans un message.
          </p>
          <TextLink href="/contact">Obtenir de l’aide</TextLink>
          <p>
            Vous souhaitez devenir membre ? Le Secrétariat examine votre
            candidature, puis les Finances vérifient le paiement et activent
            votre adhésion.
          </p>
          <TextLink href="/join">Rejoindre SEAFA</TextLink>
        </div>
      </Section>
    </main>
  );
}
