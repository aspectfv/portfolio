import { ambientActors } from '../ambient'
import { Notice } from '../Notice'

/**
 * Skills: a supply cluster.
 *
 * Deliberately the one prop in the world with **no single silhouette**. Three
 * separate objects on two patches of ground, which is what "a kit" looks like
 * and is also the strongest possible contrast with a workshop that is one solid
 * mass and an island that is one solid hexagon. Class of object is the axis
 * that carries; this one carries it by refusing to have an outline at all.
 *
 * Wordless, like every other prop. The section heading already says Inventory.
 */
export function SupplyCluster() {
  return (
    <>
      <polygon points="8,96 28,90 66,90 82,96 66,102 28,102" fill="var(--color-world-sand-dark)" />
      <polygon
        points="8,96 28,102 66,102 82,96 82,100 66,106 28,106 8,100"
        fill="var(--color-world-soil-dark)"
      />
      <polygon
        points="88,96 102,92 128,92 138,96 128,101 102,101"
        fill="var(--color-world-sand-dark)"
      />
      <polygon
        points="88,96 102,101 128,101 138,96 138,99 128,104 102,104 88,99"
        fill="var(--color-world-soil-dark)"
      />

      {/* The open chest: the lid is what makes it read as a kit being used
          rather than as a box being stored. This band's focal object, and the
          one gesture here that needs no arm — point at it and the lid lifts
          once, then settles. */}
      <Notice reaction="lid" hit={[10, 58, 42, 38]}>
        <polygon points="14,92 14,76 44,76 44,92" fill="var(--color-world-wood)" />
        <polygon points="14,88 44,88 44,92 14,92" fill="var(--color-world-soil-dark)" />
        <g className="notice-lid">
          <polygon points="14,76 18,64 48,64 44,76" fill="var(--color-world-wood-dark)" />
        </g>
        <polygon points="18,76 40,76 40,80 18,80" fill="var(--color-world-sun)" />
      </Notice>

      {/* Crates, stacked and offset. */}
      <polygon points="56,92 56,78 78,78 78,92" fill="var(--color-world-wood)" />
      <polygon points="56,78 62,73 84,73 78,78" fill="var(--color-world-sand-dark)" />
      <polygon points="78,92 78,78 84,73 84,87" fill="var(--color-world-wood-dark)" />
      <polygon points="60,73 60,61 76,61 76,73" fill="var(--color-world-wood)" />
      <polygon points="60,61 65,57 81,57 76,61" fill="var(--color-world-sand-dark)" />
      <polygon points="76,73 76,61 81,57 81,69" fill="var(--color-world-wood-dark)" />

      {/* The lantern on its post: the cluster's one warm point, and the reason
          the right-hand patch is not just an empty stretch of sand. */}
      <rect x="110" y="66" width="5" height="28" fill="var(--color-world-soil-dark)" />
      <polygon points="104,66 104,52 121,52 121,66" fill="var(--color-world-stone-dark)" />
      <polygon points="104,52 112,46 121,52" fill="var(--color-world-stone)" />
      <g
        className="ambient ambient-flicker"
        style={{ animationDuration: ambientActors.lantern.duration }}
      >
        <polygon points="112,54 118,60 112,66 106,60" fill="var(--color-world-sun)" />
        <polygon points="112,57 115,60 112,63 109,60" fill="var(--color-world-sun-deep)" />
      </g>
    </>
  )
}
