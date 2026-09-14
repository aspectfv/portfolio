import { Prop2D } from './Prop2D'
import { SceneryLayer } from './SceneryLayer'

/**
 * A signpost planted where the projects band ends.
 *
 * Wordless on purpose. Lettering here would be a second, unreadable copy of a
 * heading that already exists, and scenery may not carry information. The shape
 * alone is the cue, and it rhymes with the signpost on the island and the
 * signpost glyph in the interface, so all three read as one world.
 */
export function SignpostCluster() {
  return (
    <SceneryLayer className="pointer-events-none flex items-end gap-1">
      <svg viewBox="0 0 54 46" className="ambient ambient-sway w-12 md:w-16">
        <rect x="24" y="10" width="6" height="34" fill="var(--color-world-soil)" />
        <polygon points="30,13 50,16 54,22 50,28 30,25" fill="var(--color-world-wood)" />
        <polygon points="30,13 50,16 54,22 30,19" fill="var(--color-world-wood-dark)" />
        <polygon points="24,28 6,31 2,36 6,41 24,38" fill="var(--color-world-wood)" />
        <polygon points="24,28 6,31 2,36 24,33" fill="var(--color-world-wood-dark)" />
      </svg>
      <Prop2D name="bush" className="w-6 md:w-8" />
    </SceneryLayer>
  )
}
