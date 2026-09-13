import { FeaturedProject } from '@/components/FeaturedProject'
import { ProjectCard } from '@/components/ProjectCard'
import { Section } from '@/components/Section'
import { sections } from '@/content/profile'
import { additionalProjects, featuredProject } from '@/content/projects'

const meta = sections.find((section) => section.id === 'projects')!

export function Projects() {
  return (
    <Section id={meta.id} eyebrow={meta.eyebrow} heading={meta.heading}>
      {featuredProject && <FeaturedProject project={featuredProject} />}

      <div data-stagger="" className="grid gap-6 md:grid-cols-2">
        {additionalProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
