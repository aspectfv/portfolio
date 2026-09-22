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

      {/* The yard: a sawhorse with a plank across it and the offcuts beneath.
          It replaces the crate that stood here. A hut with a crate outside it
          is a building with a box; a hut with work in front of it is a
          workshop, which is the difference between illustrating a place and
          illustrating a section about things that were built. */}
      <polygon points="14,96 18,84 21,84 17,96" fill="var(--color-world-soil-dark)" />
      <polygon points="32,96 28,84 31,84 35,96" fill="var(--color-world-soil-dark)" />
      <polygon points="8,80 34,80 38,84 12,84" fill="var(--color-world-wood)" />
      <polygon points="12,84 38,84 38,87 12,87" fill="var(--color-world-soil-dark)" />
      <polygon points="10,92 28,92 28,95 10,95" fill="var(--color-world-sand-dark)" />
      <polygon points="18,88 36,88 36,91 18,91" fill="var(--color-world-wood-dark)" />

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
