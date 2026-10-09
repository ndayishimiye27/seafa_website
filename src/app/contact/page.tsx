import { pageMetadata } from "@/lib/metadata";

import { ContactForm } from "@/components/forms/contact-form";
import { siteSettings } from "@/data/site-settings";

export const metadata = pageMetadata(
  "Contact",
  "/contact",
  "Contactez SEAFA pour une question générale, une collaboration, une activité ou une demande concernant l’organisation.",
);

export default function ContactPage() {
  const hasOfficialContact =
    siteSettings.contact?.email ||
    siteSettings.contact?.phone ||
    siteSettings.contact?.address;

  return (
    <main>
      <section className="relative overflow-hidden bg-[#071d3b] text-white">
        <div
          className="surface-grid absolute inset-0 opacity-50"
          aria-hidden="true"
        />

        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 78% 25%, rgba(66,112,165,0.4), transparent 30%), radial-gradient(circle at 15% 80%, rgba(183,146,61,0.22), transparent 35%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-18 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d0ad59]">
            Nous contacter
          </p>

          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Entrons en contact
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72">
            Une question, une proposition de collaboration ou des informations à
            partager avec SEAFA ? Envoyez-nous un message.
          </p>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.72fr_1.28fr] lg:px-8 lg:py-28">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
              Coordonnées
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#071d3b] sm:text-4xl">
              Parler avec SEAFA
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Utilisez le formulaire pour les demandes générales. Pour une
              candidature ou une proposition de match, utilisez les formulaires
              dédiés afin que votre demande soit dirigée correctement.
            </p>

            {hasOfficialContact ? (
              <dl className="mt-8 space-y-5">
                {siteSettings.contact?.email ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <dt className="text-sm font-bold text-[#071d3b]">E-mail</dt>

                    <dd className="mt-2">
                      <a
                        href={`mailto:${siteSettings.contact.email}`}
                        className="text-[#173f73] underline underline-offset-4"
                      >
                        {siteSettings.contact.email}
                      </a>
                    </dd>
                  </div>
                ) : null}

                {siteSettings.contact?.phone ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <dt className="text-sm font-bold text-[#071d3b]">
                      Téléphone
                    </dt>

                    <dd className="mt-2">
                      <a
                        href={`tel:${siteSettings.contact.phone}`}
                        className="text-[#173f73] underline underline-offset-4"
                      >
                        {siteSettings.contact.phone}
                      </a>
                    </dd>
                  </div>
                ) : null}

                {siteSettings.contact?.address ? (
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <dt className="text-sm font-bold text-[#071d3b]">
                      Adresse
                    </dt>

                    <dd className="mt-2 leading-7 text-slate-600">
                      {siteSettings.contact.address}
                    </dd>
                  </div>
                ) : null}
              </dl>
            ) : (
              <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <p className="font-bold text-amber-950">
                  Coordonnées officielles à confirmer
                </p>

                <p className="mt-2 text-sm leading-6 text-amber-900/75">
                  L’adresse e-mail, le numéro de téléphone et l’adresse physique
                  seront affichés ici après confirmation.
                </p>
              </div>
            )}

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href="/join"
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#b7923d]"
              >
                <span className="font-bold text-[#071d3b]">
                  Rejoindre SEAFA
                </span>

                <span className="mt-2 block text-sm leading-6 text-slate-600">
                  Envoyer une candidature d’adhésion.
                </span>
              </a>

              <a
                href="/request-match"
                className="rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-[#b7923d]"
              >
                <span className="font-bold text-[#071d3b]">
                  Proposer un match
                </span>

                <span className="mt-2 block text-sm leading-6 text-slate-600">
                  Inviter SEAFA à une rencontre.
                </span>
              </a>
            </div>
          </aside>

          <div>
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
                Formulaire
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#071d3b] sm:text-4xl">
                Envoyer un message
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Donnez-nous les informations nécessaires pour comprendre votre
                demande et vous répondre.
              </p>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
