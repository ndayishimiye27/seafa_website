import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { onRequestError } from "../src/instrumentation";

test("unit runner isolates production mode and inherited delivery/storage configuration", () => {
  assert.equal(process.env.NODE_ENV, "test");
  const inherited = Object.keys(process.env).filter(
    (key) =>
      /^(SEAFA_|RESEND_|WHATSAPP_)/.test(key) ||
      ["SUBMISSIONS_DIR", "TRUSTED_IP_HEADER"].includes(key),
  );
  assert.deepEqual(inherited, []);
});

test("production canonical origin survives stale environment; previews remain noindex", () => {
  for (const vercelEnv of ["production", "preview"]) {
    const result = spawnSync(
      process.execPath,
      [
        "--import",
        "tsx",
        "-e",
        `
      const { siteUrl, siteIndexable } = require('./src/lib/metadata.ts');
      console.log(JSON.stringify({siteUrl, siteIndexable}));
    `,
      ],
      {
        encoding: "utf8",
        env: {
          ...process.env,
          NODE_ENV: "production",
          SITE_URL: "http://localhost:3000",
          NEXT_PUBLIC_SITE_URL: "https://stale.example",
          SITE_INDEXABLE: "true",
          VERCEL_ENV: vercelEnv,
        },
      },
    );
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(JSON.parse(result.stdout.trim()), {
      siteUrl: "https://www.saintespritfootballacademyalumni.com",
      siteIndexable: vercelEnv === "production",
    });
  }
});

test("server error events include safe digest but exclude personal/request/error data", () => {
  const lines: string[] = [];
  const previous = console.error;
  console.error = (line: string) => lines.push(line);
  try {
    const context = {
      routerKind: "App Router",
      routePath: "/api/contact",
      routeType: "route",
    } as Parameters<typeof onRequestError>[2];
    const request = {
      path: "/contact?email=private@example.test",
      method: "POST",
      headers: { authorization: "secret" },
    };
    onRequestError(
      Object.assign(new Error("private form contents"), { digest: "123456" }),
      request,
      context,
    );
    onRequestError({ digest: "private@example.test" }, request, context);
    assert.deepEqual(
      lines.map((line) => JSON.parse(line)),
      [
        { event: "seafa.server_error", routeType: "route", digest: "123456" },
        { event: "seafa.server_error", routeType: "route" },
      ],
    );
  } finally {
    console.error = previous;
  }
});
