/**
 * A floating land shard: the hero island's smaller sibling.
 *
 * Faceted the same way as the island in the canvas, a lit cap, a shaded rim, a
 * dark tapering underside with one lighter face, so the 3D scene and the flat
 * scenery read as one art direction rather than two.
 *
 * Every island has its own silhouette. Five copies of one hexagon down the page
 * read as the same sticker repeated, which is the opposite of a chain of places.
 * The outlines differ in width, depth and profile, and never in a way that ranks
 * the sections against each other; an island sized by importance would publish
 * an order nobody asked for.
 *
 * It owns its own idle rather than leaving that to the caller. A floating object
 * that does not move is the thing a visitor notices: the hero island bobs,
 * drifts and leans, and a still shard beside it reads as a picture of an island
 * rather than as one. Bob and tilt run at durations that do not divide evenly,
 * so the combined motion never visibly loops, and `phase` offsets each instance
 * so the shards down the page are not a single animation repeated.
 *
 * Children are SVG nodes drawn on the cap, in the shard's own coordinate space,
 * so an object never drifts out of scale with the ground it stands on. Every
 * shape keeps its cap between y=27 and y=49, which is what lets one set piece
 * stand correctly on any of them.
 */

export type ShardShape = 'plateau' | 'spire' | 'terrace' | 'crag' | 'atoll'

type Plane = { points: string; fill: string }
type Shape = {
  /** Drawn under the cap, first, so the turf overlaps its top edge. */
  body: readonly Plane[]
  /** The loose fragment adrift below, and the rhythm it drifts on. */
  fragment: readonly Plane[]
  fragmentDuration: string
}

const soil = 'var(--color-world-soil)'
const soilDark = 'var(--color-world-soil-dark)'
const grass = 'var(--color-world-grass)'
const grassLit = 'var(--color-world-grass-light)'
const grassDark = 'var(--color-world-grass-dark)'
const stone = 'var(--color-world-stone)'
const stoneDark = 'var(--color-world-stone-dark)'
const water = 'var(--color-world-water)'

const shapes: Record<ShardShape, Shape> = {
  /** Wide and level. The one a person makes camp on. */
  plateau: {
    body: [
      { points: '14,44 60,56 106,44 60,100', fill: soilDark },
      { points: '60,100 106,44 60,56', fill: soil },
      { points: '12,38 40,48 80,48 108,38 108,44 80,54 40,54 12,44', fill: grassDark },
      { points: '12,38 40,28 80,28 108,38 80,48 40,48', fill: grass },
      { points: '12,38 40,28 62,28 34,44', fill: grassLit },
    ],
    fragment: [
      { points: '82,112 100,108 104,118 88,124', fill: stone },
      { points: '88,124 104,118 94,128', fill: stoneDark },
    ],
    fragmentDuration: '13s, 17s',
  },

  /** Narrow, with a long keel. Reads as further out and deeper down. */
  spire: {
    body: [
      { points: '30,44 62,58 94,44 60,120', fill: soilDark },
      { points: '60,120 94,44 62,58', fill: soil },
      { points: '28,38 50,47 74,47 96,38 96,44 74,53 50,53 28,44', fill: grassDark },
      { points: '28,38 50,27 78,27 96,38 74,47 50,47', fill: grass },
      { points: '28,38 50,27 64,27 42,43', fill: grassLit },
    ],
    fragment: [
      { points: '14,96 28,92 32,101 18,106', fill: stone },
      { points: '18,106 32,101 24,110', fill: stoneDark },
    ],
    fragmentDuration: '15s, 19s',
  },

  /** Two levels: a lower shelf breaking off the western side. */
  terrace: {
    body: [
      { points: '14,54 62,66 104,44 62,106', fill: soilDark },
      { points: '62,106 104,44 62,66', fill: soil },
      { points: '6,50 28,55 28,61 6,56', fill: grassDark },
      { points: '6,50 24,43 44,47 28,55', fill: grass },
      { points: '26,38 50,47 82,47 108,38 108,44 82,53 50,53 26,44', fill: grassDark },
      { points: '26,38 50,27 84,27 108,38 82,47 50,47', fill: grass },
      { points: '26,38 50,27 66,27 42,43', fill: grassLit },
    ],
    fragment: [
      { points: '86,108 102,104 106,114 90,120', fill: stone },
      { points: '90,120 106,114 96,124', fill: stoneDark },
    ],
    fragmentDuration: '12s, 16s',
  },

  /** Rock rather than soil, and broken underneath. The cliff in the chain. */
  crag: {
    body: [
      { points: '20,42 58,56 102,43 66,112 48,84', fill: stoneDark },
      { points: '66,112 102,43 58,56', fill: stone },
      { points: '18,36 44,47 80,46 104,37 104,43 80,52 44,53 18,42', fill: stone },
      { points: '18,36 34,24 62,22 86,26 104,37 80,46 44,47', fill: grass },
      { points: '18,36 34,24 56,23 38,42', fill: grassLit },
    ],
    fragment: [
      { points: '12,88 26,82 32,92 16,98', fill: stone },
      { points: '16,98 32,92 22,101', fill: stoneDark },
    ],
    fragmentDuration: '14s, 18s',
  },

  /** Low, broad and shallow, holding a pool. The last island, where it levels out. */
  atoll: {
    body: [
      { points: '12,46 62,58 110,46 62,88', fill: soilDark },
      { points: '62,88 110,46 62,58', fill: soil },
      { points: '8,40 36,49 86,49 114,40 114,46 86,55 36,55 8,46', fill: grassDark },
      { points: '8,40 34,30 88,30 114,40 86,49 36,49', fill: grass },
      { points: '8,40 34,30 52,30 26,45', fill: grassLit },
      { points: '14,41 26,37 38,41 26,45', fill: water },
    ],
    fragment: [
      { points: '18,98 34,94 38,104 22,110', fill: stone },
      { points: '22,110 38,104 28,114', fill: stoneDark },
    ],
    fragmentDuration: '11s, 15s',
  },
}

export function Shard({
  shape,
  className = '',
  phase = '0s',
  children,
}: {
  shape: ShardShape
  className?: string
  /** Offsets this shard's idle so a page of them does not pulse in unison. */
  phase?: string
  children?: React.ReactNode
}) {
  const { body, fragment, fragmentDuration } = shapes[shape]

  return (
    <svg
      viewBox="0 0 120 132"
      className={className}
      style={{ '--float-phase': phase } as React.CSSProperties}
    >
      <g className="ambient ambient-float">
        {body.map((plane) => (
          <polygon key={plane.points} points={plane.points} fill={plane.fill} />
        ))}
        {children}
      </g>

      {/* A smaller fragment adrift below, on its own slower rhythm. The hero
          island carries one for the same reason: a single object hangs in
          space, two of them at different speeds read as floating. */}
      <g className="ambient ambient-float" style={{ animationDuration: fragmentDuration }}>
        {fragment.map((plane) => (
          <polygon key={plane.points} points={plane.points} fill={plane.fill} />
        ))}
      </g>
    </svg>
  )
}
