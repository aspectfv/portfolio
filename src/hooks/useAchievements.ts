import { useCallback } from 'react'
import { useSyncExternalStore } from 'react'
import {
  getUnlocked,
  subscribe,
  unlock as unlockAchievement,
  type AchievementId,
} from '@/achievements'

const empty: ReadonlySet<AchievementId> = new Set()

/**
 * Reads the unlocked set and hands back an `unlock` a component can call
 * without knowing the meta-game exists, which is what keeps it out of the way
 * of the actual content.
 */
export function useAchievements() {
  const stored = useSyncExternalStore(subscribe, getUnlocked, () => empty)
  const unlock = useCallback((id: AchievementId) => unlockAchievement(id), [])

  return { unlocked: stored, unlock }
}
