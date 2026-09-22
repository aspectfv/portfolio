import { ambientActors } from '../ambient'
import { Notice } from '../Notice'

/**
 * Projects: a workshop standing on the band.
 *
 * A structure, not an island — the class of object is the axis that separates
 * one section's scenery from another's at this size, so this one is built,
 * roofed and firmly on the ground while About's floats.
 *
 * Two ambient actors, which is this band's whole budget: the banner sways off
 * its arm and the screen in the window blinks. Both are the section's subject
 * drawn as an object — a made thing with a light on inside it.
 */
export function Workshop() {
  return (
    <>
      {/* Ground, built like an island cap so the world keeps one grammar: a lit
          top plane over a darker front. */}
      <polygon points="12,104 40,96 100,96 128,104 100,112 40,112" fill="var(--color-world-soil)" />
      <polygon
        points="12,104 40,112 100,112 128,104 128,108 100,116 40,116 12,108"
        fill="var(--color-world-soil-dark)"
      />

      {/* The hut. */}
      <polygon points="36,98 36,62 92,62 92,98" fill="var(--color-world-wood)" />
      <polygon points="78,98 78,62 92,62 92,98" fill="var(--color-world-wood-dark)" />
      <polygon points="30,62 64,38 64,62" fill="var(--color-world-sand)" />
      <polygon points="64,38 98,62 64,62" fill="var(--color-world-sand-dark)" />
      <polygon points="52,98 52,76 68,76 68,98" fill="var(--color-world-soil-dark)" />

      {/* The window, and the one lit thing in the section about built software.
          It is also this band's focal object: the screen brightens while it is
          pointed at, and holds, because a screen that goes dark under the
          cursor reads as broken.

          The brighter pane is its own rect rather than a change to the lit
          ones, so the blink above keeps running underneath it. */}
      <Notice reaction="screen" hit={[64, 68, 32, 30]}>
        <rect x="72" y="76" width="16" height="14" fill="var(--color-world-stone-dark)" />
        <g
          className="ambient ambient-blink"
          style={{ animationDuration: ambientActors.screen.duration }}
        >
          <rect x="74" y="78" width="12" height="10" fill="var(--color-world-water)" />
          <rect x="76" y="80" width="8" height="2" fill="var(--color-world-sky)" />
        </g>
        <rect
          className="notice-glow"
          x="73"
          y="77"
          width="14"
          height="12"
          fill="var(--color-world-sky)"
        />
      </Notice>

      {/* The yard: cut timber, stacked. A sawhorse stood here for one build
          and came out as a handful of loose slats — at this size a frame drawn
          in thin diagonals has no faces to shade, and anything without a lit
          top and a dark side reads as debris. A stack has both, and says the
          same thing: material, cut, waiting to be built with. */}
      <polygon points="13,104 13,98 35,98 35,104" fill="var(--color-world-wood)" />
      <polygon points="13,98 17,95 39,95 35,98" fill="var(--color-world-sand-dark)" />
      <polygon points="35,104 35,98 39,95 39,101" fill="var(--color-world-wood-dark)" />
      <rect x="13" y="101" width="22" height="1" fill="var(--color-world-soil-dark)" />

      <polygon points="17,95 17,90 33,90 33,95" fill="var(--color-world-wood)" />
      <polygon points="17,90 20,88 36,88 33,90" fill="var(--color-world-sand-dark)" />
      <polygon points="33,95 33,90 36,88 36,93" fill="var(--color-world-wood-dark)" />
      <rect x="17" y="92" width="16" height="1" fill="var(--color-world-soil-dark)" />

      {/* The sign, and the banner hanging off it. Painted boards on a dark
          post: the hut behind is bare timber, and wood on wood is no object. */}
      <rect x="100" y="54" width="6" height="44" fill="var(--color-world-soil-dark)" />
      <rect x="100" y="56" width="28" height="4" fill="var(--color-world-soil-dark)" />
      <g
        className="ambient ambient-sway"
        style={{ animationDuration: ambientActors.banner.duration, transformOrigin: 'top center' }}
      >
        <polygon points="106,60 126,60 126,82 116,88 106,82" fill="var(--color-world-sun)" />
        <polygon points="116,60 126,60 126,82 116,88" fill="var(--color-world-sun-deep)" />
      </g>
    </>
  )
}
