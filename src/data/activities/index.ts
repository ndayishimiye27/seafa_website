import type { Activity } from "@/types/content";
import { basketballActivity } from "@/data/basketball";
import {
  octoberActivities,
  tournamentDescription,
} from "@/data/october-content";

/**
 * Public activities registry.
 *
 * Activities can include:
 * - football matches;
 * - friendly matches;
 * - training sessions;
 * - SEAFA Challenges;
 * - physiotherapy and wellness sessions;
 * - community projects;
 * - women’s/community activities;
 * - excursions and visits.
 *
 * Keep incomplete records as drafts until their official information is
 * verified. Draft records are excluded from public pages.
 */
const pendingActivities: Activity[] = [
  {
    id: "activite-seafa-lumitel",
    slug: "seafa-vs-lumitel",
    title: "SEAFA vs Lumitel",
    category: "friendly-match",
    albumId: "seafa-lumitel",
    summary:
      "Activité en préparation. Les informations officielles du match doivent encore être confirmées.",
    participants: [],
    featured: false,
    publicationStatus: "draft",
  },
  {
    id: "activite-physiotherapie",
    slug: "seance-de-physiotherapie",
    title: "Séance de physiothérapie",
    category: "wellness",
    albumId: "physiotherapie",
    summary:
      "Activité en préparation. Les informations officielles de la séance doivent encore être confirmées.",
    participants: [],
    featured: false,
    publicationStatus: "draft",
  },
  {
    id: "activite-visite-cascade",
    slug: "visite-cascade",
    title: "Visite d’une cascade",
    category: "excursion",
    albumId: "visite-cascade",
    summary:
      "Activité en préparation. La date, le lieu et les autres informations doivent encore être confirmés.",
    participants: [],
    featured: false,
    publicationStatus: "draft",
  },
];

const suppliedActivities: Activity[] = [
  {
    id: "activity-activities-2016-match",
    slug: "activities-2016-match",
    title: "Match — 2016",
    category: "football",
    albumId: "activities-2016-match",
    date: {
      value: "2016",
      precision: "year",
    },
    summary: "Retrouvez les photographies de cet album : Match — 2016.",
    participants: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activity-activities-2017-friendly-match",
    slug: "activities-2017-friendly-match",
    title: "Match amical — 2017",
    category: "friendly-match",
    albumId: "activities-2017-friendly-match",
    date: {
      value: "2017",
      precision: "year",
    },
    summary: "Retrouvez les photographies de cet album : Match amical — 2017.",
    participants: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activity-activities-2018-december-friendly-match",
    slug: "activities-2018-december-friendly-match",
    title: "Match amical de décembre — 2018",
    category: "friendly-match",
    albumId: "activities-2018-december-friendly-match",
    date: {
      value: "2018-12",
      precision: "month",
    },
    summary:
      "Retrouvez les photographies de cet album : Match amical de décembre — 2018.",
    participants: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activity-activities-2019-friendly-matches",
    slug: "activities-2019-friendly-matches",
    title: "Matches amicaux — 2019",
    category: "friendly-match",
    albumId: "activities-2019-friendly-matches",
    date: {
      value: "2019",
      precision: "year",
    },
    summary:
      "Retrouvez les photographies de cet album : Matches amicaux — 2019.",
    participants: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activity-activities-2019-stadium-match-congolese-team",
    slug: "activities-2019-stadium-match-congolese-team",
    title: "Match au stade avec une équipe congolaise — 2019",
    category: "friendly-match",
    albumId: "activities-2019-stadium-match-congolese-team",
    date: {
      value: "2019",
      precision: "year",
    },
    summary:
      "Retrouvez les photographies de cet album : Match au stade avec une équipe congolaise — 2019.",
    participants: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activity-activities-2019-tournament",
    slug: "activities-2019-tournament",
    title: "Tournoi — 2019",
    category: "football",
    albumId: "activities-2019-tournament",
    date: {
      value: "2019",
      precision: "year",
    },
    summary: "Retrouvez les photographies de cet album : Tournoi — 2019.",
    participants: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activity-activities-2020-friendly-match",
    slug: "activities-2020-friendly-match",
    title: "Match amical — 2020",
    category: "friendly-match",
    albumId: "activities-2020-friendly-match",
    date: {
      value: "2020",
      precision: "year",
    },
    summary: "Retrouvez les photographies de cet album : Match amical — 2020.",
    participants: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activity-activities-2024-tournament",
    slug: "activities-2024-tournament",
    title: "Tournoi — 2024",
    category: "football",
    albumId: "activities-2024-tournament",
    date: {
      value: "2024",
      precision: "year",
    },
    summary: "Retrouvez les photographies de cet album : Tournoi — 2024.",
    participants: [],
    featured: true,
    publicationStatus: "published",
  },
  {
    id: "activity-community-2017-arcade-home-visit",
    slug: "community-2017-arcade-home-visit",
    title: "Visite chez Arcade — 2017",
    category: "community-project",
    albumId: "community-2017-arcade-home-visit",
    date: {
      value: "2017",
      precision: "year",
    },
    summary:
      "Retrouvez les photographies de cet album : Visite chez Arcade — 2017.",
    participants: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activity-community-2019-gitega-trip",
    slug: "community-2019-gitega-trip",
    title: "Voyage à Mabanda — 2019",
    category: "excursion",
    albumId: "community-2019-gitega-trip",
    date: { value: "2019", precision: "year" },
    summary:
      "Les photographies du voyage à Mabanda et des moments de fraternité partagés par SEAFA.",
    participants: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activity-community-2019-jenda-excursion",
    slug: "community-2019-jenda-excursion",
    title: "Excursion à Jenda — 2021",
    category: "excursion",
    albumId: "community-2019-jenda-excursion",
    summary: "Une excursion à Jenda avec la communauté SEAFA.",
    participants: [],
    featured: false,
    publicationStatus: "published",
    date: { value: "2021", precision: "year" },
  },
  {
    id: "activity-community-2019-mentoring",
    slug: "community-2019-mentoring",
    title: "Accompagnement des jeunes du Saint Esprit — 2019",
    category: "community-project",
    albumId: "community-2021-placide-conference-saint-esprit",
    date: {
      value: "2019",
      precision: "year",
    },
    summary:
      "Retrouvez les photographies de cet album : Accompagnement des jeunes du Saint Esprit — 2019.",
    participants: [],
    featured: false,
    publicationStatus: "draft",
  },
  {
    id: "activity-community-2019-walk",
    slug: "community-2019-walk",
    title: "Marche à Bujumbura — 2020",
    category: "community-project",
    albumId: "marche-bujumbura-2020",
    date: { value: "2020", precision: "year" },
    summary: "Une marche aller-retour vers la plage de Bujumbura.",
    participants: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activity-community-2021-placide-conference-saint-esprit",
    slug: "community-2021-placide-conference-saint-esprit",
    title: "Conférence de Placide au Saint Esprit — 2021",
    category: "community-project",
    albumId: "community-2021-placide-conference-saint-esprit",
    date: {
      value: "2021",
      precision: "year",
    },
    summary:
      "Retrouvez les photographies de cet album : Conférence de Placide au Saint Esprit — 2021.",
    participants: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activity-community-kibimba-group-photo",
    slug: "community-kibimba-group-photo",
    title: "Archives SEAFA",
    category: "community-project",
    albumId: "history-archives",
    summary: "Les souvenirs photographiques de la communauté SEAFA.",
    participants: [],
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "activity-events-2018-karera-falls",
    slug: "events-2018-karera-falls",
    title: "Anniversaire et chutes de Karera — 2021",
    category: "excursion",
    albumId: "events-2021-anniversary",
    summary: "Une célébration de SEAFA et une sortie aux chutes de Karera.",
    participants: [],
    featured: false,
    publicationStatus: "published",
    date: { value: "2021", precision: "year" },
  },
  {
    id: "activity-events-2018-physiotherapy",
    slug: "events-2018-physiotherapy",
    title: "Présentation de physiothérapie — 2018",
    category: "wellness",
    albumId: "events-2018-physiotherapy",
    date: {
      value: "2018",
      precision: "year",
    },
    summary:
      "Retrouvez les photographies de cet album : Présentation de physiothérapie — 2018.",
    participants: [],
    featured: false,
    publicationStatus: "published",
  },
];
export const activities: Activity[] = [
  basketballActivity,
  ...pendingActivities.filter(
    (activity) => activity.id !== "activite-seafa-lumitel",
  ),
  ...octoberActivities,
  ...suppliedActivities,
].map((activity): Activity =>
  activity.id === "activity-activities-2024-tournament"
    ? {
        ...activity,
        title: "Tournoi de la communauté Saint Esprit — 2024",
        date: { value: "2024-10-04", precision: "day" },
        endDate: { value: "2024-11-03", precision: "day" },
        summary:
          "La communauté de Saint Esprit réunie autour du football et de la solidarité.",
        description: tournamentDescription,
      }
    : activity,
);
