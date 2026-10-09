import type { Activity, Album, Event } from "@/types/content";
import { octoberGroups } from "@/data/october-media";
import octoberVideos from "@/data/october-videos.json";

// Kirundi originals remain in their supplied folders. French editorial translations.
export const healthDescription = `Le 3 juin 2022, au Lycée du Saint Esprit, le docteur Arnaud Favina, membre de SEAFA, a animé une rencontre consacrée aux adolescents et aux substances psychoactives, notamment l’alcool. SEAFA y a rappelé que son engagement autour du football s’accompagne d’une attention à la santé, en particulier celle des jeunes.

Le médecin a expliqué que certains adolescents se tournent vers ces substances en espérant résoudre leurs difficultés, au risque de compromettre leur santé. Il a encouragé le dialogue entre générations : les aînés sont invités à écouter et à comprendre les plus jeunes, qui peuvent à leur tour apprendre de leur expérience.

Le docteur Arnaud Badogomba, à l’origine de SEAFA, a souligné l’importance de transmettre ses connaissances. Cette démarche commence au Lycée du Saint Esprit, où l’association a ses racines, avec l’intention de visiter également d’autres écoles. Des élèves présents ont salué l’exemple donné par leurs aînés et exprimé le souhait de partager, eux aussi, leurs connaissances après leurs études secondaires.`;

export const tournamentDescription = `Du 4 octobre au 3 novembre 2024, SEAFA a organisé un tournoi pour renforcer les liens entre les groupes qui fréquentent les installations de Saint Esprit. Le tournoi a réuni six équipes issues de SEAFA et de la communauté de Saint Esprit. Les participants comprenaient les deux équipes de SEAFA, des élèves, parents et enseignants du Lycée, l’Académie Zoé, ainsi que des choristes et des servants de messe. Cette rencontre a réuni, autour du football, plusieurs composantes de la communauté liée aux jésuites au Burundi.

Le père Désiré Yamuremye, responsable du Lycée, a ouvert le tournoi. Il a rappelé que les élèves sont encouragés à pratiquer une activité physique le vendredi après-midi, malgré l’état des terrains. Tony Ezako, présenté dans ce récit comme responsable de SEAFA, a expliqué que le football s’accompagne d’un projet de partage d’idées et de mobilisation des anciens élèves, des partenaires et de ceux qui souhaitent soutenir les projets de l’école. Il a évoqué l’ambition d’organiser un tournoi annuel réunissant des acteurs proches du secteur éducatif.

Arnaud Ndagara, arrivé à SEAFA en 2016 alors qu’il était encore au secondaire, a évoqué le projet d’améliorer le terrain du Lycée pour les prochaines rencontres. Il a également expliqué que SEAFA l’avait aidé à mieux se connaître et à contribuer à la vie du groupe. Jimmy Jambo, joueur depuis 2016, a souligné l’importance de réunir des compétences variées, de partager les efforts et de transmettre les valeurs du collectif.

La finale a opposé SEAFA-A à SEAFA-B. SEAFA-A, composée de joueurs expérimentés du groupe, a remporté le tournoi. SEAFA Médecine a également remis du matériel médical au Lycée du Saint Esprit.

Créée en 2013 par d’anciens élèves, SEAFA associe la pratique sportive, la santé, la solidarité et le partage des connaissances. Initialement réservée aux anciens de Saint Esprit, elle s’est ouverte aux femmes et aux hommes d’autres horizons. Ses membres interviennent aussi auprès des élèves sur la santé, l’activité physique et l’orientation après le secondaire.`;

function collection(
  id: keyof typeof octoberGroups,
  title: string,
  date: NonNullable<Album["eventDate"]>,
  category: Album["category"],
  summary: string,
  description?: string,
): Album {
  const group = octoberGroups[id];
  const cover = group.photos[0];
  const photos = [
    cover,
    ...group.photos.filter((mediaId) => mediaId !== cover),
  ];
  return {
    id,
    slug: id,
    title,
    type: "activity",
    category,
    categoryLabel:
      category === "education" ? "Conférence et transmission" : "Football",
    eventDate: date,
    summary,
    description,
    images: photos.map((mediaId, index) => ({ mediaId, order: index + 1 })),
    coverMediaId: cover,
    videos: id === "sages-jeunes-2025" ? octoberVideos : group.videos,
    relatedContent: [{ type: "event", id: `event-${id}` }],
    featured: false,
    publicationStatus: "published",
  };
}

export const octoberAlbums: Album[] = [
  collection(
    "conference-sante-2022",
    "Adolescents, alcool et santé",
    { value: "2022-06-03", precision: "day" },
    "education",
    "Au Lycée du Saint Esprit, SEAFA partage ses connaissances et encourage le dialogue entre générations autour de la santé des adolescents.",
    healthDescription,
  ),
  collection(
    "seafa-lumitel",
    "SEAFA contre Lumitel",
    { value: "2026-03", precision: "month" },
    "football",
    "Les photographies de la rencontre entre SEAFA et Lumitel, en mars 2026.",
  ),
  collection(
    "sages-jeunes-2025",
    "Les sages face aux jeunes",
    { value: "2025-12", precision: "month" },
    "football",
    "Une rencontre entre les sages et les jeunes de SEAFA, en décembre 2025. Retrouvez les photographies et les séquences vidéo du match.",
  ),
];

export const octoberEvents: Event[] = octoberAlbums.map((album) => ({
  id: `event-${album.id}`,
  slug: album.slug,
  title: album.title,
  category: "other",
  albumId: album.id,
  startDate: album.eventDate,
  status: "completed",
  summary: album.summary,
  description: album.description,
  featured: false,
  publicationStatus: "published",
}));
export const octoberActivities: Activity[] = octoberAlbums.map((album) => ({
  id:
    album.id === "seafa-lumitel"
      ? "activite-seafa-lumitel"
      : `activity-${album.id}`,
  slug: album.id === "seafa-lumitel" ? "seafa-vs-lumitel" : album.slug,
  title: album.title,
  category: album.category === "education" ? "wellness" : "friendly-match",
  albumId: album.id,
  date: album.eventDate,
  summary: album.summary,
  description: album.description,
  participants: [],
  featured: false,
  publicationStatus: "published",
}));
