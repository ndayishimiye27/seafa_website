import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  timeout: 60000,
  workers: 1,
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: "node node_modules/next/dist/bin/next start --port 3100",
        url: "http://localhost:3100",
        env: {
          SEAFA_SYSTEM_INTAKE_URL:
            "https://system.example.invalid/api/public/submissions",
          SEAFA_SYSTEM_INTAKE_SECRET:
            "synthetic-browser-test-secret-at-least-32-characters",
        },
        reuseExistingServer: !process.env.CI,
        timeout: 240000,
      },
  use: {
    baseURL: process.env.BASE_URL ?? "http://localhost:3100",
    headless: true,
  },
  reporter: [["list"], ["html", { open: "never" }]],
});
