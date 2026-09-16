/**
 * The one person in the world, drawn twice: standing by the camp where the
 * trail starts, sitting at the dock where it ends.
 *
 * Twice is the rule rather than an accident of the current layout. A figure on
 * every band is a mascot, and a mascot is the shortest route to the
 * template-with-game-assets look `docs/PRODUCT.md` forbids outright.
 *
 * Drawn in a 20x30 box with the feet on y=30, so a host places it by
 * translating to the ground it should stand on and its scale is fixed by the
 * prop's own coordinate space rather than matched by eye.
 *
 * The tunic is ember because it is the one hue that appears on no ground in the
 * world palette, which is what keeps a 24px figure findable on grass, on timber
 * and on a pale dock.
 */
export function Traveller({ pose }: { pose: 'standing' | 'resting' }) {
  if (pose === 'resting') {
    return (
      <>
        <polygon points="8,30 8,26 19,26 19,30" fill="var(--color-world-soil-dark)" />
        <polygon points="6,26 6,14 13,14 13,26" fill="var(--color-ember)" />
        <polygon points="10,26 10,14 13,14 13,26" fill="var(--color-ember-strong)" />
        <polygon points="6,14 6,7 12,7 12,14" fill="var(--color-world-sand)" />
        <polygon points="9,14 9,7 12,7 12,14" fill="var(--color-world-sand-dark)" />
        <polygon points="3,8 9,3 15,8" fill="var(--color-world-wood)" />
        <polygon points="9,3 15,8 9,8" fill="var(--color-world-wood-dark)" />
      </>
    )
  }

  return (
    <>
      <polygon points="7,30 7,22 9,22 9,30" fill="var(--color-world-soil-dark)" />
      <polygon points="11,30 11,22 13,22 13,30" fill="var(--color-world-soil-dark)" />
      <polygon points="3,20 3,13 6,13 6,20" fill="var(--color-world-soil)" />
      <polygon points="6,22 6,12 14,12 14,22" fill="var(--color-ember)" />
      <polygon points="10,22 10,12 14,12 14,22" fill="var(--color-ember-strong)" />
      <polygon points="7,12 7,5 13,5 13,12" fill="var(--color-world-sand)" />
      <polygon points="10,12 10,5 13,5 13,12" fill="var(--color-world-sand-dark)" />
      <polygon points="4,6 10,1 16,6" fill="var(--color-world-wood)" />
      <polygon points="10,1 16,6 10,6" fill="var(--color-world-wood-dark)" />
    </>
  )
}
