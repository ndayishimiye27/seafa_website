"use client";
import Image from "next/image";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import pages from "@/data/interview-book.json";
export function BookReader() {
  const searchParams = useSearchParams();
  const requestedPage = Number(searchParams.get("page") ?? 1);
  const number =
    Number.isInteger(requestedPage) &&
    requestedPage >= 1 &&
    requestedPage <= pages.length
      ? requestedPage
      : 1;
  const [original, setOriginal] = useState(false);
  const page = pages[number - 1];
  function go(value: number) {
    window.history.replaceState(null, "", `/interviews/book?page=${value}`);
  }
  return (
    <div>
      <div
        className="mb-6 flex flex-wrap items-center gap-3"
        aria-label="Navigation du livret"
      >
        <button
          className="button"
          disabled={number === 1}
          onClick={() => go(number - 1)}
        >
          Précédente
        </button>
        <label>
          Page{" "}
          <select
            className="form-input"
            value={number}
            onChange={(e) => go(Number(e.target.value))}
          >
            {pages.map((p) => (
              <option key={p.number} value={p.number}>
                {p.number} / {pages.length}
              </option>
            ))}
          </select>
        </label>
        <button
          className="button"
          disabled={number === pages.length}
          onClick={() => go(number + 1)}
        >
          Suivante
        </button>
        <button
          className="text-link"
          aria-pressed={original}
          onClick={() => setOriginal(!original)}
        >
          {original ? "Lire le texte" : "Voir la page du livret"}
        </button>
      </div>
      <p className="source">
        Document historique : les fonctions et les informations reflètent
        l’époque de sa rédaction. La transcription automatique peut contenir des
        erreurs ; la page reproduite fait référence. Cette édition publique
        conserve la pagination du livret et omet un passage retiré à la demande
        de SEAFA.
      </p>
      <h2 className="mb-6 text-2xl font-bold" aria-live="polite">
        Page {number}
      </h2>
      {original ? (
        <a
          href={`/book/page-${number}.jpg`}
          aria-label={`Agrandir la page ${number}`}
        >
          <Image
            src={`/book/page-${number}.jpg`}
            alt={`Page ${number} du livret SEAFA ; transcription disponible avec le bouton Lire le texte`}
            width={page.width}
            height={page.height}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 900px"
          />
        </a>
      ) : (
        <div className="reading-copy">
          {page.paragraphs.map((text, i) => (
            <p key={i} className="whitespace-pre-line">
              {text}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
