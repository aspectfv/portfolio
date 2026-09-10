import { useEffect, useState } from 'react'

/**
 * True once the browser has finished its initial work.
 *
 * The 3D chunk is lazy, but a lazy import that starts the moment the component
 * mounts still parses and initialises three on the main thread while the page
 * is trying to paint, which shows up as blocking time, not as a smaller
 * bundle. Waiting for idle honours the rule that the scene is an upgrade
 * applied afterwards, never something content competes with.
 *
 * The timeout is the ceiling, not the target: requestIdleCallback usually fires
 * far sooner, and browsers without it fall back to it directly.
 */
export function useIdle(timeout = 2000): boolean {
  const [idle, setIdle] = useState(false)

  useEffect(() => {
    if (typeof requestIdleCallback !== 'function') {
      const timer = setTimeout(() => setIdle(true), 200)
      return () => clearTimeout(timer)
    }
    const handle = requestIdleCallback(() => setIdle(true), { timeout })
    return () => cancelIdleCallback(handle)
  }, [timeout])

  return idle
}
