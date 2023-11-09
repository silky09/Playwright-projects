import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  //testMatch: ["pom-test/endToendtest.test.ts"],  //adding new test dir
  testMatch: ["tests/endToEndTesting.test.ts"],
  //testDir: './tests/',   //  './tests/demo'
  fullyParallel: true, ///* Run tests in files in parallel */
  /* Fail the build on CI if you accidentally left test.only in the source code. */
 // forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  retries: 0,
  timeout: 60000,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
 
  
  use: {
    
    baseURL: "https://ecommerce-playground.lambdatest.io/index.php?", //add baseURL
    trace: 'on-first-retry',
    headless: false,
    viewport: { width: 1280, height: 720},
    actionTimeout: 15000,
    screenshot: "only-on-failure",
    video: "on", //video: "retain-on-failure",

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
/*
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

  */  
  ],


});
