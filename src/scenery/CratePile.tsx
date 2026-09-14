import { Prop2D } from './Prop2D'
import { SceneryLayer } from './SceneryLayer'

/**
 * A supply cache below the inventory.
 *
 * The one place on the page where crates belong: Skills is framed as an
 * inventory, so the objects stacked under it are the containers that idea
 * implies. Scattering them across open wilderness, which an earlier pass did,
 * read as props dropped at random rather than as a place.
 */
export function CratePile() {
  return (
    <SceneryLayer className="pointer-events-none flex items-end gap-1">
      <Prop2D name="rock" className="w-6 md:w-8" />
      <Prop2D name="crate" className="w-9 md:w-12" />
      <Prop2D name="crate" className="w-7 md:w-9" />
      <Prop2D name="crystal" className="ambient ambient-bob w-5 md:w-6" />
    </SceneryLayer>
  )
}
