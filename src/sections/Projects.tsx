import { FeaturedProject } from '@/components/FeaturedProject'
import { SceneryProp } from '@/scenery/SceneryProp'
import { Workshop } from '@/scenery/props/Workshop'
import { ProjectCard } from '@/components/ProjectCard'
import { Section } from '@/components/Section'
import { sections } from '@/content/profile'
import { additionalProjects, featuredProject } from '@/content/projects'

const meta = sections.find((section) => section.id === 'projects')!

export function Projects() {
  return (
    <Section
      id={meta.id}
      eyebrow={meta.eyebrow}
      heading={meta.heading}
      nextBiome="sand"
      ridge="dunes"
    >
      {featuredProject && <FeaturedProject project={featuredProject} />}

      {/* The workshop is a cell of the card grid rather than a row beneath it.
          An odd number of cards leaves a hole in the last row, and a prop
          standing in it costs no height at all; an even number simply puts it
          on a row of its own, which is where it would have gone anyway. */}
      <div data-stagger="" className="grid gap-6 md:grid-cols-2">
        {additionalProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        <SceneryProp
          viewBox="0 0 140 120"
          size="w-36 md:w-56"
          className="flex items-center justify-center"
        >
          <Workshop />
        </SceneryProp>
      </div>
    </Section>
  )
}
