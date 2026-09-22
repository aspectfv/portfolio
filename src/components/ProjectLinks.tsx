import type { Project } from '@/content/types'

const labels: Record<string, string> = {
  repo: 'View code',
  demo: 'Live demo',
  writeup: 'Read more',
}

/**
 * A project with no public link renders a plain note. Never an anchor; a 404
 * from a portfolio is worse than no link at all.
 *
 * Two weights of the same list. A card's links are text: the card is one of
 * several and its own heading already carries the weight. The flagship's are
 * raised controls, because a featured project whose only route out is an
 * underlined word is asking a recruiter to hunt for the thing it exists to
 * show them.
 */
export function ProjectLinks({
  project,
  variant = 'text',
}: {
  project: Project
  variant?: 'text' | 'button'
}) {
  if (project.links.length === 0) {
    return (
      <p className="text-meta text-ink-muted">
        Private repository
        <span className="sr-only">. No public link is available for {project.name}.</span>
      </p>
    )
  }

  const style =
    variant === 'button'
      ? 'press bg-surface border-ink-muted hover:bg-sunken text-meta inline-flex min-h-11 items-center gap-2 rounded-sm border-2 border-b-(length:--edge-md) px-4 font-medium'
      : 'text-ember-ink text-meta font-medium underline underline-offset-4'

  return (
    <ul className={`flex flex-wrap ${variant === 'button' ? 'gap-3' : 'gap-4'}`}>
      {project.links.map((link) => (
        <li key={link.url}>
          <a href={link.url} target="_blank" rel="noopener noreferrer" className={style}>
            {labels[link.kind] ?? 'Open'}
            <span aria-hidden="true">{variant === 'button' ? '↗' : ' ↗'}</span>
            <span className="sr-only"> {project.name} (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
