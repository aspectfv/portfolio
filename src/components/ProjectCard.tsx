import { ProjectDetail } from '@/components/ProjectDetail'
import { ProjectLinks } from '@/components/ProjectLinks'
import { ProjectVisual } from '@/components/ProjectVisual'
import { StatusPill } from '@/components/StatusPill'
import { ChipList } from '@/components/Chip'
import type { Project } from '@/content/types'

/**
 * A non-flagship project. Carries less visual weight than the flagship but the
 * same completeness; image, tagline, summary, stack, links, and the same
 * detail disclosure. Weight is the difference, not quality.
 *
 * focus-within lifts the card too, so the state is reachable without a pointer;
 * active covers touch, where hover never resolves.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="bg-surface border-hairline border-b-edge flex flex-col rounded-lg border border-b-[3px] p-5 shadow-card transition-[transform,box-shadow] duration-(--dur-base) ease-(--ease-standard) hover:-translate-y-1 hover:shadow-card-lift focus-within:-translate-y-1 focus-within:shadow-card-lift active:-translate-y-0.5">
      <ProjectVisual {...(project.image ? { image: project.image } : {})} seed={project.id} />

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="text-card font-semibold">{project.name}</h3>
        <StatusPill status={project.status} />
      </div>

      <p className="text-meta text-ink-muted mt-1">{project.category}</p>
      <p className="mt-3">{project.tagline}</p>
      <p className="text-ink-muted mt-3">{project.summary}</p>

      <div className="mt-4">
        <ChipList items={project.stack} label={`${project.name} stack`} />
      </div>

      {/* mt-auto pins the actions to the bottom so cards of unequal text length
          still line up across the grid row. */}
      <div className="mt-auto pt-5">
        <ProjectLinks project={project} />
        {project.detail && (
          <div className="mt-4">
            <ProjectDetail detail={project.detail} projectName={project.name} />
          </div>
        )}
      </div>
    </article>
  )
}
