import { useEffect, useRef, useState } from 'react'
import { Meter } from './Meter'
import { profile, sections } from '@/content/profile'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollProgress } from '@/hooks/useScrollProgress'

const sectionIds = sections.map((section) => section.id)

/**
 * A slim HUD: a name plate, the current area, the route, and a progress meter
 * along the bottom edge.
 *
 * The navigation is drawn as stations on a line. It is the same five links with
 * the same five labels, the same roles and the same `aria-current`; the line
 * and the nodes are marked as ornament, so the decoration comes off without
 * touching the markup. Anything that required reading a map to navigate would
 * be the clever-navigation trap the product brief forbids.
 *
 * Everything here that reads as game UI is a restatement of something the page
 * already provides. The area readout repeats `aria-current` on the nav; the
 * meter repeats the scrollbar. Neither is the only source of its own fact.
 */
export function SiteHeader() {
  const active = useActiveSection(sectionIds)
  const progress = useScrollProgress()
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const activeLabel = sections.find((section) => section.id === active)?.navLabel

  // The mobile menu is a disclosure, not a modal; close it on Escape so a
  // keyboard user is never trapped behind it. Focus returns to the toggle,
  // because closing the menu destroys whatever was focused inside it and
  // leaving focus on <body> restarts tabbing from the top of the document.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      toggleRef.current?.focus()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="bg-canvas border-edge sticky top-0 z-50 border-b-2">
      <div className="mx-auto flex max-w-content items-center gap-4 px-6 py-3">
        <a
          href="#top"
          className="font-display bg-surface border-edge inline-flex min-h-11 items-center rounded-sm border-2 border-b-(length:--edge-sm) px-3 text-lg font-semibold whitespace-nowrap"
        >
          Joshua Tating
        </a>

        {/* Desktop navigation already marks the active section with
            aria-current, so the area readout is for the mobile layout, where
            the nav is behind a disclosure and nothing else says where you are. */}
        {activeLabel && (
          <p
            data-ornament=""
            className="text-eyebrow text-ink-muted font-display truncate font-medium tracking-[0.08em] uppercase md:hidden"
          >
            {activeLabel}
          </p>
        )}

        <nav aria-label="Sections" className="ml-auto hidden md:block">
          <ul className="relative flex items-end">
            {/* The route itself, drawn behind the nodes at their centre line. */}
            <span
              data-ornament=""
              aria-hidden="true"
              className="bg-hairline absolute inset-x-3 bottom-[8px] h-0.5"
            />
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active === section.id ? 'true' : undefined}
                  className="group text-meta hover:text-ember-ink aria-[current]:text-ember-ink inline-flex min-h-11 flex-col items-center justify-end gap-1.5 px-3 pb-1 font-medium underline-offset-4 transition-colors duration-(--dur-fast) hover:underline aria-[current]:font-semibold"
                >
                  {section.navLabel}
                  <span
                    data-ornament="fixed"
                    aria-hidden="true"
                    className="bg-canvas border-ink-muted group-hover:border-ember-strong group-aria-[current]:bg-ember-strong group-aria-[current]:border-ember-edge size-2.5 rotate-45 border-2"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:ml-4 md:flex">
          <a
            href={profile.links.resume.href}
            download=""
            className="bg-ember-strong border-ember-edge text-meta press inline-flex min-h-11 items-center rounded-sm border-2 border-b-(length:--edge-md) px-4 font-medium text-white"
          >
            Resume
          </a>
          <a
            href={profile.links.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-meta hover:bg-sunken inline-flex min-h-11 items-center rounded-sm px-3 font-medium transition-colors duration-(--dur-fast)"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-meta hover:bg-sunken inline-flex min-h-11 items-center rounded-sm px-3 font-medium transition-colors duration-(--dur-fast)"
          >
            LinkedIn
          </a>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="border-ink-muted bg-surface press ml-auto inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border-2 border-b-(length:--edge-md) px-3 md:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Sections"
          className="border-edge disclose border-t-2 md:hidden"
        >
          <ul className="mx-auto max-w-content px-6 py-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === section.id ? 'true' : undefined}
                  className="aria-[current]:text-ember-ink flex min-h-11 items-center font-medium"
                >
                  {section.navLabel}
                </a>
              </li>
            ))}
            {/* Recruiter-critical links, so they get the same 44px target the
                section links above them have; as bare text they measured 26px. */}
            <li className="border-edge mt-2 flex flex-wrap items-center gap-x-4 border-t-2 pt-1">
              <a
                href={profile.links.resume.href}
                download=""
                className="text-ember-ink inline-flex min-h-11 items-center font-medium"
              >
                Resume
              </a>
              <a
                href={profile.links.github.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center"
              >
                GitHub
              </a>
              <a
                href={profile.links.linkedin.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      )}

      <Meter value={progress} />
    </header>
  )
}
