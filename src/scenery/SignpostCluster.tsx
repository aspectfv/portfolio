import { SceneryLayer } from './SceneryLayer'

/**
 * A quest signpost standing at the foot of the projects section.
 *
 * Projects is the highest-priority section in the product brief, and the only
 * one where a flourish draws attention to the content rather than away from it.
 * Wordless on purpose: lettering here would be a second, unreadable copy of a
 * heading that already exists, and the scenery layer may not carry information.
 *
 * It rhymes with the signpost on the island and the signpost glyph in the
 * interface, which is what makes the three read as one world rather than three
 * decorations.
 */
export function SignpostCluster() {
  return (
    <SceneryLayer className="pointer-events-none mt-10 flex justify-end pr-2 md:pr-10">
      <svg viewBox="0 0 200 120" className="h-24 w-36 md:h-32 md:w-48">
        <g className="ambient ambient-sway" style={{ transformOrigin: '104px 112px' }}>
          <rect x="98" y="34" width="10" height="78" fill="var(--color-world-soil)" />
          <polygon points="108,42 168,48 178,58 168,68 108,62" fill="var(--color-world-wood)" />
          <polygon points="98,70 44,76 34,86 44,96 98,90" fill="var(--color-world-wood)" />
          <polygon points="108,42 168,48 178,58 108,52" fill="var(--color-world-soil)" />
        </g>
        <ellipse cx="104" cy="114" rx="34" ry="5" fill="var(--color-edge)" opacity="0.18" />
        <polygon points="150,114 164,102 180,114" fill="var(--color-world-grass-dark)" />
        <polygon points="24,114 38,100 52,114" fill="var(--color-world-grass-dark)" />
      </svg>
    </SceneryLayer>
  )
}
