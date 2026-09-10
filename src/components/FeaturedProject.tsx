import { ChipList } from '@/components/Chip'
import { Panel } from '@/components/Panel'
import { ProjectDetail } from '@/components/ProjectDetail'
import { ProjectLinks } from '@/components/ProjectLinks'
import { ProjectVisual } from '@/components/ProjectVisual'
import { StatusPill } from '@/components/StatusPill'
import type { Project } from '@/content/types'

/**
 * The flagship, drawn as a quest card: the project name rides the ribbon, the
 * status is a stamped badge, and the stack sits in slots. This component never
 * names a project, so promoting a different one stays a single data edit.
 */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="mb-10 md:mb-12">
      <Panel title={project.name} icon="flag" tone="ember" className="overflow-hidden">
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
              <span className="font-display text-eyebrow text-ember-ink font-medium tracking-[0.08em] uppercase">
                Featured Project
              </span>
              <StatusPill status={project.status} />
            </div>

            <p className="text-lede mt-3 font-medium">{project.tagline}</p>
            <p className="prose-measure text-ink-muted mt-4">{project.summary}</p>

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
              <ChipList items={project.stack} label={`${project.name} stack`} />
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
      </Panel>
    </article>
  )
}
