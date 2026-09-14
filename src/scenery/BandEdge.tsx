import type { Biome } from '@/components/Section'
import { Prop2D, type PropName } from './Prop2D'

/**
 * The horizon where one biome meets the next.
 *
 * Three parts, and the separation matters. A **distant silhouette** carries the
 * character of the place and may be as jagged as it likes. A **ground line** in
 * front of it is deliberately gentle, because it is what objects stand on.
 * **Props** then stand on that ground line, at a height read from its geometry
 * rather than at a fixed offset ,  a flat offset leaves objects hovering
 * wherever the terrain happens to dip, which is exactly how scenery stops
 * looking like a place and starts looking like stickers.
 *
 * Props never repeat the silhouette. Scattering conifers along a ridge already
 * made of conifers reads as a mistake, not as a forest.
 */

export type Ridge = 'hills' | 'treeline' | 'dunes' | 'peaks'

const VIEW_W = 1440
const VIEW_H = 80

const tones: Record<Biome, { fill: string; edge: string }> = {
  canvas: { fill: 'var(--color-canvas)', edge: 'var(--color-edge)' },
  sky: { fill: 'var(--color-sky)', edge: 'var(--color-sky-edge)' },
  meadow: { fill: 'var(--color-meadow)', edge: 'var(--color-meadow-edge)' },
  sand: { fill: 'var(--color-sand)', edge: 'var(--color-sand-edge)' },
  dusk: { fill: 'var(--color-dusk)', edge: 'var(--color-dusk-edge)' },
}

/** Distant silhouettes. Free to be spiky; nothing stands on them. */
const silhouettes: Record<Ridge, string> = {
  hills: '0,80 0,40 240,12 560,44 900,8 1200,38 1440,20 1440,80',
  treeline: (() => {
    const points = ['0,80', '0,46']
    for (let x = 0; x < VIEW_W; x += 40) {
      points.push(`${x + 20},6`, `${x + 40},46`)
    }
    points.push('1440,80')
    return points.join(' ')
  })(),
  dunes: '0,80 0,50 300,28 640,48 980,24 1280,44 1440,34 1440,80',
  peaks: '0,80 0,42 180,6 340,36 520,2 700,32 880,10 1080,38 1260,14 1440,36 1440,80',
}

/**
 * Ground lines. Gentle by contract: this is the surface props stand on, so a
 * spike here would put an object on a needle.
 */
const grounds: Record<Ridge, [number, number][]> = {
  hills: [
    [0, 52],
    [360, 45],
    [780, 54],
    [1140, 47],
    [1440, 52],
  ],
  treeline: [
    [0, 50],
    [300, 44],
    [700, 53],
    [1080, 45],
    [1440, 50],
  ],
  dunes: [
    [0, 55],
    [380, 45],
    [760, 57],
    [1120, 47],
    [1440, 53],
  ],
  peaks: [
    [0, 53],
    [260, 46],
    [640, 55],
    [1020, 45],
    [1440, 52],
  ],
}

function groundPolygon(points: [number, number][]): string {
  return ['0,80', ...points.map(([x, y]) => `${x},${y}`), `${VIEW_W},80`].join(' ')
}

/** Linear interpolation along the ground line, so a prop meets the surface. */
function surfaceAt(points: [number, number][], x: number): number {
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i]!
    const [x1, y1] = points[i + 1]!
    if (x >= x0 && x <= x1) {
      const t = x1 === x0 ? 0 : (x - x0) / (x1 - x0)
      return y0 + (y1 - y0) * t
    }
  }
  return points[points.length - 1]![1]
}

/**
 * What grows where. Each boundary gets its own cast so the descent passes
 * through places rather than through four repaints of one place, and nothing
 * appears where it would not: no crates in wilderness, no mushrooms on a peak.
 */
const scatters: Record<Ridge, { name: PropName; left: number; size: string }[]> = {
  treeline: [
    { name: 'bush', left: 6, size: 'w-8 md:w-11' },
    { name: 'stump', left: 18, size: 'w-6 md:w-8' },
    { name: 'mushroom', left: 27, size: 'w-5 md:w-6' },
    { name: 'bush', left: 52, size: 'w-7 md:w-10' },
    { name: 'conifer', left: 64, size: 'w-8 md:w-11' },
    { name: 'stump', left: 82, size: 'w-6 md:w-8' },
    { name: 'bush', left: 93, size: 'w-8 md:w-10' },
  ],
  dunes: [
    { name: 'rock', left: 9, size: 'w-8 md:w-11' },
    { name: 'stump', left: 24, size: 'w-6 md:w-8' },
    { name: 'rock', left: 45, size: 'w-7 md:w-9' },
    { name: 'bush', left: 61, size: 'w-6 md:w-8' },
    { name: 'rock', left: 88, size: 'w-9 md:w-12' },
  ],
  peaks: [
    { name: 'rock', left: 11, size: 'w-9 md:w-12' },
    { name: 'crystal', left: 25, size: 'w-6 md:w-8' },
    { name: 'conifer', left: 43, size: 'w-8 md:w-10' },
    { name: 'rock', left: 62, size: 'w-7 md:w-10' },
    { name: 'crystal', left: 79, size: 'w-5 md:w-7' },
    { name: 'rock', left: 94, size: 'w-8 md:w-11' },
  ],
  hills: [
    { name: 'bush', left: 8, size: 'w-8 md:w-11' },
    { name: 'rock', left: 23, size: 'w-7 md:w-9' },
    { name: 'stump', left: 41, size: 'w-6 md:w-8' },
    { name: 'bush', left: 66, size: 'w-7 md:w-10' },
    { name: 'rock', left: 85, size: 'w-8 md:w-11' },
  ],
}

export function BandEdge({
  into,
  ridge = 'hills',
  feature,
  featureLeft = 70,
}: {
  into: Biome
  ridge?: Ridge | undefined
  /** A larger set piece standing on the same ground as the scattered props. */
  feature?: React.ReactNode | undefined
  featureLeft?: number | undefined
}) {
  const tone = tones[into]
  const ground = grounds[ridge]

  const standOn = (leftPercent: number) => ({
    left: `${leftPercent}%`,
    bottom: `${((VIEW_H - surfaceAt(ground, (leftPercent / 100) * VIEW_W)) / VIEW_H) * 100}%`,
  })

  return (
    <div data-ornament="" aria-hidden="true" className="relative">
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        preserveAspectRatio="none"
        className="block h-14 w-full md:h-20"
      >
        <polygon points={silhouettes[ridge]} fill={tone.fill} />
        <polygon points={groundPolygon(ground)} fill={tone.edge} />
      </svg>

      <div className="pointer-events-none absolute inset-0 hidden sm:block">
        {scatters[ridge].map((item, index) => (
          <Prop2D
            key={`${item.name}-${index}`}
            name={item.name}
            className={`absolute -translate-x-1/2 ${item.size}`}
            style={standOn(item.left)}
          />
        ))}

        {feature && (
          <div className="absolute -translate-x-1/2" style={standOn(featureLeft)}>
            {feature}
          </div>
        )}
      </div>
    </div>
  )
}
