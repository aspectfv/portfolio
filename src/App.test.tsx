import { render, screen, within } from '@testing-library/react'
import App from '@/App'
import { profile, sections } from '@/content/profile'
import { projects } from '@/content/projects'
import { skillGroups } from '@/content/skills'
import { education, experience } from '@/content/experience'

beforeEach(() => {
  render(<App />)
})

describe('page structure', () => {
  it('has exactly one h1, and it is the name', () => {
    const headings = screen.getAllByRole('heading', { level: 1 })
    expect(headings).toHaveLength(1)
    expect(headings[0]).toHaveTextContent(profile.name)
  })

  it('starts with a skip link so keyboard users can bypass the nav', () => {
    const skip = screen.getByRole('link', { name: /skip to content/i })
    expect(skip).toHaveAttribute('href', '#main')
  })

  it('renders every section the nav links to', () => {
    for (const section of sections) {
      expect(document.getElementById(section.id), section.id).not.toBeNull()
    }
  })

  it('labels each section by its heading', () => {
    for (const section of sections) {
      const element = document.getElementById(section.id)
      expect(element?.getAttribute('aria-labelledby')).toBe(`${section.id}-heading`)
      expect(document.getElementById(`${section.id}-heading`)).not.toBeNull()
    }
  })
})

describe('recruiter actions', () => {
  it('offers the résumé as a download', () => {
    const links = screen.getAllByRole('link', { name: /resume/i })
    expect(links.length).toBeGreaterThan(0)
    for (const link of links) {
      expect(link).toHaveAttribute('href', profile.links.resume.href)
      expect(link).toHaveAttribute('download')
    }
  })

  it('links GitHub and LinkedIn safely in a new tab', () => {
    for (const href of [profile.links.github.href, profile.links.linkedin.href]) {
      const anchors = [...document.querySelectorAll<HTMLAnchorElement>(`a[href="${href}"]`)]
      expect(anchors.length, href).toBeGreaterThan(0)
      for (const anchor of anchors) {
        expect(anchor.rel).toContain('noopener')
        expect(anchor.target).toBe('_blank')
      }
    }
  })

  it('exposes the email as both text and a mailto', () => {
    expect(screen.getAllByText(profile.email).length).toBeGreaterThan(0)
    expect(document.querySelector(`a[href="mailto:${profile.email}"]`)).not.toBeNull()
  })

  it('renders no anchor pointing at an empty or hash-only href', () => {
    for (const anchor of document.querySelectorAll<HTMLAnchorElement>('a')) {
      expect(anchor.getAttribute('href')).toBeTruthy()
      expect(anchor.getAttribute('href')).not.toBe('#')
    }
  })
})

describe('content coverage', () => {
  it('renders every project', () => {
    const region = document.getElementById('projects')!
    for (const project of projects) {
      expect(
        within(region).getByRole('heading', { name: project.name }),
        project.id,
      ).toBeInTheDocument()
    }
  })

  it('states "Private repository" rather than linking a project with no public repo', () => {
    const region = document.getElementById('projects')!
    const privateCount = projects.filter((project) => project.links.length === 0).length
    expect(within(region).getAllByText(/private repository/i)).toHaveLength(privateCount)
  })

  it('renders every skill group and item', () => {
    const region = document.getElementById('skills')!
    for (const group of skillGroups) {
      expect(within(region).getByRole('list', { name: group.label })).toBeInTheDocument()
      for (const item of group.items) {
        expect(within(region).getAllByText(item).length, item).toBeGreaterThan(0)
      }
    }
  })

  it('renders every experience and education entry', () => {
    const region = document.getElementById('experience')!
    for (const entry of experience) {
      expect(within(region).getByText(entry.company)).toBeInTheDocument()
    }
    for (const entry of education) {
      expect(within(region).getByText(entry.institution)).toBeInTheDocument()
    }
  })

  it('renders every about paragraph', () => {
    const region = document.getElementById('about')!
    for (const paragraph of profile.about) {
      expect(within(region).getByText(paragraph)).toBeInTheDocument()
    }
  })
})
