import { ambientActors } from '../ambient'
import { Notice } from '../Notice'

/**
 * Experience: a timber outpost on the night band, with a brazier burning at
 * its foot.
 *
 * It replaces a standing stone. The stone held the marker class honestly and
 * said nothing whatsoever about the section it stood in: a rock you walk past
 * is not a job you held. A watchpost is the same class — the tallest, most
 * vertical, narrowest thing in the world, against a workshop that is wide and
 * an island that is flat — and it is somewhere a person was posted, which is
 * what the section is a list of.
 *
 * Timber rather than stone, because the night band is rock-coloured already and
 * grey on grey is no object at all. The pale roof is the one high value on the
 * darkest band, and the brazier is its only warm light.
 */
export function Outpost() {
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

      {/* Legs, braced. Two values on the pair rather than one, so the frame
          reads as having a lit side and a shaded one at 112px wide. */}
      <polygon points="56,94 58,91 82,64 80,67" fill="var(--color-world-soil-dark)" />
      <rect x="56" y="58" width="5" height="40" fill="var(--color-world-wood)" />
      <rect x="76" y="58" width="5" height="40" fill="var(--color-world-wood-dark)" />

      {/* Deck. */}
      <polygon points="48,54 88,54 92,58 44,58" fill="var(--color-world-wood)" />
      <polygon points="44,58 92,58 92,61 44,61" fill="var(--color-world-soil-dark)" />

      {/* Rail, and the two posts carrying the roof. */}
      <rect x="46" y="46" width="3" height="9" fill="var(--color-world-soil-dark)" />
      <rect x="87" y="46" width="3" height="9" fill="var(--color-world-soil-dark)" />
      <rect x="46" y="46" width="44" height="3" fill="var(--color-world-wood-dark)" />
      <rect x="52" y="34" width="3" height="21" fill="var(--color-world-soil-dark)" />
      <rect x="81" y="34" width="3" height="21" fill="var(--color-world-soil-dark)" />

      {/* Roof: the one pale value on the darkest band in the sequence. */}
      <polygon points="40,36 68,20 96,36" fill="var(--color-world-sand)" />
      <polygon points="68,20 96,36 68,36" fill="var(--color-world-sand-dark)" />

      {/* A standard on the pole. Still, not flying: dusk has one free ambient
          slot and this milestone is not the one that spends it. */}
      <rect x="99" y="14" width="3" height="84" fill="var(--color-world-soil-dark)" />
      <polygon points="102,16 116,21 102,26" fill="var(--color-ember)" />
      <polygon points="102,21 116,21 102,26" fill="var(--color-ember-strong)" />

      {/* The brazier, and this band's focal object: the flame flares while it
          is pointed at and holds, which is what a fire does when you stand over
          it. The flare scales this group and the flicker scales the group
          inside it; they are different elements, so the idle keeps running
          underneath the reaction rather than being replaced by it. */}
      <rect x="22" y="80" width="6" height="18" fill="var(--color-world-stone-dark)" />
      <polygon points="10,80 40,80 36,70 14,70" fill="var(--color-world-stone)" />
      <polygon points="10,80 40,80 40,84 10,84" fill="var(--color-world-stone-dark)" />
      <Notice reaction="flare" hit={[6, 36, 38, 48]}>
        <g className="notice-flare">
          <g
            className="ambient ambient-flicker"
            style={{ animationDuration: ambientActors.brazier.duration }}
          >
            <polygon points="25,44 37,64 25,72 13,64" fill="var(--color-world-sun)" />
            <polygon points="25,54 31,65 25,70 19,65" fill="var(--color-ember-strong)" />
          </g>
        </g>
      </Notice>

      {/* Embers. A continuous rise, never a burst: the forbidden particle is the
          one that fires because something happened, which is motion as reward. */}
      <g
        className="ambient ambient-rise"
        style={{ animationDuration: ambientActors.embers.duration }}
      >
        <rect x="20" y="40" width="3" height="3" fill="var(--color-world-sun)" />
      </g>
      <g
        className="ambient ambient-rise"
        style={{ animationDuration: ambientActors.embers.duration, animationDelay: '-2.6s' }}
      >
        <rect x="29" y="46" width="2" height="2" fill="var(--color-world-sun-deep)" />
      </g>
      <g
        className="ambient ambient-rise"
        style={{ animationDuration: ambientActors.embers.duration, animationDelay: '-5.1s' }}
      >
        <rect x="24" y="36" width="2" height="2" fill="var(--color-world-sun)" />
      </g>
    </>
  )
}
