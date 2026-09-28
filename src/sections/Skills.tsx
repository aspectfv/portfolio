import { ChipGrid } from '@/components/Chip'
import { Icon, type IconName } from '@/components/Icon'
import { Panel } from '@/components/Panel'
import { Section } from '@/components/Section'
import { Strip } from '@/scene/Strip'
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
 * The items are drawn on a grid of slots rather than wrapped in flow, because
 * a grid of cells is what an inventory screen looks like and this is the one
 * section whose entire subject is the kit. Same cell as the stack lists
 * elsewhere; only the arrangement differs.
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
                className="grid gap-2 py-3 first:pt-0 last:pb-0 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-start sm:gap-6 md:py-4"
              >
                <dt className="font-display flex items-center gap-2 font-semibold">
                  {glyph && <Icon name={glyph} className="size-5 shrink-0" />}
                  {group.label}
                </dt>
                <dd>
                  <ChipGrid items={group.items} label={group.label} />
                </dd>
              </div>
            )
          })}
        </dl>
      </Panel>
      {/* The camp runs the full width under the kit board, both edges bleeding,
          standing on the sand of the band itself. Beside the board it took the
          width the chips need. */}
      <Strip
        scene="skills"
        reaction="lid"
        className="-mx-6 mt-10 h-[200px] md:mt-14 md:h-[340px] md:-mx-[calc((100vw-min(100vw,var(--container-content)))/2+1.5rem)]"
      />
    </Section>
  )
}
