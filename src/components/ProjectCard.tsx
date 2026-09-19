import { ChipList } from '@/components/Chip'
import { Panel } from '@/components/Panel'
import { ProjectDetail } from '@/components/ProjectDetail'
import { ProjectLinks } from '@/components/ProjectLinks'
import { ProjectVisual } from '@/components/ProjectVisual'
import { StatusPill } from '@/components/StatusPill'
import type { Project } from '@/content/types'

/**
 * A non-flagship quest card. Carries less visual weight than the flagship but
 * the same completeness: image, tagline, summary, category, role, stack, links,
 * and the same detail disclosure. Weight is the difference, not quality — the
 * flagship already breaks the container, which is a hierarchy a visitor can see
 * without these cards having to be made thinner.
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
        className="h-full overflow-hidden transition-[translate] duration-(--dur-base) ease-(--ease-standard) hover:-translate-y-1 focus-within:-translate-y-1"
      >
        <ProjectVisual {...(project.image ? { image: project.image } : {})} seed={project.id} />

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <StatusPill status={project.status} />
        </div>

        <p className="mt-2 font-medium">{project.tagline}</p>
        <p className="text-ink-muted mt-3">{project.summary}</p>

        {/* Rank furniture, and every word of it is already typed content: a
            project's own category and role. Nothing here is a level, a score or
            a rating — a fake stat is a lie in a game costume, and this is the
            same rule the stat block follows, stated as a drawing. */}
        <dl className="text-meta mt-3 grid grid-cols-2 gap-2">
          {[
            { term: 'Category', value: project.category },
            { term: 'Role', value: project.role },
          ].map((field) => (
            <div
              key={field.term}
              className="bg-canvas border-edge rounded-sm border-2 border-b-(length:--edge-sm) px-2.5 py-1"
            >
              <dt className="font-display text-eyebrow text-ink-muted font-medium tracking-[0.08em] uppercase">
                {field.term}
              </dt>
              <dd className="font-medium">{field.value}</dd>
            </div>
          ))}
        </dl>

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
