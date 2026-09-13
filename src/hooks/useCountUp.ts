import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const DURATION = 600

/**
 * Counts from zero to a real value, once.
 *
 * Starts at the target rather than at zero, so the honest number is what
 * renders before any effect runs and what a visitor sees if JavaScript never
 * executes. The animation is an embellishment on a value that is already
 * correct, never the thing that produces it.
 *
 * Under reduced motion the target is returned untouched and no frame loop is
 * ever scheduled.
 */
export function useCountUp(target: number, active: boolean): number {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(target)
  const played = useRef(false)

  useEffect(() => {
    if (reduced || !active || played.current || target <= 0) return
    played.current = true

    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / DURATION)
      // Ease out, so the number decelerates onto its value rather than
      // stopping dead on it.
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    setValue(0)
    frame = requestAnimationFrame(tick)

    // Snapping to the target on teardown is not tidiness, it is the invariant:
    // an interrupted count must never leave a number on screen that the site
    // does not mean. Zero is a lie as surely as any invented statistic.
    return () => {
      cancelAnimationFrame(frame)
      setValue(target)
    }
  }, [target, active, reduced])

  return value
}
