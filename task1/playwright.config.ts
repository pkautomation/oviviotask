import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export default defineConfig({
  timeout: 15_000,
  expect: {
    timeout: 4_000,
  },
  testDir: './tests',
  fullyParallel: true,
  retries: process.env.CI === 'true' ? 2 : 0,
  workers: process.env.workersAmount ? parseInt(process.env.workersAmount) : 1,
  /* Reporter to use. See https:/ /playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [
        ['line'],
        ['html', { open: 'never' }],
        ['junit', { outputFile: 'junit.xml' }],
        ['blob', { outputDir: 'blob-report' }],
      ]
    : [['html', { open: 'always' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'retain-on-failure',
    testIdAttribute: 'data-test',
    video: 'retain-on-failure',
    actionTimeout: 5000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: process.env.CI === 'true' ? true : false },
    },
  ],
});
