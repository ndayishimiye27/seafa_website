import type { Award } from "@/types/content";
// Alain's award year conflicts between pages 11 and 14: intentionally unpublished.
const documentedAwards: Award[] = [
  {
    id: "award-2015-jack",
    slug: "meilleur-joueur-2015",
    title: "Meilleur joueur de l’année",
    category: "player-of-year",
    year: 2015,
    recipients: [{ type: "person", name: "Ndayishimiye Jean Jack" }],
    memberIds: [],
    description:
      "Le livret historique cite Jack comme meilleur joueur de 2015. Son entretien rappelle la confiance et l’accompagnement reçus au fil de ses premières années dans l’équipe.",
    source: "Newsletter SEAFA, p. 8–9 et 18–20",
    featured: true,
    publicationStatus: "published",
  },
  {
    id: "award-2017-yannick",
    slug: "meilleur-joueur-2017",
    title: "Meilleur joueur de l’année",
    category: "player-of-year",
    year: 2017,
    recipients: [{ type: "person", name: "Yannick Nshimirima" }],
    memberIds: [],
    description:
      "Le récit de l’année 2017 désigne Yannick Nshimirima comme meilleur joueur de l’année.",
    source:
      "Newsletter SEAFA, p. 11. Le titre de l’entretien d’Alain p. 14 présente une incohérence à clarifier.",
    featured: false,
    publicationStatus: "draft",
  },
  {
    id: "award-2018-malolo",
    slug: "meilleur-joueur-2018",
    title: "Meilleur joueur de l’année",
    category: "player-of-year",
    year: 2018,
    recipients: [{ type: "person", name: "Ezako Jean Tonny · Malolo" }],
    memberIds: [],
    description:
      "Le livret désigne Ezako Jean Tonny, connu sous le surnom de Malolo, comme meilleur joueur de 2018, lors du récit de la célébration annuelle.",
    source: "Newsletter SEAFA, p. 12",
    featured: true,
    publicationStatus: "published",
  },
];

const photographicAwards: Award[] = [2014, 2015, 2016, 2018].map((year) => ({
  id: "photo-awards-" + year,
  slug: "archives-distinctions-" + year,
  title: "Photographies de distinctions — " + year,
  category: "season-collection",
  albumId: "awards-" + year,
  year,
  recipients: [],
  memberIds: [],
  description:
    "Album classé selon l’année du dossier fourni. Les identités, intitulés et dates des distinctions restent à confirmer lorsque les informations du livret divergent.",
  source: "Médiathèque SEAFA : dossier awards/" + year,
  featured: false,
  publicationStatus: "published",
}));
export const awards: Award[] = [...documentedAwards, ...photographicAwards];
