import { Prop2D } from './Prop2D'
import { SceneryLayer } from './SceneryLayer'

/**
 * Crates and a crystal stacked at the end of the inventory.
 *
 * Skills is already the densest block on the page, so this sits below the grid
 * rather than inside it: the section gains the world without the grid gaining
 * noise. The objects are the same ones the band edges scatter, which is what
 * stops each new piece of scenery from reading as its own idea.
 */
export function CratePile() {
  return (
    <SceneryLayer className="pointer-events-none mt-10 flex items-end justify-end gap-2 pr-1 md:pr-6">
      <Prop2D name="rock" className="w-7 md:w-9" />
      <Prop2D name="crate" className="w-10 md:w-14" />
      <Prop2D name="crate" className="w-8 md:w-10" />
      <Prop2D name="crystal" className="ambient ambient-bob w-6 md:w-8" />
    </SceneryLayer>
  )
}
