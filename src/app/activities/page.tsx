import { TrainingVideo } from "@/components/activities/training-video";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { ActivityDimensions } from "@/components/home/sections";

import { ActivityFilterGrid } from "@/components/activities/activity-filter-grid";
import { getPublishedActivities } from "@/lib/content";

export const metadata = pageMetadata(
  "Activités et Challenges",
  "/activities",
  "Découvrez les matches, Challenges, entraînements, activités communautaires, séances de bien-être et excursions de SEAFA.",
);

export default function ActivitiesPage() {
  const activities = getPublishedActivities();

  return (
    <main>
      <section className="relative overflow-hidden bg-[#071d3b] text-white">
        <div
          className="absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 20%, rgba(183,146,61,0.28), transparent 30%), radial-gradient(circle at 15% 80%, rgba(66,112,165,0.3), transparent 35%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d0ad59]">
            Football, fraternité et engagement
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Activités et Challenges
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
            Suivez les matches, les Challenges internes, les entraînements, les
            activités communautaires et les moments de bien-être qui rassemblent
            SEAFA.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/request-match"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#806026] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#806026] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-[#071d3b]"
            >
              Proposer un match
            </Link>

            <Link
              href="/challenges"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#d0ad59] focus:ring-offset-4 focus:ring-offset-[#071d3b]"
            >
              Comprendre les Challenges
            </Link>
          </div>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="activities-list-title"
      >
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
            La vie de SEAFA
          </p>

          <h2
            id="activities-list-title"
            className="mt-3 text-3xl font-black tracking-tight text-[#071d3b] sm:text-4xl"
          >
            Nos activités
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Le sport, la santé, l’éducation, le service et les moments partagés
            donnent toute sa richesse à notre vie collective.
          </p>
        </div>

        <ActivityDimensions />
        <h2 className="mt-12 mb-8 text-3xl font-bold text-[#071d3b]">
          Les activités documentées
        </h2>
        <ActivityFilterGrid activities={activities} />
      </section>
      <section className="wrap pb-16" aria-labelledby="entrainement">
        <h2 id="entrainement" className="text-3xl font-bold text-[#071d3b]">
          L’entraînement en vidéo
        </h2>
        <TrainingVideo />
      </section>
    </main>
  );
}
