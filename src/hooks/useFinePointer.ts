import { useMediaQuery } from './useMediaQuery'

/**
 * Whether the device has a precise pointer. Parallax that follows a cursor has
 * nothing to follow on touch, where it would either sit still or lurch on tap.
 */
export function useFinePointer(): boolean {
  return useMediaQuery('(pointer: fine)')
}
