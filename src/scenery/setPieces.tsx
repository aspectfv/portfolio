/**
 * What each shard carries.
 *
 * Drawn in the shard's own coordinate space, standing on the cap around y=36,
 * so scale is fixed by construction rather than by matching two independent
 * sizes by eye. Every piece is wordless: scenery carries identity, never
 * information, and lettering here would be an unreadable second copy of a
 * heading that already exists.
 */

/** About: a camp. Where a person stops, rather than where they work. */
export function CampPiece() {
  return (
    <>
      <polygon points="34,36 46,14 58,36" fill="var(--color-world-wood)" />
      <polygon points="46,14 58,36 50,36" fill="var(--color-world-wood-dark)" />
      <polygon points="46,20 52,36 40,36" fill="var(--color-world-soil-dark)" />
      <rect x="68" y="34" width="4" height="6" fill="var(--color-world-soil-dark)" />
      <g className="ambient ambient-sway">
        <polygon points="62,36 70,16 78,36" fill="var(--color-world-grass-dark)" />
        <polygon points="70,16 78,36 72,36" fill="var(--color-world-grass)" />
      </g>
    </>
  )
}

/** Projects: a waypost. The quest-log marker, as an object. */
export function WaypostPiece() {
  return (
    <>
      <rect x="56" y="8" width="6" height="30" fill="var(--color-world-soil)" />
      <g className="ambient ambient-sway" style={{ animationDuration: '5.5s' }}>
        <polygon points="62,12 88,15 94,21 88,27 62,24" fill="var(--color-world-wood)" />
        <polygon points="62,12 88,15 94,21 62,18" fill="var(--color-world-wood-dark)" />
      </g>
      <g className="ambient ambient-sway" style={{ animationDuration: '6.5s' }}>
        <polygon points="56,26 34,29 28,34 34,39 56,36" fill="var(--color-world-wood)" />
        <polygon points="56,26 34,29 28,34 56,31" fill="var(--color-world-wood-dark)" />
      </g>
    </>
  )
}

/** Skills: a supply cache. The inventory, as objects. */
export function CachePiece() {
  return (
    <>
      <polygon points="30,24 44,18 60,24 46,30" fill="var(--color-world-wood)" />
      <polygon points="30,24 46,30 46,40 30,34" fill="var(--color-world-wood-dark)" />
      <polygon points="46,30 60,24 60,34 46,40" fill="var(--color-world-soil)" />
      <polygon points="62,28 72,23 84,28 74,33" fill="var(--color-world-wood)" />
      <polygon points="62,28 74,33 74,41 62,36" fill="var(--color-world-wood-dark)" />
      <polygon points="74,33 84,28 84,36 74,41" fill="var(--color-world-soil)" />
      <g className="ambient ambient-flicker" style={{ animationDuration: '4.2s' }}>
        <polygon points="86,38 84,26 90,18 96,26 94,38" fill="var(--color-world-water)" />
        <polygon points="90,18 96,26 94,38 90,30" fill="var(--color-world-sky)" />
      </g>
    </>
  )
}

/** Experience: a standing stone. The records, as an object. */
export function MarkerPiece() {
  return (
    <>
      <polygon points="46,38 44,14 54,6 64,14 62,38" fill="var(--color-world-stone)" />
      <polygon points="54,6 64,14 62,38 54,32" fill="var(--color-world-stone-dark)" />
      <polygon points="68,38 66,28 74,24 80,30 78,38" fill="var(--color-world-stone)" />
      <polygon points="74,24 80,30 78,38 74,32" fill="var(--color-world-stone-dark)" />
    </>
  )
}

/** Contact: a campfire. A page needs an ending, and this is the conventional one. */
export function CampfirePiece() {
  return (
    <>
      <polygon points="44,38 76,38 72,32 48,32" fill="var(--color-world-stone)" />
      <polygon points="44,38 76,38 76,40 44,40" fill="var(--color-world-stone-dark)" />
      <polygon points="40,36 60,22 65,27 46,39" fill="var(--color-world-wood)" />
      <polygon points="80,36 60,22 55,27 74,39" fill="var(--color-world-wood-dark)" />
      <g className="ambient ambient-flicker" style={{ transformOrigin: '60px 28px' }}>
        <polygon points="60,2 72,22 60,32 48,22" fill="var(--color-world-sun)" />
        <polygon points="60,12 67,24 60,30 53,24" fill="var(--color-ember-strong)" />
      </g>
    </>
  )
}
