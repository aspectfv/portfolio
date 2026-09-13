import { Prop2D } from './Prop2D'
import { SceneryLayer } from './SceneryLayer'

/**
 * A small camp beside the About panel: a tent, a stump to sit on, and a bush.
 *
 * About is the personal half of the page, and a camp is where a person stops
 * rather than where they work. Built from the shared faceted props plus a tent
 * drawn here, so it belongs to the same world as the island without adding a
 * one-off vocabulary.
 */
export function Camp() {
  return (
    <SceneryLayer className="pointer-events-none mt-8 flex items-end justify-start gap-3 pl-1">
      <svg viewBox="0 0 60 40" className="ambient ambient-bob w-20 md:w-24">
        <polygon points="6,36 30,6 54,36" fill="var(--color-world-wood)" />
        <polygon points="30,6 54,36 36,36" fill="var(--color-world-wood-dark)" />
        <polygon points="30,14 40,36 20,36" fill="var(--color-world-soil-dark)" />
      </svg>
      <Prop2D name="stump" className="w-7 md:w-8" />
      <Prop2D name="bush" className="w-8 md:w-10" />
      <Prop2D name="mushroom" className="w-5 md:w-6" />
    </SceneryLayer>
  )
}
