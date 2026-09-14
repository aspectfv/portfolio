import { FeaturedProject } from '@/components/FeaturedProject'
import { SectionShard } from '@/scenery/SectionShard'
import { WaypostPiece } from '@/scenery/setPieces'
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

      {/* The island is a cell of the card grid rather than a row beneath it.
          An odd number of cards leaves a hole in the last row, and an island
          standing in it costs no height at all; an even number simply puts it
          on a row of its own, which is where it would have gone anyway. */}
      <div data-stagger="" className="grid gap-6 md:grid-cols-2">
        {additionalProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        <SectionShard
          shape="spire"
          phase="-3.4s"
          size="w-28 md:w-44"
          className="flex items-center justify-center"
        >
          <WaypostPiece />
        </SectionShard>
      </div>
    </Section>
  )
}
