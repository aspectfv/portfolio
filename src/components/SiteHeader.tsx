import { useEffect, useState } from 'react'
import { profile, sections } from '@/content/profile'
import { useActiveSection } from '@/hooks/useActiveSection'

const sectionIds = sections.map((section) => section.id)

export function SiteHeader() {
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)

  // The mobile menu is a disclosure, not a modal — close it on Escape so a
  // keyboard user is never trapped behind it.
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className="bg-canvas/95 border-hairline sticky top-0 z-50 border-b backdrop-blur-[2px]">
      <div className="mx-auto flex max-w-content items-center gap-4 px-6 py-3">
        <a href="#top" className="font-display text-lg font-semibold whitespace-nowrap">
          Joshua Tating
        </a>

        <nav aria-label="Sections" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active === section.id ? 'true' : undefined}
                  className="text-meta hover:bg-sunken aria-[current]:text-ember-ink inline-flex min-h-11 items-center rounded-md px-3 font-medium transition-colors duration-(--dur-fast) aria-[current]:font-semibold"
                >
                  {section.navLabel}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:ml-4 md:flex">
          <a
            href={profile.links.resume.href}
            download=""
            className="bg-ember-strong text-meta inline-flex min-h-11 items-center rounded-md px-4 font-medium text-white"
          >
            Resume
          </a>
          <a
            href={profile.links.github.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-meta hover:bg-sunken inline-flex min-h-11 items-center rounded-md px-3 font-medium transition-colors duration-(--dur-fast)"
          >
            GitHub
          </a>
          <a
            href={profile.links.linkedin.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-meta hover:bg-sunken inline-flex min-h-11 items-center rounded-md px-3 font-medium transition-colors duration-(--dur-fast)"
          >
            LinkedIn
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="border-ink-muted ml-auto inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border px-3 md:hidden"
        >
          <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          <span aria-hidden="true">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Sections" className="border-hairline border-t md:hidden">
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
            <li className="border-hairline mt-2 flex flex-wrap gap-3 border-t pt-3">
              <a
                href={profile.links.resume.href}
                download=""
                className="text-ember-ink font-medium"
              >
                Resume
              </a>
              <a href={profile.links.github.href} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a href={profile.links.linkedin.href} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
