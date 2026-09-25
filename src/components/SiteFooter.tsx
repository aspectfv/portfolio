import { useEffect, useRef } from 'react'
import { achievements } from '@/achievements'
import { Icon } from './Icon'
import { ViewModeToggle } from './ViewModeToggle'
import { profile } from '@/content/profile'
import { useAchievements } from '@/hooks/useAchievements'

/** Long enough for a view switch's reflow and its scroll anchoring to finish. */
const SETTLE_MS = 500

export function SiteFooter() {
  const { unlocked, unlock, enabled } = useAchievements()
  const endRef = useRef<HTMLDivElement>(null)
  const latestUnlock = useRef(unlock)
  const switchedAt = useRef(0)

  useEffect(() => {
    latestUnlock.current = unlock
  }, [unlock])

  useEffect(() => {
    switchedAt.current = performance.now()
  }, [enabled])

  /**
   * Reaching the end means scrolling to the end, and nothing else.
   *
   * Scroll position rather than an IntersectionObserver, because the observer
   * cannot tell the two apart: switching view resizes the whole page, which
   * slides this footer into view and fires the observer for a button press.
   *
   * The resize also makes the browser's scroll anchoring move the page by a
   * thousand pixels or more, which arrives as ordinary scroll events, so the
   * handler stays shut until the new layout has settled. Nothing here is
   * information, and the visitor scrolls again within a second in any case.
   *
   * `unlock` is read through a ref rather than depended on, since its identity
   * changes with the view mode. The store ignores a repeat, so firing again on
   * a later pass down costs nothing.
   */
  useEffect(() => {
    const onScroll = () => {
      if (performance.now() - switchedAt.current < SETTLE_MS) return

      const element = endRef.current
      if (!element) return
      const box = element.getBoundingClientRect()
      const visible = Math.min(box.bottom, window.innerHeight) - Math.max(box.top, 0)
      if (visible >= box.height / 2) latestUnlock.current('reached-end')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
