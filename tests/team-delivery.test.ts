import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, readdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { randomUUID } from "node:crypto";
import {
  deliverToTeam,
  formatSubmission,
  retryTeamDeliveries,
} from "../src/lib/team-delivery";
import { handleSubmission, submissionsEnabled } from "../src/lib/submissions";
import {
  emailConfiguration,
  whatsappConfiguration,
} from "../src/lib/delivery-config";
import { formFields, type FormKind } from "../src/content/form-fields";

const vars = [
  "SUBMISSIONS_DIR",
  "SEAFA_EMAIL_DELIVERY_ENABLED",
  "SEAFA_TEAM_EMAIL",
  "SEAFA_EMAIL_FROM",
  "RESEND_API_KEY",
  "SEAFA_WHATSAPP_NOTIFICATIONS_ENABLED",
  "SEAFA_TEAM_WHATSAPP",
  "WHATSAPP_PHONE_NUMBER_ID",
  "WHATSAPP_ACCESS_TOKEN",
  "WHATSAPP_API_VERSION",
  "WHATSAPP_TEMPLATE_NAME",
  "WHATSAPP_TEMPLATE_LANGUAGE",
  "SEAFA_SYSTEM_INTAKE_URL",
  "SEAFA_SYSTEM_INTAKE_SECRET",
];
function req(id = randomUUID(), body?: unknown) {
  return new Request("https://website.example.invalid/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": id },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}
const valid = {
  fullName: "Test SEAFA",
  email: "sender@example.test",
  subject: "Une demande de test",
  message: "Un message complet pour SEAFA.",
  privacyConsent: true,
};

test("configurable delivery: receipts, failures, retries, concurrency and existing system priority", async () => {
  const before = Object.fromEntries(vars.map((key) => [key, process.env[key]]));
  const fetchBefore = globalThis.fetch;
  const dir = await mkdtemp(join(tmpdir(), "seafa-delivery-"));
  try {
    vars.forEach((key) => delete process.env[key]);
    assert.equal(emailConfiguration(), null);
    assert.equal(whatsappConfiguration(), null);
    assert.equal(submissionsEnabled(), false);
    process.env.SEAFA_EMAIL_DELIVERY_ENABLED = "true";
    assert.equal(submissionsEnabled(), false);
    process.env.SEAFA_TEAM_EMAIL = "team@example.test";
    process.env.SEAFA_EMAIL_FROM = "website@example.test";
    process.env.RESEND_API_KEY = "synthetic-test-key";
    process.env.SUBMISSIONS_DIR = dir;
    assert.equal(submissionsEnabled(), true);
    let calls = 0;
    globalThis.fetch = async (_url, init) => {
      calls++;
      assert.equal(String(_url), "https://api.resend.com/emails");
      const body = JSON.parse(String(init?.body));
      assert.equal(body.reply_to, valid.email);
      assert.deepEqual(body.to, ["team@example.test"]);
      assert.equal(init?.redirect, "error");
      assert.ok(
        new Headers(init?.headers).get("idempotency-key")?.startsWith("seafa/"),
      );
      return Response.json({ id: "email-provider-id" });
    };
    const id = randomUUID();
    assert.equal(
      (await handleSubmission(req(id, valid), "contact")).status,
      201,
    );
    assert.equal(
      (await handleSubmission(req(id, valid), "contact")).status,
      201,
    );
    assert.equal(calls, 1);
    assert.equal(
      (
        await handleSubmission(
          req(id, { ...valid, message: "Un autre message complet." }),
          "contact",
        )
      ).status,
      409,
    );
    const concurrentId = randomUUID();
    const concurrent = await Promise.all([
      handleSubmission(req(concurrentId, valid), "contact"),
      handleSubmission(req(concurrentId, valid), "contact"),
    ]);
    assert.ok(concurrent.some((r) => r.status === 201));
    assert.equal(calls, 2);

    const retryId = randomUUID();
    globalThis.fetch = async () =>
      Response.json({ error: "unavailable" }, { status: 503 });
    assert.equal(
      (await deliverToTeam(req(retryId), "contact", valid))?.status,
      503,
    );
    globalThis.fetch = async () => Response.json({ success: true });
    assert.equal(
      (await deliverToTeam(req(retryId), "contact", valid))?.status,
      503,
    );
    globalThis.fetch = async () => {
      throw new Error("timeout");
    };
    assert.equal(
      (await deliverToTeam(req(retryId), "contact", valid))?.status,
      503,
    );
    globalThis.fetch = async () => Response.json({ id: "retry-accepted" });
    assert.equal((await retryTeamDeliveries()).pending, 0);
    assert.equal(
      (await deliverToTeam(req(retryId), "contact", valid))?.status,
      201,
    );

    process.env.SEAFA_WHATSAPP_NOTIFICATIONS_ENABLED = "true";
    process.env.SEAFA_TEAM_WHATSAPP = "+25700000000";
    process.env.WHATSAPP_PHONE_NUMBER_ID = "123456";
    process.env.WHATSAPP_ACCESS_TOKEN = "synthetic-test-token";
    process.env.WHATSAPP_API_VERSION = "v23.0";
    process.env.WHATSAPP_TEMPLATE_NAME = "synthetic_notification";
    process.env.WHATSAPP_TEMPLATE_LANGUAGE = "fr";
    assert.ok(whatsappConfiguration());
    let whatsappCalls = 0;
    globalThis.fetch = async (url, init) => {
      if (String(url).includes("graph.facebook.com")) {
        whatsappCalls++;
        const payload = JSON.parse(String(init?.body));
        assert.equal(payload.to, "25700000000");
        assert.equal(payload.type, "template");
        const parameters = payload.template.components[0].parameters;
        assert.equal(parameters.length, 2);
        assert.ok(!JSON.stringify(payload).includes(valid.email));
        return Response.json({ messages: [{ id: "wamid.accepted" }] });
      }
      return Response.json({ id: "email-accepted" });
    };
    const waId = randomUUID();
    assert.equal(
      (await deliverToTeam(req(waId), "contact", valid))?.status,
      201,
    );
    assert.equal(
      (await deliverToTeam(req(waId), "contact", valid))?.status,
      201,
    );
    assert.equal(whatsappCalls, 1);
    globalThis.fetch = async (url) => {
      if (String(url).includes("graph.facebook.com")) {
        whatsappCalls++;
        throw new Error("ambiguous");
      }
      return Response.json({ id: "email-accepted" });
    };
    assert.equal((await deliverToTeam(req(), "contact", valid))?.status, 201);
    const count = whatsappCalls;
    assert.equal((await retryTeamDeliveries()).review, 1);
    assert.equal(whatsappCalls, count);

    // A system receipt remains the authority even when optional notifications fail.
    process.env.SEAFA_SYSTEM_INTAKE_URL =
      "https://system.example.invalid/api/public/submissions";
    process.env.SEAFA_SYSTEM_INTAKE_SECRET =
      "synthetic-secret-of-at-least-32-characters";
    const systemId = randomUUID();
    globalThis.fetch = async (url) =>
      String(url).includes("system.example.invalid")
        ? Response.json(
            {
              success: true,
              id: systemId,
              reference: "SEAFA-COR-2026-00000001",
              token: "a".repeat(64),
              receivedAt: new Date().toISOString(),
            },
            { status: 201 },
          )
        : Response.json({}, { status: 503 });
    const response = await handleSubmission(req(systemId, valid), "contact");
    assert.equal(response.status, 201);
    assert.equal((await response.json()).token, "a".repeat(64));
    globalThis.fetch = async () => Response.json({}, { status: 503 });
    assert.equal(
      (await handleSubmission(req(randomUUID(), valid), "contact")).status,
      503,
    );

    for (const file of (await readdir(join(dir, "delivery"))).filter((f) =>
      f.endsWith(".json"),
    )) {
      const text = await readFile(join(dir, "delivery", file), "utf8");
      assert.ok(!text.includes("synthetic-test-token"));
      assert.ok(!text.includes("synthetic-test-key"));
      assert.ok(!text.includes("a".repeat(64)));
    }
    process.env.SEAFA_TEAM_WHATSAPP = "invalid";
    assert.equal(whatsappConfiguration(), null);
    process.env.SEAFA_TEAM_EMAIL = "bad@example.test\nBcc: other@example.test";
    assert.equal(emailConfiguration(), null);
  } finally {
    globalThis.fetch = fetchBefore;
    for (const key of vars) {
      if (before[key] === undefined) delete process.env[key];
      else process.env[key] = before[key];
    }
    await rm(dir, { recursive: true, force: true });
  }
});

test("all three delivery messages include every field with French labels", () => {
  for (const kind of ["contact", "join", "match-requests"] as FormKind[]) {
    const data = Object.fromEntries(
      formFields[kind].map((field) => [
        field.name,
        field.type === "positions"
          ? ["GK", "ST"]
          : field.type === "checkbox"
            ? true
            : (field.options?.[0][0] ?? "Texte de test"),
      ]),
    );
    const message = formatSubmission(kind, data, "REFERENCE-TEST");
    for (const field of formFields[kind])
      assert.ok(message.includes(field.label));
    assert.ok(message.includes("REFERENCE-TEST"));
    if (kind === "match-requests") assert.ok(message.includes("UTC+02:00"));
  }
});
