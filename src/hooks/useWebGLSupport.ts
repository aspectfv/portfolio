import { useState } from 'react'

/**
 * Probes for a usable WebGL context on a throwaway canvas, once per page load.
 *
 * Losing the context after creation is not covered here — that is the scene's
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

export function useWebGLSupport(): boolean {
  return useState(() => (cached ??= probe()))[0]
}
