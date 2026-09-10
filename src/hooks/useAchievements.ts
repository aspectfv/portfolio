import { useCallback, useSyncExternalStore } from 'react'
import {
  getUnlocked,
  subscribe,
  unlock as unlockAchievement,
  type AchievementId,
} from '@/achievements'
import { useViewMode } from './useViewMode'

const empty: ReadonlySet<AchievementId> = new Set()

/**
 * Reads the unlocked set, and hands back an `unlock` that is a no-op in plain
 * view. Gating the writer rather than every call site means a component can
 * call `unlock` unconditionally and stay unaware that the meta-game exists at
 * all, which is what keeps it out of the way of the actual content.
 */
export function useAchievements() {
  const [viewMode] = useViewMode()
  const stored = useSyncExternalStore(subscribe, getUnlocked, () => empty)
  const enabled = viewMode === 'game'

  const unlock = useCallback(
    (id: AchievementId) => {
      if (enabled) unlockAchievement(id)
    },
    [enabled],
  )

  return { unlocked: enabled ? stored : empty, unlock, enabled }
}
