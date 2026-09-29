import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { resolveMedia } from "@/lib/media";
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="page-intro">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lede">{description}</p>
      </div>
    </header>
  );
}
export function Section({
  id,
  eyebrow,
  title,
  children,
  tone = "",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  tone?: string;
}) {
  return (
    <section className={`editorial-section ${tone}`} aria-labelledby={id}>
      <div className="wrap">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 id={id}>{title}</h2>
        {children}
      </div>
    </section>
  );
}
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link className="text-link" href={href}>
      {children} <span aria-hidden="true">↗</span>
    </Link>
  );
}
export function MediaSlot({
  mediaId,
  label,
  portrait = false,
}: {
  mediaId?: string;
  label: string;
  portrait?: boolean;
}) {
  const media = resolveMedia(mediaId);
  return (
    <div className={`media-slot ${portrait ? "portrait" : ""}`}>
      {media ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain"
        />
      ) : (
        <div className="media-pending">
          <span className="media-line" aria-hidden="true" />
          <span>{label}</span>
          <small>Photographie à venir</small>
        </div>
      )}
    </div>
  );
}
