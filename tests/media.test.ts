import { excludedPhotoSources } from "../src/data/gallery-curation";
import { archivedPeople } from "../src/data/people";
import { brandLogos } from "../src/content/brand";
import { baseMetadata } from "../src/lib/metadata";
import manifest from "../src/app/manifest";
import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import sharp from "sharp";
import { mediaAssets, trainingVideo } from "../src/data/media";
import {
  getPublishedAlbums,
  getPublishedActivities,
  getPublishedEvents,
  getPublishedAwards,
} from "../src/lib/content";
import { getPublishedInterviews } from "../src/data/interviews";
import { compareDatesDescending } from "../src/lib/content-utils";
import { resolveAlbumImages } from "../src/lib/media";
import { validateContent } from "../src/lib/content-validation";
import { awards } from "../src/data/awards";

const localFiles = readdirSync("public/media", { recursive: true })
  .map(String)
  .map((p) => "/media/" + p.replaceAll("\\", "/"));
test("catalogue covers every supplied image exactly once, with exact spelling and real dimensions", async () => {
  const images = localFiles.filter((p) => /\.(png|jpg|jpeg)$/i.test(p));
  assert.deepEqual(
    mediaAssets.map((m) => decodeURIComponent(m.src)).sort(),
    images.sort(),
  );
  assert.equal(new Set(mediaAssets.map((m) => m.id)).size, mediaAssets.length);
  for (const media of mediaAssets) {
    const actual = await sharp(
      "public" + decodeURIComponent(media.src),
    ).metadata();
    assert.equal(media.width, actual.width, media.src);
    assert.equal(media.height, actual.height, media.src);
    assert.ok(media.alt.trim());
  }
  assert.ok(localFiles.includes(trainingVideo.src));
});
test("albums are complete, chronological and connected to real detail records", () => {
  const albums = getPublishedAlbums();
  assert.equal(albums.length, 49);
  const covered = new Set(
    albums.flatMap((a) => [
      ...a.images.map((i) => i.mediaId),
      ...(a.videos ?? []).flatMap((video) =>
        video.posterMediaId ? [video.posterMediaId] : [],
      ),
    ]),
  );
  assert.deepEqual(
    [...covered].sort(),
    mediaAssets
      .filter(
        (m) =>
          !m.src.startsWith("/media/brand/logos/") &&
          !excludedPhotoSources[m.src],
      )
      .map((m) => m.id)
      .sort(),
  );
  for (const [i, album] of albums.entries()) {
    assert.ok(album.images.length > 0);
    assert.ok(
      album.images.some((image) => image.mediaId === album.coverMediaId),
    );
    assert.equal(resolveAlbumImages(album).length, album.images.length);
    assert.deepEqual(
      album.images.map((image) => image.order),
      album.images.map((_, index) => index + 1),
    );
    if (i)
      assert.ok(
        compareDatesDescending(albums[i - 1].eventDate, album.eventDate) <= 0,
      );
  }
  for (const record of [
    ...getPublishedActivities(),
    ...getPublishedEvents(),
    ...getPublishedAwards(),
  ].filter((r) => r.albumId)) {
    assert.ok(
      albums.some((a) => a.id === record.albumId),
      record.slug,
    );
  }
  // Each numbered event/activity folder is retained in its entirety.
  const folders = new Set(
    localFiles
      .filter((p) =>
        /^\/media\/(activities|events|community)\/\d{4}\/[^/]+\//.test(p),
      )
      .map((p) => p.slice(0, p.lastIndexOf("/"))),
  );
  for (const folder of folders) {
    const expected = localFiles
      .filter(
        (p) =>
          p.startsWith(folder + "/") &&
          /\.(png|jpe?g)$/i.test(p) &&
          !excludedPhotoSources[
            p.includes("#")
              ? p
                  .split("/")
                  .map((part) => encodeURIComponent(part))
                  .join("/")
              : p
          ],
      )
      .sort();
    const album = albums.find((a) =>
      resolveAlbumImages(a).some((i) => i.media.src.startsWith(folder + "/")),
    );
    assert.ok(album, folder);
    assert.deepEqual(
      resolveAlbumImages(album)
        .map((i) => decodeURIComponent(i.media.src))
        .filter((src) => src.startsWith(folder + "/"))
        .sort(),
      expected,
      folder,
    );
  }
});
test("known interview portraits use restored PNGs and uncertain archives have no invented dates", () => {
  for (const person of getPublishedInterviews().filter(
    (p) => p.portraitMediaId,
  )) {
    const portrait = mediaAssets.find((m) => m.id === person.portraitMediaId);
    assert.ok(portrait);
    assert.ok(portrait.src.startsWith("/media/interviews/"));
    assert.ok(portrait.src.endsWith(".png"));
    if (person.id === "claver")
      assert.deepEqual([portrait.width, portrait.height], [719, 869]);
    else assert.ok(portrait.width >= 1000);
  }
  for (const slug of ["history-archives", "events-medical-session"])
    assert.equal(
      getPublishedAlbums().find((a) => a.slug === slug)?.eventDate,
      undefined,
    );
});
test("photographic collections may omit recipients; individual awards still require known recipients", () => {
  const item = awards.find((a) => a.category === "season-collection")!;
  assert.deepEqual(validateContent().errors, []);
  const previous = item.category;
  try {
    item.category = "player-of-year";
    assert.ok(
      validateContent().errors.some(
        (e) => e.contentId === item.id && e.field === "recipients",
      ),
    );
  } finally {
    item.category = previous;
  }
});

test("every named portrait resolves to an existing catalogue image without assigning current offices", () => {
  for (const person of archivedPeople)
    assert.ok(
      mediaAssets.some((media) => media.id === person.mediaId),
      person.name,
    );
  assert.equal(
    archivedPeople.find((person) => person.name.startsWith("Tony"))?.roleLabel,
    "Président — archive de 2024",
  );
});
test("approved logos drive icons and Claver's restored portrait drives his published detail", () => {
  assert.equal(Object.keys(brandLogos).length, 7);
  for (const asset of Object.values(brandLogos)) {
    assert.ok(localFiles.includes(asset.src));
    assert.ok(mediaAssets.includes(asset));
  }
  assert.deepEqual(baseMetadata.icons, {
    icon: { url: brandLogos.favicon.src, sizes: "32x32", type: "image/png" },
    apple: { url: brandLogos.apple.src, sizes: "180x180", type: "image/png" },
  });
  assert.equal(manifest().icons?.[0].src, brandLogos.icon.src);
  const claver = getPublishedInterviews().find(
    (p) => p.slug === "claver-kazobavamwo",
  );
  assert.ok(claver);
  assert.equal(
    mediaAssets.find((m) => m.id === claver.portraitMediaId)?.src,
    "/media/interviews/claver-kazobavamwo-0c199519.png",
  );
  assert.match(claver.source, /p\. 21/);
});
