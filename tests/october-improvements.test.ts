import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  validateSubmission,
  maritalStatusOptions,
} from "../src/content/form-fields";
import { createDraft, composerUrl } from "../src/lib/composer";
import {
  getPublishedAlbums,
  getPublishedActivities,
  getPublishedEvents,
  getUpcomingEvents,
  getPastEvents,
} from "../src/lib/content";
import { mediaAssets } from "../src/data/media";
import { resolveAlbumImages } from "../src/lib/media";
import {
  presidentialSuccession,
  presidencyTermLabels,
} from "../src/data/presidency";

const candidate = {
  fullName: "Membre de test",
  email: "membre@example.test",
  telephone: "+25779123456",
  category: "active",
  positions: ["GK", "ST"],
  reasonForJoining: "Participer aux activités et à la fraternité de SEAFA.",
  codeOfConductAccepted: true,
  privacyConsent: true,
};
test("membership requires deliberate valid gender; marital status is optional and both drafts preserve selected labels", () => {
  for (const gender of [undefined, "", "invalid", false])
    assert.ok(
      validateSubmission("join", { ...candidate, gender }).errors.gender,
    );
  for (const gender of ["male", "female"] as const) {
    for (const maritalStatus of [
      undefined,
      "",
      ...maritalStatusOptions.map(([code]) => code),
    ]) {
      const checked = validateSubmission("join", {
        ...candidate,
        gender,
        maritalStatus,
      });
      assert.deepEqual(checked.errors, {});
      const draft = createDraft("join", checked.data);
      assert.ok(
        draft.body.includes(`Genre : ${gender === "male" ? "Homme" : "Femme"}`),
      );
      if (maritalStatus)
        assert.ok(
          draft.body.includes(
            `Situation matrimoniale : ${maritalStatusOptions.find(([code]) => code === maritalStatus)![1]}`,
          ),
        );
      else assert.ok(!draft.body.includes("Situation matrimoniale"));
      assert.ok(!draft.body.includes("Profession :"));
      assert.ok(!draft.body.includes("Non renseigné"));
      for (const channel of ["whatsapp", "email"] as const)
        assert.equal(
          new URL(composerUrl(channel, draft)).searchParams.get(
            channel === "whatsapp" ? "text" : "body",
          ),
          draft.body,
        );
    }
  }
  for (const maritalStatus of [false, "invalid", ["single"]])
    assert.ok(
      validateSubmission("join", {
        ...candidate,
        gender: "female",
        maritalStatus,
      }).errors.maritalStatus,
    );
});

test("owner-corrected presidency and month-only basketball schedule remain consistent", () => {
  const arnaud = presidentialSuccession.find(
    (p) => p.id === "president-arnaud",
  )!;
  assert.equal(arnaud.termStart?.value, "2014");
  assert.equal(arnaud.termEnd?.value, "2022");
  assert.equal(presidencyTermLabels[arnaud.id], "2014–2022");
  const albums = getPublishedAlbums();
  const album = albums.find((a) => a.id === "match-basketteurs-2026")!;
  const event = getPublishedEvents().find((e) => e.albumId === album.id)!;
  const activity = getPublishedActivities().find(
    (a) => a.albumId === album.id,
  )!;
  for (const date of [album.eventDate, event.startDate, activity.date])
    assert.deepEqual(date, { value: "2026-11", precision: "month" });
  assert.equal(albums[0].id, album.id);
  for (const now of [
    "2026-10-15T12:00:00Z",
    "2026-11-15T12:00:00Z",
    "2026-11-30T23:00:00Z",
  ]) {
    assert.ok(getUpcomingEvents(new Date(now)).some((e) => e.id === event.id));
    assert.ok(!getPastEvents(new Date(now)).some((e) => e.id === event.id));
  }
  assert.ok(
    getPastEvents(new Date("2026-12-01T00:00:00Z")).some(
      (e) => e.id === event.id,
    ),
  );
});

test("published collections follow reorganized folders without stale editorial notes or byte-identical duplicates", () => {
  const albums = getPublishedAlbums();
  const hashes = new Set<string>();
  for (const album of albums)
    for (const image of resolveAlbumImages(album)) {
      const hash = createHash("sha256")
        .update(readFileSync("public" + decodeURIComponent(image.media.src)))
        .digest("hex");
      assert.ok(!hashes.has(hash), image.media.src);
      hashes.add(hash);
    }
  for (const [id, folder, year] of [
    [
      "community-2019-jenda-excursion",
      "/activities/2021/jenda-excursion 2021/",
      "2021",
    ],
    ["events-2019-anniversary", "/events/2019/anniversary 2019/", "2019"],
    [
      "events-2021-anniversary",
      "/events/2021/karera-falls-anniversary 2021/",
      "2021",
    ],
    [
      "marche-bujumbura-2020",
      "/activities/2020/marche aller retour jusqu'a la lpage de bujumbura/",
      "2020",
    ],
  ]) {
    const album = albums.find((a) => a.id === id)!;
    assert.equal(album.eventDate?.value, year);
    assert.ok(
      resolveAlbumImages(album).every((i) =>
        decodeURIComponent(i.media.src).includes(folder),
      ),
    );
  }
  assert.doesNotMatch(
    JSON.stringify([
      albums,
      getPublishedActivities(),
      getPublishedEvents(),
      mediaAssets,
    ]),
    /à confirmer|non confirmé|restent à vérifier|année à vérifier/i,
  );
});
