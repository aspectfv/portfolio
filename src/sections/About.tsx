import { CampShard } from '@/scenery/props/CampShard'
import { Motes } from '@/scenery/Motes'
import { SceneryProp } from '@/scenery/SceneryProp'
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

/**
 * No panel. This is the one place on the page that is only a person talking,
 * and a frame around it made it look like another module in a stack of modules.
 * The prose sits on the meadow at reading measure, the island takes the margin
 * beside it, and the numbers are tags underneath rather than a third box.
 */
export function About() {
  const [lede, ...rest] = profile.about

  return (
    <Section
      id={meta.id}
      eyebrow={meta.eyebrow}
      heading={meta.heading}
      headingStyle="open"
      biome="meadow"
      nextBiome="canvas"
      ridge="treeline"
      backdrop={<Motes variant="leaves" />}
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start md:gap-12">
        <div>
          {lede && <p className="text-lede prose-measure font-medium">{lede}</p>}
          <div className="prose-measure text-ink-muted mt-6 space-y-5">
            {rest.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8">
            <StatBlock stats={stats} label="Portfolio at a glance" />
          </div>
        </div>

        <SceneryProp
          viewBox="0 0 120 132"
          size="w-32 md:w-64"
          className="justify-self-center md:justify-self-end md:pt-8"
        >
          <CampShard />
        </SceneryProp>
      </div>
    </Section>
  )
}
