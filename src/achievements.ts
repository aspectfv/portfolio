/**
 * A small, quiet meta-game. Four things a visitor might do anyway, noticed and
 * acknowledged.
 *
 * Hard constraint: **no achievement may carry information.** Everything on this
 * page is reachable without unlocking anything, nothing is gated, and a visitor
 * who never triggers one misses no content whatsoever. These acknowledge an
 * action the visitor already took; they never reward hunting for a secret.
 *
 * A module-level store rather than context or a state library: four unrelated
 * components across the page write to it and two read from it, which is the
 * real shared-mutable-state case the YAGNI rule holds out for. The same
 * useSyncExternalStore shape as useViewMode.
 */

export type AchievementId = 'read-a-project' | 'copied-email' | 'found-plain-view' | 'reached-end'

export interface Achievement {
  readonly id: AchievementId
  readonly label: string
}

export const achievements: readonly Achievement[] = [
  { id: 'read-a-project', label: 'Read a project in depth' },
  { id: 'copied-email', label: 'Copied the email' },
  { id: 'found-plain-view', label: 'Found the plain view' },
  { id: 'reached-end', label: 'Reached the end' },
]

const STORAGE_KEY = 'achievements'
const ids = new Set<string>(achievements.map((a) => a.id))

function load(): ReadonlySet<AchievementId> {
  try {
    const raw: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    if (!Array.isArray(raw)) return new Set()
    // Storage is visitor-writable and can outlive a rename, so anything that is
    // not a currently known id is dropped rather than trusted.
    return new Set(raw.filter((id): id is AchievementId => typeof id === 'string' && ids.has(id)))
  } catch {
    return new Set()
  }
}

let unlocked: ReadonlySet<AchievementId> = new Set()
let loaded = false
const listeners = new Set<() => void>()

function current(): ReadonlySet<AchievementId> {
  if (!loaded) {
    unlocked = load()
    loaded = true
  }
  return unlocked
}

export function unlock(id: AchievementId): void {
  const now = current()
  if (now.has(id)) return
  const next = new Set(now)
  next.add(id)
  unlocked = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
  } catch {
    // Unlocked for this visit only. Not worth failing a click over.
  }
  for (const listener of listeners) listener()
}

export function subscribe(onChange: () => void): () => void {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

export function getUnlocked(): ReadonlySet<AchievementId> {
  return current()
}

/**
 * Test seam. The store is a module singleton that outlives any component, and
 * the loaded set is cached after the first read, so a test that wants to see a
 * different storage state has to be able to drop both.
 */
export function resetForTests(): void {
  unlocked = new Set()
  loaded = false
  for (const listener of listeners) listener()
}
