import { ambientActors } from '../ambient'
import { Notice } from '../Notice'

/**
 * Skills: a work cluster.
 *
 * Deliberately the one prop in the world with **no single silhouette**. Three
 * separate objects on two patches of ground, which is what "a kit" looks like
 * and is also the strongest possible contrast with a workshop that is one solid
 * mass and an island that is one solid hexagon. Class of object is the axis
 * that carries; this one carries it by refusing to have an outline at all.
 *
 * Every object here is built the same way the rest of the world is: a front
 * face, a lit top plane skewed up and to the right, and a darker side. A shape
 * drawn without all three reads as a flat sticker at this size, which is what
 * the first pass at this bench got wrong.
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

      {/* The chest, closed. It was drawn open, which left the lid as a flat
          trapezoid with nothing under it and no box to belong to — and a lid
          that is already up has nowhere to go when you point at it. Closed, the
          reaction is the whole gesture. */}
      <Notice reaction="lid" hit={[10, 66, 42, 30]}>
        <polygon points="14,92 14,80 40,80 40,92" fill="var(--color-world-wood)" />
        <polygon points="40,92 40,80 46,76 46,88" fill="var(--color-world-wood-dark)" />
        <g className="notice-lid">
          <polygon points="14,80 14,75 40,75 40,80" fill="var(--color-world-wood-dark)" />
          <polygon points="14,75 20,71 46,71 40,75" fill="var(--color-world-sand-dark)" />
          <polygon points="40,80 40,75 46,71 46,76" fill="var(--color-world-soil-dark)" />
          <rect x="24" y="76" width="6" height="4" fill="var(--color-world-sun)" />
        </g>
        <rect x="24" y="80" width="6" height="4" fill="var(--color-world-sun-deep)" />
      </Notice>

      {/* The bench. Back leg first, so the top lands on it; front legs after,
          so they stand in front of the face they carry. */}
      <rect x="73" y="78" width="3" height="13" fill="var(--color-world-soil-dark)" />
      <polygon points="50,80 50,84 78,84 78,80" fill="var(--color-world-wood)" />
      <polygon points="50,80 56,76 84,76 78,80" fill="var(--color-world-sand-dark)" />
      <polygon points="78,84 78,80 84,76 84,80" fill="var(--color-world-wood-dark)" />
      <rect x="52" y="84" width="4" height="10" fill="var(--color-world-soil-dark)" />
      <rect x="71" y="84" width="4" height="10" fill="var(--color-world-soil-dark)" />

      {/* The kit box on it, drawn to the same three-face rule so the bench has
          something on it that reads as a thing rather than as a smudge. */}
      <polygon points="58,76 58,69 70,69 70,76" fill="var(--color-world-wood)" />
      <polygon points="58,69 61,67 73,67 70,69" fill="var(--color-world-sand-dark)" />
      <polygon points="70,76 70,69 73,67 73,74" fill="var(--color-world-wood-dark)" />
      <rect x="60" y="71" width="8" height="2" fill="var(--color-world-sun)" />

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
