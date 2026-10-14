import portraits from "@/data/presidency-photos.json";
const [arnaud, jimmy, romeo, tony] = portraits;
import type { FormerPresident, LeadershipMember } from "@/types/content";

export const currentPresident: LeadershipMember = {
  id: "president-jimmy",
  fullName: "Jimmy Jambo",
  role: "president",
  roleLabel: "Président actuel",
  biography:
    "Il poursuit cette dynamique et fait vivre l’héritage collectif de la SEAFA.",
  termStart: { value: "2024", precision: "year" },
  photograph: { ...jimmy, alt: "Jimmy Jambo, président de SEAFA" },
};
// Exact boundaries are not established by the booklet. See presidencyTermLabels.
export const presidentialSuccession: FormerPresident[] = [
  {
    id: "president-arnaud",
    fullName: "Arnaud Badogomba",
    photograph: {
      ...arnaud,
      alt: "Arnaud Badogomba, premier président de SEAFA",
    },
    biography:
      "Il pose les fondations de l’équipe et rassemble les premières énergies autour d’un projet commun.",
  },
  {
    id: "president-romeo",
    fullName: "Romeo Badogomba",
    termStart: { value: "2020", precision: "year" },
    termEnd: { value: "2022", precision: "year" },
    photograph: { ...romeo, alt: "Romeo Badogomba, ancien président de SEAFA" },
    biography:
      "Il prolonge le travail engagé et fait progresser l’équipe dans la continuité de ces premières fondations.",
  },
  {
    id: "president-tony",
    fullName: "Tony Ezako",
    termStart: { value: "2022", precision: "year" },
    termEnd: { value: "2024", precision: "year" },
    photograph: { ...tony, alt: "Tony Ezako, ancien président de SEAFA" },
    biography: "Il consolide les acquis et renforce la cohésion du collectif.",
  },
];

export const presidencyTermLabels: Record<string, string> = {
  "president-arnaud": "2014–2019 attestés · mandat exact à confirmer",
  "president-romeo": "2020–2022",
  "president-tony": "2022–2024",
  "president-jimmy": "Depuis 2024",
};
export const presidencySourceNote =
  "Le livret atteste Arnaud à la présidence en 2014 et encore en 2019. Les limites exactes restent à confirmer : les anciennes données indiquaient 2013–2019, tandis que le portrait fourni indique 2014–2020. Les périodes de Romeo, Tony et Jimmy suivent les noms des portraits fournis.";
