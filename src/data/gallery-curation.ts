import type { Album } from "@/types/content";
// Exact matches and visually repeated compositions reviewed; all originals retained.
export const excludedPhotoSources: Record<string, string> = {
  // Anniversary 2026: visually reviewed near-duplicates; keep one composition.
  "/media/anniversaire 2026 au 26 octobre/WhatsApp Image 2026-09-27 at 11.11.56.jpeg":
    "/media/anniversaire 2026 au 26 octobre/WhatsApp Image 2026-09-27 at 11.11.55.jpeg",
  "/media/anniversaire 2026 au 26 octobre/WhatsApp Image 2026-09-27 at 11.11.57.jpeg":
    "/media/anniversaire 2026 au 26 octobre/WhatsApp Image 2026-09-27 at 11.11.59.jpeg",
  "/media/anniversaire 2026 au 26 octobre/WhatsApp Image 2026-09-27 at 11.11.58.jpeg":
    "/media/anniversaire 2026 au 26 octobre/WhatsApp Image 2026-09-27 at 11.11.59.jpeg",
  "/media/anniversaire 2026 au 26 octobre/WhatsApp Image 2026-09-27 at 11.12.20.jpeg":
    "/media/anniversaire 2026 au 26 octobre/WhatsApp Image 2026-09-27 at 11.12.21.jpeg",
  "/media/anniversaire 2026 au 26 octobre/WhatsApp Image 2026-09-27 at 11.18.31.jpeg":
    "/media/anniversaire 2026 au 26 octobre/WhatsApp Image 2026-09-27 at 11.18.29.jpeg",
  "/media/anniversaire 2026 au 26 octobre/WhatsApp Image 2026-09-27 at 11.18.44.jpeg":
    "/media/anniversaire 2026 au 26 octobre/WhatsApp Image 2026-09-27 at 11.10.30.jpeg",
  "/media/anniversaire 2026 au 26 octobre/WhatsApp Image 2026-09-27 at 11.18.46.jpeg":
    "/media/anniversaire 2026 au 26 octobre/WhatsApp Image 2026-09-27 at 11.18.45.jpeg",
  "/media/match contre songa/213eeb84-d557-436e-83a6-f78a078dbfae.jpg":
    "/media/activities/2019/tournament/tournament-06.jpg",
  "/media/match contre songa/70e81a12-5373-4158-afa8-9b4565bebf72.jpg":
    "/media/activities/2019/tournament/tournament-07.jpg",
  "/media/match contre songa/f4fbb1ce-b956-47b2-b104-9004f1a60a52.jpg":
    "/media/activities/2019/tournament/tournament-08.jpg",
  "/media/match contre songa/f8204292-0d2a-4eba-be11-3a224044ef2c.jpg":
    "/media/match contre songa/f4fbb1ce-b956-47b2-b104-9004f1a60a52.jpg",
  "/media/match contre songa/76b4101a-ff25-4889-b3ee-5fd2cd50bf77.jpg":
    "/media/activities/2019/tournament/tournament-10.jpg",
  "/media/match contre songa/7c18f5a9-c230-480c-8a0d-10e7e361b9a5.jpg":
    "/media/match contre songa/76b4101a-ff25-4889-b3ee-5fd2cd50bf77.jpg",
  "/media/match contre songa/3c139cd7-e63a-4266-ba50-38395d742e13.jpg":
    "/media/activities/2019/tournament/tournament-12.jpg",
  "/media/match contre songa/042b9a54-4499-4b24-8b31-b73a80ecc340.jpg":
    "/media/activities/2019/tournament/tournament-13.jpg",
  "/media/match contre songa/c868e7df-de67-40c6-94f0-fdd7d6fa90c4.jpg":
    "/media/match contre songa/a73abd63-6ee3-46fd-97ba-d0f410a8a1dc.jpg",
  "/media/match contre songa/a127de6b-a5dd-4f0e-91b7-38f7f9da6563.jpg":
    "/media/match contre songa/213eeb84-d557-436e-83a6-f78a078dbfae.jpg",
  "/media/match contre songa/ff875cb6-548c-4f58-8515-eca51da38094.jpg":
    "/media/activities/2019/tournament/tournament-16.jpg",
  "/media/match contre songa/ab001a93-38ce-4659-8893-3aaaacb4082f.jpg":
    "/media/activities/2019/tournament/tournament-17.jpg",
  "/media/activities/2019/friendly-matches/friendly-match-03.jpg":
    "/media/activities/2019/friendly-matches/friendly-match-02.jpg",
  "/media/match contre songa/a73abd63-6ee3-46fd-97ba-d0f410a8a1dc.jpg":
    "/media/activities/2019/tournament/tournament-14.jpg",
  "/media/activities/2020/friendly-match/friendly-match-03.jpg":
    "/media/activities/2020/friendly-match/friendly-match-02.jpg",
  "/media/activities/2024/tournament/tournament-07.jpg":
    "/media/activities/2024/tournament/tournament-04.jpg",
  "/media/community/2019/gitega-trip/gitega-trip-05.jpg":
    "/media/community/2019/gitega-trip/gitega-trip-04.jpg",
  "/media/community/2019/walk/community-walk-02.jpg":
    "/media/community/2019/walk/community-walk-01.jpg",
  "/media/events/2021/anniversary/anniversary-03.jpg":
    "/media/events/2018/karera-falls/karera-falls-group-02.jpg",
  "/media/history/founders.png": "/media/history/2013/founding-members-01.png",
  "/media/kuramukanya chez les badogomba/3fd3c63e-48ab-4779-851a-00c7266b4484.jpg":
    "/media/kuramukanya chez les badogomba/162755e0-77b8-4b9d-a760-b90b3f6cf59b.jpg",
  "/media/kuramukanya chez les badogomba/c342f7cd-d229-4c92-9d58-f440e67d1952.jpg":
    "/media/kuramukanya chez les badogomba/288cd435-9e8f-4368-8382-e220f1cd7412.jpg",
  "/media/kuramukanya chez les badogomba/99425009-5f24-4ae4-a8ba-2f107f949a75.jpg":
    "/media/kuramukanya chez les badogomba/382889ce-9a7d-4c82-95a1-4a4968f22e6c.jpg",
  "/media/kuramukanya chez les badogomba/c982bf39-cd63-40ec-9a79-69201354f380.jpg":
    "/media/kuramukanya chez les badogomba/99425009-5f24-4ae4-a8ba-2f107f949a75.jpg",
  "/media/kuramukanya chez les badogomba/d3f0d593-4d96-4669-8f6b-c32781ba87d4.jpg":
    "/media/kuramukanya chez les badogomba/511c917d-5d4c-43f1-a954-23db339e816c.jpg",
  "/media/kuramukanya chez les badogomba/922f9ed7-e09c-40d2-bd3f-c1de6c7a8b10.jpg":
    "/media/kuramukanya chez les badogomba/6c58da5b-6c45-48d3-8ef8-b381de9b5cab.jpg",
  "/media/kuramukanya chez les badogomba/b0aa223c-405e-4c5a-b644-a071a4c9384b.jpg":
    "/media/kuramukanya chez les badogomba/9b3800f4-48a6-4a7d-b7d8-266591c1e790.jpg",
  "/media/kuramukanya chez les badogomba/d1587bb6-7f51-4ea6-b793-15608912a5f2.jpg":
    "/media/kuramukanya chez les badogomba/9b3800f4-48a6-4a7d-b7d8-266591c1e790.jpg",
  "/media/kuramukanya chez les badogomba/e9e086b2-f862-4ee2-b927-5fd461cc41a5.jpg":
    "/media/kuramukanya chez les badogomba/9b3800f4-48a6-4a7d-b7d8-266591c1e790.jpg",
  "/media/anniversaire 2016/sfsfsf.jpeg":
    "/media/anniversaire 2016/sdfsfsd.jpeg",
  "/media/kuramukanya chez les badogomba/2bec3d13-3563-4f9a-ba04-c34615f97aa5.jpg":
    "/media/kuramukanya chez les badogomba/288cd435-9e8f-4368-8382-e220f1cd7412.jpg",
  "/media/kuramukanya chez les badogomba/3142d987-1706-46ac-b4b8-f11bd945d8f4.jpg":
    "/media/kuramukanya chez les badogomba/288cd435-9e8f-4368-8382-e220f1cd7412.jpg",
  "/media/kuramukanya chez les badogomba/32c943ad-2f8d-4b80-a5d7-2ecd3f0a6220.jpg":
    "/media/kuramukanya chez les badogomba/288cd435-9e8f-4368-8382-e220f1cd7412.jpg",
  "/media/kuramukanya chez les badogomba/358114d3-d023-463c-893d-fe66b923b131.jpg":
    "/media/kuramukanya chez les badogomba/288cd435-9e8f-4368-8382-e220f1cd7412.jpg",
  "/media/kuramukanya chez les badogomba/4707962e-b0bd-45d6-a4b5-67e34bfb71c7.jpg":
    "/media/kuramukanya chez les badogomba/3b0c4a65-62f9-4106-8b09-d98d5a1fa923.jpg",
  "/media/kuramukanya chez les badogomba/7026eded-9fed-4adf-afbc-d5fa49bf65e8.jpg":
    "/media/kuramukanya chez les badogomba/263584dd-3ebe-4582-8dc3-2bdc451dfe5c.jpg",
  "/media/kuramukanya chez les badogomba/9015e9bd-d774-47a3-9f77-1e164403cec8.jpg":
    "/media/kuramukanya chez les badogomba/668e3fa3-752b-4a5f-bfed-9de3861cc15d.jpg",
  "/media/kuramukanya chez les badogomba/a192e86e-f78c-4cf4-a500-4fe2e5e462d5.jpg":
    "/media/kuramukanya chez les badogomba/9b3800f4-48a6-4a7d-b7d8-266591c1e790.jpg",
  "/media/kuramukanya chez les badogomba/ad833d09-fef7-4a4d-a911-0794a6e06b67.jpg":
    "/media/kuramukanya chez les badogomba/511c917d-5d4c-43f1-a954-23db339e816c.jpg",
  "/media/kuramukanya chez les badogomba/b36a92a7-8aee-4199-927e-6fc234c594ee.jpg":
    "/media/kuramukanya chez les badogomba/4c2b25ae-6743-41f5-a1f2-2268f779e40d.jpg",
  "/media/kuramukanya chez les badogomba/b49f8e4f-2ef5-4c99-8014-b563c2ccbc21.jpg":
    "/media/kuramukanya chez les badogomba/162755e0-77b8-4b9d-a760-b90b3f6cf59b.jpg",
  "/media/kuramukanya chez les badogomba/bb62034d-bace-43f7-bc9b-f6c4aad1a79f.jpg":
    "/media/kuramukanya chez les badogomba/31b9a731-2e5b-4f31-b2db-2ac0a983575d.jpg",
  "/media/kuramukanya chez les badogomba/c2746ded-b821-448d-a3ec-4f570634fb68.jpg":
    "/media/kuramukanya chez les badogomba/308622a2-18bd-465c-9902-8b8aa748e138.jpg",
  "/media/kuramukanya chez les badogomba/ceb2ed1f-c8a0-49d1-8ed9-90d6010c4a73.jpg":
    "/media/kuramukanya chez les badogomba/263584dd-3ebe-4582-8dc3-2bdc451dfe5c.jpg",
  "/media/kuramukanya chez les badogomba/d21a921e-54df-49b7-922b-34bd7af33aa8.jpg":
    "/media/kuramukanya chez les badogomba/9b3800f4-48a6-4a7d-b7d8-266591c1e790.jpg",
  "/media/kuramukanya chez les badogomba/dcbcb1d6-66fb-43cd-957d-561c94851348.jpg":
    "/media/kuramukanya chez les badogomba/0eb87994-0fba-4868-a8a4-4e01498535ee.jpg",
  "/media/kuramukanya chez les badogomba/e7c78cee-3768-4cec-b30e-57e9e2045bb7.jpg":
    "/media/kuramukanya chez les badogomba/dbdc4596-4e94-4d2c-a7b2-96654d64603e.jpg",
  "/media/kuramukanya chez les badogomba/eb008b6a-4599-40c3-a03d-93c54031fd56.jpg":
    "/media/kuramukanya chez les badogomba/6f2ad2a3-336c-4645-b8c2-a15d33dc4e6b.jpg",
  "/media/kuramukanya chez les badogomba/f2d0b834-989b-43dd-a467-956fbc02b9ee.jpg":
    "/media/kuramukanya chez les badogomba/47c054a6-ed44-4dcc-9ec3-9a1f2268ef55.jpg",
  "/media/match contre songa/6da278e7-3bd3-4a08-934b-0ec5e37b2ae3.jpg":
    "/media/match contre songa/119c90f6-ff3b-400c-9434-4251aef86ef8.jpg",
  "/media/match contre songa/a0178fbc-901d-4730-ad2d-6a14d6447da0.jpg":
    "/media/match contre songa/297d327f-b674-4552-8449-0184888680d7.jpg",
  "/media/match contre songa/c4435634-c350-4eb9-9033-651742becd84.jpg":
    "/media/match contre songa/b30f52b5-050b-4974-9fb3-6158f78f57ea.jpg",
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
  {
    id: "match-2015",
    slug: "match-2015",
    title: "Match — 2015",
    type: "activity",
    images: [],
    eventDate: {
      value: "2015",
      precision: "year",
    },
    summary: "Match — 2015. Photographies issues du dossier daté 2015.",
    relatedContent: [],
    featured: false,
    publicationStatus: "published",
  },
];
export const additionalAlbumPhotos: Record<string, string[]> = {
  "events-2016-anniversary": [
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
    "photo-91cc586aa4a5f388",
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
  "match-2015": ["photo-759dab90cdb1097b"],
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
