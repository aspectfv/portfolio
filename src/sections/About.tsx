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
 * The lede runs at reading measure. The rest of the prose sits beside the
 * numbers, so the row the sheet occupies is a row the prose uses too, and
 * neither floats in a column of its own.
 *
 * The strip runs under the copy and bleeds both edges on desktop, with its
 * bottom edge on the band's floor, so the trailhead stands where the meadow
 * meets the next band. It sits in the flow, so it cannot overlap the text at
 * a width nobody tested. The document clips horizontal overflow, so the bleed
 * can never hand the page a scrollbar.
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
      {lede && <p className="text-lede prose-measure font-medium">{lede}</p>}
      <div className="mt-6 grid gap-8 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:items-start md:gap-12">
        <div className="prose-measure text-ink-muted space-y-5">
          {rest.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
        {/* The one frame in a section that otherwise carries none. The prose
            stays open on the band; the numbers are a different kind of object
            and a sheet is what they are. */}
        <Panel className="max-w-sm">
          <StatBlock stats={stats} label="Portfolio at a glance" />
        </Panel>
      </div>
      {/* The trailhead stands on the band's floor under the copy, both edges
          bleeding, the same way the places in the other sections do. */}
      <Strip
        scene="about"
        reaction="wave"
        className="-mx-6 mt-10 -mb-(--spacing-section) h-[220px] md:mt-6 md:h-[300px] md:-mx-[calc((100vw-min(100vw,var(--container-content)))/2+1.5rem)]"
      />
    </Section>
  )
}
