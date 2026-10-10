import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { validateContent } from "../src/lib/content-validation";
import { getPublishedMilestones } from "../src/data/history";
import { getPublishedInterviews } from "../src/data/interviews";
import { getAllNewsArticles } from "../src/data/news";
import {
  getPublishedAwards,
  getPublishedAlbums,
  getAllMediaAssets,
} from "../src/lib/content";
import {
  isValidDateValue,
  formatEventDate,
  compareDatesAscending,
} from "../src/lib/content-utils";
import sitemap from "../src/app/sitemap";
test("content references and publication boundaries", () => {
  assert.deepEqual(validateContent().errors, []);
  assert.equal(getPublishedMilestones()[0].date?.value, "2013");
  assert.equal(
    getPublishedMilestones().some((p) => p.date?.value === "2026-09-26"),
    true,
  );
  assert.equal(getPublishedInterviews().length, 4);
  assert.equal(
    getPublishedInterviews().find((p) => p.id === "darcy")?.kind,
    undefined,
  );
  assert.equal(getAllNewsArticles().length, 0);
  assert.equal(
    getPublishedAwards().some((p) => p.year === 2017),
    false,
  );
  assert.equal(getPublishedAlbums().length, 47);
  for (const media of getAllMediaAssets()) {
    assert.ok(media.alt.trim());
    assert.ok(
      existsSync(resolve("public", decodeURIComponent(media.src).slice(1))),
    );
  }
  const urls = sitemap().map((p) => p.url);
  assert.equal(new Set(urls).size, urls.length);
  assert.equal(
    urls.some((p) => p.includes("apercu") || p.includes("/api/")),
    false,
  );
});
test("dates preserve precision and reject impossible days", () => {
  assert.equal(
    isValidDateValue({ value: "2026-02-30", precision: "day" }),
    false,
  );
  assert.equal(formatEventDate({ value: "2013", precision: "year" }), "2013");
  assert.equal(compareDatesAscending(undefined, undefined), 0);
});
