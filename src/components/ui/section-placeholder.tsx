export function SectionPlaceholder({ title }: { title: string }) {
  return (
    <section aria-label={title}>
      <h2>{title}</h2>
      <p>Contenu officiel à fournir.</p>
    </section>
  );
}
