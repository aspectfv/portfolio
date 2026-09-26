import { useEffect, useRef } from 'react'
import { achievements } from '@/achievements'
import { Icon } from './Icon'
import { profile } from '@/content/profile'
import { useAchievements } from '@/hooks/useAchievements'

export function SiteFooter() {
  const { unlocked, unlock } = useAchievements()
  const endRef = useRef<HTMLDivElement>(null)
  const latestUnlock = useRef(unlock)

  useEffect(() => {
    latestUnlock.current = unlock
  }, [unlock])

  /**
   * Reaching the end means scrolling to the end, and nothing else.
   *
   * Scroll position rather than an IntersectionObserver: the observer fires on
   * any threshold crossing, including one a layout change causes on its own,
   * and hands out the badge for something the visitor never did. Half the
   * footer on screen after a scroll is the whole condition.
   *
   * The store ignores a repeat, so firing again on a later pass down costs
   * nothing.
   */
  useEffect(() => {
    const onScroll = () => {
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
        </div>

        {/* Nothing here is information; every entry describes something the
            visitor already did. */}
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
      </div>
    </footer>
  )
}
