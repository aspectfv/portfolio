/**
 * The one person in the world, drawn twice: standing by the camp where the
 * trail starts, sitting at the dock where it ends.
 *
 * Twice is the rule rather than an accident of the current layout. A figure on
 * every band is a mascot, and a mascot is the shortest route to the
 * template-with-game-assets look `docs/PRODUCT.md` forbids outright.
 *
 * Standing is drawn in a 20x30 box with the feet on y=30, so a host places it
 * by translating to the ground it should stand on and its scale is fixed by the
 * prop's own coordinate space rather than matched by eye. Resting puts the
 * surface being sat on at y=26 and hangs the lower legs below it.
 *
 * The tunic is ember because it is the one hue that appears on no ground in the
 * world palette, which is what keeps a 24px figure findable on grass, on timber
 * and on a pale dock.
 */
export function Traveller({
  pose,
  waves = false,
}: {
  pose: 'standing' | 'resting'
  /**
   * Marks the near arm as a Notice target, so it lifts when the camp is
   * pointed at or tapped. Standing only: the seated pose is on the sky band,
   * where the lantern is the focal object. One per band.
   */
  waves?: boolean
}) {
  if (pose === 'resting') {
    // Seated, so the convention changes: y=26 is the surface being sat on, and
    // the lower legs hang below it. A host places this by putting 26 on the
    // deck rather than by putting the feet on the ground.
    return (
      <>
        <polygon points="15,26 15,35 19,35 19,26" fill="var(--color-world-soil-dark)" />
        <polygon points="15,35 21,35 21,37 15,37" fill="var(--color-world-soil-dark)" />
        <polygon points="6,21 20,21 20,26 6,26" fill="var(--color-world-soil)" />
        <polygon points="4,26 4,12 14,12 14,26" fill="var(--color-ember)" />
        <polygon points="10,26 10,12 14,12 14,26" fill="var(--color-ember-strong)" />
        <polygon points="2,24 2,14 5,14 5,24" fill="var(--color-ember-strong)" />
        <polygon points="5,12 5,5 12,5 12,12" fill="var(--color-world-sand)" />
        <polygon points="9,12 9,5 12,5 12,12" fill="var(--color-world-sand-dark)" />
        <polygon points="1,6 8,0 15,6" fill="var(--color-world-wood)" />
        <polygon points="8,0 15,6 8,6" fill="var(--color-world-wood-dark)" />
      </>
    )
  }

  return (
    <>
      <polygon points="7,30 7,22 9,22 9,30" fill="var(--color-world-soil-dark)" />
      <polygon points="11,30 11,22 13,22 13,30" fill="var(--color-world-soil-dark)" />
      <g className={waves ? 'notice-wave' : undefined}>
        <polygon points="3,20 3,13 6,13 6,20" fill="var(--color-world-soil)" />
      </g>
      <polygon points="6,22 6,12 14,12 14,22" fill="var(--color-ember)" />
      <polygon points="10,22 10,12 14,12 14,22" fill="var(--color-ember-strong)" />
      <polygon points="7,12 7,5 13,5 13,12" fill="var(--color-world-sand)" />
      <polygon points="10,12 10,5 13,5 13,12" fill="var(--color-world-sand-dark)" />
      <polygon points="4,6 10,1 16,6" fill="var(--color-world-wood)" />
      <polygon points="10,1 16,6 10,6" fill="var(--color-world-wood-dark)" />
    </>
  )
}
