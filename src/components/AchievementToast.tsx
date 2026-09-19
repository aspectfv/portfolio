import { useEffect, useRef, useState } from 'react'
import { achievements, type AchievementId } from '@/achievements'
import { Icon } from './Icon'
import { useAchievements } from '@/hooks/useAchievements'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const labels = new Map(achievements.map((achievement) => [achievement.id, achievement.label]))

/**
 * Announces a newly unlocked achievement, then gets out of the way.
 *
 * `role="status"` makes the region polite by default, so it never interrupts a
 * screen reader mid-sentence. The toast is not focusable and traps nothing; it
 * is feedback, not a dialog, and dismisses itself.
 *
 * Suppressed under reduced motion. A transient overlay that slides in and
 * disappears on a timer is motion by nature, and the footer still lists every
 * unlock, so nothing is lost by declining it here.
 */
export function AchievementToast() {
  const { unlocked, enabled } = useAchievements()
  const reducedMotion = usePrefersReducedMotion()
  const [showing, setShowing] = useState<AchievementId | null>(null)
  const seen = useRef<ReadonlySet<AchievementId> | null>(null)

  useEffect(() => {
    // The first pass records what was already unlocked on arrival, so a
    // returning visitor is not greeted by a toast for something they did weeks
    // ago. Only transitions after mount are announced.
    if (seen.current === null) {
      seen.current = unlocked
      return
    }
    const fresh = [...unlocked].find((id) => !seen.current?.has(id))
    seen.current = unlocked
    if (fresh) setShowing(fresh)
  }, [unlocked])

  useEffect(() => {
    if (!showing) return
    const timer = setTimeout(() => setShowing(null), 4000)
    return () => clearTimeout(timer)
  }, [showing])

  if (!enabled || reducedMotion) return null

  return (
    <div
      role="status"
      className="pointer-events-none fixed inset-x-4 bottom-4 z-100 flex justify-center sm:inset-x-auto sm:right-6 sm:bottom-6 sm:justify-end"
    >
      {showing && (
        <div className="bg-surface border-leaf-strong toast-life flex items-center gap-3 rounded-md border-2 border-b-(length:--edge-md) px-4 py-3">
          <span
            data-ornament=""
            className="bg-canvas border-edge inline-flex size-9 shrink-0 items-center justify-center rounded-sm border-2"
          >
            <Icon name="spark" className="size-5" />
          </span>
          <p className="text-meta">
            <span className="font-display text-leaf-ink block font-semibold">Unlocked</span>
            {labels.get(showing)}
          </p>
        </div>
      )}
    </div>
  )
}
