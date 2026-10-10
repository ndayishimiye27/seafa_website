import { test } from "node:test";
import assert from "node:assert/strict";
import { getHistoryYears, getPublishedMilestones } from "../src/data/history";
import { foundersRows } from "../src/data/founders";
import { getPublishedAlbums } from "../src/lib/content";
import { mediaAssets } from "../src/data/media";

test("history groups each year once while retaining every verified event", () => {
  const years = getHistoryYears();
  assert.equal(new Set(years.map((item) => item.year)).size, years.length);
  assert.deepEqual(
    years.flatMap((item) => item.events),
    getPublishedMilestones(),
  );
  assert.deepEqual(
    years.find((item) => item.year === "2026")?.events.map((item) => item.id),
    ["history-lumitel-2026", "history-anniversaire-2026"],
  );
});

test("owner's corrected founders montage is historical content, outside all public albums", () => {
  const founding = getPublishedMilestones().find(
    (item) => item.id === "history-2013",
  );
  assert.equal(founding?.albumId, undefined);
  assert.equal(
    mediaAssets.find((item) => item.id === founding?.mediaId)?.src,
    "/media/history/2013/founders.png",
  );
  const images = getPublishedAlbums().flatMap((item) =>
    item.images.map((image) => image.mediaId),
  );
  assert.ok(!images.includes("media-history-2013-founding-members-01"));
  assert.ok(!images.includes("media-history-founders"));
  assert.equal(foundersRows.flat().length, 12);
  assert.deepEqual(foundersRows[0], [
    "Arnaud Badogomba",
    "Igor Itangishaka",
    "Axel Ndayizeye",
    "Ghislain Mugisha",
  ]);
});

test("moved New Year photographs retain their owner-confirmed 2018 allocation", () => {
  const album = getPublishedAlbums().find(
    (item) => item.slug === "nouvel-an-2018",
  );
  assert.equal(album?.eventDate?.value, "2018");
  assert.equal(album?.images.length, 2);
  for (const image of album!.images)
    assert.ok(
      mediaAssets
        .find((item) => item.id === image.mediaId)
        ?.src.startsWith("/media/activities/bonne annee 2018/anniversary/"),
    );
});
