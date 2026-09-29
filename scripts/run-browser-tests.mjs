import { spawn, spawnSync } from "node:child_process";

const env = {
  ...process.env,
  SEAFA_SYSTEM_INTAKE_URL:
    "https://system.example.invalid/api/public/submissions",
  SEAFA_SYSTEM_INTAKE_SECRET:
    "synthetic-browser-test-secret-at-least-32-characters",
};

const build = spawnSync(
  process.execPath,
  ["node_modules/next/dist/bin/next", "build"],
  { env, stdio: "inherit" },
);
if (build.status !== 0) process.exit(build.status ?? 1);

const server = spawn(
  process.execPath,
  ["node_modules/next/dist/bin/next", "start", "--port", "3100"],
  { env, stdio: "inherit" },
);
try {
  const deadline = Date.now() + 120_000;
  while (true) {
    if (server.exitCode !== null)
      throw new Error(
        `The browser test server exited with ${server.exitCode}.`,
      );
    try {
      const response = await fetch("http://localhost:3100");
      if (response.ok) break;
    } catch {
      // The server is still starting.
    }
    if (Date.now() >= deadline)
      throw new Error("Timed out while starting the browser test server.");
    await new Promise((resolve) => setTimeout(resolve, 250));
  }

  const tests = spawnSync(
    process.execPath,
    ["node_modules/@playwright/test/cli.js", "test", ...process.argv.slice(2)],
    {
      env: { ...env, BASE_URL: "http://localhost:3100" },
      stdio: "inherit",
    },
  );
  process.exitCode = tests.status ?? 1;
} finally {
  server.kill();
}
