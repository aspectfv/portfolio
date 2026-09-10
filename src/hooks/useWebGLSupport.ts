/**
 * Probes for a usable WebGL context on a throwaway canvas, once per page load.
 *
 * Deliberately gated rather than run during first render: creating a context is
 * not free — it is milliseconds on a GPU and far worse on a software rasteriser
 * or a low-end phone — and it has no business competing with first paint for
 * the main thread. Callers pass `enabled` once the page is idle.
 *
 * Losing the context after creation is not covered here; that is the scene's
 * own concern. This only answers whether starting one is worth attempting.
 */
function probe(): boolean {
  try {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('webgl2') ?? canvas.getContext('webgl')
    if (!context) return false
    // Some environments hand back a context that immediately reports as lost.
    return !('isContextLost' in context && context.isContextLost())
  } catch {
    return false
  }
}

let cached: boolean | undefined

export function useWebGLSupport(enabled: boolean): boolean {
  // Evaluated during the first render where `enabled` is true — the one the
  // idle callback triggers — and memoised at module scope thereafter. No state
  // and no effect: the answer never changes for the life of the page.
  return enabled ? (cached ??= probe()) : false
}
