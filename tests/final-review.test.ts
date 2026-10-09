import { test } from "node:test";
import assert from "node:assert/strict";
import {
  anniversaryAlbum,
  anniversaryEvent,
  anniversaryMedia,
} from "../src/data/anniversary-2026";
import { getPastEvents, getUpcomingEvents } from "../src/lib/content";
import { getPublishedInterviews } from "../src/data/interviews";
import { interviewPages } from "../src/data/interview-pages";
import sitemap from "../src/app/sitemap";
import { albums } from "../src/data/albums";
import { excludedPhotoSources } from "../src/data/gallery-curation";
import book from "../src/data/interview-book.json";

test("13th anniversary has the confirmed date, actual media and connected routes", () => {
  assert.equal(anniversaryMedia.length, 182);
  assert.equal(anniversaryAlbum.images.length, 182);
  const published = albums.find((album) => album.id === anniversaryAlbum.id)!;
  assert.equal(published.images.length, 173);
  for (const image of published.images) {
    const media = anniversaryMedia.find((asset) => asset.id === image.mediaId)!;
    assert.ok(!excludedPhotoSources[media.src]);
  }
  assert.deepEqual(anniversaryAlbum.eventDate, {
    value: "2026-09-26",
    precision: "day",
  });
  assert.deepEqual(anniversaryEvent.startDate, anniversaryAlbum.eventDate);
  assert.equal(anniversaryEvent.albumId, anniversaryAlbum.id);
  assert.equal(getPastEvents()[0].id, anniversaryEvent.id);
  assert.ok(
    !getUpcomingEvents(new Date("2026-01-01")).some(
      (e) => e.id === anniversaryEvent.id,
    ),
  );
  for (const path of [
    "/events/anniversaire-2026",
    "/gallery/anniversaire-2026",
  ])
    assert.ok(sitemap().some((route) => route.url.endsWith(path)));
});

test("Darcy is removed from public records, reader entries and sitemap; all other interviews remain", () => {
  assert.deepEqual(
    getPublishedInterviews()
      .map((p) => p.id)
      .sort(),
    ["alain", "bados", "claver", "idan"],
  );
  assert.deepEqual(Object.keys(interviewPages).sort(), [
    "alain",
    "bados",
    "claver",
    "idan",
  ]);
  assert.ok(!sitemap().some((route) => /darcy/i.test(route.url)));
  assert.ok(!book[26].paragraphs.join(" ").includes("Darcy"));
  assert.equal(
    book[25].paragraphs.at(-1),
    "Passage retiré de l’édition publique.",
  );
});
