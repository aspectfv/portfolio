import { ambientActors } from '../ambient'
import { Notice } from '../Notice'

/**
 * Experience: a waymarker on the night band.
 *
 * A stone and a lit brazier standing on ground, which is the marker class: the
 * smallest, tallest and most vertical thing in the world, against a workshop
 * that is wide and an island that is flat.
 *
 * Pale sandstone rather than grey, because it stands on night rock and grey on
 * grey is no object at all. The flame and the embers off it are the dark band's
 * only warm light, which is the point — the night section otherwise has none.
 */
export function Waymarker() {
  return (
    <>
      <polygon
        points="10,102 30,96 90,96 110,102 90,108 30,108"
        fill="var(--color-world-stone-dark)"
      />
      <polygon
        points="10,102 30,108 90,108 110,102 110,106 90,112 30,112 10,106"
        fill="var(--color-world-soil-dark)"
      />

      {/* The stone. */}
      <polygon points="36,98 32,38 48,22 62,36 58,98" fill="var(--color-world-sand)" />
      <polygon points="48,22 62,36 58,98 48,90" fill="var(--color-world-sand-dark)" />
      <polygon points="42,54 50,62 42,70 34,62" fill="var(--color-world-sun)" />

      {/* The brazier, and this band's focal object: the flame flares while it
          is pointed at and holds, which is what a fire does when you stand
          over it. The flare scales this group and the flicker scales the group
          inside it; they are different elements, so the idle keeps running
          underneath the reaction rather than being replaced by it. */}
      <rect x="82" y="80" width="6" height="18" fill="var(--color-world-stone-dark)" />
      <polygon points="70,80 100,80 96,70 74,70" fill="var(--color-world-stone)" />
      <polygon points="70,80 100,80 100,84 70,84" fill="var(--color-world-stone-dark)" />
      <Notice reaction="flare" hit={[66, 36, 38, 48]}>
        <g className="notice-flare">
          <g
            className="ambient ambient-flicker"
            style={{ animationDuration: ambientActors.brazier.duration }}
          >
            <polygon points="85,44 97,64 85,72 73,64" fill="var(--color-world-sun)" />
            <polygon points="85,54 91,65 85,70 79,65" fill="var(--color-ember-strong)" />
          </g>
        </g>
      </Notice>

      {/* Embers. A continuous rise, never a burst: the forbidden particle is the
          one that fires because something happened, which is motion as reward. */}
      <g
        className="ambient ambient-rise"
        style={{ animationDuration: ambientActors.embers.duration }}
      >
        <rect x="80" y="40" width="3" height="3" fill="var(--color-world-sun)" />
      </g>
      <g
        className="ambient ambient-rise"
        style={{ animationDuration: ambientActors.embers.duration, animationDelay: '-2.6s' }}
      >
        <rect x="89" y="46" width="2" height="2" fill="var(--color-world-sun-deep)" />
      </g>
      <g
        className="ambient ambient-rise"
        style={{ animationDuration: ambientActors.embers.duration, animationDelay: '-5.1s' }}
      >
        <rect x="84" y="36" width="2" height="2" fill="var(--color-world-sun)" />
      </g>
    </>
  )
}
