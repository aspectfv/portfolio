import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { FeaturedProject } from '@/components/FeaturedProject'
import { ProjectCard } from '@/components/ProjectCard'
import { Projects } from '@/sections/Projects'
import { additionalProjects, featuredProject, projects } from '@/content/projects'
import type { Project } from '@/content/types'

const flagship = featuredProject!

describe('flagship selection', () => {
  it('features whichever project carries the flag', () => {
    render(<Projects />)
    const featuredArticle = screen.getByText('Featured Project').closest('article')!
    expect(within(featuredArticle).getByRole('heading', { name: flagship.name })).toBeVisible()
  })

  // Rendering every project through the flagship layout proves the component
  // reads the flag rather than knowing a project id — which is what makes
  // re-flagshipping a one-line data edit.
  it.each(projects.map((project) => [project.id, project] as const))(
    'renders %s through the flagship layout without special-casing',
    (_id, project) => {
      const { unmount } = render(<FeaturedProject project={project} />)
      expect(screen.getByRole('heading', { name: project.name })).toBeVisible()
      expect(screen.getByText(project.tagline)).toBeVisible()
      expect(screen.getByText(project.role)).toBeVisible()
      unmount()
    },
  )

  it('renders every non-flagship project as a card, and none of them twice', () => {
    render(<Projects />)
    for (const project of additionalProjects) {
      expect(screen.getAllByRole('heading', { name: project.name })).toHaveLength(1)
    }
    expect(screen.getAllByRole('article')).toHaveLength(projects.length)
  })
})

describe('project cards', () => {
  // Parameterised over the real data so appending a project is covered the
  // moment it is added, with no test edit.
  it.each(projects.map((project) => [project.id, project] as const))(
    '%s renders every field it declares',
    (_id, project) => {
      const { unmount } = render(<ProjectCard project={project} />)
      expect(screen.getByRole('heading', { name: project.name })).toBeVisible()
      expect(screen.getByText(project.tagline)).toBeVisible()
      expect(screen.getByText(project.summary)).toBeVisible()
      expect(screen.getByRole('list', { name: `${project.name} stack` })).toBeVisible()
      for (const tech of project.stack) {
        expect(screen.getByText(tech)).toBeVisible()
      }
      unmount()
    },
  )

  it('shows a status pill only while a project is in progress', () => {
    for (const project of projects) {
      const { unmount } = render(<ProjectCard project={project} />)
      const pill = screen.queryByText(/in progress/i)
      if (project.status === 'in-progress') expect(pill).toBeVisible()
      else expect(pill).toBeNull()
      unmount()
    }
  })
})

describe('optional-field fallbacks', () => {
  const base = projects[0]!

  it('states "Private repository" instead of rendering a dead anchor', () => {
    render(<ProjectCard project={{ ...base, links: [] }} />)
    expect(screen.getByText(/private repository/i)).toBeVisible()
    expect(screen.queryByRole('link')).toBeNull()
  })

  it('links out safely when a public repo exists', () => {
    const withLink: Project = {
      ...base,
      links: [{ kind: 'repo', url: 'https://github.com/aspectfv/example' }],
    }
    render(<ProjectCard project={withLink} />)
    const link = screen.getByRole('link', { name: /view code/i })
    expect(link).toHaveAttribute('href', 'https://github.com/aspectfv/example')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noopener'))
    expect(screen.queryByText(/private repository/i)).toBeNull()
  })

  it('renders a decorative placeholder when a project has no capture', () => {
    // exactOptionalPropertyTypes: the key must be absent, not set to undefined.
    const { image: _image, ...withoutImage } = base
    const { container } = render(<ProjectCard project={withoutImage} />)
    expect(screen.queryByRole('img')).toBeNull()
    // Hidden from assistive tech: it carries no information.
    expect(container.querySelector('[aria-hidden="true"] svg')).not.toBeNull()
  })

  it('renders the real image, with its alt text, when one exists', () => {
    const withImage: Project = {
      ...base,
      image: { src: '/images/example.webp', alt: 'The example project dashboard' },
    }
    render(<ProjectCard project={withImage} />)
    const image = screen.getByRole('img', { name: 'The example project dashboard' })
    expect(image).toHaveAttribute('src', '/images/example.webp')
  })

  it('renders no expansion affordance when a project has no detail', () => {
    const { detail: _detail, ...withoutDetail } = base
    render(<ProjectCard project={withoutDetail} />)
    expect(screen.queryByRole('button', { name: /read more/i })).toBeNull()
  })
})

describe('detail disclosure', () => {
  it('is collapsed initially and wired to the panel it controls', () => {
    render(<ProjectCard project={withDetail()} />)
    const button = screen.getByRole('button', { name: /read more/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    const panelId = button.getAttribute('aria-controls')!
    expect(document.getElementById(panelId)).toHaveAttribute('hidden')
  })

  it('opens and closes by keyboard alone, keeping focus on the trigger', async () => {
    const user = userEvent.setup()
    render(<ProjectCard project={withDetail()} />)
    const button = screen.getByRole('button', { name: /read more/i })

    await user.tab()
    // Tab order reaches the trigger; the exact index depends on the links above it.
    button.focus()
    expect(button).toHaveFocus()

    await user.keyboard('{Enter}')
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(button).toHaveFocus()
    expect(screen.getByText(withDetail().detail!.decision)).toBeVisible()

    await user.keyboard(' ')
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(button).toHaveFocus()
  })

  it('reveals all four reading depths when opened', async () => {
    const user = userEvent.setup()
    render(<ProjectCard project={withDetail()} />)
    await user.click(screen.getByRole('button', { name: /read more/i }))
    const detail = withDetail().detail!
    for (const text of [detail.problem, detail.built, detail.decision, detail.result]) {
      expect(screen.getByText(text)).toBeVisible()
    }
  })

  function withDetail(): Project {
    return projects.find((project) => project.detail)!
  }
})
