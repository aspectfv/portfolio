/**
 * A small floating land shard: the hero island's smaller sibling.
 *
 * This replaced a continuous horizon ribbon that could not be made to work. A
 * strip spanning the viewport forces repetition, a short height, and colours
 * mixed from two adjacent pastels, so it always read as a decorative divider
 * rather than as a place. One solid object avoids all three: it can be large,
 * saturated, and irregular, and it is instantly the same world as the hero.
 *
 * Faceted in the same way as the island in the canvas ,  a lit cap, a shaded
 * rim, a dark tapering underside with one lighter face ,  so the 3D scene and
 * the 2D scenery are recognisably one art direction.
 *
 * Children are SVG nodes drawn on the cap, in the shard's own coordinate space,
 * so an object never drifts out of scale with the ground it stands on.
 */
export function Shard({
  className = '',
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  return (
    <svg viewBox="0 0 120 104" className={className}>
      {/* Underside, tapering to a point so the shard reads as airborne */}
      <polygon points="14,44 60,56 106,44 60,100" fill="var(--color-world-soil-dark)" />
      <polygon points="60,100 106,44 60,56" fill="var(--color-world-soil)" />

      {/* Rim: the thickness of the turf, the shaded face of the disc */}
      <polygon
        points="12,38 40,48 80,48 108,38 108,44 80,54 40,54 12,44"
        fill="var(--color-world-grass-dark)"
      />

      {/* Cap: the lit top face */}
      <polygon points="12,38 40,28 80,28 108,38 80,48 40,48" fill="var(--color-world-grass)" />
      <polygon points="12,38 40,28 62,28 34,44" fill="var(--color-world-grass-light)" />

      {children}
    </svg>
  )
}
