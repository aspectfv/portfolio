import type { Biome } from '@/components/Section'

/**
 * The transition where one biome meets the next.
 *
 * Deliberately plain. An earlier version tried to be a landscape: a full-width
 * strip carrying scattered props. Spanning the viewport forced repetition, a
 * short height, and colours mixed from two adjacent pastels, so it read as a
 * decorative border and the props on it read as specks. The world now lives in
 * the shards, which can be large and saturated, and this is left to do the one
 * job it is good at: softening a hard colour change.
 *
 * The distant ridge takes the darker edge tone. Filling it with the incoming
 * band's own colour, as the first version did, made it invisible against the
 * band it sits above.
 */

export type Ridge = 'hills' | 'treeline' | 'dunes' | 'peaks'

const tones: Record<Biome, { fill: string; edge: string }> = {
  canvas: { fill: 'var(--color-canvas)', edge: 'var(--color-edge)' },
  sky: { fill: 'var(--color-sky)', edge: 'var(--color-sky-edge)' },
  meadow: { fill: 'var(--color-meadow)', edge: 'var(--color-meadow-edge)' },
  sand: { fill: 'var(--color-sand)', edge: 'var(--color-sand-edge)' },
  dusk: { fill: 'var(--color-dusk)', edge: 'var(--color-dusk-edge)' },
}

/** Straight-edged: a bezier hill would be the one curve in a faceted system. */
const ridges: Record<Ridge, { back: string; front: string }> = {
  hills: {
    back: '0,80 0,44 260,20 620,48 980,16 1260,42 1440,26 1440,80',
    front: '0,80 0,62 380,46 800,66 1160,50 1440,60 1440,80',
  },
  treeline: {
    back: '0,80 0,46 180,22 420,40 700,18 1000,44 1240,24 1440,40 1440,80',
    front: '0,80 0,64 320,50 700,68 1080,52 1440,62 1440,80',
  },
  dunes: {
    back: '0,80 0,52 320,30 680,52 1020,28 1300,48 1440,38 1440,80',
    front: '0,80 0,66 400,54 820,70 1180,56 1440,64 1440,80',
  },
  peaks: {
    back: '0,80 0,46 200,10 380,40 560,6 760,36 960,14 1160,42 1340,18 1440,36 1440,80',
    front: '0,80 0,62 300,48 660,66 1020,50 1440,60 1440,80',
  },
}

export function BandEdge({ into, ridge = 'hills' }: { into: Biome; ridge?: Ridge | undefined }) {
  const tone = tones[into]
  const shape = ridges[ridge]

  return (
    <svg
      data-ornament=""
      aria-hidden="true"
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className="block h-8 w-full md:h-12"
    >
      <polygon points={shape.back} fill={tone.edge} />
      <polygon points={shape.front} fill={tone.fill} />
    </svg>
  )
}
