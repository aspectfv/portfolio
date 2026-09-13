import { type RefObject } from 'react'
import { useInView } from './useInView'
import { usePageVisible } from './usePageVisible'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'
import { useViewMode } from './useViewMode'

/**
 * Whether ambient scenery motion should be running.
 *
 * Ambient loops never resolve, so unlike a transition they keep costing
 * something for as long as they are allowed to run. All four conditions are
 * about not paying that cost, or not imposing it: a loop in a background tab is
 * a battery complaint, and a loop a visitor asked not to see is a broken
 * promise.
 *
 * Returned as a boolean that callers put on a `data-ambient` attribute, so the
 * decision is inspectable in the DOM and therefore testable, rather than being
 * buried in whether a CSS animation happens to be ticking.
 */
export function useAmbient(ref: RefObject<Element | null>): boolean {
  const inView = useInView(ref, '120px')
  const visible = usePageVisible()
  const reduced = usePrefersReducedMotion()
  const [viewMode] = useViewMode()

  return inView && visible && !reduced && viewMode === 'game'
}
