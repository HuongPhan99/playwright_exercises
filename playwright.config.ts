import { defineConfig } from "@playwright/test";


/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",

  // Time out
  timeout: 60 * 100000,
  expect: {
    timeout: 2 * 60 * 100000,
  },
  fullyParallel: true,
  workers: 1,
  use: {
    actionTimeout: 60 * 100000,
    navigationTimeout: 3 * 60 * 100000,
    trace: "off",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
    },
  ],
  reporter: 'html',

});
