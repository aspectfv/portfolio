import { ambientActors } from '../ambient'
import { Traveller } from './Traveller'

/**
 * Contact: a dock over shallow water, with the traveller sitting on the end.
 *
 * The platform class, and the only prop standing on something other than solid
 * ground. It ends the trail the way the page ends: on open water rather than
 * inside one more box.
 *
 * This is the second and last appearance of the figure. A beginning and an end
 * is the whole statement; a figure on every band would be a mascot.
 */
export function Dock() {
  return (
    <>
      {/* Water. Two values rather than one flat fill, the same rule every other
          surface in this world follows. */}
      <polygon points="0,78 140,78 140,92 0,92" fill="var(--color-world-water)" />
      <polygon points="0,92 140,92 140,100 0,100" fill="var(--color-world-sky)" />

      <g className="ambient ambient-blink" style={{ animationDuration: ambientActors.shimmer.duration }}>
        <rect x="16" y="83" width="26" height="3" fill="var(--color-world-sky)" />
        <rect x="58" y="88" width="18" height="2" fill="var(--color-world-sky)" />
        <rect x="96" y="82" width="22" height="3" fill="var(--color-world-sky)" />
      </g>

      {/* Deck and posts. */}
      <polygon points="24,74 112,74 118,80 30,80" fill="var(--color-world-wood)" />
      <polygon points="24,74 30,80 30,84 24,78" fill="var(--color-world-wood-dark)" />
      <rect x="38" y="80" width="5" height="16" fill="var(--color-world-soil-dark)" />
      <rect x="100" y="80" width="5" height="16" fill="var(--color-world-soil-dark)" />

      {/* The lantern at the end of it: a light left on for whoever arrives.
          Lit but still. The sky band's three ambient slots are already spent on
          the clouds, the birds and the shimmer, and the cap is the budget that
          keeps a living page from becoming a twitching one. */}
      <rect x="112" y="44" width="5" height="32" fill="var(--color-world-soil-dark)" />
      <polygon points="106,44 106,30 124,30 124,44" fill="var(--color-world-stone-dark)" />
      <polygon points="106,30 115,24 124,30" fill="var(--color-world-stone)" />
      <polygon points="115,32 121,38 115,44 109,38" fill="var(--color-world-sun)" />

      {/* Seated on the deck, feet over the edge. */}
      <g transform="translate(52,50) scale(0.8)">
        <Traveller pose="resting" />
      </g>
    </>
  )
}
