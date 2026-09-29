import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[65vh] items-center bg-[#071d3b] text-white">
      <div className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-7xl font-black text-[#d0ad59] sm:text-8xl">404</p>

        <p className="mt-6 text-sm font-bold uppercase tracking-[0.2em] text-white/55">
          Page introuvable
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
          Cette page n’est pas disponible
        </h1>

        <p className="mx-auto mt-5 max-w-xl leading-8 text-white/70">
          Le contenu recherché n’existe pas, n’est pas encore publié ou a été
          déplacé.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#806026] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#806026] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-[#071d3b]"
          >
            Retour à l’accueil
          </Link>

          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[#d0ad59]"
          >
            Nous contacter
          </Link>
        </div>
      </div>
    </main>
  );
}
