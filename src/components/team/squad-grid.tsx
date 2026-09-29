"use client";
import { useState } from "react";
import { PlayerCard } from "@/components/team/player-card";
import type { Player } from "@/types/content";
export function SquadGrid({ players }: { players: readonly Player[] }) {
  const [filter, setFilter] = useState("all");
  if (!players.length)
    return (
      <p className="empty-note">
        Les portraits et les informations de l’effectif actuel seront publiés
        après confirmation.
      </p>
    );
  const filtered = players.filter(
    (p) =>
      filter === "all" ||
      (filter === "captain"
        ? p.captaincy === "captain" || p.captaincy === "vice-captain"
        : p.position === filter),
  );
  return (
    <div>
      <label htmlFor="squad-filter">Filtrer les joueurs</label>
      <select
        id="squad-filter"
        className="form-input"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      >
        {[
          ["all", "Tous"],
          ["goalkeeper", "Gardiens"],
          ["defender", "Défenseurs"],
          ["midfielder", "Milieux"],
          ["forward", "Attaquants"],
          ["captain", "Capitaines"],
        ].map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <p role="status">{filtered.length} joueur(s) affiché(s)</p>
      <div className="cards-three">
        {filtered.map((p) => (
          <PlayerCard key={p.id} player={p} />
        ))}
      </div>
    </div>
  );
}
