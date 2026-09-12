// A sitemap needs absolute URLs, so it is written only when SITE_URL is set.
// Without an origin an empty sitemap is worse than none: it tells crawlers the
// site has no pages.
import { writeFileSync, rmSync } from 'node:fs'
import { siteOrigin } from './site-origin.mjs'

const origin = siteOrigin()
const out = new URL('../dist/sitemap.xml', import.meta.url)

if (!origin) {
  rmSync(out, { force: true })
  console.log('sitemap: skipped; SITE_URL not set')
  process.exit(0)
}

writeFileSync(
  out,
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${origin}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`,
)
console.log(`sitemap: ${origin}/`)
