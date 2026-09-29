import { pageMetadata } from "@/lib/metadata";

import { EmptyAlbumState } from "@/components/albums/empty-album-state";
import { EventCard } from "@/components/events/event-card";
import {
  getOngoingEvents,
  getPastEvents,
  getUpcomingEvents,
} from "@/lib/content";

export const metadata = pageMetadata(
  "Événements",
  "/events",
  "Découvrez les événements à venir, les célébrations, les anniversaires et les rencontres communautaires de SEAFA.",
);

export default function EventsPage() {
  const ongoingEvents = getOngoingEvents();
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  const hasEvents =
    ongoingEvents.length > 0 ||
    upcomingEvents.length > 0 ||
    pastEvents.length > 0;

  return (
    <main>
      <section className="relative overflow-hidden bg-[#071d3b] text-white">
        <div
          className="absolute inset-0 opacity-30"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(circle at 80% 20%, rgba(183,146,61,0.3), transparent 30%), radial-gradient(circle at 15% 85%, rgba(58,105,160,0.28), transparent 35%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#d0ad59]">
            Rencontres et célébrations
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
            Événements SEAFA
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/70">
            Retrouvez les anniversaires, les réunions, les célébrations, les
            visites et les rassemblements qui renforcent les liens au sein de
            SEAFA.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        {!hasEvents ? (
          <EmptyAlbumState
            title="Les événements sont en préparation"
            message="Les événements officiels apparaîtront ici dès que leurs informations auront été confirmées."
          />
        ) : (
          <div className="space-y-16">
            {ongoingEvents.length > 0 ? (
              <section aria-labelledby="ongoing-events-title">
                <div className="mb-8">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
                    Maintenant
                  </p>

                  <h2
                    id="ongoing-events-title"
                    className="mt-3 text-3xl font-black tracking-tight text-[#071d3b]"
                  >
                    Événements en cours
                  </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {ongoingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            ) : null}

            {upcomingEvents.length > 0 ? (
              <section aria-labelledby="upcoming-events-title">
                <div className="mb-8">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
                    Agenda
                  </p>

                  <h2
                    id="upcoming-events-title"
                    className="mt-3 text-3xl font-black tracking-tight text-[#071d3b]"
                  >
                    Événements à venir
                  </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {upcomingEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            ) : null}

            {pastEvents.length > 0 ? (
              <section aria-labelledby="past-events-title">
                <div className="mb-8">
                  <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#806026]">
                    Notre mémoire
                  </p>

                  <h2
                    id="past-events-title"
                    className="mt-3 text-3xl font-black tracking-tight text-[#071d3b]"
                  >
                    Événements passés
                  </h2>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {pastEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        )}
      </div>
    </main>
  );
}
