/**
 * A small floating land shard: the hero island's smaller sibling.
 *
 * Faceted the same way as the island in the canvas ,  a lit cap, a shaded rim,
 * a dark tapering underside with one lighter face ,  so the 3D scene and the
 * flat scenery read as one art direction rather than two.
 *
 * It owns its own idle rather than leaving that to the caller. A floating
 * object that does not move is the thing a visitor notices: the hero island
 * bobs, drifts and leans, and a still shard beside it reads as a picture of an
 * island rather than as one. Bob and tilt run at durations that do not divide
 * evenly, so the combined motion never visibly loops, and `phase` offsets each
 * instance so the shards down the page are not a single animation repeated.
 *
 * Children are SVG nodes drawn on the cap, in the shard's own coordinate space,
 * so an object never drifts out of scale with the ground it stands on.
 */
export function Shard({
  className = '',
  phase = '0s',
  children,
}: {
  className?: string
  /** Offsets this shard's idle so a page of them does not pulse in unison. */
  phase?: string
  children?: React.ReactNode
}) {
  return (
    <svg
      viewBox="0 0 120 132"
      className={className}
      style={{ '--float-phase': phase } as React.CSSProperties}
    >
      <g className="ambient ambient-float">
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
      </g>

      {/* A smaller fragment adrift below, on its own slower rhythm. The hero
          island carries one for the same reason: a single object hangs in
          space, two of them at different speeds read as floating. */}
      <g className="ambient ambient-float" style={{ animationDuration: '13s, 17s' }}>
        <polygon points="82,112 100,108 104,118 88,124" fill="var(--color-world-stone)" />
        <polygon points="88,124 104,118 94,128" fill="var(--color-world-stone-dark)" />
      </g>
    </svg>
  )
}
