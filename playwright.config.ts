import { defineConfig, devices } from '@playwright/test'

/**
 * Smoke test only. Runs against the production build, not the dev server ,
 * the things worth checking here (asset paths, the built HTML head, chunk
 * loading) are exactly the things dev-mode papers over.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'http://localhost:4327',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    // A dedicated port, not Vite's 4173 default: another project's preview
    // server sitting on that port gets reused silently, and the suite then
    // tests the wrong application.
    command: 'pnpm preview --port 4327 --strictPort',
    url: 'http://localhost:4327',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
})
