import test from "node:test";
import assert from "node:assert/strict";
import { deliverToSystem, intakeConfiguration } from "../src/lib/system-intake";

test("system delivery accepts only committed matching receipts and preserves retry keys", async () => {
  const before = {
    url: process.env.SEAFA_SYSTEM_INTAKE_URL,
    secret: process.env.SEAFA_SYSTEM_INTAKE_SECRET,
  };
  process.env.SEAFA_SYSTEM_INTAKE_URL =
    "https://system.example.invalid/api/public/submissions";
  process.env.SEAFA_SYSTEM_INTAKE_SECRET =
    "synthetic-test-secret-at-least-32-characters";
  const fetchBefore = globalThis.fetch;
  const id = "f156e101-6dbb-4afb-8ae3-42a7eec27a4e";
  const request = () =>
    new Request("https://website.example.invalid/api/contact", {
      method: "POST",
      headers: { "Idempotency-Key": id },
    });
  try {
    globalThis.fetch = async (_url, init) => {
      assert.equal(new Headers(init?.headers).get("idempotency-key"), id);
      assert.equal(init?.redirect, "error");
      return Response.json(
        {
          success: true,
          id,
          reference: "SEAFA-COR-2026-00000001",
          token: "a".repeat(64),
          receivedAt: new Date().toISOString(),
        },
        { status: 201 },
      );
    };
    const first = await deliverToSystem(request(), "contact", {
      message: "Test",
    });
    assert.equal(first?.status, 201);
    assert.equal(
      (await first?.json()).statusUrl,
      "https://system.example.invalid/application-access",
    );
    assert.equal(
      (await deliverToSystem(request(), "contact", { message: "Test" }))
        ?.status,
      201,
    );
    globalThis.fetch = async () =>
      Response.json({ success: true }, { status: 200 });
    assert.equal(
      (await deliverToSystem(request(), "contact", {}))?.status,
      503,
    );
    globalThis.fetch = async () => {
      throw new Error("timeout");
    };
    assert.equal(
      (await deliverToSystem(request(), "contact", {}))?.status,
      503,
    );
    globalThis.fetch = async () =>
      Response.json({ message: "Doublon incompatible" }, { status: 409 });
    assert.equal(
      (await deliverToSystem(request(), "contact", {}))?.status,
      409,
    );
    process.env.SEAFA_SYSTEM_INTAKE_URL =
      "https://system.example.invalid/api/public/submissions?secret=bad";
    assert.equal(intakeConfiguration(), null);
  } finally {
    globalThis.fetch = fetchBefore;
    if (before.url === undefined) delete process.env.SEAFA_SYSTEM_INTAKE_URL;
    else process.env.SEAFA_SYSTEM_INTAKE_URL = before.url;
    if (before.secret === undefined)
      delete process.env.SEAFA_SYSTEM_INTAKE_SECRET;
    else process.env.SEAFA_SYSTEM_INTAKE_SECRET = before.secret;
  }
});
