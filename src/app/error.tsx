"use client";
export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="page-intro">
      <div className="wrap">
        <p className="eyebrow">Un contretemps</p>
        <h1>La page n’a pas pu s’afficher.</h1>
        <p className="lede">Veuillez réessayer dans quelques instants.</p>
        <button className="button gold" type="button" onClick={reset}>
          Réessayer
        </button>
      </div>
    </main>
  );
}
