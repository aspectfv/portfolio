import { useEffect, useRef } from 'react'
import { achievements } from '@/achievements'
import { Icon } from './Icon'
import { ViewModeToggle } from './ViewModeToggle'
import { profile } from '@/content/profile'
import { useAchievements } from '@/hooks/useAchievements'

export function SiteFooter() {
  const { unlocked, unlock, enabled } = useAchievements()
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = endRef.current
    if (!element || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          unlock('reached-end')
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [unlock])

  return (
    <footer ref={endRef} className="bg-canvas border-edge border-t-2">
      <div className="mx-auto max-w-content px-6 py-8">
        <div className="text-meta text-ink-muted flex flex-wrap items-center gap-x-6 gap-y-4">
          <p>{profile.fullName}</p>
          <p>{profile.location}</p>
          <p>
            <a href={`mailto:${profile.email}`} className="underline underline-offset-4">
              {profile.email}
            </a>
          </p>
          {/* A presentation preference, not information, so the footer is an
              honest home for it. Nothing on the page is reachable only through
              one of the two views. */}
          <div className="ml-auto">
            <ViewModeToggle />
          </div>
        </div>

        {/* Absent entirely in plain view. Nothing here is information; every
            entry describes something the visitor already did. */}
        {enabled && (
          <div className="border-edge mt-8 border-t-2 pt-6">
            {/* A paragraph rather than a heading: this is a label for a list of
                things the visitor did, not a section of the document, and it
                should not appear in the heading outline beside the real ones. */}
            <p className="font-display text-eyebrow text-ink-muted font-medium tracking-[0.08em] uppercase">
              Found along the way ({unlocked.size} of {achievements.length})
            </p>
            <ul
              aria-label="Things found along the way"
              className="text-meta mt-3 flex flex-wrap gap-2"
            >
              {achievements.map((achievement) => {
                const done = unlocked.has(achievement.id)
                return (
                  <li
                    key={achievement.id}
                    className={`border-edge inline-flex items-center gap-2 rounded-sm border-2 border-b-(length:--edge-sm) px-2.5 py-1 ${
                      done ? 'bg-surface' : 'bg-canvas text-ink-muted'
                    }`}
                  >
                    {done ? (
                      <Icon name="spark" className="size-4" />
                    ) : (
                      <span
                        data-ornament=""
                        aria-hidden="true"
                        className="border-edge size-4 rounded-full border-2"
                      />
                    )}
                    {achievement.label}
                    <span className="sr-only">{done ? ' (found)' : ' (not found yet)'}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </footer>
  )
}
