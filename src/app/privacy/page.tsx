import { PageIntro, Section, TextLink } from "@/components/ui/editorial";
import { pageMetadata } from "@/lib/metadata";
import { submissionsEnabled } from "@/lib/submissions";
import {
  emailConfiguration,
  whatsappConfiguration,
} from "@/lib/delivery-config";
import { intakeConfiguration } from "@/lib/system-intake";
export const metadata = pageMetadata(
  "Politique de confidentialité",
  "/privacy",
  "Comment le site SEAFA traite les informations de ses visiteurs et les demandes transmises par formulaire.",
);
export default function PrivacyPage() {
  const system = Boolean(intakeConfiguration());
  const email = Boolean(emailConfiguration());
  const whatsapp = Boolean(whatsappConfiguration());
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
          <h3>L’utilisation et la réception</h3>
          <p>
            Les candidatures et propositions de match préparent un message dans
            votre navigateur, sans l’enregistrer sur le serveur du site. Vous
            choisissez WhatsApp (+257 79 690 359) ou l’e-mail
            (jambojeanjimmy52@gmail.com). À l’ouverture, le brouillon est
            transmis à l’application choisie selon ses propres règles de
            confidentialité. Vous devez encore appuyer sur Envoyer. Le site ne
            confirme ni l’envoi ni la réception. Les réponses ne sont placées ni
            dans les journaux ni dans un outil d’analyse du site. Les brouillons
            ne sont pas conservés par le site après fermeture ou rechargement de
            la page.
          </p>
          <h3>Le formulaire de contact</h3>
          <p>
            {submissionsEnabled()
              ? system
                ? "Les messages de contact sont enregistrés auprès du service de réception configuré pour leur examen par le Secrétariat."
                : email
                  ? "Les demandes complètes sont transmises au service d’envoi d’e-mails configuré pour SEAFA. Une confirmation signifie que ce service a accepté l’envoi, pas que le message a été lu."
                  : "En développement, les demandes sont conservées localement ; leur transmission au Secrétariat reste à effectuer."
              : "L’envoi par le formulaire de contact est actuellement désactivé. Cette limitation ne concerne pas les brouillons WhatsApp ou e-mail des candidatures et propositions de match."}{" "}
            Les données servent à répondre à votre demande, examiner une
            candidature ou préparer un échange sur un match. Elles ne sont pas
            publiées sur le site.
          </p>
          {email && (
            <p>
              Une copie complète de la demande est adressée à la boîte e-mail de
              SEAFA via Resend. L’adresse indiquée dans le formulaire sert
              d’adresse de réponse.
            </p>
          )}
          {whatsapp && (
            <p>
              Une notification WhatsApp Business peut être adressée à l’équipe
              via Meta après acceptation de la demande. Elle contient uniquement
              le type de demande et sa référence, sans le contenu du formulaire
              ni le code de suivi confidentiel.
            </p>
          )}
          <h3>Accès et conservation</h3>
          <p>
            Les règles de file d’envoi et de limitation ci-dessous concernent le
            formulaire de contact. Après ouverture ou copie d’un brouillon, sa
            conservation dépend de votre application et, après envoi, de la
            boîte de réception de SEAFA.
          </p>
          <p>
            L’accès aux dossiers et à la boîte de réception est réservé aux
            personnes habilitées par SEAFA. Lorsqu’un code de suivi est remis
            par le système membre, conservez-le sans le partager. La livraison
            e-mail utilise une file privée pour conserver les demandes et
            reprendre les envois non confirmés. Aucun effacement automatique
            n’est programmé : SEAFA doit encore fixer la durée de conservation
            et les personnes responsables du traitement.
          </p>
          <h3>Protection contre les abus</h3>
          <p>
            Les formulaires vérifient les champs et limitent la taille des
            demandes. Lorsque la réception est ouverte, des compteurs
            temporaires limitent les envois répétés. Si l’hébergement fournit
            une adresse réseau de confiance, elle est transformée en identifiant
            cryptographique pour ce contrôle ; l’adresse brute n’est pas
            enregistrée avec la demande. Les compteurs sont renouvelés par
            périodes de dix minutes.
          </p>
          <h3>Cookies et services externes</h3>
          <p>
            Le code du site n’ajoute ni outil de mesure d’audience, ni
            publicité, ni cookie de suivi. Les services de livraison ne
            reçoivent des données que lorsqu’ils sont configurés et qu’un
            message de contact est envoyé. Pour ce formulaire, le navigateur
            conserve temporairement une clé de demande et une empreinte de son
            contenu pour éviter les doublons lors d’une nouvelle tentative. Le
            système membre utilise ses propres cookies de connexion. L’hébergeur
            peut produire ses propres journaux techniques ; ses modalités
            devront être précisées lors de la mise en ligne définitive.
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
            que vous avez confiées, adressez-vous à SEAFA. Les coordonnées de
            réception sont jambojeanjimmy52@gmail.com et le numéro WhatsApp +257
            79 690 359.
          </p>
          <TextLink href="/contact">Consulter la page contact</TextLink>
          <h3>Évolution de cette page</h3>
          <p>
            Cette notice doit être actualisée lorsque l’hébergement, la
            réception des demandes ou les outils du site changent.
          </p>
        </div>
      </Section>
    </main>
  );
}

export const dynamic = "force-dynamic";
