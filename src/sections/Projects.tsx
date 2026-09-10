import { ProjectLinks } from '@/components/ProjectLinks'
import { ProjectVisual } from '@/components/ProjectVisual'
import { Section } from '@/components/Section'
import { StatusPill } from '@/components/StatusPill'
import { TagList } from '@/components/Tag'
import { sections } from '@/content/profile'
import { projects } from '@/content/projects'
import type { Project } from '@/content/types'

const meta = sections.find((section) => section.id === 'projects')!

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-surface border-hairline border-b-edge rounded-lg border border-b-[3px] p-5 shadow-card">
      <ProjectVisual {...(project.image ? { image: project.image } : {})} seed={project.id} />

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="text-card font-semibold">{project.name}</h3>
        <StatusPill status={project.status} />
      </div>

      <p className="text-meta text-ink-muted mt-1">{project.category}</p>
      <p className="mt-3">{project.tagline}</p>
      <p className="text-ink-muted mt-3">{project.summary}</p>

      <div className="mt-4">
        <TagList items={project.stack} label={`${project.name} stack`} />
      </div>

      <div className="mt-4">
        <ProjectLinks project={project} />
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <Section id={meta.id} eyebrow={meta.eyebrow} heading={meta.heading}>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  )
}
