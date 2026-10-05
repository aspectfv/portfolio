import { FeaturedProject } from '@/components/FeaturedProject'
import { ProjectCard } from '@/components/ProjectCard'
import { Section } from '@/components/Section'
import { Strip } from '@/scene/Strip'
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

      {/* No cascade on the grid itself: each card is dealt when it reaches
          the screen, and the right-hand column lands a beat after the left,
          tilted the other way, so a row reads as two cards thrown down. */}
      <div className="grid gap-6 md:grid-cols-2">
        {additionalProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {/* The yard runs the full width under the cards, both edges bleeding:
          this is the one section whose content already fills the column, so
          the place stands on the band's floor below it rather than beside it. */}
      <Strip
        scene="projects"
        reaction="screen"
        className="-mx-6 mt-10 -mb-(--spacing-section) h-[200px] md:mt-14 md:h-[340px] md:-mx-[calc((100vw-min(100vw,var(--container-content)))/2+1.5rem)]"
      />
    </Section>
  )
}
