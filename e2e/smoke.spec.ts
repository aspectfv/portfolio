import { expect, test, type Page } from '@playwright/test'

const SECTIONS = ['about', 'projects', 'skills', 'experience', 'contact'] as const
const NAV_LABELS = ['About', 'Projects', 'Skills', 'Experience', 'Contact'] as const

test('the page loads with its heading and positioning', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/Joshua Tating/)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Joshua Tating')
  await expect(page.getByText('Backend · Full-Stack · AI Software Engineer').first()).toBeVisible()
})

test('every section is present', async ({ page }) => {
  await page.goto('/')
  for (const id of SECTIONS) {
    await expect(page.locator(`#${id}`)).toBeAttached()
  }
})

test('each nav item scrolls to its section', async ({ page, isMobile }) => {
  // Five smooth scrolls across a tall page, and Playwright waits for each to
  // settle before it will click the next link. That is the page behaving
  // correctly, not the test hanging, so give it the room rather than
  // disabling the scroll behaviour the assertion exists to check. The page has
  // only grown since, so the allowance is trebled rather than doubled.
  test.setTimeout(90_000)
  await page.goto('/')
  if (isMobile) await page.getByRole('button', { name: /open menu/i }).click()

  for (const label of NAV_LABELS) {
    const nav = page.getByRole('navigation', { name: 'Sections' })
    await nav.getByRole('link', { name: label, exact: true }).first().click()
    const id = label.toLowerCase()
    await expect(page.locator(`#${id}`)).toBeInViewport({ ratio: 0.05 })
    if (isMobile) await page.getByRole('button', { name: /open menu/i }).click()
  }
})

test('the résumé resolves and is served as a PDF', async ({ page, request }) => {
  await page.goto('/')
  const link = page.locator('a[download]').first()
  const href = await link.getAttribute('href')
  expect(href).toBe('/resume/joshua-tating-resume.pdf')

  const response = await request.get(href!)
  expect(response.status()).toBe(200)
  expect(response.headers()['content-type']).toContain('pdf')
})

test('every external link opens safely', async ({ page }) => {
  await page.goto('/')
  const external = page.locator('a[target="_blank"]')
  const count = await external.count()
  expect(count).toBeGreaterThan(0)

  for (let i = 0; i < count; i++) {
    const link = external.nth(i)
    expect(await link.getAttribute('rel')).toContain('noopener')
    expect(await link.getAttribute('href')).toMatch(/^https:\/\//)
  }
})

test('no link points somewhere that cannot resolve', async ({ page }) => {
  await page.goto('/')
  const hrefs = await page
    .locator('a')
    .evaluateAll((links) => links.map((l) => l.getAttribute('href')))
  for (const href of hrefs) {
    expect(href, 'every anchor needs a destination').toBeTruthy()
    expect(href).not.toBe('#')
  }
})

test('the project detail disclosure opens and closes by keyboard', async ({ page }) => {
  await page.goto('/')
  // Located by aria-controls, not by label. The label flips to "Hide details"
  // on open, so a name-based locator silently retargets to the next card's
  // button, which is still collapsed, and the assertion fails against the
  // wrong element.
  const article = page.locator('article').first()
  const trigger = article.locator('button[aria-controls]')
  const panelId = await trigger.getAttribute('aria-controls')
  const panel = page.locator(`#${panelId}`)

  await trigger.scrollIntoViewIfNeeded()
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await expect(panel).toBeHidden()

  // press() focuses the element and dispatches the key to it, which is what a
  // keyboard user does; a bare page.keyboard.press races the focus call.
  await trigger.press('Enter')
  await expect(trigger).toHaveAttribute('aria-expanded', 'true')
  await expect(panel).toBeVisible()
  await expect(trigger).toBeFocused()

  await trigger.press('Space')
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await expect(panel).toBeHidden()
  await expect(trigger).toBeFocused()
})

test('a private project states so instead of linking nowhere', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('Private repository').first()).toBeVisible()
})

test('the page makes no external network requests', async ({ page }) => {
  const external: string[] = []
  page.on('request', (request) => {
    const url = request.url()
    if (!url.startsWith('http://localhost:4327') && !url.startsWith('data:')) external.push(url)
  })
  await page.goto('/', { waitUntil: 'networkidle' })
  expect(external).toEqual([])
})

test('the head carries the metadata a link preview needs', async ({ page }) => {
  await page.goto('/')
  const content = (name: string) =>
    page.locator(`meta[property="${name}"], meta[name="${name}"]`).first().getAttribute('content')

  expect(await content('description')).toBeTruthy()
  expect(await content('og:title')).toContain('Joshua Tating')
  expect(await content('og:description')).toBeTruthy()
  expect(await content('og:image')).toContain('og.png')
  expect(await content('twitter:card')).toBe('summary_large_image')
})

test('the og image and icons are actually served', async ({ request }) => {
  for (const [path, type] of [
    ['/og.png', 'image/png'],
    ['/apple-touch-icon.png', 'image/png'],
    ['/favicon.svg', 'image/svg'],
    ['/robots.txt', 'text/plain'],
  ] as const) {
    const response = await request.get(path)
    expect(response.status(), path).toBe(200)
    expect(response.headers()['content-type'], path).toContain(type)
  }
})

test('the noscript block carries the essentials', async ({ page }) => {
  await page.goto('/')
  const noscript = await page.locator('noscript').innerHTML()
  expect(noscript).toContain('Joshua Tating')
  expect(noscript).toContain('resume/joshua-tating-resume.pdf')
  expect(noscript).toContain('github.com/aspectfv')
  expect(noscript).toContain('mailto:josh10nathan@gmail.com')
})

/**
 * The view switch appears twice: in the header at wide widths and in the footer
 * everywhere. Both drive the same store, so a test wants whichever one is on
 * screen rather than a particular copy , the same reason the recruiter-link
 * assertions below filter on visibility instead of taking the first in the DOM.
 */
const viewToggle = (page: Page) =>
  page
    .getByRole('switch', { name: /visual effects/i })
    .filter({ visible: true })
    .first()

/**
 * The plain view is what makes committing to the game presentation safe, which
 * only holds if it is genuinely equivalent. These guard the property that
 * matters: switching presentation must never cost a visitor a word of content.
 */
test('the view toggle switches presentation and survives a reload', async ({ page }) => {
  await page.goto('/')
  const toggle = viewToggle(page)

  await expect(toggle).toHaveAttribute('aria-checked', 'true')
  await expect(page.locator('html')).toHaveAttribute('data-view', 'game')

  await toggle.click()
  await expect(toggle).toHaveAttribute('aria-checked', 'false')
  await expect(page.locator('html')).toHaveAttribute('data-view', 'plain')

  await page.reload()
  await expect(page.locator('html')).toHaveAttribute('data-view', 'plain')
  await expect(viewToggle(page)).toHaveAttribute('aria-checked', 'false')
})

test('the toggle is reachable and operable by keyboard', async ({ page }) => {
  await page.goto('/')
  const toggle = viewToggle(page)
  await toggle.focus()
  await expect(toggle).toBeFocused()
  await page.keyboard.press('Space')
  await expect(page.locator('html')).toHaveAttribute('data-view', 'plain')
})

test('plain view still exposes every recruiter-critical route out of the page', async ({
  page,
}) => {
  await page.goto('/')
  await viewToggle(page).click()
  await expect(page.locator('html')).toHaveAttribute('data-view', 'plain')

  // At least one *visible* route to each, not the first in the DOM: the header
  // copies are display:none below md, so on mobile the visible one is further
  // down the page. The invariant is reachability, not position.
  for (const selector of [
    'a[href$="joshua-tating-resume.pdf"]',
    'a[href*="github.com/aspectfv"]',
    'a[href*="linkedin.com/in/joshuatating"]',
    'a[href^="mailto:"]',
  ]) {
    await expect(page.locator(selector).filter({ visible: true }).first(), selector).toBeVisible()
  }
})

test('plain view still lists every project and every section', async ({ page }) => {
  await page.goto('/')
  const names = await page.locator('#projects h3').allTextContents()
  expect(names.length).toBeGreaterThan(0)

  await viewToggle(page).click()
  await expect(page.locator('html')).toHaveAttribute('data-view', 'plain')

  expect(await page.locator('#projects h3').allTextContents()).toEqual(names)
  for (const id of SECTIONS) {
    await expect(page.locator(`#${id}`)).toBeVisible()
  }
})

test('plain view drops the decoration and the canvas, not the content', async ({ page }) => {
  await page.goto('/')
  await viewToggle(page).click()
  await expect(page.locator('html')).toHaveAttribute('data-view', 'plain')

  await expect(page.locator('canvas')).toHaveCount(0)
  // Ornaments stay in the DOM and are hidden by the stylesheet, so assert on
  // what the visitor can actually see rather than on element count.
  for (const ornament of await page.locator('[data-ornament]').all()) {
    await expect(ornament).toBeHidden()
  }
})

test('the meta-game is absent in plain view and gates nothing in either', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText(/found along the way/i)).toBeVisible()

  await viewToggle(page).click()
  await expect(page.getByText(/found along the way/i)).toHaveCount(0)

  // The detail disclosure is the one thing an achievement is attached to, so it
  // is the one that must still work with the meta-game switched off.
  const trigger = page.locator('#projects button[aria-expanded]').first()
  await trigger.click()
  await expect(page.locator(`#${await trigger.getAttribute('aria-controls')}`)).toBeVisible()
})

test('ambient scenery stops in every condition that should stop it', async ({ page }) => {
  await page.goto('/')

  // The gate is an attribute rather than a computed animation state on purpose:
  // it makes the decision assertable instead of requiring a test to guess
  // whether a compositor animation happens to be ticking.
  const ambient = page.locator('[data-ambient]')
  await expect(ambient.first()).toBeAttached()

  await viewToggle(page).click()
  await expect(page.locator('html')).toHaveAttribute('data-view', 'plain')
  await expect(ambient).toHaveCount(0)

  await viewToggle(page).click()
  await expect(page.locator('html')).toHaveAttribute('data-view', 'game')
  // Back to the top: on mobile the switch sits inside the menu, so toggling can
  // leave the page scrolled past the only scenery that is on screen at rest.
  await page.evaluate(() => window.scrollTo(0, 0))
  await expect(ambient.first()).toBeAttached()

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(ambient).toHaveCount(0)
})

/**
 * Tap is the half of Notice that only exists on touch, and the only motion on
 * this site a fine pointer never reaches. The attribute is the assertable part:
 * whether the world feels like it noticed you is a judgement, but whether it
 * reacted and then let go is a fact.
 */
test('a prop reacts to a tap and returns to rest', async ({ page }) => {
  await page.goto('/')
  const prop = page.locator('[data-notice]').first()
  await prop.scrollIntoViewIfNeeded()
  await expect(prop).not.toHaveAttribute('data-tapped', '')

  // Tap and check inside one retry: the reaction is held for well under a
  // second, so an assertion that polls on its own can arrive after the release
  // and report a prop that never reacted.
  await expect(async () => {
    await prop.dispatchEvent('pointerdown')
    await expect(prop).toHaveAttribute('data-tapped', '', { timeout: 250 })
  }).toPass({ timeout: 10_000 })

  // The hold is 900ms of `setTimeout`, and a page that is not the focused one
  // in its browser is a hidden page, where Chrome throttles timers hard. That
  // is correct behaviour — a reaction nobody is looking at can take its time —
  // so the allowance is the test's problem to absorb, not the page's.
  await expect(prop).not.toHaveAttribute('data-tapped', '', { timeout: 30_000 })
})

test('nothing in the world notices a visitor who declined motion', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('[data-notice]').first()).toBeAttached()

  await viewToggle(page).click()
  await expect(page.locator('html')).toHaveAttribute('data-view', 'plain')
  await expect(page.locator('[data-notice]')).toHaveCount(0)

  await viewToggle(page).click()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('[data-notice]')).toHaveCount(0)
})

test('scenery is decorative only, so it never reaches the tab order', async ({ page }) => {
  await page.goto('/')

  // The invariant that matters: decoration may be skipped by the accessibility
  // tree, but it must never be something a keyboard visitor has to tab through.
  await expect(
    page.locator('[data-ornament] :is(a, button, input, select, textarea, [tabindex])'),
  ).toHaveCount(0)

  // Every scenery surface is explicitly hidden rather than merely unlabelled.
  for (const svg of await page.locator('svg[data-ornament]').all()) {
    await expect(svg).toHaveAttribute('aria-hidden', 'true')
  }
  for (const layer of await page.locator('[data-ambient]').all()) {
    await expect(layer).toHaveAttribute('aria-hidden', 'true')
  }
})

/** Mean channel value of a computed `rgb(...)`, enough to order two tones. */
async function brightness(page: import('@playwright/test').Page, selector: string) {
  return page.locator(selector).evaluate((element) => {
    const [r, g, b] = getComputedStyle(element)
      .backgroundColor.match(/\d+/g)!
      .slice(0, 3)
      .map(Number) as [number, number, number]
    return (r + g + b) / 3
  })
}

test('the night band is dark in game view and flattens in plain view', async ({ page }) => {
  await page.goto('/')

  // The mechanism under test is a scoped token override, not a component
  // variant, so the assertion is on what the section resolves to rather than
  // on any class it happens to carry.
  const night = await brightness(page, '#experience')
  const day = await brightness(page, '#about')
  expect(night, 'the night band must be darker than a day band').toBeLessThan(day - 60)

  await viewToggle(page).click()
  await expect(page.locator('html')).toHaveAttribute('data-view', 'plain')

  expect(
    Math.abs((await brightness(page, '#experience')) - (await brightness(page, '#about'))),
    'plain view must leave every band the same tone',
  ).toBeLessThan(4)
})

test('no composition runs past the viewport', async ({ page }) => {
  await page.goto('/')

  // The flagship deliberately breaks its container. Clipping happens on the
  // document, so the guarantee is a measurement rather than a class: whatever
  // a section chooses to do, the page never scrolls sideways.
  const overflow = () =>
    page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)

  expect(await overflow()).toBe(0)
  await viewToggle(page).click()
  await expect(page.locator('html')).toHaveAttribute('data-view', 'plain')
  expect(await overflow()).toBe(0)
})
