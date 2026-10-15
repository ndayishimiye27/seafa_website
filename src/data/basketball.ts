import type { Activity, Event, EventDate } from "@/types/content";

export const basketballDate: EventDate = {
  value: "2026-11",
  precision: "month",
};
export const basketballTitle =
  "Rencontre avec les basketteurs du Burundi — Novembre 2026";
export const basketballSummary =
  "Un rendez-vous sportif entre SEAFA et les basketteurs du Burundi, placé sous le signe du football et de la fraternité en novembre 2026.";
export const basketballEvent: Event = {
  id: "event-basketteurs-2026",
  slug: "match-basketteurs-2026",
  title: basketballTitle,
  category: "community-gathering",
  albumId: "match-basketteurs-2026",
  startDate: basketballDate,
  status: "upcoming",
  summary: basketballSummary,
  featured: true,
  publicationStatus: "published",
  activityId: "activity-basketteurs-2026",
};
export const basketballActivity: Activity = {
  id: "activity-basketteurs-2026",
  slug: "match-basketteurs-2026",
  title: basketballTitle,
  category: "friendly-match",
  albumId: "match-basketteurs-2026",
  date: basketballDate,
  summary: basketballSummary,
  participants: [],
  featured: false,
  publicationStatus: "published",
  eventId: "event-basketteurs-2026",
};
