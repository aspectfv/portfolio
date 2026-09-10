import { useMediaQuery } from './useMediaQuery'

/**
 * Reads the OS motion preference and keeps tracking it — a visitor can toggle
 * it while the page is open, and the scene must respond without a reload.
 */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
