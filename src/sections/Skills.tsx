import { ChipList } from '@/components/Chip'
import { Icon, type IconName } from '@/components/Icon'
import { SectionShard } from '@/scenery/SectionShard'
import { CachePiece } from '@/scenery/setPieces'
import { Panel } from '@/components/Panel'
import { Section } from '@/components/Section'
import { sections } from '@/content/profile'
import { skillGroups } from '@/content/skills'

const meta = sections.find((section) => section.id === 'skills')!

/**
 * Which glyph represents a group is presentation, so the mapping lives here
 * rather than in the content registry. Groups without an entry still render;
 * they just get no glyph.
 */
const groupGlyphs: Record<string, IconName> = {
  languages: 'terminal',
  backend: 'hammer',
  frontend: 'gem',
  data: 'chest',
  ai: 'spark',
  infrastructure: 'signpost',
}

/**
 * One kit board rather than six cases.
 *
 * Six panels, each with a ribbon, its own padding and its own border, cost more
 * vertical space than the words inside them and made the longest section on the
 * page out of the shortest content. A single board with a row per group says
 * the same thing in a third of the height, and the row is a real term and
 * definition pair, so the grouping survives the styling.
 *
 * Never a logo wall, never a percentage bar; a proficiency meter would be a
 * number nobody can verify.
 */
export function Skills() {
  return (
    <Section
      id={meta.id}
      eyebrow={meta.eyebrow}
      heading={meta.heading}
      biome="sand"
      nextBiome="dusk"
      ridge="peaks"
    >
      <Panel title="Kit" icon="chest" tone="tide">
        <dl className="divide-hairline divide-y-2">
          {skillGroups.map((group) => {
            const glyph = groupGlyphs[group.id]
            return (
              <div
                key={group.id}
                className="grid gap-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-start sm:gap-6"
              >
                <dt className="font-display flex items-center gap-2 font-semibold">
                  {glyph && <Icon name={glyph} className="size-5 shrink-0" />}
                  {group.label}
                </dt>
                <dd>
                  <ChipList items={group.items} label={group.label} />
                </dd>
              </div>
            )
          })}
        </dl>
      </Panel>

      <SectionShard
        shape="terrace"
        phase="-0.6s"
        size="w-32 md:w-48"
        className="mt-6 flex justify-center md:mt-10 md:justify-start"
      >
        <CachePiece />
      </SectionShard>
    </Section>
  )
}
