import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { handleSubmission } from "../src/lib/submissions";
import { validateSubmission } from "../src/content/form-fields";
const valid = {
  fullName: " Test SEAFA ",
  email: "TEST@example.test",
  subject: "Question de test",
  message: "Un message de test assez long.",
  privacyConsent: true,
  website: "",
};
function request(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}
test("forms reject invalid input and normalize known fields", () => {
  const result = validateSubmission("contact", valid);
  assert.deepEqual(result.errors, {});
  assert.equal(result.data.email, "test@example.test");
  assert.equal(result.data.fullName, "Test SEAFA");
  assert.ok(
    validateSubmission("contact", { ...valid, privacyConsent: "true" }).errors
      .privacyConsent,
  );
  assert.ok(
    validateSubmission("join", { fullName: "X" }).errors.reasonForJoining,
  );
  const match = {
    organizationName: "Test FC",
    contactPerson: "Test Name",
    email: "a@example.test",
    telephone: "+25712345678",
    preferredLocation: "Terrain test",
    matchFormat: "11-a-side",
    privacyConsent: true,
    proposedDateTime: "2030-02-30T12:00",
  };
  assert.ok(
    validateSubmission("match-requests", match).errors.proposedDateTime,
  );
  assert.ok(
    validateSubmission("match-requests", {
      ...match,
      proposedDateTime: "2030-02-28T12:00",
      matchFormat: "invalid",
    }).errors.matchFormat,
  );
  assert.deepEqual(
    validateSubmission("match-requests", {
      ...match,
      proposedDateTime: "2030-02-28T12:00",
    }).errors,
    {},
  );
});
test("API rejects malformed, oversized, unexpected and cross-origin requests", async () => {
  assert.equal((await handleSubmission(request("{"), "contact")).status, 400);
  assert.equal((await handleSubmission(request(null), "contact")).status, 400);
  assert.equal(
    (
      await handleSubmission(
        request(valid, { "content-type": "text/plain" }),
        "contact",
      )
    ).status,
    415,
  );
  assert.equal(
    (
      await handleSubmission(
        request(valid, { origin: "https://external.test" }),
        "contact",
      )
    ).status,
    403,
  );
  assert.equal(
    (await handleSubmission(request({ ...valid, website: "bot" }), "contact"))
      .status,
    400,
  );
  assert.equal(
    (await handleSubmission(request({ ...valid, extra: "field" }), "contact"))
      .status,
    400,
  );
  assert.equal(
    (await handleSubmission(request({ ...valid, email: "invalid" }), "contact"))
      .status,
    422,
  );
  assert.equal(
    (await handleSubmission(request(" ".repeat(17000)), "contact")).status,
    413,
  );
});
test("no false success; durable writes and concurrent rate limits", async () => {
  const before = process.env.SUBMISSIONS_DIR,
    ipBefore = process.env.TRUSTED_IP_HEADER;
  const dir = await mkdtemp(join(tmpdir(), "seafa-test-"));
  try {
    delete process.env.SUBMISSIONS_DIR;
    assert.equal(
      (await handleSubmission(request(valid), "contact")).status,
      503,
    );
    process.env.SUBMISSIONS_DIR = join(process.cwd(), "public", "forbidden");
    assert.equal(
      (await handleSubmission(request(valid), "contact")).status,
      503,
    );
    process.env.SUBMISSIONS_DIR = dir;
    process.env.TRUSTED_IP_HEADER = "x-test-ip";
    const responses = await Promise.all(
      Array.from({ length: 8 }, () =>
        handleSubmission(
          request(valid, { "x-test-ip": "192.0.2.1" }),
          "contact",
        ),
      ),
    );
    assert.equal(responses.filter((r) => r.status === 201).length, 5);
    assert.equal(responses.filter((r) => r.status === 429).length, 3);
    const files = (await readdir(dir)).filter((f) => f.endsWith(".json"));
    assert.equal(files.length, 5);
    const saved = JSON.parse(await readFile(join(dir, files[0]), "utf8"));
    assert.equal(saved.data.email, "test@example.test");
    assert.equal(saved.data.website, undefined);
    assert.match(saved.reference, /^SEAFA-\d{4}-/);
    assert.equal(saved.status, "received_locally");
    assert.equal(saved.systemDelivery, "not_connected");
    assert.deepEqual(saved.statusHistory, [
      { status: "received_locally", at: saved.receivedAt },
    ]);
  } finally {
    if (before === undefined) delete process.env.SUBMISSIONS_DIR;
    else process.env.SUBMISSIONS_DIR = before;
    if (ipBefore === undefined) delete process.env.TRUSTED_IP_HEADER;
    else process.env.TRUSTED_IP_HEADER = ipBefore;
    await rm(dir, { recursive: true, force: true });
  }
});
