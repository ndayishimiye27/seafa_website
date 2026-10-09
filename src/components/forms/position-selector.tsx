"use client";
import { useSyncExternalStore } from "react";
import { positions } from "@/content/positions";
const subscribe = () => () => {};
const clientReady = () => true;
const serverReady = () => false;
export function PositionSelector({
  value,
  onChange,
  error,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}) {
  const full = value.length >= 5;
  const ready = useSyncExternalStore(subscribe, clientReady, serverReady);
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
        Choisissez de 1 à 5 postes sur le terrain. Utilisez Tab pour parcourir
        les postes, puis Entrée ou Espace pour sélectionner.
      </p>
      <div
        className="position-pitch"
        role="group"
        aria-label="Choisir les postes sur le terrain"
        aria-busy={!ready}
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
            disabled={!ready || (full && !value.includes(code))}
            onClick={() => toggle(code)}
            className={`position-choice ${value.includes(code) ? "selected" : ""}`}
            style={{ gridRow: row + 1, gridColumn: col }}
          >
            <strong>{code}</strong>
            <span className="pitch-tooltip">{label}</span>
          </button>
        ))}
      </div>
      <p
        id="positions-count"
        className="selected-position-title"
        aria-live="polite"
      >
        Postes sélectionnés ({value.length}/5)
      </p>
      <div
        className="selected-position-chips"
        role="group"
        aria-label="Postes sélectionnés"
      >
        {value.map((code) => (
          <button
            key={code}
            type="button"
            className="position-chip"
            aria-label={`Retirer ${code} — ${positions.find((p) => p[0] === code)?.[1]}`}
            onClick={() => toggle(code)}
          >
            {code} <span aria-hidden="true">×</span>
          </button>
        ))}
      </div>
      {full && (
        <p className="position-limit" role="status">
          Vous avez déjà choisi 5 postes. Retirez-en un avant d’en ajouter un
          autre.
        </p>
      )}
      <p id="positions-error" className="field-error">
        {error}
      </p>
    </fieldset>
  );
}
