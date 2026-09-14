import { SceneryLayer } from './SceneryLayer'
import { Shard } from './Shard'

/**
 * Places a shard beside a section's content.
 *
 * In the flow rather than absolutely positioned, so it can never overlap text
 * at a width nobody tested. Desktop pushes it into the empty margin on one
 * side; mobile centres it, which keeps the identity on the narrow layout
 * instead of deleting it, per the mobile rule in the product brief.
 */
export function SectionShard({
  side = 'right',
  phase = '0s',
  children,
}: {
  side?: 'left' | 'right'
  /** A distinct value per section; see Shard. */
  phase?: string
  children?: React.ReactNode
}) {
  return (
    <SceneryLayer
      className={`pointer-events-none mt-10 flex justify-center ${
        side === 'right' ? 'md:justify-end' : 'md:justify-start'
      }`}
    >
      <Shard className="w-40 md:w-56" phase={phase}>
        {children}
      </Shard>
    </SceneryLayer>
  )
}
