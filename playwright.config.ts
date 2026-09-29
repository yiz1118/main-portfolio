import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser", fullyParallel: false, workers: 2, timeout: 30000,
  use: { baseURL: "http://localhost:3101", browserName: "chromium", channel: "chrome", trace: "retain-on-failure" },
  reporter: [["list"], ["html", { open: "never" }]],
  webServer: { command: "node --import ./tests/mock-email.mjs ./node_modules/next/dist/bin/next start -p 3101", url: "http://localhost:3101", reuseExistingServer: false, timeout: 60000, env: { RESEND_API_KEY:"test-only-key", CONTACT_FROM:"test@example.com", CONTACT_TO:"test@example.com", SITE_MODE:"preview", NEXT_TELEMETRY_DISABLED:"1" } },
});
