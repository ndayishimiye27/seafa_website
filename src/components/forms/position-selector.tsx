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
  const [limit, setLimit] = useState("");
  return (
    <fieldset
      id="join-positions"
      tabIndex={-1}
      className="form-wide position-selector"
      aria-describedby="positions-help positions-error"
    >
      <legend>Postes de jeu *</legend>
      <p id="positions-help">
        Choisissez de 1 à 5 postes. Décochez un poste pour le remplacer.
      </p>
      <button
        type="button"
        className="position-view"
        aria-pressed={list}
        onClick={() => setList(!list)}
      >
        {list ? "Afficher le terrain" : "Afficher la liste"}
      </button>
      <div className={`position-pitch ${list ? "position-list" : ""}`}>
        {positions.map(([code, label, row, col]) => (
          <label
            key={code}
            className={
              value.includes(code)
                ? "position-choice selected"
                : "position-choice"
            }
            style={{ gridRow: row + 1, gridColumn: col }}
          >
            <input
              type="checkbox"
              name="positions"
              value={code}
              checked={value.includes(code)}
              aria-label={`${code} — ${label}`}
              aria-invalid={Boolean(error)}
              onChange={() => {
                if (value.includes(code)) {
                  onChange(value.filter((p) => p !== code));
                  setLimit("");
                } else if (value.length < 5) {
                  onChange([...value, code]);
                  setLimit("");
                } else
                  setLimit(
                    "Vous avez déjà choisi 5 postes. Décochez-en un avant d’en ajouter un autre.",
                  );
              }}
            />
            <span>
              <strong>{code}</strong>
              <span className="position-label">{label}</span>
            </span>
          </label>
        ))}
      </div>
      <p aria-live="polite">
        {value.length}/5 sélectionnés
        {value.length > 0 ? ` : ${value.join(", ")}` : ""}. {limit}
      </p>
      <p id="positions-error" className="field-error">
        {error}
      </p>
    </fieldset>
  );
}
