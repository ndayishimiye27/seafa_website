export default function Loading() {
  return (
    <main className="min-h-[60vh] bg-white" aria-busy="true" aria-live="polite">
      <span className="sr-only">Chargement de la page…</span>

      <div className="animate-pulse">
        <div className="bg-[#071d3b]">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="h-4 w-40 rounded bg-white/15" />
            <div className="mt-6 h-12 max-w-2xl rounded bg-white/15" />
            <div className="mt-5 h-5 max-w-xl rounded bg-white/10" />
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-2xl border border-slate-200"
              >
                <div className="aspect-[4/3] bg-slate-200" />

                <div className="space-y-3 p-6">
                  <div className="h-4 w-24 rounded bg-slate-200" />
                  <div className="h-6 w-4/5 rounded bg-slate-200" />
                  <div className="h-4 w-full rounded bg-slate-100" />
                  <div className="h-4 w-3/4 rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
