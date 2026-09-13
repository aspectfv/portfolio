/**
 * Faceted props, drawn flat but shaded like the diorama.
 *
 * Each object shows two or three planes at different values: a lit face, a
 * shaded face, and sometimes a ground plane. That is what makes low-poly read
 * as low-poly. A one-tone silhouette, however good the outline, reads as an
 * icon instead, which is why the first pass of band scenery did not land.
 *
 * Drawn on a square viewBox and rendered at a fixed size, never stretched. The
 * ridge silhouettes span the viewport with `preserveAspectRatio="none"` and
 * would distort anything with a recognisable shape.
 */

export type PropName = 'rock' | 'bush' | 'crate' | 'mushroom' | 'conifer' | 'crystal' | 'stump'

const props: Record<PropName, React.ReactNode> = {
  rock: (
    <>
      <polygon points="4,30 12,14 22,10 30,22 26,30" fill="var(--color-world-stone)" />
      <polygon points="22,10 30,22 26,30 20,20" fill="var(--color-world-stone-dark)" />
    </>
  ),
  bush: (
    <>
      <polygon points="3,30 9,16 17,12 25,17 30,30" fill="var(--color-world-grass)" />
      <polygon points="17,12 25,17 30,30 19,30" fill="var(--color-world-grass-dark)" />
      <polygon points="9,16 17,12 14,20 6,22" fill="var(--color-world-grass-light)" />
    </>
  ),
  crate: (
    <>
      <polygon points="6,14 16,9 28,14 18,19" fill="var(--color-world-wood)" />
      <polygon points="6,14 18,19 18,30 6,25" fill="var(--color-world-wood-dark)" />
      <polygon points="18,19 28,14 28,25 18,30" fill="var(--color-world-soil)" />
    </>
  ),
  mushroom: (
    <>
      <polygon points="15,30 15,20 20,20 20,30" fill="var(--color-world-wood)" />
      <polygon points="5,20 17,8 30,20" fill="var(--color-ember-strong)" />
      <polygon points="17,8 30,20 21,20" fill="var(--color-world-sun-deep)" />
    </>
  ),
  conifer: (
    <>
      <polygon points="15,30 15,24 20,24 20,30" fill="var(--color-world-soil-dark)" />
      <polygon points="4,25 17,3 30,25" fill="var(--color-world-grass-dark)" />
      <polygon points="17,3 30,25 19,25" fill="var(--color-world-grass)" />
    </>
  ),
  crystal: (
    <>
      <polygon points="10,30 8,15 17,4 24,15 22,30" fill="var(--color-world-water)" />
      <polygon points="17,4 24,15 22,30 17,22" fill="var(--color-world-sky)" />
    </>
  ),
  stump: (
    <>
      <polygon points="8,30 8,18 16,14 24,18 24,30" fill="var(--color-world-soil-dark)" />
      <polygon points="8,18 16,14 24,18 16,22" fill="var(--color-world-wood)" />
    </>
  ),
}

export function Prop2D({
  name,
  className = '',
  style,
}: {
  name: PropName
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <svg viewBox="0 0 34 32" className={className} style={style} role="presentation">
      {props[name]}
    </svg>
  )
}
