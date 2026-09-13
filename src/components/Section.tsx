import { BandEdge, type Ridge } from '@/scenery/BandEdge'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

/**
 * A page section, drawn as a biome band.
 *
 * Colour here is structural rather than decorative: the first design alternated
 * cream against cream, so every section read the same and the world palette
 * never appeared outside a placeholder SVG. Each band carries a solid bottom
 * edge in its own darker shade, which is the section-scale version of the same
 * depth rule the panels and controls use.
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
  children,
}: {
  id: string
  eyebrow: string
  heading: string
  biome?: Biome
  /** The band below. Set it to grow a ridge down into the next biome. */
  nextBiome?: Biome
  ridge?: Ridge
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`border-b-(length:--edge-lg) ${biomes[biome]}`}
    >
      <Reveal className="mx-auto max-w-content px-6 py-(--spacing-section)">
        <SectionHeading id={id} eyebrow={eyebrow} heading={heading} />
        {children}
      </Reveal>

      {nextBiome && <BandEdge into={nextBiome} ridge={ridge} />}
    </section>
  )
}
