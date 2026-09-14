import { Panel } from '@/components/Panel'
import { SectionShard } from '@/scenery/SectionShard'
import { CampPiece } from '@/scenery/setPieces'
import { Section } from '@/components/Section'
import { StatBlock } from '@/components/StatBlock'
import { profile, sections } from '@/content/profile'
import { experience } from '@/content/experience'
import { projects } from '@/content/projects'
import { skillGroups } from '@/content/skills'

const meta = sections.find((section) => section.id === 'about')!

/**
 * Derived from the content registries rather than typed in, so they cannot
 * drift from what the page actually shows. Every value is a real count; there
 * is no level, score, or XP anywhere on this site, because a fake stat is a
 * lie wearing a game costume.
 */
const languageCount = skillGroups.find((group) => group.id === 'languages')?.items.length ?? 0

const stats = [
  { label: 'Projects', value: String(projects.length) },
  { label: 'Languages', value: String(languageCount) },
  { label: 'Roles', value: String(experience.length) },
]

export function About() {
  return (
    <Section
      id={meta.id}
      eyebrow={meta.eyebrow}
      heading={meta.heading}
      biome="meadow"
      nextBiome="canvas"
      ridge="treeline"
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start">
        <Panel title="Field notes" icon="scroll" tone="leaf">
          <div className="prose-measure space-y-5">
            {profile.about.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </Panel>

        <Panel title="At a glance" icon="gem" tone="tide">
          <StatBlock stats={stats} label="Portfolio at a glance" />
        </Panel>
      </div>
      <SectionShard side="left" phase="-1.2s">
        <CampPiece />
      </SectionShard>
    </Section>
  )
}
