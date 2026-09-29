import type { HistoricalMilestone } from "@/types/content";
const stages = [
  [
    2013,
    "Les premiers rendez-vous",
    "Des anciens du Lycée du Saint Esprit se retrouvent régulièrement autour du football. L’amitié, les premières règles communes et les cotisations donnent forme au groupe.",
    "5–6",
  ],
  [
    2014,
    "Une organisation, un nom : SEFA",
    "Le groupe accueille de nouveaux joueurs, y compris des personnes qui n’ont pas fréquenté le Lycée. Un comité se structure et le nom Saint Esprit Football Academy, SEFA, est adopté.",
    "7–8",
  ],
  [
    2015,
    "Grandir ensemble",
    "Les effectifs progressent, les entraînements se structurent et les activités se diversifient : accompagnement des lycéens, matches amicaux, célébrations et entraide.",
    "8–9",
  ],
  [
    2016,
    "SEFA devient SEAFA",
    "L’ajout d’Alumni affirme le lien avec les anciens du Lycée. Les premières femmes rejoignent la communauté, dont l’organisation prend une dimension toujours plus collective.",
    "9–11",
  ],
  [
    2017,
    "De nouveaux horizons",
    "Les déplacements, les actions caritatives et les rencontres renforcent les liens. Le concept des Challenges internes enrichit la vie sportive de SEAFA.",
    "11",
  ],
  [
    2018,
    "Partager les savoirs",
    "SEAFA Médecine se constitue et les conférences-débats débutent, notamment autour du sport et de la santé. Un voyage à Kibimba ouvre de nouveaux horizons.",
    "11–12",
  ],
  [
    2019,
    "Une communauté qui s’affirme",
    "Une conférence sur l’entrepreneuriat réunit SEAFA et des élèves au Lycée. La sortie à Jenda mobilise la communauté et une commission sociale accompagne son développement.",
    "13",
  ],
] as const;
export const milestones: HistoricalMilestone[] = stages.map(
  ([year, title, description, pages]) => ({
    id: `history-${year}`,
    slug: `seafa-${year}`,
    title,
    date: { value: String(year), precision: "year" },
    description,
    albumId:
      year === 2013
        ? "history-2013"
        : year === 2014
          ? "history-2014"
          : undefined,
    source: `Livret historique SEAFA, p. ${pages}.`,
    verified: true,
    publicationStatus: "published",
  }),
);
export const getPublishedMilestones = () =>
  milestones
    .filter((item) => item.verified && item.publicationStatus === "published")
    .sort((a, b) => (a.date?.value ?? "").localeCompare(b.date?.value ?? ""));
