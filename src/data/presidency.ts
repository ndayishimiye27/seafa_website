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
// Preserve the documented historical term; the new filename says 2015–2022.
// This conflict is recorded in the integration report, not silently resolved.
export const presidentialSuccession: FormerPresident[] = [
  {
    id: "president-arnaud",
    fullName: "Arnaud Badogomba",
    termStart: { value: "2013", precision: "year" },
    termEnd: { value: "2019", precision: "year" },
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
