"use client";

import { useMemo, useState } from "react";

import { EmptyAlbumState } from "@/components/albums/empty-album-state";
import { AwardCard } from "@/components/awards/award-card";
import type { Award, AwardCategory } from "@/types/content";

interface AwardFilterGridProps {
  awards: readonly Award[];
}

type AwardFilter = "all" | AwardCategory;

const filters: ReadonlyArray<{
  value: AwardFilter;
  label: string;
}> = [
  { value: "all", label: "Toutes" },
  { value: "team-trophy", label: "Trophées collectifs" },
  { value: "challenge-champion", label: "Challenges" },
  { value: "player-of-year", label: "Joueur de l’année" },
  { value: "top-scorer", label: "Meilleurs buteurs" },
  { value: "best-goalkeeper", label: "Gardiens" },
  { value: "best-captain", label: "Capitaines" },
  { value: "fair-play", label: "Fair-play" },
  { value: "leadership", label: "Direction" },
  { value: "long-service", label: "Engagement durable" },
  {
    value: "community-contribution",
    label: "Contribution communautaire",
  },
  { value: "ceremony", label: "Cérémonies" },
  {
    value: "season-collection",
    label: "Collections saisonnières",
  },
  { value: "other", label: "Autres" },
];

export function AwardFilterGrid({ awards }: AwardFilterGridProps) {
  const [activeFilter, setActiveFilter] = useState<AwardFilter>("all");

  const availableCategories = useMemo(
    () => new Set(awards.map((award) => award.category)),
    [awards],
  );

  const visibleFilters = filters.filter(
    (filter) => filter.value === "all" || availableCategories.has(filter.value),
  );

  const visibleAwards = useMemo(() => {
    if (activeFilter === "all") {
      return awards;
    }

    return awards.filter((award) => award.category === activeFilter);
  }, [activeFilter, awards]);

  if (awards.length === 0) {
    return (
      <EmptyAlbumState
        title="Les distinctions sont en préparation"
        message="Les prix, trophées et reconnaissances officielles apparaîtront ici après confirmation."
      />
    );
  }

  return (
    <div>
      <div
        className="mb-8 flex flex-wrap gap-2"
        aria-label="Filtrer les distinctions"
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
        {visibleAwards.length}{" "}
        {visibleAwards.length === 1
          ? "distinction affichée"
          : "distinctions affichées"}
      </p>

      {visibleAwards.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {visibleAwards.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </div>
      ) : (
        <EmptyAlbumState
          title="Aucune distinction dans cette catégorie"
          message="Aucune distinction officielle n’a encore été publiée dans cette catégorie."
        />
      )}
    </div>
  );
}
