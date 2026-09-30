import { useThree } from '@react-three/fiber'

/**
 * How far to slide a full-width strip's camera so its place stands to one
 * side of the content column rather than dead centre under it.
 *
 * The place stays at the world origin, where its lights and shadows are
 * built, and the camera moves instead. `target` is the offset wanted at the
 * desktop capture; on a narrower strip it gives way, so the place never
 * slides past the edge by more than `reach`, its half-width. A phone gets the
 * place nearly centred for free.
 */
export function useAnchor({
  target,
  reach,
  distance,
  fov,
}: {
  /** World units right of centre the place should sit; negative for left. */
  target: number
  reach: number
  /** Camera distance to the origin, and its vertical field of view in degrees. */
  distance: number
  fov: number
}): number {
  const { width, height } = useThree((state) => state.size)
  if (!width || !height) return 0
  const half = Math.tan((fov * Math.PI) / 360) * distance * (width / height)
  const room = Math.max(0, half - reach)
  return Math.sign(target) * Math.min(Math.abs(target), room)
}
