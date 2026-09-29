import type { Interview } from "@/types/content";
export const interviews: Interview[] = [
  {
    id: "claver",
    slug: "claver-kazobavamwo",
    fullName: "Claver Kazobavamwo",
    relationship: "Président d’honneur dans le livret historique",
    kind: "interview",
    highlight: "L’encadrement entre pairs et le partage des bonnes pratiques.",
    summary:
      "Claver évoque l’organisation des jeunes au Saint Esprit, les échanges entre membres et son souhait de voir l’équipe s’épanouir.",
    paragraphs: [
      "Claver Kazobavamwo raconte avoir découvert les jeunes déjà organisés sur le terrain du Saint Esprit. Le récit des débuts souligne également sa contribution à l’encadrement du groupe.",
      "Dans son entretien, il décrit SEAFA comme un espace d’encadrement entre pairs et de partage des bonnes pratiques. Il retient particulièrement l’organisation et l’innovation qui accompagnent la vie de l’équipe.",
      "Il souhaite davantage d’épanouissement pour l’équipe et présente le Lycée du Saint Esprit comme une référence éducative ouverte à une vision inclusive. Le titre de président d’honneur mentionné dans le livret appartient à ce contexte historique et ne confirme pas une fonction actuelle.",
    ],
    portraitMediaId: "media-interviews-claver-kazobavamwo",
    source: "Newsletter SEAFA, p. 21 ; contexte historique p. 5 et 8",
    publicationStatus: "published",
  },
  {
    portraitMediaId: "media-interviews-arnaud-badogomba-first-president",
    id: "bados",
    slug: "arnaud-bados-badogomba",
    fullName: "Arnaud Badogomba",
    nickname: "Bados",
    relationship: "Membre fondateur",
    kind: "interview",
    highlight: "Une seconde famille, un héritage à transmettre.",
    summary:
      "Bados raconte comment le football a donné naissance à une famille fondée sur l’organisation, le respect et l’entraide.",
    paragraphs: [
      "Dans son entretien, Arnaud Badogomba revient sur les liens noués au Lycée, devenus une fraternité durable. Le plaisir de se retrouver s’est transformé en une seconde famille, soutenue par une organisation commune et l’entraide.",
      "Il relie cette démarche à l’héritage d’excellence reçu au Lycée du Saint Esprit : partager ce que l’on a appris et savoir donner autant que recevoir. Les activités au-delà du football, dont SEAFA Médecine, incarnent cette ambition.",
      "Son souhait est de voir les plus jeunes s’approprier ces valeurs, prendre la relève et entretenir le lien avec le Lycée.",
    ],
    source: "Newsletter SEAFA, p. 23–24",
    publicationStatus: "published",
  },
  {
    portraitMediaId: "media-interviews-alain-nduwimana",
    id: "alain",
    slug: "alain-nduwimana",
    fullName: "Alain Nduwimana",
    relationship: "Membre accueilli au-delà du cercle des anciens",
    kind: "interview",
    highlight: "Une équipe où chacun contribue.",
    summary:
      "Sans avoir fréquenté le Lycée, Alain trouve sa place dans une organisation participative qui l’aide à progresser.",
    paragraphs: [
      "Alain découvre le groupe par l’intermédiaire de Jack. Bien qu’il n’ait pas fréquenté le Lycée du Saint Esprit, il y est accueilli et trouve progressivement sa place sur le terrain.",
      "Il apprécie particulièrement une organisation portée par les jeunes eux-mêmes. Les membres participent aux décisions et aux efforts nécessaires à la vie de l’équipe.",
      "Son parcours à différents postes illustre la confiance qui se construit avec le temps. Pour l’avenir, il souligne l’importance d’accueillir de jeunes joueurs afin de préserver la vitalité du groupe.",
    ],
    source: "Newsletter SEAFA, p. 14–15",
    publicationStatus: "published",
  },
  {
    portraitMediaId: "media-interviews-idane",
    id: "idan",
    slug: "idan",
    fullName: "Nzisabira Idane Carlène",
    nickname: "Idan",
    relationship:
      "Membre de la communauté ; étudiante en médecine au moment de l’entretien",
    kind: "interview",
    highlight: "Des rencontres qui deviennent une famille.",
    summary:
      "Idan évoque l’accueil reçu au SEAFA et souhaite élargir la participation des femmes aux activités sportives et sociales.",
    paragraphs: [
      "Invitée à une célébration par une amie, Idan retrouve des visages connus du Lycée et découvre une communauté où de nouvelles amitiés peuvent devenir des liens familiaux.",
      "Étudiante en médecine au moment du témoignage, elle représente une participation féminine qui dépasse le rôle de spectatrice. Le livret présente aussi l’apport de jeunes femmes aux activités médicales et à la vie collective.",
      "Elle souhaite accueillir davantage de femmes et développer d’autres pratiques, comme le basketball, le volleyball ou la course. Ces propositions expriment sa vision de l’avenir ; elles ne constituent pas un programme actuel confirmé.",
    ],
    source: "Newsletter SEAFA, p. 20–21 ; contexte médical p. 15–16",
    publicationStatus: "published",
  },
];
export const getPublishedInterviews = () =>
  interviews.filter((item) => item.publicationStatus === "published");
