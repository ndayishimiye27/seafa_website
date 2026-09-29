import type { HomepageHighlight } from "@/types/content";
export const highlights: HomepageHighlight[] = [
  {
    id: "archive-tournoi-2024",
    title: "Tournoi — 2024",
    message: "Retrouvez les photographies du tournoi dans nos archives.",
    desktopMediaId: "media-activities-2024-tournament-team-b-01",
    type: "historical-memory",
    cta: {
      label: "Voir l’album",
      href: "/activities/activities-2024-tournament",
    },
    textAlignment: "left",
    overlayStrength: 0.65,
    displayOrder: 1,
    active: true,
    relatedContent: {
      type: "activity",
      id: "activity-activities-2024-tournament",
    },
  },
];
