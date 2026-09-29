import { Section } from "@/components/ui/editorial";
import { ActivityCard } from "@/components/activities/activity-card";
import { getPublishedActivities } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";

import { EmptyAlbumState } from "@/components/albums/empty-album-state";
import { getPublishedChallenges } from "@/lib/content";

export const metadata = pageMetadata(
  "SEAFA Challenges",
  "/challenges",
  "Découvrez le fonctionnement et l’histoire des SEAFA Challenges, des séries internes disputées au meilleur des trois matches.",
);

export default function ChallengesPage() {
  const challenges = getPublishedChallenges();

  return (
    <main>
      <section className="relative overflow-hidden bg-[#071d3b] text-white">
        <div
          className="surface-grid absolute inset-0 opacity-60"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d0ad59]">
            Compétition interne
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Les SEAFA Challenges
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
            Une compétition interne fondée sur la stratégie, la fraternité et
            l’esprit sportif.
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-18 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8 lg:py-24">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
              Le principe
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#071d3b] sm:text-4xl">
              Le premier à deux victoires
            </h2>

            <p className="mt-5 leading-8 text-slate-600">
              Deux capitaines sélectionnent des coéquipiers parmi les membres de
              SEAFA. Leurs équipes disputent ensuite une série pouvant aller
              jusqu’à trois matches. La première équipe qui remporte deux
              matches gagne le Challenge.
            </p>

            <p className="mt-4 leading-8 text-slate-600">
              Les résultats, les capitaines et les souvenirs de chaque série
              contribuent à la mémoire sportive de SEAFA.
            </p>
          </div>

          <ol className="grid gap-4">
            <li className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#071d3b] font-black text-white">
                  1
                </span>

                <div>
                  <h3 className="font-bold text-[#071d3b]">Deux capitaines</h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    Deux capitaines sont désignés pour conduire les équipes du
                    Challenge.
                  </p>
                </div>
              </div>
            </li>

            <li className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#071d3b] font-black text-white">
                  2
                </span>

                <div>
                  <h3 className="font-bold text-[#071d3b]">
                    Sélection des équipes
                  </h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    Chaque capitaine sélectionne des membres de SEAFA pour
                    constituer son équipe.
                  </p>
                </div>
              </div>
            </li>

            <li className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#806026] font-black text-white">
                  3
                </span>

                <div>
                  <h3 className="font-bold text-[#071d3b]">Deux victoires</h3>

                  <p className="mt-2 leading-7 text-slate-600">
                    La première équipe qui atteint deux victoires remporte
                    officiellement le Challenge.
                  </p>
                </div>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-24">
          <div className="mb-10 max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
              Archives
            </p>

            <h2 className="mt-3 text-3xl font-black tracking-tight text-[#071d3b] sm:text-4xl">
              Challenges publiés
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Les résultats et les albums seront ajoutés uniquement après
              validation officielle.
            </p>
          </div>

          {challenges.length === 0 ? (
            <EmptyAlbumState
              title="Les archives sont en préparation"
              message="Aucun résultat de Challenge n’a encore été publié officiellement."
              actionLabel="Voir toutes les activités"
              actionHref="/activities"
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {challenges.map((challenge) => (
                <article
                  key={challenge.id}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#806026]">
                    {challenge.status === "planned"
                      ? "Planifié"
                      : challenge.status === "ongoing"
                        ? "En cours"
                        : "Terminé"}
                  </span>

                  <h3 className="mt-3 text-xl font-bold text-[#071d3b]">
                    {challenge.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Série au meilleur des trois matches. Deux victoires sont
                    nécessaires.
                  </p>
                </article>
              ))}
            </div>
          )}

          <div className="mt-10">
            <Link
              href="/activities"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#071d3b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#173f73] focus:outline-none focus:ring-2 focus:ring-[#b7923d] focus:ring-offset-4"
            >
              Explorer les activités
            </Link>
          </div>
        </div>
      </section>
      <Section id="photos-football" title="Notre football en images.">
        <p>
          Retrouvez les albums sportifs disponibles. Les photographies fournies
          ne permettent pas encore d’identifier les séries de Challenges, leurs
          capitaines ou leurs résultats.
        </p>
        <div className="cards-three">
          {getPublishedActivities()
            .filter(
              (activity) =>
                activity.category === "football" ||
                activity.category === "friendly-match",
            )
            .slice(0, 3)
            .map((activity) => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
        </div>
      </Section>
    </main>
  );
}
