import { ChipList } from '@/components/Chip'
import { SectionShard } from '@/scenery/SectionShard'
import { CachePiece } from '@/scenery/setPieces'
import { Panel, type PanelTone } from '@/components/Panel'
import { Section } from '@/components/Section'
import type { IconName } from '@/components/Icon'
import { sections } from '@/content/profile'
import { skillGroups } from '@/content/skills'

const meta = sections.find((section) => section.id === 'skills')!

/**
 * Which glyph and tone represent a group is presentation, so the mapping lives
 * here rather than in the content registry. Groups without an entry still
 * render; they just get the default tone and no glyph.
 */
const groupGlyphs: Record<string, IconName> = {
  languages: 'terminal',
  backend: 'hammer',
  frontend: 'gem',
  data: 'chest',
  ai: 'spark',
  infrastructure: 'signpost',
}

const groupTones: Record<string, PanelTone> = {
  languages: 'ember',
  backend: 'leaf',
  frontend: 'tide',
  data: 'ember',
  ai: 'leaf',
  infrastructure: 'tide',
}

/**
 * An inventory grid: each group is a framed case with a titled bar, and each
 * skill is a slot inside it. Never a logo wall, never a percentage bar; a
 * proficiency meter would be a number nobody can verify.
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
      <div data-stagger="" className="grid items-start gap-6 sm:grid-cols-2">
        {skillGroups.map((group) => (
          <Panel
            key={group.id}
            title={group.label}
            tone={groupTones[group.id] ?? 'ember'}
            {...(groupGlyphs[group.id] ? { icon: groupGlyphs[group.id] } : {})}
          >
            <ChipList items={group.items} label={group.label} />
          </Panel>
        ))}
      </div>
      <SectionShard side="left" phase="-0.6s">
        <CachePiece />
      </SectionShard>
    </Section>
  )
}
