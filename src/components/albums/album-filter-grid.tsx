"use client";
import { useState } from "react";
import { AlbumCard } from "@/components/albums/album-card";
import { EmptyAlbumState } from "@/components/albums/empty-album-state";
import type { Album } from "@/types/content";
const filters = [
  { id: "all", label: "Tous", matches: () => true },
  {
    id: "football",
    label: "Football",
    matches: (album: Album) =>
      album.category === "football" || /match/i.test(album.title),
  },
  {
    id: "competition",
    label: "Compétitions",
    matches: (album: Album) =>
      album.type === "challenge" || /tournoi|challenge/i.test(album.title),
  },
  {
    id: "events",
    label: "Événements",
    matches: (album: Album) => album.type === "event",
  },
  {
    id: "community",
    label: "Communauté & fraternité",
    matches: (album: Album) =>
      album.type === "community" ||
      album.category === "education" ||
      album.category === "social",
  },
  {
    id: "awards",
    label: "Distinctions",
    matches: (album: Album) => album.type === "award",
  },
  {
    id: "institution",
    label: "Présidence & identité",
    matches: (album: Album) =>
      ["people", "brand", "interviews"].includes(album.id),
  },
  {
    id: "archives",
    label: "Archives",
    matches: (album: Album) => album.type === "history",
  },
];
export function AlbumFilterGrid({
  albums,
  basePath = "/gallery",
}: {
  albums: readonly Album[];
  basePath?: string;
}) {
  const [filter, setFilter] = useState("all");
  const [year, setYear] = useState("all");
  const yearOf = (album: Album) =>
    album.eventDate?.value.slice(0, 4) ?? "unknown";
  const years = [...new Set(albums.map(yearOf))].sort((a, b) =>
    a === "unknown" ? 1 : b === "unknown" ? -1 : b.localeCompare(a),
  );
  const selected = filters.find((f) => f.id === filter)!;
  const visible = albums.filter(
    (a) => selected.matches(a) && (year === "all" || yearOf(a) === year),
  );
  const root = basePath.replace(/\/$/, "");
  return (
    <div>
      <div className="archive-controls">
        <label>
          Parcourir une année
          <select
            className="form-input"
            value={year}
            onChange={(event) => setYear(event.target.value)}
          >
            <option value="all">Toutes les années</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y === "unknown" ? "Date à confirmer" : y}
              </option>
            ))}
          </select>
        </label>
        <div
          className="archive-filters"
          role="group"
          aria-label="Filtrer les albums"
        >
          {filters
            .filter((f) => f.id === "all" || albums.some(f.matches))
            .map((f) => (
              <button
                type="button"
                key={f.id}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
        </div>
      </div>
      <p className="archive-results" aria-live="polite">
        {visible.length} {visible.length === 1 ? "album" : "albums"}
        {year !== "all" && year !== "unknown" ? ` · ${year}` : ""}
      </p>
      {visible.length ? (
        years.map((y) => {
          const grouped = visible.filter((a) => yearOf(a) === y);
          if (!grouped.length) return null;
          return (
            <section
              key={y}
              className="archive-year"
              aria-labelledby={`archive-${y}`}
            >
              <h2 id={`archive-${y}`}>
                {y === "unknown" ? "Date à confirmer" : y}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {grouped.map((album) => (
                  <AlbumCard
                    key={album.id}
                    album={album}
                    href={`${root}/${album.slug}`}
                  />
                ))}
              </div>
            </section>
          );
        })
      ) : (
        <EmptyAlbumState
          title="Aucun album pour cette sélection"
          message="Essayez une autre année ou choisissez Tous pour retrouver les autres collections."
        />
      )}
    </div>
  );
}
