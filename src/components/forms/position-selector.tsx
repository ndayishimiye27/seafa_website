"use client";
import { useState } from "react";
import { positions } from "@/content/positions";

export function PositionSelector({
  value,
  onChange,
  error,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}) {
  const [list, setList] = useState(false);
  const full = value.length >= 5;
  function toggle(code: string) {
    if (value.includes(code)) onChange(value.filter((p) => p !== code));
    else if (!full) onChange([...value, code]);
  }
  return (
    <fieldset
      id="join-positions"
      tabIndex={-1}
      className="form-wide position-selector"
      aria-describedby="positions-help positions-count positions-error"
    >
      <legend>Postes de jeu *</legend>
      <p id="positions-help">
        Sélectionnez jusqu’à 5 postes. Choisissez au moins un poste. Décochez un
        poste pour le remplacer.
      </p>
      <p id="positions-count" aria-live="polite">
        {value.length} / 5 {value.length === 1 ? "sélectionné" : "sélectionnés"}
        {value.length ? ` : ${value.join(", ")}` : ""}.
        {full
          ? " Vous avez déjà choisi 5 postes. Décochez-en un avant d’en ajouter un autre."
          : ""}
      </p>
      <button
        type="button"
        className="position-view"
        aria-expanded={!list}
        aria-controls="positions-pitch"
        onClick={() => setList(!list)}
      >
        {list ? "Afficher le terrain" : "Afficher la liste"}
      </button>
      <div
        id="positions-pitch"
        hidden={list}
        className="position-pitch"
        role="group"
        aria-label="Choisir les postes sur le terrain"
      >
        <div className="pitch-halfway" aria-hidden="true" />
        <div className="pitch-box top" aria-hidden="true" />
        <div className="pitch-box bottom" aria-hidden="true" />
        {positions.map(([code, label, row, col]) => (
          <button
            key={code}
            type="button"
            title={`${code} — ${label}`}
            aria-label={`${code} — ${label}, sur le terrain`}
            aria-pressed={value.includes(code)}
            disabled={full && !value.includes(code)}
            onClick={() => toggle(code)}
            className={`position-choice ${value.includes(code) ? "selected" : ""}`}
            style={{ gridRow: row + 1, gridColumn: col }}
          >
            <strong>{code}</strong>
            <span className="pitch-tooltip">{label}</span>
          </button>
        ))}
      </div>
      <p className="position-list-heading">
        Tous les postes — choisissez sur le terrain ou dans la liste
      </p>
      <div className="position-accessible-list">
        {positions.map(([code, label]) => (
          <label
            key={code}
            className={`position-list-choice ${value.includes(code) ? "selected" : ""}`}
          >
            <input
              type="checkbox"
              name="positions"
              value={code}
              checked={value.includes(code)}
              disabled={full && !value.includes(code)}
              aria-invalid={Boolean(error)}
              onChange={() => toggle(code)}
            />
            <span>
              <strong>{code}</strong> — <span>{label}</span>
            </span>
          </label>
        ))}
      </div>
      <p id="positions-error" className="field-error">
        {error}
      </p>
    </fieldset>
  );
}
