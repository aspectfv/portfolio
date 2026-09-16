import { ambientActors } from './ambient'
import { SceneryLayer } from './SceneryLayer'

/**
 * Small things adrift on a band: leaves off the meadow, dust over the sand.
 *
 * Continuous and slow, never a burst. `docs/DESIGN.md` forbids the particle
 * that fires because something happened — that is motion as a reward and it
 * belongs to a game rather than to a world — and permits the one that has been
 * running whether or not anybody is watching.
 *
 * Each mote is its own fixed-size element positioned by percentage, rather than
 * one scaling SVG. That is what keeps the travel honest: inside a viewBox that
 * stretches to the band, a 12px rise is 12px on a phone and something else
 * entirely on a desktop, and the amplitude bound would mean nothing.
 */
const variants = {
  leaves: {
    duration: ambientActors.leaves.duration,
    fill: 'var(--color-world-grass-dark)',
    shape: '0,3 3,0 6,3 3,6',
    motes: [
      { left: '8%', top: '62%', delay: '0s' },
      { left: '23%', top: '34%', delay: '-4.2s' },
      { left: '46%', top: '71%', delay: '-7.8s' },
      { left: '68%', top: '28%', delay: '-2.1s' },
      { left: '81%', top: '58%', delay: '-9.4s' },
      { left: '93%', top: '40%', delay: '-5.6s' },
    ],
  },
  dust: {
    duration: ambientActors.motes.duration,
    fill: 'var(--color-world-sand-dark)',
    shape: '0,2 2,0 4,2 2,4',
    motes: [
      { left: '12%', top: '48%', delay: '-1.3s' },
      { left: '29%', top: '76%', delay: '-6.7s' },
      { left: '52%', top: '36%', delay: '-10.2s' },
      { left: '71%', top: '66%', delay: '-3.9s' },
      { left: '88%', top: '44%', delay: '-8.5s' },
    ],
  },
} as const

export function Motes({ variant }: { variant: keyof typeof variants }) {
  const { duration, fill, shape, motes } = variants[variant]

  return (
    <SceneryLayer className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {motes.map((mote) => (
        <svg
          key={`${mote.left}${mote.top}`}
          viewBox="0 0 6 6"
          className="ambient ambient-rise absolute size-1.5"
          style={{
            left: mote.left,
            top: mote.top,
            animationDuration: duration,
            animationDelay: mote.delay,
          }}
        >
          <polygon points={shape} fill={fill} />
        </svg>
      ))}
    </SceneryLayer>
  )
}
