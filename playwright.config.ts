import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  /* testMatch: ["pom-test/endToendtest.test.ts"], */  //adding new test dir
  testMatch: ["pom-test/CompleteTest.test.ts"],
  //testMatch: ["tests/endToEndTesting.test.ts"],
   //testMatch: ["tests/endToendtest.test.ts"],
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
  //reporter: 'html',
  //reporter: [['html'], ['list'], ['dot'], ['json']], // generate report in various forms, HTML and list 
 // reporter: [["dot"], ["json", { outputFile: 'test-results.json' }]], // create json report
  //reporter: [["dot"], ["json", { outputFolder: 'test-results' }]],
  
 reporter: [["line"], ["allure-playwright"]],
 
  
  use: {
    
    baseURL: "https://www.saucedemo.com/", //add baseURL(end point): await page.goto(`${baseURL}route=account/register`)
    trace: 'retain-on-failure', // to get trace file for failed test 
    headless: false,
    viewport: { width: 1280, height: 720},
    actionTimeout: 15000,
    //screenshot: "only-on-failure",
    screenshot: "on",
    video: "on", 
    //video: "retain-on-failure",
   /*  launchOptions:{  //for slow execution
      slowMo: 1000
    }
 */
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
