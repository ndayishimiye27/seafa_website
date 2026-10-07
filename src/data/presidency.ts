import portraits from "@/data/presidency-photos.json";
const [arnaud, jimmy, romeo, tony] = portraits;
import type { FormerPresident, LeadershipMember } from "@/types/content";

export const currentPresident: LeadershipMember = {
  id: "president-jimmy",
  fullName: "Jimmy Jambo",
  role: "president",
  roleLabel: "Président actuel",
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
    biography: "Premier président · mandat documenté : 2013–2019.",
  },
  {
    id: "president-romeo",
    fullName: "Romeo",
    termStart: { value: "2020", precision: "year" },
    termEnd: { value: "2022", precision: "year" },
    photograph: { ...romeo, alt: "Romeo, ancien président de SEAFA" },
    biography: "Président · 2020–2022.",
  },
  {
    id: "president-tony",
    fullName: "Tony Ezako",
    termStart: { value: "2022", precision: "year" },
    termEnd: { value: "2024", precision: "year" },
    photograph: { ...tony, alt: "Tony Ezako, ancien président de SEAFA" },
    biography: "Président · 2022–2024.",
  },
];
