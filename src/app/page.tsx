import { HeroBackground } from "@/components/home/hero-background";
import Link from "next/link";
import { Presidency } from "@/components/home/presidency";
import { Section, TextLink, MediaSlot } from "@/components/ui/editorial";
import { Timeline } from "@/components/history/timeline";
import { AlbumCard } from "@/components/albums/album-card";
import { introduction } from "@/content/identity";
import { getPublishedAlbums } from "@/lib/content";
import { resolveMedia } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Saint Esprit Alumni Football Academy",
  "/",
);
const pillars = [
  [
    "Football & compétition",
    "Jouer ensemble, s’entraîner et progresser à travers les matches et les Challenges.",
    "/activities",
  ],
  [
    "Fraternité & solidarité",
    "Être présents les uns pour les autres, sur le terrain comme dans la vie.",
    "/community",
  ],
  [
    "Rencontres & transmission",
    "Partager les savoirs, célébrer les étapes et accompagner les générations qui suivent.",
    "/history",
  ],
  [
    "Communauté & développement",
    "Mettre nos compétences au service des jeunes, de la santé et de notre communauté.",
    "/about",
  ],
  [
    "Diaspora & implication",
    "Garder le lien avec SEAFA et contribuer à ses initiatives, où que l’on vive.",
    "/diaspora",
  ],
];
export default function HomePage() {
  const slides = [
    ["media-anniversaire-2026-001", "Le 13e anniversaire · septembre 2026"],
    ["october-7193fe2e8c92c8c3", "Football · tournoi de la communauté 2024"],
    [
      "media-community-2019-gitega-trip-gitega-trip-01",
      "Fraternité · voyage à Gitega 2019",
    ],
    [
      "media-events-2017-bubanza-orphanage-visit-bubanza-orphanage-visit-01",
      "Communauté · visite à Bubanza 2017",
    ],
    [
      "media-activities-2018-december-friendly-match-december-friendly-match-10",
      "Sur le terrain · décembre 2018",
    ],
  ].flatMap(([id, alt]) => {
    const media = resolveMedia(id);
    return media ? [{ src: media.src, alt }] : [];
  });
  const stories = [
    "seafa-lumitel",
    "anniversaire-2026",
    "events-2018-karera-falls",
    "conference-sante-2022",
  ]
    .map((id) => getPublishedAlbums().find((album) => album.id === id))
    .filter((album) => album !== undefined);
  return (
    <main>
      <section className="home-hero">
        <HeroBackground slides={slides} />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="wrap hero-content">
          <p className="eyebrow">Saint Esprit Alumni Football Academy</p>
          <h1>
            Le football nous réunit.
            <br />
            <span>La fraternité nous lie.</span>
          </h1>
          <p className="lede">
            Depuis 2013, anciens du Lycée du Saint Esprit et amis de SEAFA font
            vivre une même communauté de sport, de solidarité et de
            transmission.
          </p>
          <div className="actions">
            <Link className="button gold" href="/join">
              Rejoindre SEAFA
            </Link>
            <Link className="button outline" href="/history">
              Découvrir notre histoire
            </Link>
          </div>
          <div className="hero-foot">
            <span>Burundi · Une communauté sans frontières</span>
            <span>Tugire Iteka</span>
          </div>
        </div>
      </section>
      <Section
        id="introduction"
        eyebrow="L’esprit SEAFA"
        title="Une équipe. Des générations. Une famille."
      >
        <div className="split purpose-composition">
          <div>
            <p className="lead-copy">{introduction}</p>
            <TextLink href="/about">
              Découvrir SEAFA et ses engagements
            </TextLink>
          </div>
          <MediaSlot
            mediaId="media-community-2019-teza-trip-teza-trip-05"
            label="Des générations réunies"
          />
        </div>
      </Section>
      <Section
        id="activites"
        eyebrow="Ce que nous construisons ensemble"
        title="Sur le terrain et au-delà."
        tone="warm"
      >
        <div className="home-pillars">
          {pillars.map(([title, description, href], index) => (
            <article key={title}>
              <span className="value-number" aria-hidden="true">
                0{index + 1}
              </span>
              <h3>{title}</h3>
              <p>{description}</p>
              <TextLink href={href}>Découvrir</TextLink>
            </article>
          ))}
        </div>
      </Section>
      <Section
        id="histoire"
        eyebrow="Depuis 2013"
        title="Une histoire qui continue."
      >
        <Timeline compact />
        <TextLink href="/history">
          Parcourir notre histoire jusqu’en 2026
        </TextLink>
      </Section>
      <Presidency />
      <Section
        id="galerie"
        eyebrow="Notre mémoire en images"
        title="Nos meilleurs moments"
      >
        <div className="home-stories">
          {stories.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
        <TextLink href="/gallery">Explorer toutes les archives</TextLink>
      </Section>
      <Section
        id="rejoindre"
        eyebrow="Écrivons la suite ensemble"
        title="Votre place dans notre histoire."
        tone="navy"
      >
        <p className="lead-copy">
          Ancien du Lycée ou ami de SEAFA, au Burundi ou dans la diaspora :
          apportez votre énergie, vos idées et votre envie de contribuer.
        </p>
        <div className="actions">
          <Link className="button gold" href="/join">
            Devenir membre
          </Link>
          <TextLink href="/code-of-conduct">Nos engagements</TextLink>
        </div>
      </Section>
      <Section
        id="partenariats"
        eyebrow="Ensemble, plus loin"
        title="Construisons la suite ensemble."
        tone="warm"
      >
        <div className="split">
          <p className="lead-copy">
            Un projet sportif, une initiative pour les jeunes ou une compétence
            à partager : échangeons sur votre manière de soutenir SEAFA et sa
            communauté.
          </p>
          <div>
            <TextLink href="/contact">Proposer un partenariat</TextLink>
            <TextLink href="/request-match">Proposer un match amical</TextLink>
          </div>
        </div>
      </Section>
    </main>
  );
}
