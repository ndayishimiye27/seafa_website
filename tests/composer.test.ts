import { test } from "node:test";
import assert from "node:assert/strict";
import {
  formFields,
  validateSubmission,
  normalizeText,
} from "../src/content/form-fields";
import { positionOptions } from "../src/content/positions";
import {
  createDraft,
  composerUrl,
  composerUrlLimit,
} from "../src/lib/composer";
import { handleSubmission } from "../src/lib/submissions";

test("positions accept one to five distinct codes and preserve legacy choices", async () => {
  assert.equal(positionOptions.length, 21);
  assert.equal(new Set(positionOptions.map(([code]) => code)).size, 21);
  const selected = ["GK", "SW", "LWB", "CDM", "ST"];
  assert.deepEqual(
    validateSubmission("join", { positions: selected }).data.positions,
    selected,
  );
  assert.equal(
    validateSubmission("join", { positions: selected }).errors.positions,
    undefined,
  );
  for (const positions of [
    [],
    ["GK", "GK"],
    [...selected, "CF"],
    ["fake"],
    "GK",
    [false],
  ]) {
    assert.ok(validateSubmission("join", { positions }).errors.positions);
    const response = await handleSubmission(
      new Request("https://seafa.test/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ positions }),
      }),
      "join",
    );
    assert.equal(response.status, 422);
    assert.ok((await response.json()).errors.positions);
  }
  assert.deepEqual(
    validateSubmission("join", {
      preferredPosition: "centre_back",
      secondaryPosition: "striker",
    }).data.positions,
    ["CB", "ST"],
  );
  assert.ok(
    validateSubmission("join", {
      positions: ["GK"],
      preferredPosition: "striker",
    }).errors.positions,
  );
});

test("both composers encode complete French answers without header or query injection", () => {
  for (const kind of ["join", "match-requests"] as const) {
    const raw = Object.fromEntries(
      formFields[kind].map((f) => [
        f.name,
        f.type === "positions"
          ? ["GK", "CB", "CM", "LW", "ST"]
          : f.type === "checkbox"
            ? true
            : (f.options?.[0][0] ??
              "Équipe & amis + # ? = /\nDeuxième ligne 🏆"),
      ]),
    );
    const data = validateSubmission(kind, raw).data;
    const draft = createDraft(kind, data);
    for (const field of formFields[kind])
      assert.ok(draft.body.includes(field.label + " :"));
    assert.ok(
      draft.body.includes("Équipe & amis + # ? = /\nDeuxième ligne 🏆"),
    );
    if (kind === "join")
      for (const code of ["GK", "CB", "CM", "LW", "ST"])
        assert.ok(draft.body.includes(code + " —"));
    const wa = new URL(composerUrl("whatsapp", draft));
    assert.equal(wa.pathname, "/25779690359");
    assert.equal(wa.searchParams.get("text"), draft.body);
    assert.equal([...wa.searchParams.keys()].length, 1);
    const email = new URL(composerUrl("email", draft));
    assert.equal(email.pathname, "jambojeanjimmy52@gmail.com");
    assert.equal(email.searchParams.get("subject"), draft.subject);
    assert.equal(email.searchParams.get("body"), draft.body);
    assert.equal([...email.searchParams.keys()].length, 2);
    assert.doesNotThrow(() =>
      encodeURIComponent(normalizeText("\uD800 texte")),
    );
    const long = createDraft(kind, {
      ...data,
      message: "é".repeat(2000),
      reasonForJoining: "é".repeat(2000),
    });
    assert.ok(composerUrl("email", long).length > composerUrlLimit);
  }
});
