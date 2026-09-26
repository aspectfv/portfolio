import { Panel } from '@/components/Panel'
import { Section } from '@/components/Section'
import { StatBlock } from '@/components/StatBlock'
import { Strip } from '@/scene/Strip'
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
 * The prose sits on the meadow at reading measure, the trailhead stands beside
 * it, and the numbers are tags underneath rather than a third box.
 *
 * The strip bleeds to the viewport's right edge on desktop and stacks above
 * the prose at full width on a phone. It sits in the flow either way, so it
 * cannot overlap the text at a width nobody tested. The right margin is the
 * distance from the content column to the edge of the page; the document
 * clips horizontal overflow, so the bleed can never hand the page a scrollbar.
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
    >
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center md:gap-12">
        <Strip
          scene="about"
          reaction="wave"
          className="-mx-6 h-[200px] md:order-last md:mx-0 md:h-[40vh] md:max-h-[520px] md:min-h-[300px] md:-mr-[calc((100vw-min(100vw,var(--container-content)))/2+1.5rem)]"
        />
        <div>
          {lede && <p className="text-lede prose-measure font-medium">{lede}</p>}
          <div className="prose-measure text-ink-muted mt-6 space-y-5">
            {rest.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
          {/* The one frame in a section that otherwise carries none. The prose
              stays open on the band; the numbers are a different kind of object
              and a sheet is what they are. */}
          <Panel className="mt-8 max-w-sm">
            <StatBlock stats={stats} label="Portfolio at a glance" />
          </Panel>
        </div>
      </div>
    </Section>
  )
}
