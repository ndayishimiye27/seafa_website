import Link from "next/link";

interface EmptyAlbumStateProps {
  title?: string;
  message?: string;
  actionLabel?: string;
  actionHref?: string;
}

export function EmptyAlbumState({
  title = "Contenu en préparation",
  message = "Cette collection sera publiée lorsque les informations et les photographies officielles seront disponibles.",
  actionLabel,
  actionHref,
}: EmptyAlbumStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-6 py-14 text-center sm:px-10 sm:py-20">
      <div
        className="mx-auto flex size-16 items-center justify-center rounded-full bg-[#071d3b] text-white"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 24 24"
          className="size-8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 16 5-5 4 4 2-2 7 6" />
          <circle cx="16" cy="9" r="1.5" />
        </svg>
      </div>

      <h2 className="mt-6 text-2xl font-bold text-[#071d3b]">{title}</h2>

      <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-600">
        {message}
      </p>

      {actionLabel && actionHref ? (
        <Link
          href={actionHref}
          className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-[#071d3b] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#173f73] focus:outline-none focus:ring-2 focus:ring-[#b7923d] focus:ring-offset-4"
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
