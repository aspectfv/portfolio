import { SceneryLayer } from './SceneryLayer'
import { Shard } from './Shard'

/**
 * Places a shard beside a section's content.
 *
 * In the flow rather than absolutely positioned, so it can never overlap text
 * at a width nobody tested. Desktop pushes it into the empty margin on one
 * side; mobile centres it, which keeps the identity on the narrow layout
 * instead of deleting it, per the mobile rule in the product brief.
 *
 * The bob is the same slow idle the hero island has, so every floating thing on
 * the page moves the same way.
 */
export function SectionShard({
  side = 'right',
  children,
}: {
  side?: 'left' | 'right'
  children?: React.ReactNode
}) {
  return (
    <SceneryLayer
      className={`pointer-events-none mt-10 flex justify-center ${
        side === 'right' ? 'md:justify-end' : 'md:justify-start'
      }`}
    >
      <Shard className="ambient ambient-bob w-40 md:w-56">{children}</Shard>
    </SceneryLayer>
  )
}
