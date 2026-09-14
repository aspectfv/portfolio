import { SceneryLayer } from './SceneryLayer'
import { Shard, type ShardShape } from './Shard'

/**
 * Places an island inside a section's composition.
 *
 * Always in the flow, never absolutely positioned, so it can never overlap text
 * at a width nobody tested. Where it sits is the caller's decision, because the
 * compositions differ: a section with no panel can give an island a column of
 * its own, and one built from panels puts it in the margin below them.
 *
 * Sizes differ per island and are smaller at narrow widths, where height is the
 * scarce resource.
 */
export function SectionShard({
  shape,
  phase = '0s',
  size,
  className = '',
  children,
}: {
  shape: ShardShape
  /** A distinct value per section; see Shard. */
  phase?: string
  size: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <SceneryLayer className={`pointer-events-none ${className}`}>
      <Shard shape={shape} className={size} phase={phase}>
        {children}
      </Shard>
    </SceneryLayer>
  )
}
