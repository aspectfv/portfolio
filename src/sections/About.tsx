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
 * The prose sits on the meadow at reading measure. Beside it, the numbers sit
 * at the top of the column and the trailhead stands at its foot.
 *
 * The strip bleeds to the viewport's right edge on desktop and follows the
 * prose at full width on a phone. Either way its bottom edge is the band's
 * floor, so the trailhead stands where the meadow meets the next band. It
 * sits in the flow, so it cannot overlap the text at a width nobody tested.
 * The right margin is the distance from the content column to the edge of
 * the page; the document clips horizontal overflow, so the bleed can never
 * hand the page a scrollbar.
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
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-12">
        <div>
          {lede && <p className="text-lede prose-measure font-medium">{lede}</p>}
          <div className="prose-measure text-ink-muted mt-6 space-y-5">
            {rest.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>
        </div>
        {/* The numbers head the right column and the trailhead stands under
            them on the band's floor, so the column beside the prose is used
            top to bottom rather than only at its foot. */}
        <div className="flex flex-col gap-8">
          {/* The one frame in a section that otherwise carries none. The prose
              stays open on the band; the numbers are a different kind of object
              and a sheet is what they are. */}
          <Panel className="max-w-sm">
            <StatBlock stats={stats} label="Portfolio at a glance" />
          </Panel>
          <Strip
            scene="about"
            reaction="wave"
            className="-mx-6 -mb-(--spacing-section) h-[220px] md:mx-0 md:mt-auto md:h-[300px] md:-mr-[calc((100vw-min(100vw,var(--container-content)))/2+1.5rem)]"
          />
        </div>
      </div>
    </Section>
  )
}
