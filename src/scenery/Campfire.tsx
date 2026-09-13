import { SceneryLayer } from './SceneryLayer'

/**
 * A small campfire closing the page.
 *
 * The page used to simply stop; a single-page site needs an ending or it reads
 * as having run out. A fire at the end of the descent is the conventional
 * adventure-game full stop, and it sits in the sky band that bookends the hero,
 * so the visitor finishes where they started.
 *
 * The flame is the only ambient element on the site that changes opacity rather
 * than position, and it is slow enough not to register as a flicker hazard.
 */
export function Campfire() {
  return (
    <SceneryLayer className="pointer-events-none mt-12 flex justify-center">
      <svg viewBox="0 0 160 110" className="h-24 w-32 md:h-28 md:w-40">
        <ellipse cx="80" cy="96" rx="44" ry="7" fill="var(--color-edge)" opacity="0.16" />

        <polygon points="46,96 114,96 104,86 56,86" fill="var(--color-world-stone)" />
        <polygon points="52,88 108,88 100,80 60,80" fill="var(--color-world-soil)" />
        <polygon points="40,92 74,74 82,82 50,98" fill="var(--color-world-wood)" />
        <polygon points="120,92 86,74 78,82 110,98" fill="var(--color-world-wood)" />

        <g className="ambient ambient-flicker" style={{ transformOrigin: '80px 80px' }}>
          <polygon points="80,26 96,62 80,76 64,62" fill="var(--color-world-sun)" />
          <polygon points="80,42 89,64 80,72 71,64" fill="var(--color-ember-strong)" />
        </g>
      </svg>
    </SceneryLayer>
  )
}
