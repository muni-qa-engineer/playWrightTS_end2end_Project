// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config = ({
  testDir: './tests',
  timeout: 40*1000,
  expect: {
    timeout: 40*1000,
  },
  reporter: 'html',
  use: {
    browserName: 'chromium',
    permissions: ['geolocation'],
    geolocation: { latitude: 17.4483, longitude: 78.3915 }, 
  },

});
export default defineConfig({
  use: {
    permissions: ['geolocation'],
    // Optional: geolocation: { latitude: 51.5074, longitude: -0.1278 },
  },
});
module.exports = config

