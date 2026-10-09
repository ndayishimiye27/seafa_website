import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";

import { MembershipApplicationForm } from "@/components/forms/membership-application-form";

export const metadata = pageMetadata(
  "Rejoindre SEAFA",
  "/join",
  "Découvrez les principes d’adhésion et envoyez une candidature pour rejoindre SEAFA.",
);

export default function JoinPage() {
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
            Devenir membre
          </p>

          <h1 className="mt-4 max-w-4xl text-balance text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Rejoindre la communauté SEAFA
          </h1>

          <p className="mt-7 max-w-3xl text-lg leading-8 text-white/72">
            Présentez votre candidature pour participer à une communauté fondée
            sur le football, la discipline, la fraternité, le respect et
            l’engagement collectif.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-28">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
              Avant de postuler
            </p>

            <h2 className="mt-4 text-3xl font-black tracking-tight text-[#071d3b] sm:text-4xl">
              Ce que signifie devenir membre
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Rejoindre SEAFA implique de respecter les autres membres, les
              décisions officielles, les activités du club et les valeurs
              communes.
            </p>

            <ul className="mt-7 space-y-4">
              {[
                "Respecter le code de conduite.",
                "Participer avec discipline et ponctualité.",
                "Protéger l’unité et l’image de SEAFA.",
                "Contribuer positivement aux activités.",
                "Respecter la procédure d’admission.",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-slate-700"
                >
                  <span
                    className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#806026] text-white"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="m6 12 4 4 8-8" />
                    </svg>
                  </span>

                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="font-bold text-amber-950">
                Candidature soumise à examen
              </p>

              <p className="mt-2 text-sm leading-6 text-amber-900/75">
                Le formulaire prépare une candidature à envoyer par WhatsApp ou
                e-mail. Il ne crée pas automatiquement un compte de membre et ne
                garantit pas l’acceptation.
              </p>
            </div>

            <Link
              href="/code-of-conduct"
              className="mt-7 inline-flex font-bold text-[#173f73] underline underline-offset-4 transition hover:text-[#806026] focus:outline-none focus:ring-2 focus:ring-[#b7923d]"
            >
              Lire le code de conduite
            </Link>
          </aside>

          <div>
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
                Formulaire
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-[#071d3b] sm:text-4xl">
                Envoyer une candidature
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                Remplissez soigneusement les informations demandées. Les champs
                marqués comme obligatoires doivent être complétés.
              </p>
            </div>

            <MembershipApplicationForm />
          </div>
        </div>
      </section>
    </main>
  );
}
