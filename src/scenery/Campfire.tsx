import { SceneryLayer } from './SceneryLayer'

/**
 * A campfire on a small floating shard, closing the page.
 *
 * Contact is the last band, so there is no ridge below it to stand on. Rather
 * than leave the fire hanging in open sky, it gets its own scrap of ground,
 * which also bookends the hero: the page opens on a floating island and closes
 * on a smaller one.
 *
 * The flame is the only ambient element that changes opacity rather than
 * position, and it is slow enough not to register as a flicker hazard.
 */
export function Campfire() {
  return (
    <SceneryLayer className="pointer-events-none mt-12 flex justify-center">
      <svg viewBox="0 0 140 116" className="w-32 md:w-40">
        {/* Ground: a grass cap over a tapering underside, the island in miniature */}
        <polygon points="24,74 116,74 104,86 36,86" fill="var(--color-world-grass-light)" />
        <polygon points="24,74 116,74 116,80 24,80" fill="var(--color-world-grass)" />
        <polygon points="36,86 104,86 70,112" fill="var(--color-world-soil-dark)" />
        <polygon points="70,112 104,86 86,86" fill="var(--color-world-soil)" />

        {/* Stone ring and logs, resting on the cap */}
        <polygon points="52,72 88,72 84,66 56,66" fill="var(--color-world-stone)" />
        <polygon points="52,72 88,72 88,74 52,74" fill="var(--color-world-stone-dark)" />
        <polygon points="46,70 70,54 76,60 54,74" fill="var(--color-world-wood)" />
        <polygon points="94,70 70,54 64,60 86,74" fill="var(--color-world-wood-dark)" />

        <g className="ambient ambient-flicker" style={{ transformOrigin: '70px 60px' }}>
          <polygon points="70,16 82,46 70,58 58,46" fill="var(--color-world-sun)" />
          <polygon points="70,30 77,48 70,56 63,48" fill="var(--color-ember-strong)" />
        </g>
      </svg>
    </SceneryLayer>
  )
}
