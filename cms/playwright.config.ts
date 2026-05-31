import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.01,
      animations: "disabled",
    },
  },
  use: {
    baseURL: "https://brave-tree-08c5f0c03.4.azurestaticapps.net",
    screenshot: "only-on-failure",
    trace: "on-first-retry",
  },
  retries: 0,
  workers: 1,
});
