import { Prop2D } from './Prop2D'
import { SceneryLayer } from './SceneryLayer'

/**
 * A camp pitched at the treeline: a tent, a stump to sit on, a bush.
 *
 * About is the personal half of the page, and a camp is where a person stops
 * rather than where they work. Everything shares one baseline and is sized
 * against the props scattered along the same ridge, so the tent reads as a tent
 * standing in the same world rather than as a large triangle nearby.
 */
export function Camp() {
  return (
    <SceneryLayer className="pointer-events-none flex items-end gap-1.5">
      <Prop2D name="bush" className="w-6 md:w-8" />
      <svg viewBox="0 0 60 42" className="w-14 md:w-20">
        <polygon points="4,40 30,6 44,40" fill="var(--color-world-wood)" />
        <polygon points="30,6 44,40 34,40" fill="var(--color-world-wood-dark)" />
        <polygon points="30,15 38,40 22,40" fill="var(--color-world-soil-dark)" />
        <polygon points="44,40 52,22 56,40" fill="var(--color-world-soil)" />
      </svg>
      <Prop2D name="stump" className="w-6 md:w-8" />
    </SceneryLayer>
  )
}
