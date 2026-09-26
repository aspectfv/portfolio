/**
 * Hand-drawn glyphs in the same faceted, flat-shaded language as the 3D
 * diorama: straight edges, two or three flat planes per object, no strokes, no
 * gradients. An icon library would look like an icon library pasted onto a
 * theme; these look like they came out of the same world.
 *
 * Every glyph is decorative. They are marked `data-ornament` so the whole
 * decorative layer stays identifiable, and `aria-hidden` so they never reach
 * the accessibility tree. A glyph must never be the only carrier of a meaning.
 */

export type IconName =
  | 'gem'
  | 'leaf'
  | 'hammer'
  | 'scroll'
  | 'signpost'
  | 'chest'
  | 'flag'
  | 'spark'
  | 'terminal'
  | 'pin'

/* Fills come from the world palette rather than the interface palette: these
   are objects in the scene, not UI chrome. */
const glyphs: Record<IconName, React.ReactNode> = {
  gem: (
    <>
      <polygon points="6,3 18,3 22,9 2,9" fill="var(--color-world-water)" />
      <polygon points="2,9 22,9 12,21" fill="var(--color-world-sky)" />
      <polygon points="2,9 12,9 12,21" fill="var(--color-world-water)" />
    </>
  ),
  leaf: (
    <>
      <polygon points="12,2 20,11 12,22 4,11" fill="var(--color-world-grass)" />
      <polygon points="12,2 20,11 12,22" fill="var(--color-world-grass-dark)" />
    </>
  ),
  hammer: (
    <>
      <polygon points="2,4 14,6 14,12 2,10" fill="var(--color-world-stone)" />
      <polygon points="2,4 14,6 14,9 2,7" fill="#7b8492" />
      <polygon points="7,10 11,10.5 10,22 6,22" fill="var(--color-world-wood)" />
    </>
  ),
  scroll: (
    <>
      <polygon points="4,4 20,4 20,21 4,21" fill="#f4e6c8" />
      <polygon points="4,4 20,4 20,8 4,8" fill="var(--color-world-wood)" />
      <polygon points="7.5,11.5 16.5,11.5 16.5,13.5 7.5,13.5" fill="var(--color-world-soil)" />
      <polygon points="7.5,16 14,16 14,18 7.5,18" fill="var(--color-world-soil)" />
    </>
  ),
  signpost: (
    <>
      <polygon points="11,7 13.5,7 13.5,22 11,22" fill="var(--color-world-soil)" />
      <polygon points="2,3 16,3 19.5,6.5 16,10 2,10" fill="var(--color-world-wood)" />
      <polygon points="22,12 8,12 4.5,15.5 8,19 22,19" fill="#a86f38" />
    </>
  ),
  chest: (
    <>
      <polygon points="3,9 12,4 21,9 21,12 3,12" fill="var(--color-world-wood)" />
      <polygon points="3,12 21,12 21,21 3,21" fill="#a86f38" />
      <polygon points="10,10 14,10 14,16 10,16" fill="var(--color-world-sun)" />
    </>
  ),
  flag: (
    <>
      <polygon points="4,2 6.5,2 6.5,22 4,22" fill="var(--color-world-wood)" />
      <polygon points="6.5,3 21,7.5 6.5,12" fill="var(--color-world-sun)" />
      <polygon points="6.5,7.5 21,7.5 6.5,12" fill="#dc9a2b" />
    </>
  ),
  spark: (
    <>
      <polygon
        points="12,1 14.6,9.4 23,12 14.6,14.6 12,23 9.4,14.6 1,12 9.4,9.4"
        fill="var(--color-world-sun)"
      />
      <polygon points="12,1 14.6,9.4 12,12 9.4,9.4" fill="#f7cb76" />
    </>
  ),
  terminal: (
    <>
      <polygon points="2,4 22,4 22,20 2,20" fill="#2c3a4e" />
      <polygon points="2,4 22,4 22,8 2,8" fill="var(--color-world-stone)" />
      <polygon points="6,10 11,14 6,18 6,15.5 8,14 6,12.5" fill="var(--color-world-grass)" />
      <polygon points="13,16 18,16 18,18 13,18" fill="var(--color-world-sky)" />
    </>
  ),
  pin: (
    <>
      <polygon points="12,2 20,10 12,22 4,10" fill="var(--color-ember)" />
      <polygon points="12,2 20,10 12,22" fill="#c6421c" />
      <polygon points="12,6.5 15.5,10 12,13.5 8.5,10" fill="#fbf7f0" />
    </>
  ),
}

export function Icon({ name, className = 'size-6' }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
      data-ornament=""
    >
      {glyphs[name]}
    </svg>
  )
}
