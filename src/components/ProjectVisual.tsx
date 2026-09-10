import type { ProjectImage } from '@/content/types'

/**
 * A project without a capture gets a low-poly placeholder in the world palette —
 * never a stretched logo, a stock image, or a screenshot of source code.
 */
export function ProjectVisual({ image, seed }: { image?: ProjectImage; seed: string }) {
  if (image) {
    return (
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        className="border-hairline aspect-video w-full rounded-md border object-cover"
      />
    )
  }

  // Deterministic per project so a card's placeholder never changes between loads.
  const hue = [...seed].reduce((total, character) => total + character.charCodeAt(0), 0) % 4

  const palettes = [
    ['var(--color-world-sky)', 'var(--color-world-grass)'],
    ['var(--color-world-sun)', 'var(--color-world-soil)'],
    ['var(--color-world-water)', 'var(--color-world-stone)'],
    ['var(--color-world-grass-dark)', 'var(--color-world-wood)'],
  ] as const
  const [sky, ground] = palettes[hue]!

  return (
    <div
      aria-hidden="true"
      className="border-hairline aspect-video w-full overflow-hidden rounded-md border"
      style={{ backgroundColor: sky }}
    >
      <svg viewBox="0 0 160 90" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
        <polygon points="0,90 46,52 92,90" fill={ground} />
        <polygon points="46,52 92,90 78,90" fill="rgb(0 0 0 / 0.12)" />
        <polygon points="84,90 118,60 152,90" fill={ground} opacity="0.85" />
        <polygon points="118,60 152,90 138,90" fill="rgb(0 0 0 / 0.1)" />
        <circle cx="132" cy="24" r="10" fill="var(--color-world-sun)" />
      </svg>
    </div>
  )
}
