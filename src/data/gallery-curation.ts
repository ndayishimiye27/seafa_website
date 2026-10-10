import type { Album } from "@/types/content";
import { octoberDuplicateSources } from "@/data/october-media";
// Exact matches and visually repeated compositions reviewed; all originals retained.
export const excludedPhotoSources: Record<string, string> = {
  ...octoberDuplicateSources,
  "/media/activities/2026/match contre lumitel en mars 2026/2026-match-lumitel-photo-040.jpeg":
    "/media/activities/2026/match contre lumitel en mars 2026/2026-match-lumitel-photo-001.jpeg",
  "/media/activities/2026/match contre lumitel en mars 2026/2026-match-lumitel-photo-027.jpeg":
    "/media/activities/2026/match contre lumitel en mars 2026/2026-match-lumitel-photo-023.jpeg",
  "/media/activities/2026/match contre lumitel en mars 2026/2026-match-lumitel-photo-032.jpeg":
    "/media/activities/2026/match contre lumitel en mars 2026/2026-match-lumitel-photo-022.jpeg",
  "/media/activities/2024/tournament/2024-tournoi-saint-esprit-photo-018.jpg":
    "/media/activities/2024/tournament/2024-tournoi-saint-esprit-photo-003.jpg",
  "/media/activities/2024/tournament/2024-tournoi-saint-esprit-photo-020.jpg":
    "/media/activities/2024/tournament/2024-tournoi-saint-esprit-photo-011.jpg",
  "/media/activities/2024/tournament/2024-tournoi-saint-esprit-photo-017.jpg":
    "/media/activities/2024/tournament/2024-tournoi-saint-esprit-photo-009.jpg",
  "/media/events/2021/anniversary/anniversary-01.jpg":
    "/media/events/2018/karera-falls/karera-falls-group-02.jpg",
  "/media/events/2018/medical-consultation/medical-consultation-01.png":
    "/media/events/medical-session.png",
  "/media/community/2019/saint-esprit-youth-mentoring.png":
    "/media/community/2021/placide-conference-saint-esprit/placide-conference-saint-esprit-01.png",
  // Anniversary 2026: visually reviewed near-duplicates; keep one composition.
  "/media/activities/2026/anniversaire 2026 au 26 octobre/2026-anniversaire-seafa-photo-095.jpeg":
    "/media/activities/2026/anniversaire 2026 au 26 octobre/2026-anniversaire-seafa-photo-094.jpeg",
  "/media/activities/2026/anniversaire 2026 au 26 octobre/2026-anniversaire-seafa-photo-096.jpeg":
    "/media/activities/2026/anniversaire 2026 au 26 octobre/2026-anniversaire-seafa-photo-098.jpeg",
  "/media/activities/2026/anniversaire 2026 au 26 octobre/2026-anniversaire-seafa-photo-097.jpeg":
    "/media/activities/2026/anniversaire 2026 au 26 octobre/2026-anniversaire-seafa-photo-098.jpeg",
  "/media/activities/2026/anniversaire 2026 au 26 octobre/2026-anniversaire-seafa-photo-105.jpeg":
    "/media/activities/2026/anniversaire 2026 au 26 octobre/2026-anniversaire-seafa-photo-106.jpeg",
  "/media/activities/2026/anniversaire 2026 au 26 octobre/2026-anniversaire-seafa-photo-168.jpeg":
    "/media/activities/2026/anniversaire 2026 au 26 octobre/2026-anniversaire-seafa-photo-166.jpeg",
  "/media/activities/2026/anniversaire 2026 au 26 octobre/2026-anniversaire-seafa-photo-178.jpeg":
    "/media/activities/2026/anniversaire 2026 au 26 octobre/2026-anniversaire-seafa-photo-022.jpeg",
  "/media/activities/2026/anniversaire 2026 au 26 octobre/2026-anniversaire-seafa-photo-180.jpeg":
    "/media/activities/2026/anniversaire 2026 au 26 octobre/2026-anniversaire-seafa-photo-179.jpeg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-005.jpg":
    "/media/activities/2019/tournament/tournament-06.jpg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-016.jpg":
    "/media/activities/2019/tournament/tournament-07.jpg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-038.jpg":
    "/media/activities/2019/tournament/tournament-08.jpg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-039.jpg":
    "/media/activities/2018/match contre songa/2018-match-songa-photo-038.jpg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-017.jpg":
    "/media/activities/2019/tournament/tournament-10.jpg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-019.jpg":
    "/media/activities/2018/match contre songa/2018-match-songa-photo-017.jpg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-008.jpg":
    "/media/activities/2019/tournament/tournament-12.jpg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-001.jpg":
    "/media/activities/2019/tournament/tournament-13.jpg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-034.jpg":
    "/media/activities/2018/match contre songa/2018-match-songa-photo-025.jpg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-024.jpg":
    "/media/activities/2018/match contre songa/2018-match-songa-photo-005.jpg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-040.jpg":
    "/media/activities/2019/tournament/tournament-16.jpg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-026.jpg":
    "/media/activities/2019/tournament/tournament-17.jpg",
  "/media/activities/2019/friendly-matches/friendly-match-03.jpg":
    "/media/activities/2019/friendly-matches/friendly-match-02.jpg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-025.jpg":
    "/media/activities/2019/tournament/tournament-14.jpg",
  "/media/activities/2020/friendly-match/friendly-match-03.jpg":
    "/media/activities/2020/friendly-match/friendly-match-02.jpg",
  "/media/activities/2024/tournament/2024-tournoi-saint-esprit-photo-023.jpg":
    "/media/activities/2024/tournament/2024-tournoi-saint-esprit-photo-020.jpg",
  "/media/community/2019/gitega-trip/gitega-trip-05.jpg":
    "/media/community/2019/gitega-trip/gitega-trip-04.jpg",
  "/media/community/2019/walk/community-walk-02.jpg":
    "/media/community/2019/walk/community-walk-01.jpg",
  "/media/events/2021/anniversary/anniversary-03.jpg":
    "/media/events/2018/karera-falls/karera-falls-group-02.jpg",
  "/media/history/founders.png": "/media/history/2013/founders.png",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-016.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-002.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-045.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-005.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-032.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-014.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-047.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-032.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-052.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-021.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-031.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-023.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-039.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-034.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-049.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-034.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-058.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-034.jpg",
  "/media/anniversaire 2016/2016-anniversaire-seafa-photo-008.jpeg":
    "/media/anniversaire 2016/2016-anniversaire-seafa-photo-007.jpeg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-007.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-005.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-009.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-005.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-011.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-005.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-013.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-005.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-017.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-015.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-027.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-004.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-030.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-022.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-036.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-034.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-037.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-021.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-041.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-019.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-042.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-002.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-043.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-010.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-044.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-008.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-048.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-004.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-051.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-034.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-056.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-001.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-057.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-055.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-059.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-026.jpg",
  "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-060.jpg":
    "/media/activities/2020/kuramukanya chez les badogomba/2020-rencontre-badogomba-photo-018.jpg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-015.jpg":
    "/media/activities/2018/match contre songa/2018-match-songa-photo-003.jpg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-023.jpg":
    "/media/activities/2018/match contre songa/2018-match-songa-photo-007.jpg",
  "/media/activities/2018/match contre songa/2018-match-songa-photo-032.jpg":
    "/media/activities/2018/match contre songa/2018-match-songa-photo-030.jpg",
};
export const albumAdditions: Album[] = [
  {
    id: "archives-ajoutees",
    slug: "archives-ajoutees",
    title: "Archives photographiques",
    type: "history",
    images: [],
    summary:
      "Archives photographiques. La date de ces photographies reste à confirmer.",
    relatedContent: [],
    featured: false,
    publicationStatus: "published",
    coverMediaId: "photo-f91c48db4b45e8e5",
  },
  {
    id: "visite-badogomba",
    slug: "visite-badogomba",
    title: "Visite chez les Badogomba",
    type: "community",
    images: [],
    summary:
      "Visite chez les Badogomba. La date de ces photographies reste à confirmer.",
    relatedContent: [],
    featured: false,
    publicationStatus: "published",
    coverMediaId: "photo-8f2ccb3857674f83",
  },
];
export const additionalAlbumPhotos: Record<string, string[]> = {
  "events-2016-anniversary": [
    "photo-759dab90cdb1097b",
    "photo-7a91d4b80dc76510",
    "photo-77ca82cd78d1b6b4",
    "photo-8e8545daa1f8e58f",
    "photo-757994b1c6a44d8b",
    "photo-52381f4c8b46683a",
    "photo-f5bb0d6bdb7e4232",
    "photo-883a83065df46aa9",
    "photo-6c284d1a1dbee738",
    "photo-1711214c262c7132",
    "photo-03285a7eceda2bd5",
    "photo-81a9488f2666049c",
    "photo-fd785df54e1a9505",
  ],
  "archives-ajoutees": [
    "photo-280bf29ce5ac7451",
    "photo-61660536eeafc5c2",
    "photo-f91c48db4b45e8e5",
    "photo-926c50b9a8eaf2e6",
    "photo-afeaf989d5cc0396",
    "photo-b1d52698e89390d8",
  ],
  "history-archives": [
    "photo-911ffbb917ede8f7",
    "photo-1fc8f33a75c76071",
    "photo-ee511db651532a3b",
    "photo-6c67b5aa57600e0e",
  ],
  "visite-badogomba": [
    "photo-750e64c245450f66",
    "photo-8f2ccb3857674f83",
    "photo-8b25235b844f02ac",
    "photo-72ba89754f4fb174",
    "photo-f4ac1e5aa54121a3",
    "photo-1b0b73259af07fa5",
    "photo-a98082b10340c203",
    "photo-f24461e0775d428f",
    "photo-f7aedc057c9a5895",
    "photo-32062c553ce4d43c",
    "photo-c06761a688498627",
    "photo-e753eb0bd017d56a",
    "photo-84c00708b3a84183",
    "photo-f28cd275734af0ef",
    "photo-9e6d11b9e3aa4cc7",
    "photo-61c71ba56a196282",
    "photo-f8e1b0482577316b",
    "photo-d7d066698667a42e",
    "photo-d5fa0ba55f19b30e",
    "photo-a14ae7c502d84369",
    "photo-35f25a88fb3f9a7f",
    "photo-3b1bb4d91d3094cb",
    "photo-98395e4c20f92a34",
    "photo-0bb52f7428a5343a",
    "photo-07103c37c0dcc27f",
    "photo-229ed9cf03ef0f1a",
    "photo-57bb182f042c9e50",
    "photo-064a02128ca70ab5",
    "photo-9311a5861a2e737b",
    "photo-b2e8bf2b5fe7f086",
    "photo-81f40d6f644988e7",
    "photo-aaa4563f7cd4b348",
    "photo-b2ce9c1eb4ebae69",
    "photo-9392cb29d58a6538",
    "photo-e5eacd0747c053c7",
    "photo-049634b3525db342",
    "photo-6c45436fac43c2ef",
    "photo-1ec4761607b3d356",
    "photo-6e7fef30b09fbd28",
    "photo-b4d5d4f968af1c24",
    "photo-338f9d67ffa4a2a4",
    "photo-7785d4fad4c4b200",
    "photo-b7dab1f6bc472c67",
    "photo-8ac1e71b10295ec6",
    "photo-6c4ad44d88dfd56c",
    "photo-49bf58e66dfec9e4",
    "photo-d1be95a5cb092136",
    "photo-5a1f44fb9edc3e15",
    "photo-7fd2aae31983dbd9",
    "photo-0ad39ccaaea34143",
    "photo-3b12b46d05e6d741",
  ],
  "activities-2019-tournament": [
    "photo-b1e756e7bae285d1",
    "photo-a40b8ed37d2064e1",
    "photo-5d341c70c1932a8e",
    "photo-ccb6b950d4f525d9",
    "photo-9f969c4bb1f69594",
    "photo-f1bf371a1f66ea21",
    "photo-1d596df204abac17",
    "photo-92ada16df8f542f5",
    "photo-e126950f5aea246b",
    "photo-1961c120e002a164",
    "photo-a361f60937ec2362",
    "photo-a44eeb260456e353",
    "photo-eeb2a71583e26ac8",
    "photo-740dd954a1fb92a4",
    "photo-c0a31b44b671c7d8",
    "photo-89edab238951d4e3",
    "photo-396ae15c1aa30c25",
    "photo-019c8e235b77280b",
    "photo-1c92e36fd7cc7031",
    "photo-4623bdf8ae576f7a",
    "photo-149720d815c2ecf4",
    "photo-83b17b27a28f639b",
    "photo-4c266e499edada58",
    "photo-0cd12f314d420dca",
    "photo-9baf93af5a64f2c9",
    "photo-ac5d9846a160165d",
    "photo-fe2a4455319ed6bc",
  ],
};
