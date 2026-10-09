export interface PortraitArchive {
  name: string;
  mediaId: string;
  section: "leadership" | "support" | "heritage" | "general";
  roleLabel?: string;
}
/** Historical context established by the supplied filenames; never a current roster. */
export const archivedPeople: PortraitArchive[] = [
  {
    name: "Tony — 2024",
    mediaId: "media-people-president-tony-2024",
    section: "leadership",
    roleLabel: "Président — archive de 2024",
  },
  { name: "Romeo", mediaId: "presidency-photo-2", section: "general" },
  {
    name: "Arnaud Badogomba",
    mediaId: "media-interviews-arnaud-badogomba-first-president",
    section: "heritage",
    roleLabel: "Premier président — portrait d’archive",
  },
];
