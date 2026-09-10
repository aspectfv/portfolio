import { paletteFor } from '@/components/placeholderPalette'
import type { ProjectImage } from '@/content/types'

/**
 * A project without a capture gets a low-poly placeholder in the world palette —
 * never a stretched logo, a stock image, or a screenshot of source code.
 *
 * The placeholder is composed from positioned layers rather than one scaled SVG,
 * so it reads correctly in both the card's 16:9 panel and the flagship's tall
 * column. A single viewBox would crop one of the two badly.
 *
 * `fill` deliberately applies to the placeholder only. A real capture keeps its
 * 16:9 ratio everywhere, because object-cover in a tall column would crop the
 * sides off a gameplay screenshot.
 */
export function ProjectVisual({
  image,
  seed,
  fill = false,
}: {
  image?: ProjectImage
  seed: string
  fill?: boolean
}) {
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

  const palette = paletteFor(seed)

  return (
    <div
      aria-hidden="true"
      className={`border-hairline relative w-full overflow-hidden rounded-md border ${
        fill ? 'h-full min-h-64' : 'aspect-video'
      }`}
      style={{ backgroundColor: palette.sky }}
    >
      <div
        className="absolute top-[14%] right-[12%] aspect-square w-[13%] rounded-full"
        style={{ backgroundColor: palette.sun }}
      />
      <svg
        className="absolute inset-x-0 bottom-0 h-[58%] w-full"
        viewBox="0 0 160 60"
        preserveAspectRatio="none"
      >
        <polygon points="0,60 44,10 88,60" fill={palette.ridge} />
        <polygon points="44,10 88,60 66,60" fill="rgb(0 0 0 / 0.12)" />
        <polygon points="78,60 118,24 158,60" fill={palette.ridgeFar} />
        <polygon points="118,24 158,60 138,60" fill="rgb(0 0 0 / 0.1)" />
      </svg>
    </div>
  )
}
