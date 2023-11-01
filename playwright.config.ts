import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  testDir: './tests',   //  './tests/demo'
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
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
    screenshot: "on",
    video: "on",

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
