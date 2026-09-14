import { ChipList } from '@/components/Chip'
import { ProjectDetail } from '@/components/ProjectDetail'
import { ProjectLinks } from '@/components/ProjectLinks'
import { ProjectVisual } from '@/components/ProjectVisual'
import { StatusPill } from '@/components/StatusPill'
import type { Project } from '@/content/types'

/**
 * The flagship, and the one thing on the page allowed to break the container.
 *
 * Inside a panel it was the same rectangle as everything else, only larger,
 * which is not a hierarchy a visitor can see at a glance. Now the capture runs
 * off the right of the content column and past the edge of the page; the
 * section clips the overflow, so the bleed can never hand the page a horizontal
 * scrollbar.
 *
 * This component never names a project, so promoting a different one stays a
 * single data edit.
 */
export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="mb-12 md:mb-16">
      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center md:gap-12">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-display text-eyebrow text-ember-ink font-medium tracking-[0.08em] uppercase">
              Featured Project
            </span>
            <StatusPill status={project.status} />
          </div>

          <h3 className="text-title font-display mt-2 font-semibold">{project.name}</h3>
          <p className="text-lede mt-2 font-medium">{project.tagline}</p>
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

        {/* The bleed. Negative margin rather than a viewport-width trick, so the
            distance is the same whether or not a scrollbar is present. */}
        <div className="md:-mr-10 lg:-mr-24 2xl:-mr-44">
          <ProjectVisual
            {...(project.image ? { image: project.image } : {})}
            seed={project.id}
            fill
          />
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
