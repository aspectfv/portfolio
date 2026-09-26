#!/usr/bin/env node
// Render the still behind every scene view.
//
// Starts the dev server, opens /stills in the installed Google Chrome (the
// bundled headless shell has no GPU, and a software rasteriser draws shadows
// differently), waits for each scene to report its first frame, captures each
// box at 2x with a transparent background, and encodes it as WebP into
// public/images/scenes/. Re-run after any change to a scene.
//
//   node scripts/render-stills.mjs
//
// Needs cwebp on PATH (brew install webp).
import { spawn, execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from '@playwright/test'

const PORT = 4329
const ORIGIN = `http://localhost:${PORT}`
const root = fileURLToPath(new URL('..', import.meta.url))
const out = join(root, 'public/images/scenes')

async function waitForServer(url, attempts = 100) {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(url)
      if (response.ok) return
    } catch {
      // not up yet
    }
    await new Promise((resolve) => setTimeout(resolve, 200))
  }
  throw new Error(`dev server did not answer at ${url}`)
}

const server = spawn('pnpm', ['dev', '--port', String(PORT), '--strictPort'], {
  cwd: root,
  stdio: 'ignore',
})

try {
  await waitForServer(`${ORIGIN}/stills`)
  mkdirSync(out, { recursive: true })
  const scratch = mkdtempSync(join(tmpdir(), 'stills-'))

  const browser = await chromium.launch({ channel: 'chrome' })
  const page = await browser.newPage({
    viewport: { width: 1600, height: 2400 },
    deviceScaleFactor: 2,
  })
  await page.goto(`${ORIGIN}/stills`)

  const boxes = page.locator('[data-still]')
  await boxes.first().waitFor({ state: 'attached', timeout: 30_000 })
  const count = await boxes.count()
  await page.waitForFunction(
    (expected) => document.querySelectorAll('[data-still][data-ready]').length === expected,
    count,
    { timeout: 60_000 },
  )
  // Shadow maps and contact shadows settle a frame or two after the first.
  await page.waitForTimeout(600)

  for (let i = 0; i < count; i++) {
    const box = boxes.nth(i)
    const scene = await box.getAttribute('data-still')
    const variant = await box.getAttribute('data-variant')
    const name = variant === 'compact' ? `${scene}-compact` : scene
    const png = join(scratch, `${name}.png`)
    const webp = join(out, `${name}.webp`)
    await box.screenshot({ path: png, omitBackground: true })
    execFileSync('cwebp', ['-quiet', '-q', '88', '-alpha_q', '100', png, '-o', webp])
    const size = execFileSync('wc', ['-c', webp]).toString().trim().split(/\s+/)[0]
    console.log(`${name}.webp  ${size} B`)
  }

  await browser.close()
  rmSync(scratch, { recursive: true, force: true })
} finally {
  server.kill()
}
