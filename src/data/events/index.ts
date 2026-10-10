import { anniversaryEvent } from "@/data/anniversary-2026";
import { octoberEvents } from "@/data/october-content";
import type { Event } from "@/types/content";

/**
 * SEAFA events registry.
 *
 * Events include anniversaries, meetings, celebrations, gatherings, visits,
 * trips and other scheduled occasions.
 */
const pendingEvents: Event[] = [
  {
    id: "evenement-anniversaire-2018",
    slug: "anniversaire-2018",
    title: "Anniversaire SEAFA — août 2018",
    category: "anniversary",
    albumId: "anniversaire-2018",
    startDate: {
      value: "2018-08",
      precision: "month",
    },
    status: "completed",
    summary:
      "Événement historique en préparation. Les informations officielles et les photographies doivent encore être ajoutées.",
    featured: false,
    publicationStatus: "draft",
  },
];

const suppliedEvents: Event[] = [
  {
    id: "event-events-2014-anniversary",
    slug: "events-2014-anniversary",
    title: "Anniversaire SEAFA — 2014",
    category: "anniversary",
    albumId: "events-2014-anniversary",
    startDate: {
      value: "2014",
      precision: "year",
    },
    status: "completed",
    summary:
      "Retrouvez les photographies de cet album : Anniversaire SEAFA — 2014.",
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "event-events-2015-anniversary",
    slug: "events-2015-anniversary",
    title: "Anniversaire SEAFA — 2015",
    category: "anniversary",
    albumId: "events-2015-anniversary",
    startDate: {
      value: "2015",
      precision: "year",
    },
    status: "completed",
    summary:
      "Retrouvez les photographies de cet album : Anniversaire SEAFA — 2015.",
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "event-events-2016-anniversary",
    slug: "events-2016-anniversary",
    title: "Anniversaire SEAFA — 2016",
    category: "anniversary",
    albumId: "events-2016-anniversary",
    startDate: {
      value: "2016",
      precision: "year",
    },
    status: "completed",
    summary:
      "Retrouvez les photographies de cet album : Anniversaire SEAFA — 2016.",
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "event-events-2017-bubanza-orphanage-visit",
    slug: "events-2017-bubanza-orphanage-visit",
    title: "Visite à l’orphelinat de Bubanza — 2017",
    category: "special-visit",
    albumId: "events-2017-bubanza-orphanage-visit",
    startDate: {
      value: "2017",
      precision: "year",
    },
    status: "completed",
    summary:
      "Retrouvez les photographies de cet album : Visite à l’orphelinat de Bubanza — 2017.",
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "event-events-2017-new-year-celebration",
    slug: "events-2017-new-year-celebration",
    title: "Célébration du Nouvel An — 2017",
    category: "other",
    albumId: "events-2017-new-year-celebration",
    startDate: {
      value: "2017",
      precision: "year",
    },
    status: "completed",
    summary:
      "Retrouvez les photographies de cet album : Célébration du Nouvel An — 2017.",
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "event-events-2018-gala-match",
    slug: "events-2018-gala-match",
    title: "Match de gala — 2018",
    category: "other",
    albumId: "events-2018-gala-match",
    startDate: {
      value: "2018",
      precision: "year",
    },
    status: "completed",
    summary: "Retrouvez les photographies de cet album : Match de gala — 2018.",
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "event-events-2018-karera-falls",
    slug: "events-2018-karera-falls",
    title: "Sortie aux chutes de Karera — 2018",
    category: "trip",
    albumId: "events-2018-karera-falls",
    startDate: {
      value: "2018",
      precision: "year",
    },
    status: "completed",
    summary:
      "Retrouvez les photographies de cet album : Sortie aux chutes de Karera — 2018.",
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "event-events-2018-medical-consultation",
    slug: "events-2018-medical-consultation",
    title: "Consultations médicales — 2018",
    category: "other",
    albumId: "events-2018-medical-consultation",
    startDate: {
      value: "2018",
      precision: "year",
    },
    status: "completed",
    summary:
      "Retrouvez les photographies de cet album : Consultations médicales — 2018.",
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "event-events-2018-physiotherapy",
    slug: "events-2018-physiotherapy",
    title: "Présentation de physiothérapie — 2018",
    category: "other",
    albumId: "events-2018-physiotherapy",
    startDate: {
      value: "2018",
      precision: "year",
    },
    status: "completed",
    summary:
      "Retrouvez les photographies de cet album : Présentation de physiothérapie — 2018.",
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "event-events-2019-anniversary",
    slug: "events-2019-anniversary",
    title: "Anniversaire SEAFA — 2019",
    category: "anniversary",
    albumId: "events-2019-anniversary",
    startDate: {
      value: "2019",
      precision: "year",
    },
    status: "completed",
    summary:
      "Retrouvez les photographies de cet album : Anniversaire SEAFA — 2019.",
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "event-events-2021-anniversary",
    slug: "events-2021-anniversary",
    title: "Souvenirs de rencontres",
    category: "other",
    albumId: "events-2021-anniversary",

    status: "completed",
    summary:
      "Des rencontres conservées dans les archives de SEAFA. La date et l’événement précis restent à confirmer.",
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "event-events-2022-anniversary",
    slug: "events-2022-anniversary",
    title: "Anniversaire SEAFA — 2022",
    category: "anniversary",
    albumId: "events-2022-anniversary",
    startDate: {
      value: "2022",
      precision: "year",
    },
    status: "completed",
    summary:
      "Retrouvez les photographies de cet album : Anniversaire SEAFA — 2022.",
    featured: false,
    publicationStatus: "published",
  },
  {
    id: "event-events-2024-gala-match",
    slug: "events-2024-gala-match",
    title: "Match de gala — 2024",
    category: "other",
    albumId: "events-2024-gala-match",
    startDate: {
      value: "2024",
      precision: "year",
    },
    status: "completed",
    summary: "Retrouvez les photographies de cet album : Match de gala — 2024.",
    featured: true,
    publicationStatus: "published",
  },
  {
    id: "event-events-medical-session",
    slug: "events-medical-session",
    title: "Séance de physiothérapie",
    category: "other",
    albumId: "events-medical-session",
    status: "completed",
    summary:
      "Un moment de physiothérapie conservé dans les archives SEAFA. La date et le contexte précis restent à confirmer.",
    featured: false,
    publicationStatus: "published",
  },
];
export const events: Event[] = [
  anniversaryEvent,
  ...octoberEvents,
  ...pendingEvents,
  ...suppliedEvents,
];
