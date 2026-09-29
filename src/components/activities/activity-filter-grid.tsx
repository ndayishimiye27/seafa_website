"use client";

import { useMemo, useState } from "react";

import { EmptyAlbumState } from "@/components/albums/empty-album-state";
import { ActivityCard } from "@/components/activities/activity-card";
import type { Activity, ActivityCategory } from "@/types/content";

interface ActivityFilterGridProps {
  activities: readonly Activity[];
}

type ActivityFilter = "all" | ActivityCategory;

const filters: ReadonlyArray<{
  value: ActivityFilter;
  label: string;
}> = [
  { value: "all", label: "Toutes" },
  { value: "football", label: "Football" },
  { value: "friendly-match", label: "Matches amicaux" },
  { value: "challenge", label: "Challenges" },
  { value: "training", label: "Entraînements" },
  { value: "wellness", label: "Santé et bien-être" },
  { value: "community-project", label: "Communauté" },
  { value: "women-community", label: "Femmes et communauté" },
  { value: "excursion", label: "Visites et excursions" },
  { value: "other", label: "Autres" },
];

export function ActivityFilterGrid({ activities }: ActivityFilterGridProps) {
  const [activeFilter, setActiveFilter] = useState<ActivityFilter>("all");

  const availableCategories = useMemo(
    () => new Set(activities.map((activity) => activity.category)),
    [activities],
  );

  const visibleFilters = filters.filter(
    (filter) => filter.value === "all" || availableCategories.has(filter.value),
  );

  const visibleActivities = useMemo(() => {
    if (activeFilter === "all") {
      return activities;
    }

    return activities.filter((activity) => activity.category === activeFilter);
  }, [activeFilter, activities]);

  if (activities.length === 0) {
    return (
      <EmptyAlbumState
        title="Les activités arrivent prochainement"
        message="Les activités et les Challenges officiels seront publiés ici après validation."
        actionLabel="Proposer un match"
        actionHref="/request-match"
      />
    );
  }

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap gap-2"
        aria-label="Filtrer les activités"
      >
        {visibleFilters.map((filter) => {
          const selected = activeFilter === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() => setActiveFilter(filter.value)}
              aria-pressed={selected}
              className={`min-h-11 rounded-full border px-5 py-2 text-sm font-bold transition focus:outline-none focus:ring-2 focus:ring-[#b7923d] focus:ring-offset-2 ${
                selected
                  ? "border-[#071d3b] bg-[#071d3b] text-white"
                  : "border-slate-300 bg-white text-slate-700 hover:border-[#173f73] hover:text-[#173f73]"
              }`}
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visibleActivities.length}{" "}
        {visibleActivities.length === 1
          ? "activité affichée"
          : "activités affichées"}
      </p>

      {visibleActivities.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <EmptyAlbumState
          title="Aucune activité dans cette catégorie"
          message="Aucune activité officielle n’a encore été publiée dans cette catégorie."
        />
      )}
    </div>
  );
}
