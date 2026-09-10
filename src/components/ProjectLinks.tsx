import type { Project } from '@/content/types'

const labels: Record<string, string> = {
  repo: 'View code',
  demo: 'Live demo',
  writeup: 'Read more',
}

/**
 * A project with no public link renders a plain note. Never an anchor — a 404
 * from a portfolio is worse than no link at all.
 */
export function ProjectLinks({ project }: { project: Project }) {
  if (project.links.length === 0) {
    return (
      <p className="text-meta text-ink-muted">
        Private repository
        <span className="sr-only"> — no public link is available for {project.name}</span>
      </p>
    )
  }

  return (
    <ul className="flex flex-wrap gap-4">
      {project.links.map((link) => (
        <li key={link.url}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ember-ink text-meta font-medium underline underline-offset-4"
          >
            {labels[link.kind] ?? 'Open'}
            <span aria-hidden="true"> ↗</span>
            <span className="sr-only"> {project.name} (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}
