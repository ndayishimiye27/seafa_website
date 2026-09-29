export interface PortraitArchive {
  name: string;
  mediaId: string;
  section: "leadership" | "support" | "heritage" | "general";
  roleLabel?: string;
}
/** Historical context established by the supplied filenames; never a current roster. */
export const archivedPeople: PortraitArchive[] = [
  {
    name: "Biggie",
    mediaId: "media-people-coach-biggie",
    section: "support",
    roleLabel: "Coach — portrait d’archive",
  },
  { name: "Jules", mediaId: "media-people-jules", section: "general" },
  { name: "Placide", mediaId: "media-people-placide", section: "general" },
  {
    name: "Tony — 2024",
    mediaId: "media-people-president-tony-2024",
    section: "leadership",
    roleLabel: "Président — archive de 2024",
  },
  { name: "Romeo", mediaId: "media-people-romeo", section: "general" },
  {
    name: "Arnaud Badogomba",
    mediaId: "media-interviews-arnaud-badogomba-first-president",
    section: "heritage",
    roleLabel: "Premier président — portrait d’archive",
  },
];
