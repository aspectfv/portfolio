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
 * which is not a hierarchy a visitor can see at a glance. The capture runs off
 * the right of the content column and past the edge of the page; the section
 * clips the overflow, so the bleed can never hand the page a horizontal
 * scrollbar.
 *
 * The bleed alone was not enough. Everything beside it was set as a plain
 * document — a heading, three paragraphs, two bare term-and-value pairs, a row
 * of chips and an underlined word — on a page whose every other surface is
 * built like an object. The three things that fixes it: the facts are framed
 * cells like the ones on a card, the capture hangs in a mount with a solid
 * edge instead of floating on the band, and the routes out are raised controls
 * gathered into one bar rather than a link stranded mid-column.
 *
 * This component never names a project, so promoting a different one stays a
 * single data edit.
 */

/** Corners of the capture's mount, on the frame rather than on the image. */
const rivets = [
  'top-[5px] left-[5px]',
  'top-[5px] right-[5px]',
  'bottom-[5px] left-[5px]',
  'bottom-[5px] right-[5px]',
]

export function FeaturedProject({ project }: { project: Project }) {
  return (
    <article className="mb-12 md:mb-16">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center md:gap-12">
        <div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="font-display text-eyebrow text-ember-ink inline-flex items-center gap-2 font-medium tracking-[0.08em] uppercase">
              <span
                data-ornament=""
                aria-hidden="true"
                className="bg-ember-ink size-1.5 rotate-45"
              />
              Featured Project
            </span>
            <StatusPill status={project.status} />
          </div>

          <h3 className="text-title font-display mt-3 font-semibold">{project.name}</h3>
          <p className="text-lede mt-3 font-medium">{project.tagline}</p>
          <p className="prose-measure text-ink-muted mt-4">{project.summary}</p>

          {/* The same framed cells a card uses for the same two facts. Bare
              term-and-value pairs read as a spec sheet pasted into a page that
              is otherwise built out of objects. */}
          <dl className="text-meta mt-6 grid max-w-md grid-cols-2 gap-3">
            {[
              { term: 'Role', value: project.role },
              { term: 'Category', value: project.category },
            ].map((field) => (
              <div
                key={field.term}
                className="bg-canvas border-edge rounded-sm border-2 border-b-(length:--edge-sm) px-3 py-2"
              >
                <dt className="font-display text-eyebrow text-ink-muted font-medium tracking-[0.08em] uppercase">
                  {field.term}
                </dt>
                <dd className="mt-0.5 font-medium">{field.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-5">
            <ChipList items={project.stack} label={`${project.name} stack`} />
          </div>
        </div>

        {/* The bleed. Negative margin rather than a viewport-width trick, so the
            distance is the same whether or not a scrollbar is present. */}
        <div className="md:-mr-10 lg:-mr-24 2xl:-mr-44">
          {/* The mount. The capture is the one photograph in a world of drawn
              objects, and hanging it in a frame with a solid bottom edge is
              what stops it reading as a stray rectangle dropped on the band. */}
          <div className="bg-surface border-edge relative rounded-lg border-2 border-b-(length:--edge-lg) p-2 md:p-3">
            <ProjectVisual
              {...(project.image ? { image: project.image } : {})}
              seed={project.id}
              fill
            />
            {rivets.map((position) => (
              <span
                key={position}
                data-ornament=""
                aria-hidden="true"
                className={`bg-edge pointer-events-none absolute size-1.5 rounded-[2px] ${position}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* One bar for every route out of the flagship, the disclosure included.
          The trigger sat a full screen below the link it belongs with, because
          the panel it controls has to follow it in the DOM and the panel wants
          the whole width. `contents` on the disclosure puts the button in this
          row and leaves the panel spanning the bar. */}
      <div className="border-hairline mt-8 flex flex-wrap items-center gap-3 border-t pt-6">
        <ProjectLinks project={project} variant="button" />
        {project.detail && (
          <ProjectDetail detail={project.detail} projectName={project.name} className="contents" />
        )}
      </div>
    </article>
  )
}
