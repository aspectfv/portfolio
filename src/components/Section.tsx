import { BandEdge, type Ridge } from '@/scenery/BandEdge'
import { Reveal } from './Reveal'
import { SectionHeading, type HeadingStyle } from './SectionHeading'

/**
 * A page section, drawn as a biome band.
 *
 * Colour here is structural rather than decorative: the first design alternated
 * cream against cream, so every section read the same and the world palette
 * never appeared outside a placeholder SVG. Each band carries a solid bottom
 * edge in its own darker shade, which is the section-scale version of the same
 * depth rule the panels and controls use.
 *
 * What the band does NOT decide is the composition inside it. Each section
 * arranges its own content; a shared container that laid every section out the
 * same way is what made the page read as a stack of identical rectangles.
 *
 * Plain view flattens every band back to canvas through token overrides, so
 * this component needs no branch for it.
 */

export type Biome = 'canvas' | 'sky' | 'meadow' | 'sand' | 'dusk'

const biomes: Record<Biome, string> = {
  canvas: 'bg-canvas border-edge',
  sky: 'bg-sky border-sky-edge',
  meadow: 'bg-meadow border-meadow-edge',
  sand: 'bg-sand border-sand-edge',
  dusk: 'bg-dusk border-dusk-edge',
}

export function Section({
  id,
  eyebrow,
  heading,
  biome = 'canvas',
  nextBiome,
  ridge,
  dark = false,
  headingStyle,
  backdrop,
  children,
}: {
  id: string
  eyebrow: string
  heading: string
  biome?: Biome
  /** The band below. Set it to grow a ridge down into the next biome. */
  nextBiome?: Biome
  ridge?: Ridge
  /**
   * Light text on dark. Implemented as scoped token overrides in the
   * stylesheet, so nothing inside needs a variant: the attribute is the whole
   * mechanism.
   */
  dark?: boolean
  headingStyle?: HeadingStyle
  /**
   * Scenery painted behind the content, inside the band. A sibling of the
   * content rather than a child of it, so it can position against the section
   * without sitting inside the reading column.
   */
  backdrop?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      {...(dark ? { 'data-band': 'dark' } : {})}
      className={`relative isolate border-b-(length:--edge-lg) ${biomes[biome]}`}
    >
      {backdrop}

      <Reveal className="mx-auto max-w-content px-6 py-(--spacing-section)">
        <SectionHeading
          id={id}
          eyebrow={eyebrow}
          heading={heading}
          {...(headingStyle ? { variant: headingStyle } : {})}
        />
        {children}
      </Reveal>

      {nextBiome && <BandEdge into={nextBiome} ridge={ridge} />}
    </section>
  )
}
