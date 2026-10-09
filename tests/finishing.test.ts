import { test } from "node:test";
import assert from "node:assert/strict";
import { getPublishedAlbums } from "../src/lib/content";
import { resolveAlbumImages } from "../src/lib/media";
import { excludedPhotoSources } from "../src/data/gallery-curation";
import { validateSubmission } from "../src/content/form-fields";
import { memberLoginUrl } from "../src/lib/member-login";
import pages from "../src/data/interview-book.json";
import { interviewPages } from "../src/data/interview-pages";

test("gallery has one display per curated photo and only evidenced years", () => {
  const albums = getPublishedAlbums();
  const sources = albums.flatMap((a) =>
    resolveAlbumImages(a).map((i) => i.media.src),
  );
  assert.equal(new Set(sources).size, sources.length);
  assert.ok(sources.every((src) => !excludedPhotoSources[src]));
  assert.deepEqual(
    [
      ...new Set(
        albums.flatMap((a) =>
          a.eventDate ? [a.eventDate.value.slice(0, 4)] : [],
        ),
      ),
    ].sort(),
    [
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2024",
      "2025",
      "2026",
    ],
  );
  assert.deepEqual(albums.find((a) => a.id === "visite-badogomba")?.eventDate, {
    value: "2020",
    precision: "year",
  });
  for (const id of ["archives-ajoutees"])
    assert.equal(albums.find((a) => a.id === id)?.eventDate, undefined);
});
test("membership conditional requirements follow system categories", () => {
  assert.ok(
    validateSubmission("join", { category: "diaspora" }).errors.country,
  );
  assert.ok(
    !validateSubmission("join", { category: "diaspora", country: "France" })
      .errors.country,
  );
  assert.ok(
    validateSubmission("join", { category: "active" }).errors.positions,
  );
  assert.ok(
    !validateSubmission("join", {
      category: "active",
      preferredPosition: "centre_back",
    }).errors.positions,
  );
  assert.ok(
    validateSubmission("join", { category: "invented" }).errors.category,
  );
});
test("login uses only explicitly configured secure system login route", () => {
  assert.equal(memberLoginUrl(""), null);
  for (const url of [
    "javascript:alert(1)",
    "http://example.test/login",
    "https://user:secret@example.test/login",
    "https://example.test/other",
    "https://example.test/login?next=external",
  ])
    assert.equal(memberLoginUrl(url), null);
  assert.equal(
    memberLoginUrl("https://members.example.test/login"),
    "https://members.example.test/login",
  );
});
test("interview page links resolve to verified text in original book", () => {
  assert.equal(pages.length, 29);
  for (const [id, term] of Object.entries({
    bados: "BADOGOMBA",
    alain: "Alain",
    idan: "Idane",
    claver: "Claver",
  }))
    assert.ok(
      pages[interviewPages[id] - 1].paragraphs.join(" ").includes(term),
      id,
    );
});
