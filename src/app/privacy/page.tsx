import { PageIntro, Section, TextLink } from "@/components/ui/editorial";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Politique de confidentialité",
  "/privacy",
  "Comment le site SEAFA traite les informations de ses visiteurs et les demandes préparées par formulaire.",
);
export default function PrivacyPage() {
  return (
    <main>
      <PageIntro
        eyebrow="Vos informations"
        title="Politique de confidentialité."
        description="Cette page décrit le fonctionnement des formulaires et des contenus publics de SEAFA."
      />
      <Section
        id="confidentialite"
        title="Des informations confiées pour une demande précise."
      >
        <div className="reading-copy">
          <h3>Les informations demandées</h3>
          <p>
            Les formulaires recueillent votre nom, votre adresse e-mail et,
            selon la demande, votre téléphone, votre résidence, votre
            expérience, votre profession, vos qualifications déclarées, vos
            motivations ou une proposition de rencontre. Seuls les champs
            signalés sont obligatoires. Aucune photographie, pièce d’identité ni
            date de naissance n’est demandée.
          </p>
          <h3>Les messages préparés dans votre navigateur</h3>
          <p>
            Les demandes de contact, candidatures et propositions de match
            préparent un message complet dans votre navigateur. Le formulaire ne
            l’enregistre pas sur le serveur du site et ne dépend pas d’un
            service de réception. Vous choisissez « Envoyer par WhatsApp » ou «
            Envoyer par e-mail ». À l’ouverture, le brouillon est transmis à
            l’application choisie selon ses propres règles de confidentialité.
            Vous devez encore vérifier le message et appuyer sur Envoyer dans
            cette application. Le site ne confirme ni l’envoi ni la réception.
          </p>
          <p>
            Les réponses ne sont placées ni dans les journaux ni dans un outil
            d’analyse du site. Les brouillons ne sont pas conservés par le site
            après fermeture ou rechargement de la page. Vous pouvez copier le
            message si l’application ne s’ouvre pas ou si le lien est trop long.
          </p>
          <h3>L’utilisation et la conservation</h3>
          <p>
            Les informations servent à répondre à votre demande, examiner une
            candidature ou préparer un échange sur un match. Elles ne sont pas
            publiées sur le site. Après ouverture ou copie d’un brouillon, sa
            conservation dépend de votre application et, après envoi, de la
            boîte de réception de SEAFA. L’accès aux messages reçus est réservé
            aux personnes habilitées par SEAFA. SEAFA doit préciser la durée de
            conservation des messages reçus et les responsables de leur
            traitement.
          </p>
          <h3>Validation des formulaires</h3>
          <p>
            Les formulaires vérifient les champs obligatoires, les formats et la
            longueur des réponses avant de préparer le message. Cette validation
            ne crée pas de compte et ne vaut ni admission ni confirmation de
            match.
          </p>
          <h3>Cookies et services externes</h3>
          <p>
            Le code du site n’ajoute ni outil de mesure d’audience, ni
            publicité, ni cookie de suivi. Les formulaires ne créent pas de clé
            de demande dans le stockage du navigateur. WhatsApp et votre
            application e-mail appliquent leurs propres règles lorsque vous
            ouvrez un brouillon ou envoyez un message. Le système membre utilise
            ses propres cookies de connexion. L’hébergeur peut produire ses
            propres journaux techniques.
          </p>
          <h3>Photographies et témoignages</h3>
          <p>
            Les récits historiques sont présentés dans leur contexte. Les
            photographies et profils sont ajoutés après vérification des
            informations et des autorisations de publication. Vous pouvez
            demander la correction ou le retrait d’un contenu qui vous concerne.
          </p>
          <h3>Nous faire part d’une demande</h3>
          <p>
            Pour consulter, corriger ou demander la suppression des informations
            que vous avez confiées, utilisez la page de contact.
          </p>
          <TextLink href="/contact">Consulter la page contact</TextLink>
          <h3>Évolution de cette page</h3>
          <p>
            Cette notice doit être actualisée lorsque l’hébergement, la
            réception des messages ou les outils du site changent.
          </p>
        </div>
      </Section>
    </main>
  );
}
