import { HighlightsSlideshow } from "@/components/highlights/highlights-slideshow";
import { TrainingVideo } from "@/components/activities/training-video";
import { ActivityCard } from "@/components/activities/activity-card";
import {
  getActiveHighlights,
  getPublishedActivities,
  getPastEvents,
} from "@/lib/content";
import Image from "next/image";
import Link from "next/link";
import { Section, TextLink, MediaSlot } from "@/components/ui/editorial";
import {
  ClubStatistics,
  IdentityValues,
  MissionVision,
  ActivityDimensions,
} from "@/components/home/sections";
import { Timeline } from "@/components/history/timeline";
import { InterviewGrid } from "@/components/interviews/interview-grid";
import { AwardCard } from "@/components/awards/award-card";
import { EventCard } from "@/components/events/event-card";
import { AlbumCard } from "@/components/albums/album-card";
import { introduction, sagesDescription } from "@/content/identity";
import { getPublishedAwards, getPublishedAlbums } from "@/lib/content";
import { getAllNewsArticles } from "@/data/news";
import { siteSettings } from "@/data/site-settings";
import { resolveMedia } from "@/lib/media";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Plus qu’une équipe. Une famille. Un héritage.",
  "/",
);
export default function HomePage() {
  const hero = resolveMedia(siteSettings.heroMediaId);
  const awards = getPublishedAwards().slice(0, 3);
  const events = getPastEvents().slice(0, 3);
  const activeHighlights = getActiveHighlights();
  const highlightedIds = new Set(
    activeHighlights.map((item) => item.relatedContent?.id),
  );
  const featuredActivities = getPublishedActivities()
    .filter((activity) => !highlightedIds.has(activity.id))
    .slice(0, 3);
  const usedAlbums = new Set(
    [
      ...events,
      ...awards,
      ...featuredActivities,
      ...getPublishedActivities().filter((activity) =>
        highlightedIds.has(activity.id),
      ),
    ].map((item) => item.albumId),
  );
  const albums = getPublishedAlbums()
    .filter((album) => !usedAlbums.has(album.id) && album.id !== "brand")
    .slice(0, 3);
  const news = getAllNewsArticles().slice(0, 3);
  return (
    <main>
      <section className="home-hero">
        {hero && (
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            preload
            sizes="100vw"
            className="object-cover"
          />
        )}
        <div className="hero-overlay" aria-hidden="true" />
        <div className="wrap hero-content">
          <p className="eyebrow">Saint Esprit Alumni Football Academy</p>
          <h1>
            Plus qu’une équipe.
            <br />
            <span>Une famille.</span>
            <br />
            Un héritage.
          </h1>
          <p className="lede">
            Depuis 2013, nous rassemblons les générations autour du football, de
            la dignité, de l’excellence et du service.
          </p>
          <div className="actions">
            <Link className="button gold" href="/history">
              Découvrir notre histoire <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button outline" href="/join">
              Nous rejoindre
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
        title="Le football nous réunit. Les valeurs nous font grandir."
      >
        <div className="split">
          <div>
            <p className="lead-copy">{introduction}</p>
            <TextLink href="/about">Découvrir SEAFA</TextLink>
            <TextLink href="/gallery/brand">SEAFA en images</TextLink>
          </div>
          <MediaSlot
            mediaId={siteSettings.introductionMediaId}
            label="Les liens qui nous unissent"
          />
        </div>
      </Section>
      <Section id="a-la-une" title="À retrouver dans nos archives.">
        <HighlightsSlideshow highlights={activeHighlights} />
      </Section>
      <ClubStatistics />
      <MissionVision />
      <IdentityValues />
      <Section
        id="histoire"
        eyebrow="Notre héritage"
        title="Une histoire qui se transmet."
        tone="warm"
      >
        <Timeline compact />
        <TextLink href="/history">Parcourir toute notre histoire</TextLink>
      </Section>
      <Section
        id="activites"
        eyebrow="Sur le terrain et au-delà"
        title="Jouer. Apprendre. Servir."
      >
        <ActivityDimensions />
        <div className="cards-three mt-8">
          {featuredActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
        <TrainingVideo />
      </Section>
      <Section
        id="membres"
        eyebrow="Les visages de SEAFA"
        title="Chaque génération a sa place."
        tone="navy"
      >
        <div className="split">
          <div>
            <p className="lead-copy">
              Joueurs, sages, femmes, familles et amis : des parcours
              différents, un même esprit de fraternité.
            </p>
            <TextLink href="/team">Notre équipe et nos membres</TextLink>
            <p className="source">
              La présentation de l’effectif et de la direction actuels est en
              préparation.
            </p>
          </div>
          <div className="inset-card">
            <h3>Les sages, une présence qui accompagne</h3>
            <p>{sagesDescription}</p>
          </div>
        </div>
      </Section>
      <Section
        id="diaspora"
        eyebrow="50 membres de la diaspora"
        title="Une famille au-delà des frontières."
      >
        <div className="reading-copy">
          <div>
            <p className="lead-copy">
              La distance change le quotidien, pas l’appartenance.
            </p>
            <p>
              Nos membres de la diaspora gardent le lien, partagent leur
              expérience, soutiennent les initiatives et font vivre l’identité
              de SEAFA au-delà du Burundi.
            </p>
            <TextLink href="/diaspora">
              Retrouver l’esprit de la diaspora
            </TextLink>
          </div>
        </div>
      </Section>
      <Section
        id="communaute"
        eyebrow="La force du collectif"
        title="Une communauté à laquelle contribuer."
        tone="warm"
      >
        <div className="split">
          <div>
            <p className="lead-copy">
              Les femmes prennent part à l’organisation, aux échanges, aux
              activités de santé et à la vie sociale de SEAFA.
            </p>
            <p>
              Leurs compétences et leurs idées, aux côtés des familles et des
              amis, enrichissent une communauté ouverte à plusieurs générations
              et à de nouvelles façons de participer.
            </p>
            <TextLink href="/community">Découvrir notre communauté</TextLink>
          </div>
          <MediaSlot
            mediaId={siteSettings.communityMediaId}
            label="Des talents et des générations réunis"
          />
        </div>
      </Section>
      <Section
        id="temoignages"
        eyebrow="Paroles et souvenirs"
        title="SEAFA, raconté de l’intérieur."
      >
        <InterviewGrid />
      </Section>
      <Section
        id="recompenses"
        eyebrow="Excellence et reconnaissance"
        title="Célébrer l’engagement."
        tone="warm"
      >
        {awards.length ? (
          <div className="cards-three">
            {awards.map((award) => (
              <AwardCard key={award.id} award={award} />
            ))}
          </div>
        ) : (
          <p>
            Les distinctions seront présentées après vérification des lauréats
            et des années.
          </p>
        )}
        <TextLink href="/awards">Toutes les récompenses</TextLink>
      </Section>
      <Section
        id="evenements"
        eyebrow="Rencontres et célébrations"
        title="Des rencontres qui nous rassemblent."
      >
        {events.length ? (
          <div className="cards-three">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <p className="empty-note">
            Aucun rendez-vous à venir n’est encore annoncé. Les dates seront
            publiées dès leur confirmation.
          </p>
        )}
        <TextLink href="/events">Consulter les événements</TextLink>
      </Section>
      <Section
        id="galerie"
        eyebrow="Notre mémoire en images"
        title="Des moments qui restent."
        tone="warm"
      >
        {albums.length ? (
          <div className="cards-three">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        ) : (
          <p className="empty-note">
            Nos archives photographiques se préparent. Les albums réuniront les
            souvenirs du terrain, des rencontres et des actions collectives.
          </p>
        )}
        <TextLink href="/gallery">Explorer la galerie</TextLink>
      </Section>
      <Section
        id="actualites"
        eyebrow="La vie de SEAFA"
        title="Nos actualités."
      >
        {news.length ? (
          <div className="cards-three">
            {news.map((article) => (
              <article className="inset-card" key={article.id}>
                <h3>{article.title}</h3>
                <p>{article.summary}</p>
                <TextLink href={`/news/${article.slug}`}>
                  Lire l’article
                </TextLink>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-note">
            Les prochaines actualités seront publiées ici après confirmation. En
            attendant, découvrez les étapes de notre histoire et les témoignages
            de notre communauté.
          </p>
        )}
        <TextLink href="/news">Toutes les actualités</TextLink>
      </Section>
      <Section
        id="rejoindre"
        eyebrow="Écrivons la suite ensemble"
        title="Votre place dans notre histoire."
        tone="navy"
      >
        <p className="lead-copy">
          Ancien du Lycée ou ami de SEAFA, au Burundi ou ailleurs : partagez vos
          idées, votre énergie et votre envie de contribuer.
        </p>
        <div className="actions">
          <Link className="button gold" href="/join">
            Nous rejoindre
          </Link>
          <Link className="button outline" href="/code-of-conduct">
            Nos engagements
          </Link>
        </div>
      </Section>
      <Section
        id="contact"
        eyebrow="Restons en lien"
        title="Une idée, une question, un souvenir ?"
      >
        <div className="split">
          <p className="lead-copy">
            Un projet à partager ou une archive à transmettre : la mémoire et
            l’avenir de SEAFA se construisent ensemble.
          </p>
          <div>
            <TextLink href="/contact">Contacter SEAFA</TextLink>
            <TextLink href="/request-match">Proposer un match amical</TextLink>
          </div>
        </div>
      </Section>
    </main>
  );
}
