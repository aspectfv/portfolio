import { ChipList } from '@/components/Chip'
import { Panel } from '@/components/Panel'
import { ProjectDetail } from '@/components/ProjectDetail'
import { ProjectLinks } from '@/components/ProjectLinks'
import { ProjectVisual } from '@/components/ProjectVisual'
import { StatusPill } from '@/components/StatusPill'
import type { Project } from '@/content/types'

/**
 * A non-flagship quest card. Carries less visual weight than the flagship but
 * the same completeness: image, tagline, summary, stack, links, and the same
 * detail disclosure. Weight is the difference, not quality.
 *
 * focus-within lifts the card too, so the state is reachable without a pointer;
 * active covers touch, where hover never resolves.
 */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="h-full">
      <Panel
        title={project.name}
        icon="gem"
        tone="leaf"
        className="h-full overflow-hidden transition-[translate] duration-(--dur-base) ease-(--ease-standard) hover:-translate-y-0.5 focus-within:-translate-y-0.5"
      >
        <ProjectVisual {...(project.image ? { image: project.image } : {})} seed={project.id} />

        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <p className="text-meta text-ink-muted">{project.category}</p>
          <StatusPill status={project.status} />
        </div>

        <p className="mt-2 font-medium">{project.tagline}</p>
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
      </Panel>
    </article>
  )
}
