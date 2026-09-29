import { foundationCopy } from "@/content/fr";
export function PagePlaceholder({ title }: { title: string }) {
  return (
    <section>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="mt-4 text-slate">{foundationCopy.notice}</p>
    </section>
  );
}
