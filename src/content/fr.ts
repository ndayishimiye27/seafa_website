export const foundationCopy = {
  notice: "Ce contenu sera publié après confirmation.",
  loading: "Chargement…",
};
export const navigationGroups = [
  {
    id: "club",
    label: "Le club",
    links: [
      { href: "/about", label: "À propos" },
      { href: "/history", label: "Notre histoire" },
      { href: "/team", label: "Équipe" },
      { href: "/activities", label: "Activités" },
      { href: "/challenges", label: "Défis sportifs" },
      { href: "/awards", label: "Prix et distinctions" },
      { href: "/request-match", label: "Proposer un match" },
    ],
  },
  {
    id: "community",
    label: "Vie associative",
    links: [
      { href: "/events", label: "Événements" },
      { href: "/community", label: "Communauté" },
      { href: "/diaspora", label: "Diaspora" },
      { href: "/interviews", label: "Témoignages" },
      { href: "/news", label: "Actualités" },
    ],
  },
];
export const primaryLinks = [
  { href: "/gallery", label: "Galerie" },
  { href: "/contact", label: "Contact" },
];
export const headerAction = { href: "/join", label: "Devenir membre" };
export const navigation = [
  { href: "/", label: "Accueil" },
  ...navigationGroups.flatMap((group) => group.links),
  ...primaryLinks,
  { href: "/login", label: "Se connecter" },
  headerAction,
];
export const footerNavigation = [
  { href: "/privacy", label: "Confidentialité" },
  { href: "/code-of-conduct", label: "Code de conduite" },
];
