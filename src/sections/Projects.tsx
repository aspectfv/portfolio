import { FeaturedProject } from '@/components/FeaturedProject'
import { ProjectCard } from '@/components/ProjectCard'
import { Section } from '@/components/Section'
import { Strip } from '@/scene/Strip'
import { sections } from '@/content/profile'
import { useReveal } from '@/hooks/useReveal'
import { additionalProjects, featuredProject } from '@/content/projects'

const meta = sections.find((section) => section.id === 'projects')!

export function Projects() {
  // The grid carries its own reveal trigger. Released by the section's observer
  // it would cascade a full viewport below the fold, where nobody sees it.
  const grid = useReveal<HTMLDivElement>()

  return (
    <Section
      id={meta.id}
      eyebrow={meta.eyebrow}
      heading={meta.heading}
      nextBiome="sand"
      ridge="dunes"
    >
      {featuredProject && <FeaturedProject project={featuredProject} />}

      <div ref={grid} data-stagger="" className="grid gap-6 md:grid-cols-2">
        {additionalProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      {/* The yard runs the full width under the cards, both edges bleeding:
          this is the one section whose content already fills the column, so
          the place sits below it rather than beside it. */}
      <Strip
        scene="projects"
        reaction="screen"
        className="-mx-6 mt-10 h-[200px] md:mt-14 md:h-[300px] md:-mx-[calc((100vw-min(100vw,var(--container-content)))/2+1.5rem)]"
      />
    </Section>
  )
}
