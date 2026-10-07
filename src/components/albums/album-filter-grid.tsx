"use client";

import { useMemo, useState } from "react";

import { AlbumCard } from "@/components/albums/album-card";
import { EmptyAlbumState } from "@/components/albums/empty-album-state";
import type { Album, AlbumType } from "@/types/content";

interface AlbumFilterGridProps {
  albums: readonly Album[];
  basePath?: string;
}

type FilterValue = "all" | AlbumType | NonNullable<Album["category"]>;

const filters: ReadonlyArray<{
  value: FilterValue;
  label: string;
}> = [
  { value: "all", label: "Tout" },
  { value: "activity", label: "Activités" },
  { value: "challenge", label: "Challenges" },
  { value: "event", label: "Rencontres et célébrations" },
  { value: "award", label: "Prix et distinctions" },
  { value: "history", label: "Histoire" },
  { value: "community", label: "Communauté" },
  { value: "general", label: "Autres albums" },
  { value: "football", label: "Football et entraînements" },
  { value: "challenges", label: "Challenges" },
  { value: "awards", label: "Récompenses" },
  { value: "social", label: "Actions sociales" },
  { value: "education", label: "Conférences et formation" },
  { value: "trips", label: "Voyages et sorties" },
  { value: "diaspora", label: "Diaspora" },
  { value: "celebrations", label: "Célébrations" },
];

export function AlbumFilterGrid({
  albums,
  basePath = "/gallery",
}: AlbumFilterGridProps) {
  const [activeFilter, setActiveFilter] = useState<FilterValue>("all");
  const [browse, setBrowse] = useState<"years" | "events">("years");
  const [year, setYear] = useState("all");
  const yearOf = (album: Album) =>
    album.eventDate?.value.slice(0, 4) ?? "unknown";
  const years = [...new Set(albums.map(yearOf))].sort((a, b) =>
    a === "unknown" ? 1 : b === "unknown" ? -1 : b.localeCompare(a),
  );

  const availableTypes = useMemo(
    () =>
      new Set<FilterValue>(
        albums.flatMap((album): FilterValue[] => [
          album.type,
          ...(album.category ? [album.category] : []),
        ]),
      ),
    [albums],
  );

  const visibleFilters = filters.filter(
    (filter) => filter.value === "all" || availableTypes.has(filter.value),
  );

  const categoryAlbums = useMemo(() => {
    if (activeFilter === "all") {
      return albums;
    }

    return albums.filter(
      (album) => album.type === activeFilter || album.category === activeFilter,
    );
  }, [activeFilter, albums]);
  const visibleAlbums = categoryAlbums.filter(
    (album) => year === "all" || yearOf(album) === year,
  );

  const normalizedBasePath = basePath.endsWith("/")
    ? basePath.slice(0, -1)
    : basePath;

  if (albums.length === 0) {
    return (
      <EmptyAlbumState
        title="La galerie est en préparation"
        message="Les albums apparaîtront ici dès que les photographies et les informations officielles auront été validées."
      />
    );
  }

  return (
    <div>
      <div
        className="mb-6 flex flex-wrap gap-3"
        aria-label="Parcourir la galerie"
      >
        <button
          className="button"
          aria-pressed={browse === "years"}
          onClick={() => setBrowse("years")}
        >
          Années
        </button>
        <button
          className="button"
          aria-pressed={browse === "events"}
          onClick={() => setBrowse("events")}
        >
          Événements
        </button>
        <label className="flex items-center gap-3">
          Année
          <select
            className="form-input"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="all">Toutes les années</option>
            {years.map((value) => (
              <option key={value} value={value}>
                {value === "unknown" ? "Date à confirmer" : value}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div
        className="mb-8 flex flex-wrap gap-2"
        aria-label="Filtrer les albums"
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
        {visibleAlbums.length}{" "}
        {visibleAlbums.length === 1 ? "album affiché" : "albums affichés"}
      </p>

      {visibleAlbums.length > 0 ? (
        <div>
          {(browse === "years" ? years : ["events"]).map((group) => {
            const grouped = visibleAlbums.filter(
              (album) => group === "events" || yearOf(album) === group,
            );
            if (!grouped.length) return null;
            return (
              <section
                key={group}
                className="mb-12"
                aria-label={
                  group === "unknown"
                    ? "Date à confirmer"
                    : group === "events"
                      ? "Collections par événement"
                      : group
                }
              >
                <h2 className="mb-6 text-3xl font-bold">
                  {group === "unknown"
                    ? "Date à confirmer"
                    : group === "events"
                      ? "Collections par événement"
                      : group}
                </h2>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {grouped.map((album) => (
                    <AlbumCard
                      key={album.id}
                      album={album}
                      href={`${normalizedBasePath}/${album.slug}`}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <EmptyAlbumState
          title="Aucun album dans cette catégorie"
          message="Aucun contenu officiel n’a encore été publié dans cette catégorie."
        />
      )}
    </div>
  );
}
