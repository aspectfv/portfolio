import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type Plugin } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { siteOrigin } from './scripts/site-origin.mjs'

/**
 * Absolute canonical and og:url need an origin, which does not exist until the
 * site is deployed. Rather than invent a domain, the origin comes from
 * SITE_URL at build time; without it those tags are dropped and og:image falls
 * back to a path. Set SITE_URL in the hosting environment before launch. A
 * malformed value fails the build rather than shipping; see scripts/site-origin.mjs.
 */
function siteUrlTags(): Plugin {
  const origin = siteOrigin()
  return {
    name: 'site-url-tags',
    transformIndexHtml(html) {
      const absolute = origin
        ? [
            `<link rel="canonical" href="${origin}/" />`,
            `<meta property="og:url" content="${origin}/" />`,
          ].join('\n    ')
        : ''
      return html.replace('<!--site-url-tags-->', absolute).replace(/__ORIGIN__/g, origin)
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), siteUrlTags()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    // e2e/ is Playwright's; vitest would try to run those specs and fail.
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
