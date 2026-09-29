import { pageMetadata } from "@/lib/metadata";

import { AwardFilterGrid } from "@/components/awards/award-filter-grid";
import { getPublishedAwards } from "@/lib/content";

export const metadata = pageMetadata(
  "Prix et distinctions",
  "/awards",
  "Découvrez les trophées, champions de Challenges, distinctions individuelles et reconnaissances communautaires officielles de SEAFA.",
);

export default function AwardsPage() {
  const awards = getPublishedAwards();

  return (
    <main>
      <section className="relative overflow-hidden bg-[#071d3b] text-white">
        <div
          className="absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 20%, rgba(208,173,89,0.38), transparent 30%), radial-gradient(circle at 15% 85%, rgba(58,105,160,0.25), transparent 35%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d0ad59]">
            Excellence et reconnaissance
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Prix et distinctions
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
            Un espace consacré aux performances sportives, au leadership, au
            fair-play, au service durable et aux contributions qui font avancer
            SEAFA.
          </p>
        </div>
      </section>

      <section
        className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        aria-labelledby="awards-list-title"
      >
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
            Nos honneurs
          </p>

          <h2
            id="awards-list-title"
            className="mt-3 text-3xl font-black tracking-tight text-[#071d3b] sm:text-4xl"
          >
            Célébrer l’engagement
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            Ces distinctions témoignent des talents et de l’engagement qui ont
            marqué notre parcours. Les récits sont issus de nos archives.
          </p>
        </div>

        <p className="mb-8 text-slate-600">
          Les albums photographiques suivent les années indiquées dans la
          médiathèque. Certaines dates et identités diffèrent des récits du
          livret et restent à confirmer.
        </p>
        <AwardFilterGrid awards={awards} />
      </section>
    </main>
  );
}
