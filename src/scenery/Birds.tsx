import { ambientActors } from './ambient'
import { SceneryLayer } from './SceneryLayer'

/**
 * A few birds crossing the sky band, well above the content.
 *
 * Slower than the clouds and smaller than anything else in the world, which is
 * the whole idea: the thing that makes a page feel alive is several quiet
 * actors rather than one loud one, and this is the quietest available.
 *
 * A full-bleed backdrop, so like the clouds it is bounded relative to its own
 * width rather than in pixels. Drawn as two flat planes per bird, because a
 * stroked curve would be the only line in a world built from filled polygons.
 */
export function Birds() {
  return (
    <SceneryLayer className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 overflow-hidden">
      <svg
        viewBox="0 0 1440 240"
        preserveAspectRatio="xMidYMin slice"
        className="ambient ambient-drift h-full w-full"
        style={{ animationDuration: ambientActors.birds.duration }}
      >
        <g fill="var(--color-ink-muted)" opacity="0.4">
          <polygon points="340,54 352,46 358,52" />
          <polygon points="358,52 370,46 382,54" />
          <polygon points="404,78 414,72 419,77" />
          <polygon points="419,77 429,72 439,78" />
          <polygon points="1108,40 1120,32 1126,38" />
          <polygon points="1126,38 1138,32 1150,40" />
        </g>
      </svg>
    </SceneryLayer>
  )
}
