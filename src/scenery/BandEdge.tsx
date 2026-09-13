import type { Biome } from '@/components/Section'
import { Prop2D, type PropName } from './Prop2D'

/**
 * The faceted ridge where one biome meets the next.
 *
 * Generalised from the single hand-written silhouette that used to live at the
 * bottom of the hero. Doing it at every boundary is what turns six arbitrary
 * colour changes into a descent through one landscape, which is the whole point
 * of the scenery layer: the world stops being a sticker in the hero and becomes
 * the page.
 *
 * Straight-edged on purpose. A smooth bezier hill would be the one curved form
 * in a system built entirely from flat planes.
 *
 * Two layers, back then front, so the ridge has depth without a gradient: the
 * back plane is the incoming biome's fill, the front plane its darker edge.
 */

export type Ridge = 'hills' | 'treeline' | 'dunes' | 'peaks'

const tones: Record<Biome, { fill: string; edge: string }> = {
  canvas: { fill: 'var(--color-canvas)', edge: 'var(--color-edge)' },
  sky: { fill: 'var(--color-sky)', edge: 'var(--color-sky-edge)' },
  meadow: { fill: 'var(--color-meadow)', edge: 'var(--color-meadow-edge)' },
  sand: { fill: 'var(--color-sand)', edge: 'var(--color-sand-edge)' },
  dusk: { fill: 'var(--color-dusk)', edge: 'var(--color-dusk-edge)' },
}

const ridges: Record<Ridge, { back: string; front: string }> = {
  hills: {
    back: '0,80 0,46 240,16 560,54 900,12 1200,46 1440,24 1440,80',
    front: '0,80 0,62 360,40 780,68 1140,44 1440,60 1440,80',
  },
  treeline: {
    back: '0,80 0,52 24,6 48,52 72,6 96,52 120,6 144,52 168,6 192,52 216,6 240,52 264,6 288,52 312,6 336,52 360,6 384,52 408,6 432,52 456,6 480,52 504,6 528,52 552,6 576,52 600,6 624,52 648,6 672,52 696,6 720,52 744,6 768,52 792,6 816,52 840,6 864,52 888,6 912,52 936,6 960,52 984,6 1008,52 1032,6 1056,52 1080,6 1104,52 1128,6 1152,52 1176,6 1200,52 1224,6 1248,52 1272,6 1296,52 1320,6 1344,52 1368,6 1392,52 1416,6 1440,52 1440,80',
    front:
      '0,80 0,66 32,26 64,66 96,26 128,66 160,26 192,66 224,26 256,66 288,26 320,66 352,26 384,66 416,26 448,66 480,26 512,66 544,26 576,66 608,26 640,66 672,26 704,66 736,26 768,66 800,26 832,66 864,26 896,66 928,26 960,66 992,26 1024,66 1056,26 1088,66 1120,26 1152,66 1184,26 1216,66 1248,26 1280,66 1312,26 1344,66 1376,26 1408,66 1440,26 1472,66 1440,80',
  },
  dunes: {
    back: '0,80 0,58 300,34 640,58 980,30 1280,54 1440,40 1440,80',
    front: '0,80 0,68 380,52 760,72 1120,54 1440,66 1440,80',
  },
  peaks: {
    back: '0,80 0,50 180,10 340,44 520,6 700,40 880,14 1080,46 1260,18 1440,44 1440,80',
    front: '0,80 0,64 220,42 460,66 700,38 940,64 1180,44 1440,62 1440,80',
  },
}

/**
 * Objects standing on the horizon.
 *
 * On their own layer because the ridge below spans the viewport with
 * `preserveAspectRatio="none"`, which would stretch anything recognisable into
 * a smear. Each boundary gets its own cast so the descent passes through
 * places rather than through four repaints of one place.
 */
const scatters: Record<Ridge, { name: PropName; left: number; size: string }[]> = {
  treeline: [
    { name: 'conifer', left: 5, size: 'w-10 md:w-16' },
    { name: 'bush', left: 17, size: 'w-8 md:w-11' },
    { name: 'stump', left: 27, size: 'w-7 md:w-9' },
    { name: 'mushroom', left: 46, size: 'w-6 md:w-8' },
    { name: 'conifer', left: 58, size: 'w-9 md:w-13' },
    { name: 'bush', left: 72, size: 'w-7 md:w-10' },
    { name: 'conifer', left: 88, size: 'w-11 md:w-16' },
  ],
  dunes: [
    { name: 'rock', left: 8, size: 'w-9 md:w-12' },
    { name: 'crate', left: 22, size: 'w-9 md:w-12' },
    { name: 'bush', left: 38, size: 'w-7 md:w-10' },
    { name: 'rock', left: 57, size: 'w-8 md:w-11' },
    { name: 'stump', left: 74, size: 'w-7 md:w-9' },
    { name: 'crate', left: 89, size: 'w-10 md:w-14' },
  ],
  peaks: [
    { name: 'crystal', left: 9, size: 'w-8 md:w-11' },
    { name: 'rock', left: 24, size: 'w-10 md:w-14' },
    { name: 'conifer', left: 41, size: 'w-9 md:w-12' },
    { name: 'crystal', left: 56, size: 'w-7 md:w-9' },
    { name: 'rock', left: 71, size: 'w-8 md:w-11' },
    { name: 'conifer', left: 90, size: 'w-10 md:w-14' },
  ],
  hills: [
    { name: 'bush', left: 7, size: 'w-9 md:w-12' },
    { name: 'stump', left: 21, size: 'w-7 md:w-9' },
    { name: 'mushroom', left: 35, size: 'w-6 md:w-8' },
    { name: 'rock', left: 52, size: 'w-9 md:w-12' },
    { name: 'bush', left: 68, size: 'w-8 md:w-11' },
    { name: 'crate', left: 85, size: 'w-9 md:w-12' },
  ],
}

export function BandEdge({ into, ridge = 'hills' }: { into: Biome; ridge?: Ridge | undefined }) {
  const tone = tones[into]
  const shape = ridges[ridge]

  return (
    <div data-ornament="" aria-hidden="true" className="relative">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block h-10 w-full md:h-16">
        <polygon points={shape.back} fill={tone.fill} />
        <polygon points={shape.front} fill={tone.edge} />
      </svg>

      <div className="pointer-events-none absolute inset-x-0 bottom-[42%] hidden h-0 sm:block">
        {scatters[ridge].map((item, index) => (
          <Prop2D
            key={`${item.name}-${index}`}
            name={item.name}
            className={`absolute bottom-0 ${item.size}`}
            style={{ left: `${item.left}%` }}
          />
        ))}
      </div>
    </div>
  )
}
