import { SceneryLayer } from './SceneryLayer'

/**
 * Faceted clouds drifting across a sky band.
 *
 * The drift is deliberately slower than anything a visitor would track: at
 * roughly thirty seconds a pass it reads as the sky being alive rather than as
 * something moving. Amplitude is capped well inside the 8px the design
 * vocabulary allows for ambient transforms.
 *
 * Positioned behind content and clipped to the band, so it can never interfere
 * with a pointer or push layout.
 */
export function Clouds() {
  return (
    <SceneryLayer className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-56 overflow-hidden">
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="xMidYMin slice"
        className="ambient ambient-drift h-full w-full"
      >
        <g fill="var(--color-surface)" opacity="0.75">
          <polygon points="120,70 190,42 268,58 300,84 104,84" />
          <polygon points="150,58 206,36 252,52 268,70 132,70" />
        </g>
        <g fill="var(--color-surface)" opacity="0.55">
          <polygon points="880,44 946,20 1014,36 1044,60 862,60" />
        </g>
        <g fill="var(--color-surface)" opacity="0.45">
          <polygon points="560,128 614,108 672,122 698,142 538,142" />
        </g>
      </svg>
    </SceneryLayer>
  )
}
