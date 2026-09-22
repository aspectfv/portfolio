import { ambientActors } from '../ambient'
import { Notice } from '../Notice'
import { Traveller } from './Traveller'

/**
 * Contact: a dock over shallow water, with the traveller sitting on the end.
 *
 * The platform class, and the only prop standing on something other than solid
 * ground. It ends the trail the way the page ends: on open water rather than
 * inside one more box.
 *
 * The water is a tapered pool rather than a rectangle across the viewBox. A
 * full-width slab of blue on a pale sky band reads as a crop mark — a piece of
 * some other picture showing through — instead of as water the dock is built
 * over.
 *
 * This is the second and last appearance of the figure, and it is drawn at
 * full scale here. It is the one moment on the page where a person is the
 * subject rather than a detail, so it is sized to be read as one.
 */
export function Dock() {
  return (
    <>
      {/* Far plane pale, near plane deep: the same two-value rule every other
          surface in this world follows. */}
      <polygon points="18,74 122,74 132,84 8,84" fill="var(--color-world-sky)" />
      <polygon points="8,84 132,84 120,97 20,97" fill="var(--color-world-water)" />

      <g
        className="ambient ambient-blink"
        style={{ animationDuration: ambientActors.shimmer.duration }}
      >
        <rect x="56" y="88" width="22" height="3" fill="var(--color-world-sky)" />
        <rect x="86" y="93" width="16" height="2" fill="var(--color-world-sky)" />
        <rect x="104" y="86" width="22" height="3" fill="var(--color-world-sky)" />
      </g>

      {/* A boat tied up at the end of it. The dock said "the trail stops here";
          a moored boat says someone can arrive, which is what a contact
          section is asking for. Drawn before the deck so the planks overlap
          the hull and the two read as one place rather than two stickers. */}
      <polygon points="12,85 46,85 42,83 16,83" fill="var(--color-world-wood)" />
      <polygon points="12,85 46,85 41,94 17,94" fill="var(--color-world-wood-dark)" />
      <rect x="24" y="82" width="10" height="2" fill="var(--color-world-sand-dark)" />

      {/* The deck runs in from the left and stops over the water. */}
      <polygon points="0,68 98,68 106,74 0,74" fill="var(--color-world-wood)" />
      <polygon points="0,74 106,74 106,77 0,77" fill="var(--color-world-wood-dark)" />
      <rect x="54" y="77" width="5" height="13" fill="var(--color-world-soil-dark)" />
      <rect x="92" y="77" width="5" height="11" fill="var(--color-world-soil-dark)" />

      {/* Sitting on the end of it, legs over the edge. */}
      <g transform="translate(70,42)">
        <Traveller pose="resting" />
      </g>

      {/* A light left on for whoever arrives. Lit but still: the sky band's
          three ambient slots are already spent on the clouds, the birds and the
          shimmer, and that cap is what keeps a living page from becoming a
          twitching one.

          Still is not inert. This band's focal object is the lantern, and a
          Notice reaction is Response rather than Ambient, so it consumes no
          slot — the budget that made this light still is the same budget that
          lets it react. */}
      <rect x="112" y="40" width="5" height="34" fill="var(--color-world-soil-dark)" />
      <polygon points="106,40 106,26 124,26 124,40" fill="var(--color-world-stone-dark)" />
      <polygon points="106,26 115,19 124,26" fill="var(--color-world-stone)" />
      <Notice reaction="lantern" hit={[102, 16, 26, 60]}>
        <g className="notice-flare">
          <polygon points="115,28 121,34 115,40 109,34" fill="var(--color-world-sun)" />
        </g>
        {/* Light drawn the way this world draws everything else: as flat marks
            with hard edges. A translucent halo is the obvious way to do it and
            the wrong one — over a pale sky band it reads as a beige diamond
            hung behind the lantern rather than as anything switching on. */}
        <g className="notice-glow" fill="var(--color-world-sun)">
          <rect x="98" y="32" width="6" height="3" />
          <rect x="126" y="32" width="6" height="3" />
          <polygon points="101,23 105,27 103,29 99,25" />
          <polygon points="129,23 131,25 127,29 125,27" />
        </g>
      </Notice>
    </>
  )
}
