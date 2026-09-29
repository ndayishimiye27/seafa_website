import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";

import { siteSettings } from "@/data/site-settings";

const footerSections = [
  {
    title: "Découvrir",
    links: [
      { href: "/about", label: "À propos" },
      { href: "/history", label: "Notre histoire" },
      { href: "/team", label: "Équipe et leadership" },
      { href: "/gallery", label: "Galerie" },
      { href: "/interviews", label: "Témoignages" },
      { href: "/news", label: "Actualités" },
    ],
  },
  {
    title: "Le club",
    links: [
      { href: "/activities", label: "Activités et Challenges" },
      { href: "/events", label: "Événements" },
      { href: "/awards", label: "Prix et distinctions" },
      { href: "/code-of-conduct", label: "Code de conduite" },
      { href: "/community", label: "Communauté" },
      { href: "/diaspora", label: "Diaspora" },
    ],
  },
  {
    title: "Participer",
    links: [
      { href: "/join", label: "Rejoindre SEAFA" },
      { href: "/request-match", label: "Proposer un match" },
      { href: "/contact", label: "Nous contacter" },
      { href: "/privacy", label: "Confidentialité" },
    ],
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#04142b] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_2fr]">
          <div className="max-w-md">
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d0ad59]"
              aria-label="SEAFA — Accueil"
            >
              <BrandLogo
                variant="white"
                sizes="80px"
                className="h-20 w-auto object-contain"
              />

              <span className="text-2xl font-black tracking-[0.12em]">
                SEAFA
              </span>
            </Link>

            <p className="mt-6 leading-7 text-white/65">
              Depuis 2013, le football nous réunit. La fraternité, le partage et
              le service nous font grandir.
            </p>

            {siteSettings.socialLinks.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-3">
                {siteSettings.socialLinks.map((socialLink) => (
                  <li key={socialLink.url}>
                    <a
                      href={socialLink.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white/70 transition hover:border-white/35 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#d0ad59]"
                    >
                      {socialLink.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h2 className="text-sm font-bold uppercase tracking-[0.16em] text-[#d0ad59]">
                  {section.title}
                </h2>

                <ul className="mt-5 space-y-3">
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-white/65 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#d0ad59]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {currentYear} SEAFA. Tous droits réservés.</p>

          <p>Tugire Iteka.</p>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-white/65">
          Conçu et développé par{" "}
          <a
            href="https://www.techvlabs.org"
            className="underline underline-offset-4 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#d0ad59]"
          >
            TechVision Labs
          </a>
        </p>
      </div>
    </footer>
  );
}
