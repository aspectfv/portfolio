import { useMediaQuery } from './useMediaQuery'

/**
 * The narrow composition is a separate arrangement, not the wide one scaled
 * down: fewer props and a tighter camera, chosen so the island still reads at
 * 390px. Breakpoint matches Tailwind's `md`.
 */
export function useCompactScene(): boolean {
  return useMediaQuery('(width < 48rem)')
}
