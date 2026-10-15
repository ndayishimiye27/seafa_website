import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";

// Build hosts set NODE_ENV=production and can hold real delivery credentials.
// Only the child test process gets this isolated environment; next build keeps
// the original production environment and API security boundaries.
const testEnv = { ...process.env, NODE_ENV: "test" };
for (const key of Object.keys(testEnv)) {
  if (
    /^(SEAFA_|RESEND_|WHATSAPP_)/.test(key) ||
    ["SUBMISSIONS_DIR", "TRUSTED_IP_HEADER"].includes(key)
  )
    delete testEnv[key];
}
const files = readdirSync("tests")
  .filter((file) => file.endsWith(".test.ts"))
  .sort()
  .map((file) => `tests/${file}`);
if (!files.length) throw new Error("No unit tests found.");
const result = spawnSync(
  process.execPath,
  ["--import", "tsx", "--test", ...files],
  {
    env: testEnv,
    stdio: "inherit",
  },
);
if (result.error) throw result.error;
process.exitCode = result.status ?? 1;
