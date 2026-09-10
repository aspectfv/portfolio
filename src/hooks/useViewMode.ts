import { useCallback, useSyncExternalStore } from 'react'

export type ViewMode = 'game' | 'plain'

const STORAGE_KEY = 'view-mode'

/**
 * The document element is the store. The inline bootstrap in index.html sets
 * `data-view` before first paint, so React must read from there rather than
 * hold its own copy; two sources would let the DOM and the component disagree
 * about which view is on screen for one render.
 */
const listeners = new Set<() => void>()

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  return () => listeners.delete(onChange)
}

function read(): ViewMode {
  return document.documentElement.dataset.view === 'plain' ? 'plain' : 'game'
}

export function useViewMode(): [ViewMode, (next: ViewMode) => void] {
  // Server/test snapshot is the same default the bootstrap falls back to.
  const mode = useSyncExternalStore(subscribe, read, () => 'game' as const)

  const setMode = useCallback((next: ViewMode) => {
    document.documentElement.dataset.view = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // A visitor with storage blocked still gets the toggle for this visit;
      // only the memory of the choice is lost, which is not worth failing on.
    }
    for (const listener of listeners) listener()
  }, [])

  return [mode, setMode]
}
