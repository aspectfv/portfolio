import { Eyebrow } from '@/components/Eyebrow'
import { ProjectDetail } from '@/components/ProjectDetail'
import { ProjectLinks } from '@/components/ProjectLinks'
import { ProjectVisual } from '@/components/ProjectVisual'
import { StatusPill } from '@/components/StatusPill'
import { TagList } from '@/components/Tag'
import type { Project } from '@/content/types'

/**
 * The flagship. Rendered for whichever project carries `featured: true` — this
 * component never names a project, so promoting a different one is a single
 * data edit.
 */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="bg-surface border-hairline border-b-edge mb-10 rounded-lg border border-b-[3px] p-6 shadow-card md:mb-12 md:p-8">
      <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-stretch md:gap-10">
        <div className="md:order-2">
          <ProjectVisual
            {...(project.image ? { image: project.image } : {})}
            seed={project.id}
            fill
          />
        </div>

        <div className="md:order-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <Eyebrow>Featured Project</Eyebrow>
            <StatusPill status={project.status} />
          </div>

          <h3 className="text-section mt-3 font-semibold">{project.name}</h3>
          <p className="text-lede text-ink-muted mt-3">{project.tagline}</p>
          <p className="prose-measure mt-4">{project.summary}</p>

          <dl className="text-meta mt-6 grid gap-x-6 gap-y-2 sm:grid-cols-2">
            <div>
              <dt className="text-ink-muted">Role</dt>
              <dd className="font-medium">{project.role}</dd>
            </div>
            <div>
              <dt className="text-ink-muted">Category</dt>
              <dd className="font-medium">{project.category}</dd>
            </div>
          </dl>

          <div className="mt-5">
            <TagList items={project.stack} label={`${project.name} stack`} />
          </div>

          <div className="mt-6">
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>

      {project.detail && (
        <div className="mt-8">
          <ProjectDetail detail={project.detail} projectName={project.name} />
        </div>
      )}
    </article>
  )
}
