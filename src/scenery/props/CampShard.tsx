import { ambientActors } from '../ambient'
import { Notice } from '../Notice'
import { Traveller } from './Traveller'

const idle = ambientActors.campIsland

/**
 * About: a camp on a floating shard, and the only island left in the world.
 *
 * It is kept on purpose. Faceted the same way as the island in the canvas above
 * it — lit cap, shaded rim, dark tapering underside with one lighter face — so
 * the WebGL scene and the flat scenery read as one art direction rather than
 * two, and the two sit close enough together on the page that severing the tie
 * would make the canvas look imported from somewhere else.
 *
 * Its four siblings are gone. Three milestones differentiated five islands by
 * outline, then by palette, then by idle, and the page still read as one
 * sticker repeated, because at the size these render the axis that carries is
 * **what class of object it is**. So Projects, Skills, Experience and Contact
 * now carry a structure, a cluster, a marker and a platform instead. One island
 * is a motif; five were a rut.
 *
 * Geometry and material are fused back together here. Holding them apart was
 * worth it across six islands and is an abstraction over a single caller now.
 */
export function CampShard() {
  return (
    <>
      <g
        className="ambient ambient-float"
        style={
          {
            animationDuration: idle.duration,
            '--bob-range': `${idle.travel}px`,
            '--tilt-range': `${idle.rotation}deg`,
          } as React.CSSProperties
        }
      >
        <polygon points="14,44 60,54 106,44 60,92" fill="var(--color-world-soil-dark)" />
        <polygon points="60,92 106,44 60,54" fill="var(--color-world-soil)" />
        <polygon
          points="12,38 40,48 80,48 108,38 108,44 80,54 40,54 12,44"
          fill="var(--color-world-grass-dark)"
        />
        <polygon points="12,38 40,28 80,28 108,38 80,48 40,48" fill="var(--color-world-grass)" />
        <polygon points="12,38 40,28 62,28 34,44" fill="var(--color-world-grass-light)" />

        {/* Dressing, drawn before the camp so an island's own vegetation never
            crowds the object that says which section it belongs to. */}
        <polygon points="86,40 91,27 96,40" fill="var(--color-world-grass-dark)" />
        <polygon points="91,27 96,40 92,40" fill="var(--color-world-soil-dark)" />

        {/* The camp. A place someone stopped, rather than a place they work. */}
        <polygon points="34,36 46,14 58,36" fill="var(--color-world-wood)" />
        <polygon points="46,14 58,36 50,36" fill="var(--color-world-wood-dark)" />
        <polygon points="46,20 52,36 40,36" fill="var(--color-world-soil-dark)" />
        <rect x="68" y="34" width="4" height="6" fill="var(--color-world-soil-dark)" />
        <g
          className="ambient ambient-sway"
          style={{ animationDuration: ambientActors.campFoliage.duration }}
        >
          <polygon points="62,36 70,16 78,36" fill="var(--color-world-grass-dark)" />
          <polygon points="70,16 78,36 72,36" fill="var(--color-world-grass)" />
        </g>

        {/* Where the trail starts. Scaled to stand a head under the tent ridge,
            which is what fixes a person's size against everything else here.

            This band's focal object: point at the camp and they wave back. The
            figure is about twenty pixels wide on a phone, so the hit area is
            drawn around them rather than taken from their own outline. */}
        <Notice reaction="wave" hit={[14, 14, 26, 32]}>
          <g transform="translate(19.4,19.4) scale(0.62)">
            <Traveller pose="standing" waves />
          </g>
        </Notice>
      </g>

      {/* A piece adrift below, on its own slower rhythm. A single object hangs
          in space; two of them at different speeds read as floating. */}
      <g className="ambient ambient-float" style={{ animationDuration: '13s, 17s' }}>
        <polygon points="82,106 100,102 104,112 88,118" fill="var(--color-world-soil)" />
        <polygon points="88,118 104,112 94,122" fill="var(--color-world-soil-dark)" />
      </g>
    </>
  )
}
