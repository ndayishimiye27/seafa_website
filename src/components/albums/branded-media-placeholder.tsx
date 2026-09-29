interface BrandedMediaPlaceholderProps {
  label?: string;
  className?: string;
}

export function BrandedMediaPlaceholder({
  label = "Photographie à venir",
  className = "",
}: BrandedMediaPlaceholderProps) {
  return (
    <div
      className={`relative flex min-h-56 items-center justify-center overflow-hidden bg-[#071d3b] text-white ${className}`}
      role="img"
      aria-label={label}
    >
      <div
        className="absolute inset-0 opacity-30"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 32%), radial-gradient(circle at 80% 75%, rgba(183,146,61,0.22), transparent 30%)",
        }}
      />

      <div className="relative flex flex-col items-center gap-3 px-6 text-center">
        <div
          className="flex size-14 items-center justify-center rounded-full border border-white/25 bg-white/10"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M4 18.5V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11.5" />
            <path d="m4 16 4.5-4.5 3 3 2-2 6.5 6.5" />
            <circle cx="15.5" cy="9" r="1.5" />
          </svg>
        </div>

        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
          SEAFA
        </span>

        <span className="max-w-52 text-sm text-white/65">{label}</span>
      </div>
    </div>
  );
}
