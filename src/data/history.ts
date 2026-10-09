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
const earlyMilestones: HistoricalMilestone[] = stages.map(
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
const recentMilestones: HistoricalMilestone[] = [
  {
    id: "history-badogomba-2020",
    slug: "rencontre-badogomba-2020",
    title: "Entretenir les liens de fraternité",
    date: { value: "2020", precision: "year" },
    albumId: "visite-badogomba",
    description:
      "Les archives classées en 2020 conservent une rencontre chez les Badogomba. Elles documentent les moments de partage qui prolongent les liens de SEAFA au-delà du terrain.",
    source: "Archives photographiques SEAFA · Collection classée en 2020.",
    verified: true,
    publicationStatus: "published",
  },
  {
    id: "history-conference-2021",
    slug: "conference-2021",
    title: "Partager les connaissances au Saint Esprit",
    date: { value: "2021", precision: "year" },
    albumId: "community-2021-placide-conference-saint-esprit",
    description:
      "Une conférence de Placide au Saint Esprit est documentée dans les archives de 2021. Le partage des connaissances reste un fil conducteur de la communauté.",
    source:
      "Album photographique daté 2021 : conférence de Placide au Saint Esprit.",
    verified: true,
    publicationStatus: "published",
  },
  {
    id: "history-conference-2022",
    slug: "conference-sante-2022",
    title: "Les jeunes et la santé",
    date: { value: "2022-06-03", precision: "day" },
    albumId: "conference-sante-2022",
    description:
      "Au Lycée du Saint Esprit, SEAFA participe à une rencontre sur les adolescents, l’alcool et les substances psychoactives. Le dialogue entre générations et la transmission des connaissances sont au cœur de cette initiative.",
    source:
      "Description originale en kirundi et photographies fournies de la conférence du 3 juin 2022.",
    verified: true,
    publicationStatus: "published",
  },
  {
    id: "history-tournoi-2024",
    slug: "tournoi-2024",
    title: "Un tournoi pour réunir la communauté",
    date: { value: "2024", precision: "year" },
    albumId: "activities-2024-tournament",
    description:
      "Du 4 octobre au 3 novembre, six équipes se retrouvent autour du football. Le tournoi rassemble SEAFA et la communauté de Saint Esprit, et s’accompagne d’une remise de matériel médical au Lycée.",
    source: "Description originale en kirundi et archives du tournoi 2024.",
    verified: true,
    publicationStatus: "published",
  },
  {
    id: "history-sages-2025",
    slug: "sages-jeunes-2025",
    title: "Les sages face aux jeunes",
    date: { value: "2025-12", precision: "month" },
    albumId: "sages-jeunes-2025",
    description:
      "Une rencontre de football entre les sages et les jeunes prolonge le dialogue entre générations. Les photographies et huit séquences vidéo conservent ce moment de décembre 2025.",
    source: "Archives photographiques et vidéos SEAFA · Décembre 2025.",
    verified: true,
    publicationStatus: "published",
  },
  {
    id: "history-lumitel-2026",
    slug: "lumitel-2026",
    title: "SEAFA rencontre Lumitel",
    date: { value: "2026-03", precision: "month" },
    albumId: "seafa-lumitel",
    description:
      "Les photographies du match contre Lumitel, classées en mars 2026, témoignent de la continuité des rencontres sportives et des moments de fraternité de SEAFA.",
    source: "Archives photographiques SEAFA · Mars 2026.",
    verified: true,
    publicationStatus: "published",
  },
  {
    id: "history-anniversaire-2026",
    slug: "anniversaire-2026",
    title: "Treize ans de football et de fraternité",
    date: { value: "2026-09-26", precision: "day" },
    albumId: "anniversaire-2026",
    description:
      "SEAFA célèbre son 13e anniversaire autour du football et de moments de rencontre. Les archives photographiques documentent une communauté qui continue à se retrouver et à transmettre son esprit.",
    source:
      "Archives photographiques SEAFA · Date confirmée par l’association : 26 septembre 2026.",
    verified: true,
    publicationStatus: "published",
  },
];
export const milestones: HistoricalMilestone[] = [
  ...earlyMilestones,
  ...recentMilestones,
];
export const getPublishedMilestones = () =>
  milestones
    .filter((item) => item.verified && item.publicationStatus === "published")
    .sort((a, b) => (a.date?.value ?? "").localeCompare(b.date?.value ?? ""));
