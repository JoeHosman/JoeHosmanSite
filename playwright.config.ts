import { defineConfig } from "@playwright/test";
import { normalizeBase } from "./src/lib/urls.mjs";

const baseURL = `http://127.0.0.1:4322${normalizeBase(process.env.SITE_BASE ?? "/")}`;

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: true,
  workers: 3,
  use: { baseURL, channel: process.env.CI ? undefined : "chrome" },
  projects: [
    { name: "desktop", use: { viewport: { width: 1280, height: 900 } } },
    { name: "tablet", use: { viewport: { width: 768, height: 1024 } } },
    { name: "mobile", use: { viewport: { width: 375, height: 812 } } },
  ],
  webServer: {
    command: "node tests/serve.mjs",
    url: baseURL,
    reuseExistingServer: false,
    timeout: 60000,
    gracefulShutdown: { signal: "SIGTERM", timeout: 5000 },
  },
});
