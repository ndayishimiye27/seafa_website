import { anniversaryAlbum } from "@/data/anniversary-2026";
import { octoberAlbums, tournamentDescription } from "@/data/october-content";
import { octoberGroups } from "@/data/october-media";
import type { Album } from "@/types/content";
import { mediaAssets } from "@/data/media";
import { reorganizedAlbums } from "@/data/media-reorganization";
import selectedCovers from "@/data/featured-album-covers.json";
import selectedPhotos from "@/data/featured-album-photos.json";
import {
  albumAdditions,
  additionalAlbumPhotos,
  excludedPhotoSources,
} from "@/data/gallery-curation";

/**
 * Canonical album registry.
 *
 * Important:
 * - One album must have only one canonical record.
 * - Activities, Challenges, events and awards reference albums by ID.
 * - Draft albums are never displayed publicly.
 * - Do not publish an album until its official information has been verified.
 */
const pendingAlbums: Album[] = [
  {
    id: "anniversaire-2018",
    slug: "anniversaire-2018",
    title: "Anniversaire SEAFA — août 2018",
    type: "event",
    categoryLabel: "Anniversaire",
    images: [],
    eventDate: {
      value: "2018-08",
      precision: "month",
    },
    summary:
      "Album en préparation. Les informations officielles et les photographies doivent encore être ajoutées.",
    relatedContent: [],
    featured: false,
    publicationStatus: "draft",
  },
  {
    id: "seafa-lumitel",
    slug: "seafa-lumitel",
    title: "SEAFA vs Lumitel",
    type: "activity",
    categoryLabel: "Match amical",
    images: [],
    summary:
      "Album en préparation. La date, le lieu, les informations du match et les photographies doivent être confirmés.",
    relatedContent: [],
    featured: false,
    publicationStatus: "draft",
  },
  {
    id: "physiotherapie",
    slug: "physiotherapie",
    title: "Séance de physiothérapie",
    type: "activity",
    categoryLabel: "Santé et bien-être",
    images: [],
    summary:
      "Album en préparation. Les informations et les photographies officielles doivent encore être ajoutées.",
    relatedContent: [],
    featured: false,
    publicationStatus: "draft",
  },
  {
    id: "visite-cascade",
    slug: "visite-cascade",
    title: "Visite d’une cascade",
    type: "activity",
    categoryLabel: "Visite et excursion",
    images: [],
    summary:
      "Album en préparation. La date, le lieu et les photographies doivent encore être confirmés.",
    relatedContent: [],
    featured: false,
    publicationStatus: "draft",
  },
  {
    id: "matches-challenges",
    slug: "matches-challenges",
    title: "Matches et Challenges internes",
    type: "challenge",
    categoryLabel: "SEAFA Challenges",
    images: [],
    summary:
      "Collection en préparation pour les matches et les Challenges internes de SEAFA.",
    relatedContent: [],
    featured: false,
    publicationStatus: "draft",
  },
  {
    id: "prix-celebrations",
    slug: "prix-celebrations",
    title: "Prix et célébrations",
    type: "award",
    categoryLabel: "Prix et distinctions",
    images: [],
    summary:
      "Collection en préparation. Les lauréats, les années et les photographies doivent être officiellement confirmés.",
    relatedContent: [],
    featured: false,
    publicationStatus: "draft",
  },
  {
    id: "communaute-femmes",
    slug: "communaute-femmes",
    title: "Activités communautaires et féminines",
    type: "community",
    categoryLabel: "Communauté",
    images: [],
    summary:
      "Collection consacrée à la participation des femmes, des familles et des amis à la vie sociale, éducative et sportive de SEAFA.",
    relatedContent: [],
    featured: false,
    publicationStatus: "draft",
  },
  {
    id: "archives",
    slug: "archives",
    title: "Archives historiques",
    type: "history",
    categoryLabel: "Histoire et héritage",
    images: [],
    summary:
      "Collection destinée à préserver les photographies et les moments historiques officiellement documentés de SEAFA.",
    relatedContent: [],
    featured: false,
    publicationStatus: "draft",
  },
];

const suppliedAlbums: Album[] = [
  {
    id: "activities-2016-match",
    slug: "activities-2016-match",
    title: "Match — 2016",
    type: "activity",
    category: "football",
    categoryLabel: "Football",
    coverMediaId: "media-activities-2016-match-match-01",
    images: [
      {
        mediaId: "media-activities-2016-match-match-01",
        order: 1,
      },
    ],
    eventDate: {
      value: "2016",
      precision: "year",
    },
    summary:
      "Sur le terrain avec SEAFA. Ces photographies conservent les rencontres de football de nos archives.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-activities-2016-match",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activities-2017-friendly-match",
    slug: "activities-2017-friendly-match",
    title: "Match amical — 2017",
    type: "activity",
    category: "football",
    categoryLabel: "Football",
    coverMediaId: "media-activities-2017-friendly-match-friendly-match-01",
    images: [
      {
        mediaId: "media-activities-2017-friendly-match-friendly-match-01",
        order: 1,
      },
      {
        mediaId: "media-activities-2017-friendly-match-friendly-match-02",
        order: 2,
      },
      {
        mediaId: "media-activities-2017-friendly-match-friendly-match-03",
        order: 3,
      },
      {
        mediaId: "media-activities-2017-friendly-match-friendly-match-04",
        order: 4,
      },
    ],
    eventDate: {
      value: "2017",
      precision: "year",
    },
    summary:
      "Sur le terrain avec SEAFA. Ces photographies conservent les rencontres de football de nos archives.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-activities-2017-friendly-match",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activities-2018-december-friendly-match",
    slug: "activities-2018-december-friendly-match",
    title: "Match amical de décembre — 2018",
    type: "activity",
    category: "football",
    categoryLabel: "Football",
    coverMediaId:
      "media-activities-2018-december-friendly-match-december-friendly-match-10",
    images: [
      {
        mediaId:
          "media-activities-2018-december-friendly-match-december-friendly-match-01",
        order: 1,
      },
      {
        mediaId:
          "media-activities-2018-december-friendly-match-december-friendly-match-02",
        order: 2,
      },
      {
        mediaId:
          "media-activities-2018-december-friendly-match-december-friendly-match-03",
        order: 3,
      },
      {
        mediaId:
          "media-activities-2018-december-friendly-match-december-friendly-match-04",
        order: 4,
      },
      {
        mediaId:
          "media-activities-2018-december-friendly-match-december-friendly-match-05",
        order: 5,
      },
      {
        mediaId:
          "media-activities-2018-december-friendly-match-december-friendly-match-06",
        order: 6,
      },
      {
        mediaId:
          "media-activities-2018-december-friendly-match-december-friendly-match-07",
        order: 7,
      },
      {
        mediaId:
          "media-activities-2018-december-friendly-match-december-friendly-match-08",
        order: 8,
      },
      {
        mediaId:
          "media-activities-2018-december-friendly-match-december-friendly-match-09",
        order: 9,
      },
      {
        mediaId:
          "media-activities-2018-december-friendly-match-december-friendly-match-10",
        order: 10,
      },
    ],
    eventDate: {
      value: "2018-12",
      precision: "month",
    },
    summary:
      "Sur le terrain avec SEAFA. Ces photographies conservent les rencontres de football de nos archives.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-activities-2018-december-friendly-match",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activities-2019-friendly-matches",
    slug: "activities-2019-friendly-matches",
    title: "Matches amicaux — 2019",
    type: "activity",
    category: "football",
    categoryLabel: "Football",
    coverMediaId: "media-activities-2019-friendly-matches-friendly-match-01",
    images: [
      {
        mediaId: "media-activities-2019-friendly-matches-friendly-match-01",
        order: 1,
      },
      {
        mediaId: "media-activities-2019-friendly-matches-friendly-match-02",
        order: 2,
      },
      {
        mediaId: "media-activities-2019-friendly-matches-friendly-match-03",
        order: 3,
      },
      {
        mediaId: "media-activities-2019-friendly-matches-friendly-match-04",
        order: 4,
      },
      {
        mediaId: "media-activities-2019-friendly-matches-friendly-match-05",
        order: 5,
      },
      {
        mediaId: "media-activities-2019-friendly-matches-friendly-match-06",
        order: 6,
      },
    ],
    eventDate: {
      value: "2019",
      precision: "year",
    },
    summary:
      "Sur le terrain avec SEAFA. Ces photographies conservent les rencontres de football de nos archives.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-activities-2019-friendly-matches",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activities-2019-stadium-match-congolese-team",
    slug: "activities-2019-stadium-match-congolese-team",
    title: "Match au stade avec une équipe congolaise — 2019",
    type: "activity",
    category: "football",
    categoryLabel: "Football",
    coverMediaId:
      "media-activities-2019-stadium-match-congolese-team-stadium-match-congolese-team-06",
    images: [
      {
        mediaId:
          "media-activities-2019-stadium-match-congolese-team-stadium-match-congolese-team-01",
        order: 1,
      },
      {
        mediaId:
          "media-activities-2019-stadium-match-congolese-team-stadium-match-congolese-team-02",
        order: 2,
      },
      {
        mediaId:
          "media-activities-2019-stadium-match-congolese-team-stadium-match-congolese-team-03",
        order: 3,
      },
      {
        mediaId:
          "media-activities-2019-stadium-match-congolese-team-stadium-match-congolese-team-04",
        order: 4,
      },
      {
        mediaId:
          "media-activities-2019-stadium-match-congolese-team-stadium-match-congolese-team-05",
        order: 5,
      },
      {
        mediaId:
          "media-activities-2019-stadium-match-congolese-team-stadium-match-congolese-team-06",
        order: 6,
      },
    ],
    eventDate: {
      value: "2019",
      precision: "year",
    },
    summary:
      "Sur le terrain avec SEAFA. Ces photographies conservent les rencontres de football de nos archives.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-activities-2019-stadium-match-congolese-team",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activities-2019-tournament",
    slug: "activities-2019-tournament",
    title: "Tournoi — 2019",
    type: "activity",
    category: "football",
    categoryLabel: "Football",
    coverMediaId: "media-activities-2019-tournament-tournament-10",
    images: [
      {
        mediaId: "media-activities-2019-tournament-tournament-01",
        order: 1,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-02",
        order: 2,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-03",
        order: 3,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-04",
        order: 4,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-05",
        order: 5,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-06",
        order: 6,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-07",
        order: 7,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-08",
        order: 8,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-09",
        order: 9,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-10",
        order: 10,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-11",
        order: 11,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-12",
        order: 12,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-13",
        order: 13,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-14",
        order: 14,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-15",
        order: 15,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-16",
        order: 16,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-17",
        order: 17,
      },
      {
        mediaId: "media-activities-2019-tournament-tournament-18",
        order: 18,
      },
    ],
    eventDate: {
      value: "2019",
      precision: "year",
    },
    summary:
      "Sur le terrain avec SEAFA. Ces photographies conservent les rencontres de football de nos archives.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-activities-2019-tournament",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activities-2020-friendly-match",
    slug: "activities-2020-friendly-match",
    title: "Match amical — 2020",
    type: "activity",
    category: "football",
    categoryLabel: "Football",
    coverMediaId: "media-activities-2020-friendly-match-friendly-match-02",
    images: [
      {
        mediaId: "media-activities-2020-friendly-match-friendly-match-01",
        order: 1,
      },
      {
        mediaId: "media-activities-2020-friendly-match-friendly-match-02",
        order: 2,
      },
      {
        mediaId: "media-activities-2020-friendly-match-friendly-match-03",
        order: 3,
      },
      {
        mediaId: "media-activities-2020-friendly-match-friendly-match-04",
        order: 4,
      },
      {
        mediaId: "media-activities-2020-friendly-match-friendly-match-05",
        order: 5,
      },
      {
        mediaId: "media-activities-2020-friendly-match-friendly-match-06",
        order: 6,
      },
      {
        mediaId: "media-activities-2020-friendly-match-friendly-match-07",
        order: 7,
      },
    ],
    eventDate: {
      value: "2020",
      precision: "year",
    },
    summary:
      "Sur le terrain avec SEAFA. Ces photographies conservent les rencontres de football de nos archives.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-activities-2020-friendly-match",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activities-2024-tournament",
    slug: "activities-2024-tournament",
    title: "Tournoi — 2024",
    type: "activity",
    category: "football",
    categoryLabel: "Football",
    coverMediaId: "media-activities-2024-tournament-team-b-01",
    images: [
      {
        mediaId: "media-activities-2024-tournament-team-b-01",
        order: 1,
      },
      {
        mediaId: "media-activities-2024-tournament-team-b-02",
        order: 2,
      },
      {
        mediaId: "media-activities-2024-tournament-team-victory",
        order: 3,
      },
      {
        mediaId: "media-activities-2024-tournament-tournament-01",
        order: 4,
      },
      {
        mediaId: "media-activities-2024-tournament-tournament-02",
        order: 5,
      },
      {
        mediaId: "media-activities-2024-tournament-tournament-03",
        order: 6,
      },
      {
        mediaId: "media-activities-2024-tournament-tournament-04",
        order: 7,
      },
      {
        mediaId: "media-activities-2024-tournament-tournament-05",
        order: 8,
      },
      {
        mediaId: "media-activities-2024-tournament-tournament-06",
        order: 9,
      },
      {
        mediaId: "media-activities-2024-tournament-tournament-07",
        order: 10,
      },
      {
        mediaId: "media-activities-2024-tournament-trophy-lifting",
        order: 11,
      },
    ],
    eventDate: {
      value: "2024",
      precision: "year",
    },
    summary:
      "Sur le terrain avec SEAFA. Ces photographies conservent les rencontres de football de nos archives.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-activities-2024-tournament",
      },
    ],
    featured: true,
    publicationStatus: "published",
  },
  {
    id: "awards-2014",
    slug: "awards-2014",
    title: "Photographies de distinctions — 2014",
    type: "award",
    category: "awards",
    categoryLabel: "Prix et distinctions",
    coverMediaId: "media-awards-2014-jacques-best-young-player",
    images: [
      {
        mediaId: "media-awards-2014-jacques-best-young-player",
        order: 1,
      },
    ],
    eventDate: {
      value: "2014",
      precision: "year",
    },
    summary:
      "Des photographies de remise de distinctions. Les noms et les catégories non confirmés restent à préciser.",
    relatedContent: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "awards-2015",
    slug: "awards-2015",
    title: "Photographies de distinctions — 2015",
    type: "award",
    category: "awards",
    categoryLabel: "Prix et distinctions",
    coverMediaId: "media-awards-2015-alain-best-player",
    images: [
      {
        mediaId: "media-awards-2015-alain-best-player",
        order: 1,
      },
    ],
    eventDate: {
      value: "2015",
      precision: "year",
    },
    summary:
      "Des photographies de remise de distinctions. Les noms et les catégories non confirmés restent à préciser.",
    relatedContent: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "awards-2016",
    slug: "awards-2016",
    title: "Photographies de distinctions — 2016",
    type: "award",
    category: "awards",
    categoryLabel: "Prix et distinctions",
    coverMediaId: "media-awards-2016-ezako-tony-best-player",
    images: [
      {
        mediaId: "media-awards-2016-ezako-tony-best-player",
        order: 1,
      },
    ],
    eventDate: {
      value: "2016",
      precision: "year",
    },
    summary:
      "Des photographies de remise de distinctions. Les noms et les catégories non confirmés restent à préciser.",
    relatedContent: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "awards-2018",
    slug: "awards-2018",
    title: "Photographies de distinctions — 2018",
    type: "award",
    category: "awards",
    categoryLabel: "Prix et distinctions",
    coverMediaId: "media-awards-2018-leadership-arnaud-badogomba",
    images: [
      {
        mediaId: "media-awards-2018-leadership-arnaud-badogomba",
        order: 1,
      },
      {
        mediaId: "media-awards-2018-leadership-orton",
        order: 2,
      },
      {
        mediaId: "media-awards-2018-leadership-vincent",
        order: 3,
      },
    ],
    eventDate: {
      value: "2018",
      precision: "year",
    },
    summary:
      "Des photographies de remise de distinctions. Les noms et les catégories non confirmés restent à préciser.",
    relatedContent: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "brand",
    slug: "brand",
    title: "SEAFA en images",
    type: "general",
    categoryLabel: "SEAFA",
    coverMediaId: "media-brand-seafa-main-background-2013",
    images: [
      {
        mediaId: "media-brand-seafa-hero-background-02",
        order: 1,
      },
      {
        mediaId: "media-brand-seafa-hero-background",
        order: 2,
      },
      {
        mediaId: "media-brand-seafa-main-background-2013",
        order: 3,
      },
    ],
    summary:
      "SEAFA en images. Un souvenir conservé dans la mémoire photographique de SEAFA.",
    relatedContent: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "community-2017-arcade-home-visit",
    slug: "community-2017-arcade-home-visit",
    title: "Visite chez Arcade — 2017",
    type: "community",
    category: "community",
    categoryLabel: "Communauté",
    coverMediaId: "media-community-2017-arcade-home-visit-arcade-home-visit-02",
    images: [
      {
        mediaId: "media-community-2017-arcade-home-visit-arcade-home-visit-01",
        order: 1,
      },
      {
        mediaId: "media-community-2017-arcade-home-visit-arcade-home-visit-02",
        order: 2,
      },
      {
        mediaId: "media-community-2017-arcade-home-visit-arcade-home-visit-03",
        order: 3,
      },
    ],
    eventDate: {
      value: "2017",
      precision: "year",
    },
    summary:
      "Visite chez Arcade — 2017. Une rencontre qui témoigne des liens de notre communauté.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-community-2017-arcade-home-visit",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "community-2019-gitega-trip",
    slug: "community-2019-gitega-trip",
    title: "Voyage à Gitega — 2019",
    type: "community",
    category: "trips",
    categoryLabel: "Communauté",
    coverMediaId: "media-community-2019-gitega-trip-gitega-trip-01",
    images: [
      {
        mediaId: "media-community-2019-gitega-trip-gitega-trip-01",
        order: 1,
      },
      {
        mediaId: "media-community-2019-gitega-trip-gitega-trip-02",
        order: 2,
      },
      {
        mediaId: "media-community-2019-gitega-trip-gitega-trip-03",
        order: 3,
      },
      {
        mediaId: "media-community-2019-gitega-trip-gitega-trip-04",
        order: 4,
      },
      {
        mediaId: "media-community-2019-gitega-trip-gitega-trip-05",
        order: 5,
      },
      {
        mediaId: "media-community-2019-gitega-trip-gitega-trip-06",
        order: 6,
      },
      {
        mediaId: "media-community-2019-gitega-trip-gitega-trip-07",
        order: 7,
      },
      {
        mediaId: "media-community-2019-gitega-trip-gitega-trip-08",
        order: 8,
      },
      {
        mediaId: "media-community-2019-gitega-trip-gitega-trip-09",
        order: 9,
      },
    ],
    eventDate: {
      value: "2019",
      precision: "year",
    },
    summary:
      "Voyage à Gitega — 2019. Des moments de rencontre et de découverte au-delà du terrain.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-community-2019-gitega-trip",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "community-2019-jenda-excursion",
    slug: "community-2019-jenda-excursion",
    title: "Excursion à Jenda — 2019",
    type: "community",
    category: "trips",
    categoryLabel: "Communauté",
    coverMediaId: "media-community-2019-jenda-excursion-jenda-excursion-01",
    images: [
      {
        mediaId: "media-community-2019-jenda-excursion-jenda-excursion-01",
        order: 1,
      },
    ],
    eventDate: {
      value: "2019",
      precision: "year",
    },
    summary:
      "Excursion à Jenda — 2019. Des moments de rencontre et de découverte au-delà du terrain.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-community-2019-jenda-excursion",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "community-2019-mentoring",
    slug: "community-2019-mentoring",
    title: "Accompagnement des jeunes du Saint Esprit — 2019",
    type: "community",
    category: "education",
    categoryLabel: "Communauté",
    coverMediaId: "media-community-2019-saint-esprit-youth-mentoring",
    images: [
      {
        mediaId: "media-community-2019-saint-esprit-youth-mentoring",
        order: 1,
      },
    ],
    eventDate: {
      value: "2019",
      precision: "year",
    },
    summary:
      "Accompagnement des jeunes du Saint Esprit — 2019. Le partage des connaissances et le dialogue entre générations en images.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-community-2019-mentoring",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "community-2019-teza-trip",
    slug: "community-2019-teza-trip",
    title: "Voyage à Teza — 2019",
    type: "community",
    category: "trips",
    categoryLabel: "Communauté",
    coverMediaId: "media-community-2019-teza-trip-teza-trip-05",
    images: [
      {
        mediaId: "media-community-2019-teza-trip-teza-trip-01",
        order: 1,
      },
      {
        mediaId: "media-community-2019-teza-trip-teza-trip-02",
        order: 2,
      },
      {
        mediaId: "media-community-2019-teza-trip-teza-trip-03",
        order: 3,
      },
      {
        mediaId: "media-community-2019-teza-trip-teza-trip-04",
        order: 4,
      },
      {
        mediaId: "media-community-2019-teza-trip-teza-trip-05",
        order: 5,
      },
      {
        mediaId: "media-community-2019-teza-trip-teza-trip-06",
        order: 6,
      },
      {
        mediaId: "media-community-2019-teza-trip-teza-trip-07",
        order: 7,
      },
      {
        mediaId: "media-community-2019-teza-trip-teza-trip-08",
        order: 8,
      },
      {
        mediaId: "media-community-2019-teza-trip-teza-trip-09",
        order: 9,
      },
      {
        mediaId: "media-community-2019-teza-trip-teza-trip-10",
        order: 10,
      },
      {
        mediaId: "media-community-2019-teza-trip-teza-trip-11",
        order: 11,
      },
      {
        mediaId: "media-community-2019-teza-trip-teza-trip-12",
        order: 12,
      },
      {
        mediaId: "media-community-2019-teza-trip-teza-trip-13",
        order: 13,
      },
    ],
    eventDate: {
      value: "2019",
      precision: "year",
    },
    summary:
      "Voyage à Teza — 2019. Des moments de rencontre et de découverte au-delà du terrain.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-community-2019-teza-trip",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "community-2019-walk",
    slug: "community-2019-walk",
    title: "Marche communautaire — 2019",
    type: "community",
    category: "community",
    categoryLabel: "Communauté",
    coverMediaId: "media-community-2019-walk-community-walk-01",
    images: [
      {
        mediaId: "media-community-2019-walk-community-walk-01",
        order: 1,
      },
      {
        mediaId: "media-community-2019-walk-community-walk-02",
        order: 2,
      },
      {
        mediaId: "media-community-2019-walk-community-walk-03",
        order: 3,
      },
      {
        mediaId: "media-community-2019-walk-community-walk-04",
        order: 4,
      },
      {
        mediaId: "media-community-2019-walk-community-walk-05",
        order: 5,
      },
      {
        mediaId: "media-community-2019-walk-community-walk-06",
        order: 6,
      },
      {
        mediaId: "media-community-2019-walk-community-walk-07",
        order: 7,
      },
      {
        mediaId: "media-community-2019-walk-community-walk-08",
        order: 8,
      },
      {
        mediaId: "media-community-2019-walk-community-walk-09",
        order: 9,
      },
      {
        mediaId: "media-community-2019-walk-community-walk-10",
        order: 10,
      },
      {
        mediaId: "media-community-2019-walk-community-walk-11",
        order: 11,
      },
      {
        mediaId: "media-community-2019-walk-community-walk-12",
        order: 12,
      },
      {
        mediaId: "media-community-2019-walk-community-walk-13",
        order: 13,
      },
      {
        mediaId: "media-community-2019-walk-community-walk-14",
        order: 14,
      },
    ],
    eventDate: {
      value: "2019",
      precision: "year",
    },
    summary:
      "Marche communautaire — 2019. Des moments de rencontre et de découverte au-delà du terrain.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-community-2019-walk",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "community-2021-placide-conference-saint-esprit",
    slug: "community-2021-placide-conference-saint-esprit",
    title: "Conférence de Placide au Saint Esprit — 2021",
    type: "community",
    category: "education",
    categoryLabel: "Communauté",
    coverMediaId:
      "media-community-2021-placide-conference-saint-esprit-placide-conference-saint-esprit-01",
    images: [
      {
        mediaId:
          "media-community-2021-placide-conference-saint-esprit-placide-conference-saint-esprit-01",
        order: 1,
      },
    ],
    eventDate: {
      value: "2021",
      precision: "year",
    },
    summary:
      "Conférence de Placide au Saint Esprit — 2021. Le partage des connaissances et le dialogue entre générations en images.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-community-2021-placide-conference-saint-esprit",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "community-jenda-group-photo",
    slug: "community-jenda-group-photo",
    title: "Photo de groupe à Jenda",
    type: "community",
    category: "community",
    categoryLabel: "Communauté",
    coverMediaId: "media-community-jenda-group-photo",
    images: [
      {
        mediaId: "media-community-jenda-group-photo",
        order: 1,
      },
    ],
    summary:
      "Photo de groupe à Jenda. Un souvenir conservé dans la mémoire photographique de SEAFA.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-community-jenda-group-photo",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "community-kibimba-group-photo",
    slug: "community-kibimba-group-photo",
    title: "Photo de groupe à Kibimba",
    type: "community",
    category: "community",
    categoryLabel: "Communauté",
    coverMediaId: "media-community-kibimba-group-photo",
    images: [
      {
        mediaId: "media-community-kibimba-group-photo",
        order: 1,
      },
    ],
    summary:
      "Photo de groupe à Kibimba. Un souvenir conservé dans la mémoire photographique de SEAFA.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-community-kibimba-group-photo",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "events-2014-anniversary",
    slug: "events-2014-anniversary",
    title: "Anniversaire SEAFA — 2014",
    type: "event",
    category: "celebrations",
    categoryLabel: "Rencontres et événements",
    coverMediaId: "media-events-2014-anniversary-anniversary-01",
    images: [
      {
        mediaId: "media-events-2014-anniversary-anniversary-01",
        order: 1,
      },
      {
        mediaId: "media-events-2014-anniversary-anniversary-02",
        order: 2,
      },
    ],
    eventDate: {
      value: "2014",
      precision: "year",
    },
    summary:
      "Football et retrouvailles pour célébrer les années partagées au sein de SEAFA.",
    relatedContent: [
      {
        type: "event",
        id: "event-events-2014-anniversary",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "events-2015-anniversary",
    slug: "events-2015-anniversary",
    title: "Anniversaire SEAFA — 2015",
    type: "event",
    category: "celebrations",
    categoryLabel: "Rencontres et événements",
    coverMediaId: "media-events-2015-anniversary-anniversary-01",
    images: [
      {
        mediaId: "media-events-2015-anniversary-anniversary-01",
        order: 1,
      },
      {
        mediaId: "media-events-2015-anniversary-anniversary-02",
        order: 2,
      },
    ],
    eventDate: {
      value: "2015",
      precision: "year",
    },
    summary:
      "Football et retrouvailles pour célébrer les années partagées au sein de SEAFA.",
    relatedContent: [
      {
        type: "event",
        id: "event-events-2015-anniversary",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "events-2016-anniversary",
    slug: "events-2016-anniversary",
    title: "Anniversaire SEAFA — 2016",
    type: "event",
    category: "celebrations",
    categoryLabel: "Rencontres et événements",
    coverMediaId: "media-events-2016-anniversary-anniversary-01",
    images: [
      {
        mediaId: "media-events-2016-anniversary-anniversary-01",
        order: 1,
      },
    ],
    eventDate: {
      value: "2016",
      precision: "year",
    },
    summary:
      "Football et retrouvailles pour célébrer les années partagées au sein de SEAFA.",
    relatedContent: [
      {
        type: "event",
        id: "event-events-2016-anniversary",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "events-2017-bubanza-orphanage-visit",
    slug: "events-2017-bubanza-orphanage-visit",
    title: "Visite à l’orphelinat de Bubanza — 2017",
    type: "event",
    category: "community",
    categoryLabel: "Rencontres et événements",
    coverMediaId:
      "media-events-2017-bubanza-orphanage-visit-bubanza-orphanage-visit-01",
    images: [
      {
        mediaId:
          "media-events-2017-bubanza-orphanage-visit-bubanza-orphanage-visit-01",
        order: 1,
      },
      {
        mediaId:
          "media-events-2017-bubanza-orphanage-visit-bubanza-orphanage-visit-02",
        order: 2,
      },
      {
        mediaId:
          "media-events-2017-bubanza-orphanage-visit-bubanza-orphanage-visit-03",
        order: 3,
      },
      {
        mediaId:
          "media-events-2017-bubanza-orphanage-visit-bubanza-orphanage-visit-04",
        order: 4,
      },
      {
        mediaId:
          "media-events-2017-bubanza-orphanage-visit-bubanza-orphanage-visit-05",
        order: 5,
      },
      {
        mediaId:
          "media-events-2017-bubanza-orphanage-visit-bubanza-orphanage-visit-06",
        order: 6,
      },
      {
        mediaId:
          "media-events-2017-bubanza-orphanage-visit-bubanza-orphanage-visit-07",
        order: 7,
      },
      {
        mediaId:
          "media-events-2017-bubanza-orphanage-visit-bubanza-orphanage-visit-08",
        order: 8,
      },
      {
        mediaId:
          "media-events-2017-bubanza-orphanage-visit-bubanza-orphanage-visit-09",
        order: 9,
      },
      {
        mediaId:
          "media-events-2017-bubanza-orphanage-visit-bubanza-orphanage-visit-10",
        order: 10,
      },
      {
        mediaId:
          "media-events-2017-bubanza-orphanage-visit-bubanza-orphanage-visit-11",
        order: 11,
      },
    ],
    eventDate: {
      value: "2017",
      precision: "year",
    },
    summary:
      "Visite à l’orphelinat de Bubanza — 2017. Une rencontre qui témoigne des liens de notre communauté.",
    relatedContent: [
      {
        type: "event",
        id: "event-events-2017-bubanza-orphanage-visit",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "events-2017-new-year-celebration",
    slug: "events-2017-new-year-celebration",
    title: "Célébration du Nouvel An — 2017",
    type: "event",
    category: "social",
    categoryLabel: "Rencontres et événements",
    coverMediaId:
      "media-events-2017-new-year-celebration-new-year-celebration-01",
    images: [
      {
        mediaId:
          "media-events-2017-new-year-celebration-new-year-celebration-01",
        order: 1,
      },
    ],
    eventDate: {
      value: "2017",
      precision: "year",
    },
    summary:
      "Célébration du Nouvel An — 2017. Un souvenir conservé dans la mémoire photographique de SEAFA.",
    relatedContent: [
      {
        type: "event",
        id: "event-events-2017-new-year-celebration",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "events-2018-gala-match",
    slug: "events-2018-gala-match",
    title: "Match de gala — 2018",
    type: "event",
    category: "football",
    categoryLabel: "Rencontres et événements",
    coverMediaId: "media-events-2018-gala-match-gala-match-01",
    images: [
      {
        mediaId: "media-events-2018-gala-match-gala-match-01",
        order: 1,
      },
      {
        mediaId: "media-events-2018-gala-match-gala-match-02",
        order: 2,
      },
      {
        mediaId: "media-events-2018-gala-match-gala-match-03",
        order: 3,
      },
    ],
    eventDate: {
      value: "2018",
      precision: "year",
    },
    summary:
      "Sur le terrain avec SEAFA. Ces photographies conservent les rencontres de football de nos archives.",
    relatedContent: [
      {
        type: "event",
        id: "event-events-2018-gala-match",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "events-2018-karera-falls",
    slug: "events-2018-karera-falls",
    title: "Sortie aux chutes de Karera — 2018",
    type: "event",
    category: "trips",
    categoryLabel: "Rencontres et événements",
    coverMediaId: "media-events-2018-karera-falls-karera-falls-group-02",
    images: [
      {
        mediaId: "media-events-2018-karera-falls-karera-falls-group-01",
        order: 1,
      },
      {
        mediaId: "media-events-2018-karera-falls-karera-falls-group-02",
        order: 2,
      },
    ],
    eventDate: {
      value: "2018",
      precision: "year",
    },
    summary:
      "Sortie aux chutes de Karera — 2018. Des moments de rencontre et de découverte au-delà du terrain.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-events-2018-karera-falls",
      },
      {
        type: "event",
        id: "event-events-2018-karera-falls",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "events-2018-medical-consultation",
    slug: "events-2018-medical-consultation",
    title: "Consultations médicales — 2018",
    type: "event",
    category: "social",
    categoryLabel: "Rencontres et événements",
    coverMediaId:
      "media-events-2018-medical-consultation-medical-consultation-01",
    images: [
      {
        mediaId:
          "media-events-2018-medical-consultation-medical-consultation-01",
        order: 1,
      },
      {
        mediaId:
          "media-events-2018-medical-consultation-medical-consultation-02",
        order: 2,
      },
      {
        mediaId:
          "media-events-2018-medical-consultation-medical-consultation-03",
        order: 3,
      },
      {
        mediaId:
          "media-events-2018-medical-consultation-medical-consultation-04",
        order: 4,
      },
      {
        mediaId:
          "media-events-2018-medical-consultation-medical-consultation-05",
        order: 5,
      },
      {
        mediaId:
          "media-events-2018-medical-consultation-medical-consultation-06",
        order: 6,
      },
      {
        mediaId:
          "media-events-2018-medical-consultation-medical-consultation-07",
        order: 7,
      },
      {
        mediaId:
          "media-events-2018-medical-consultation-medical-consultation-08",
        order: 8,
      },
      {
        mediaId:
          "media-events-2018-medical-consultation-medical-consultation-09",
        order: 9,
      },
      {
        mediaId:
          "media-events-2018-medical-consultation-medical-consultation-10",
        order: 10,
      },
      {
        mediaId:
          "media-events-2018-medical-consultation-medical-consultation-11",
        order: 11,
      },
      {
        mediaId:
          "media-events-2018-medical-consultation-medical-consultation-12",
        order: 12,
      },
      {
        mediaId:
          "media-events-2018-medical-consultation-medical-consultation-13",
        order: 13,
      },
      {
        mediaId:
          "media-events-2018-medical-consultation-medical-consultation-14",
        order: 14,
      },
    ],
    eventDate: {
      value: "2018",
      precision: "year",
    },
    summary:
      "Des moments d’échange et de consultation autour de la santé, conservés dans les archives de 2018.",
    relatedContent: [
      {
        type: "event",
        id: "event-events-2018-medical-consultation",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "events-2018-physiotherapy",
    slug: "events-2018-physiotherapy",
    title: "Présentation de physiothérapie — 2018",
    type: "event",
    category: "social",
    categoryLabel: "Rencontres et événements",
    coverMediaId:
      "media-events-2018-physiotherapy-physiotherapy-presentation-01",
    images: [
      {
        mediaId:
          "media-events-2018-physiotherapy-physiotherapy-presentation-01",
        order: 1,
      },
      {
        mediaId:
          "media-events-2018-physiotherapy-physiotherapy-presentation-02",
        order: 2,
      },
      {
        mediaId:
          "media-events-2018-physiotherapy-physiotherapy-presentation-03",
        order: 3,
      },
      {
        mediaId:
          "media-events-2018-physiotherapy-physiotherapy-presentation-04",
        order: 4,
      },
      {
        mediaId:
          "media-events-2018-physiotherapy-physiotherapy-presentation-05",
        order: 5,
      },
      {
        mediaId:
          "media-events-2018-physiotherapy-physiotherapy-presentation-06",
        order: 6,
      },
    ],
    eventDate: {
      value: "2018",
      precision: "year",
    },
    summary:
      "La physiothérapie dans les activités de SEAFA : une présentation conservée dans les archives de 2018.",
    relatedContent: [
      {
        type: "activity",
        id: "activity-events-2018-physiotherapy",
      },
      {
        type: "event",
        id: "event-events-2018-physiotherapy",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "events-2019-anniversary",
    slug: "events-2019-anniversary",
    title: "Anniversaire SEAFA — 2019",
    type: "event",
    category: "celebrations",
    categoryLabel: "Rencontres et événements",
    coverMediaId: "media-events-2019-anniversary-anniversary-06",
    images: [
      {
        mediaId: "media-events-2019-anniversary-anniversary-01",
        order: 1,
      },
      {
        mediaId: "media-events-2019-anniversary-anniversary-02",
        order: 2,
      },
      {
        mediaId: "media-events-2019-anniversary-anniversary-03",
        order: 3,
      },
      {
        mediaId: "media-events-2019-anniversary-anniversary-04",
        order: 4,
      },
      {
        mediaId: "media-events-2019-anniversary-anniversary-05",
        order: 5,
      },
      {
        mediaId: "media-events-2019-anniversary-anniversary-06",
        order: 6,
      },
      {
        mediaId: "media-events-2019-anniversary-anniversary-07",
        order: 7,
      },
      {
        mediaId: "media-events-2019-anniversary-anniversary-08",
        order: 8,
      },
      {
        mediaId: "media-events-2019-anniversary-anniversary-09",
        order: 9,
      },
      {
        mediaId: "media-events-2019-anniversary-anniversary-10",
        order: 10,
      },
      {
        mediaId: "media-events-2019-anniversary-anniversary-11",
        order: 11,
      },
      {
        mediaId: "media-events-2019-anniversary-anniversary-12",
        order: 12,
      },
    ],
    eventDate: {
      value: "2019",
      precision: "year",
    },
    summary:
      "Football et retrouvailles pour célébrer les années partagées au sein de SEAFA.",
    relatedContent: [
      {
        type: "event",
        id: "event-events-2019-anniversary",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "events-2021-anniversary",
    slug: "events-2021-anniversary",
    title: "Anniversaire SEAFA — 2021",
    type: "event",
    category: "celebrations",
    categoryLabel: "Rencontres et événements",
    coverMediaId: "media-events-2021-anniversary-anniversary-01",
    images: [
      {
        mediaId: "media-events-2021-anniversary-anniversary-01",
        order: 1,
      },
      {
        mediaId: "media-events-2021-anniversary-anniversary-02",
        caption:
          "Aux chutes de Karera. La date de cette photographie reste à confirmer.",
        order: 2,
      },
      {
        mediaId: "media-events-2021-anniversary-anniversary-03",
        order: 3,
      },
      {
        mediaId: "media-events-2021-anniversary-anniversary-04",
        order: 4,
      },
      {
        mediaId: "media-events-2021-anniversary-anniversary-05",
        order: 5,
      },
      {
        mediaId: "media-events-2021-anniversary-anniversary-06",
        order: 6,
      },
      {
        mediaId: "media-events-2021-anniversary-anniversary-07",
        order: 7,
      },
      {
        mediaId: "media-events-2021-anniversary-anniversary-08",
        order: 8,
      },
    ],
    eventDate: {
      value: "2021",
      precision: "year",
    },
    summary:
      "Football et retrouvailles pour célébrer les années partagées au sein de SEAFA.",
    relatedContent: [
      {
        type: "event",
        id: "event-events-2021-anniversary",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "nouvel-an-2018",
    slug: "nouvel-an-2018",
    title: "Retrouvailles du Nouvel An — 2018",
    type: "event",
    category: "celebrations",
    categoryLabel: "Rencontres et événements",
    coverMediaId: "media-events-2022-anniversary-anniversary-cover",
    images: [
      {
        mediaId: "media-events-2022-anniversary-anniversary-cover",
        order: 1,
      },
      {
        mediaId: "media-events-2022-anniversary-anniversary-group-01",
        order: 2,
      },
    ],
    eventDate: {
      value: "2018",
      precision: "year",
    },
    summary:
      "Une rencontre pour commencer l’année ensemble, dans un esprit de fraternité.",
    relatedContent: [
      {
        type: "event",
        id: "event-nouvel-an-2018",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "events-2024-gala-match",
    slug: "events-2024-gala-match",
    title: "Match de gala — 2024",
    type: "event",
    category: "football",
    categoryLabel: "Rencontres et événements",
    coverMediaId: "media-events-2024-gala-match-gala-match-01",
    images: [
      {
        mediaId: "media-events-2024-gala-match-gala-match-01",
        order: 1,
      },
      {
        mediaId: "media-events-2024-gala-match-gala-match-02",
        order: 2,
      },
      {
        mediaId: "media-events-2024-gala-match-gala-match-03",
        order: 3,
      },
      {
        mediaId: "media-events-2024-gala-match-gala-match-04",
        order: 4,
      },
    ],
    eventDate: {
      value: "2024",
      precision: "year",
    },
    summary:
      "Sur le terrain avec SEAFA. Ces photographies conservent les rencontres de football de nos archives.",
    relatedContent: [
      {
        type: "event",
        id: "event-events-2024-gala-match",
      },
    ],
    featured: true,
    publicationStatus: "published",
  },
  {
    id: "events-medical-session",
    slug: "events-medical-session",
    title: "Séance de physiothérapie",
    type: "event",
    category: "social",
    categoryLabel: "Rencontres et événements",
    coverMediaId: "media-events-medical-session",
    images: [
      {
        mediaId: "media-events-medical-session",
        order: 1,
      },
    ],
    summary:
      "Un moment de physiothérapie conservé dans les archives SEAFA. La date et le contexte précis restent à confirmer.",
    relatedContent: [
      {
        type: "event",
        id: "event-events-medical-session",
      },
    ],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "history-2014",
    slug: "history-2014",
    title: "Les premières équipes — 2014",
    type: "history",
    category: "history",
    categoryLabel: "Histoire et héritage",
    coverMediaId: "media-history-2014-first-seafa-team-01",
    images: [
      {
        mediaId: "media-history-2014-first-seafa-team-01",
        order: 1,
      },
      {
        mediaId: "media-history-2014-first-seafa-team-02",
        order: 2,
      },
    ],
    eventDate: {
      value: "2014",
      precision: "year",
    },
    summary:
      "Les premières équipes, dans les archives photographiques de 2014.",
    relatedContent: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "history-archives",
    slug: "history-archives",
    title: "Archives historiques",
    type: "history",
    category: "history",
    categoryLabel: "Histoire et héritage",
    coverMediaId: "media-history-founders",
    images: [
      {
        mediaId: "media-history-archive-photo-01",
        order: 1,
      },
      {
        mediaId: "media-history-archive-photo-02",
        order: 2,
      },
      {
        mediaId: "media-history-founders",
        order: 3,
      },
    ],
    summary:
      "Archives de SEAFA. Le contexte et la date des photographies non légendées restent à confirmer.",
    relatedContent: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "interviews",
    slug: "interviews",
    title: "Portraits des témoins",
    type: "general",
    categoryLabel: "SEAFA",
    coverMediaId: "media-interviews-alain-nduwimana",
    images: [
      {
        mediaId: "media-interviews-alain-nduwimana",
        order: 1,
      },
      {
        mediaId: "media-interviews-arnaud-badogomba-first-president",
        order: 2,
      },
      {
        mediaId: "media-interviews-claver-kazobavamwo",
        order: 3,
      },
      {
        mediaId: "media-interviews-idane",
        order: 4,
      },
    ],
    summary:
      "Les portraits associés aux témoignages du livret historique de SEAFA.",
    relatedContent: [],
    featured: false,
    publicationStatus: "published",
  },
];
const mediaById = new Map(mediaAssets.map((media) => [media.id, media]));
const seen = new Set<string>();
export const albums: Album[] = [
  anniversaryAlbum,
  ...pendingAlbums.filter((album) => album.id !== "seafa-lumitel"),
  ...octoberAlbums,
  ...suppliedAlbums.filter((album) => album.id !== "community-2019-mentoring"),
  ...albumAdditions,
  ...reorganizedAlbums,
].map((album) => {
  if (album.id === "events-2021-anniversary")
    album = {
      ...album,
      title: "Souvenirs de rencontres",
      eventDate: undefined,
      categoryLabel: "Archives · date à confirmer",
      summary:
        "Des retrouvailles et des remises de distinctions. L’année et l’événement précis restent à confirmer ; les photographies des chutes de Karera sont réunies dans leur propre album.",
    };
  if (album.id === "events-2018-karera-falls")
    album = {
      ...album,
      images: [
        ...album.images,
        {
          mediaId: "media-events-2021-anniversary-anniversary-02",
          order: 3,
          caption:
            "Aux chutes de Karera. La date de cette photographie reste à confirmer.",
        },
      ],
    };

  if (album.id === "visite-badogomba")
    album = {
      ...album,
      eventDate: { value: "2020", precision: "year" },
      summary:
        "Une rencontre de fraternité chez les Badogomba, documentée par les archives classées en 2020.",
    };
  if (album.id === "activities-2024-tournament") {
    album = {
      ...album,
      title: "Tournoi de la communauté Saint Esprit — 2024",
      eventDate: { value: "2024-10-04", precision: "day" },
      endDate: { value: "2024-11-03", precision: "day" },
      summary:
        "Un tournoi pour réunir la communauté de Saint Esprit autour du football, de la solidarité et du partage des connaissances.",
      description: tournamentDescription,
      images: [
        ...album.images,
        ...octoberGroups["activities-2024-tournament"].photos
          .filter((id) => !album.images.some((image) => image.mediaId === id))
          .map((mediaId, index) => ({
            mediaId,
            order: album.images.length + index + 1,
          })),
      ],
    };
  }
  const images = [
    ...album.images,
    ...(additionalAlbumPhotos[album.id] ?? []).map((mediaId, index) => ({
      mediaId,
      order: album.images.length + index + 1,
    })),
  ].filter((image) => {
    const source = mediaById.get(image.mediaId)?.src;
    if (
      album.id === "events-2018-medical-consultation" &&
      image.mediaId ===
        "media-events-2018-medical-consultation-medical-consultation-01"
    )
      return false;
    if (
      album.id === "events-2021-anniversary" &&
      image.mediaId === "media-events-2021-anniversary-anniversary-02"
    )
      return false;
    if (!source || excludedPhotoSources[source] || seen.has(source))
      return false;
    if (
      album.id === "activities-2019-tournament" &&
      source.startsWith("/media/activities/2018/match contre songa/")
    )
      return false;
    if (album.id === "anniversaire-2026" && source.startsWith("/media/awards/"))
      return false;
    seen.add(source);
    return true;
  });
  const selection =
    selectedPhotos[album.id as keyof typeof selectedPhotos] ?? [];
  const preferred =
    selectedCovers[album.id as keyof typeof selectedCovers] ??
    album.coverMediaId;
  const rank = [preferred, ...selection];
  images.sort((a, b) => {
    const aRank = rank.indexOf(a.mediaId),
      bRank = rank.indexOf(b.mediaId);
    return (aRank < 0 ? Infinity : aRank) - (bRank < 0 ? Infinity : bRank);
  });
  return {
    ...album,
    images: images.map((image, index) => ({ ...image, order: index + 1 })),
    coverMediaId: images.some(
      (image) =>
        image.mediaId ===
        (selectedCovers[album.id as keyof typeof selectedCovers] ??
          album.coverMediaId),
    )
      ? (selectedCovers[album.id as keyof typeof selectedCovers] ??
        album.coverMediaId)
      : images[0]?.mediaId,
  };
});
