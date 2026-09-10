import { describe, expect, it } from 'vitest'
import { additionalProjects, featuredProject, projects } from './projects'
import { profile, sections } from './profile'
import { skillGroups } from './skills'
import { education, experience } from './experience'

describe('projects', () => {
  it('has exactly one flagship', () => {
    expect(projects.filter((project) => project.featured)).toHaveLength(1)
  })

  it('exposes the flagship and the remainder without overlap', () => {
    expect(featuredProject).toBeDefined()
    expect(additionalProjects).toHaveLength(projects.length - 1)
    expect(additionalProjects).not.toContain(featuredProject)
  })

  it('has unique ids', () => {
    const ids = projects.map((project) => project.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('only renders absolute links, so no relative path can 404', () => {
    for (const project of projects) {
      for (const link of project.links) {
        expect(link.url, `${project.id} → ${link.kind}`).toMatch(/^https:\/\//)
      }
    }
  })

  it.each(projects.map((project) => [project.id, project] as const))(
    '%s carries all three reading depths',
    (_id, project) => {
      expect(project.name.trim()).not.toBe('')
      expect(project.tagline.trim()).not.toBe('')
      expect(project.summary.trim()).not.toBe('')
      expect(project.category.trim()).not.toBe('')
      expect(project.role.trim()).not.toBe('')
      expect(project.stack.length).toBeGreaterThan(0)

      // detail is optional, but a partial detail would render a half-empty expansion.
      if (project.detail) {
        expect(project.detail.problem.trim()).not.toBe('')
        expect(project.detail.built.trim()).not.toBe('')
        expect(project.detail.decision.trim()).not.toBe('')
        expect(project.detail.result.trim()).not.toBe('')
      }
    },
  )

  it('gives every image meaningful alt text', () => {
    for (const project of projects) {
      if (project.image) {
        expect(project.image.alt.trim().length, project.id).toBeGreaterThan(10)
        expect(project.image.alt.toLowerCase()).not.toContain('screenshot of')
      }
    }
  })
})

describe('typography of the copy', () => {
  const everyString = [
    profile.personalStatement,
    profile.positioning,
    profile.contactStatement,
    ...profile.about,
    ...sections.flatMap((s) => [s.heading, s.eyebrow, s.navLabel]),
    ...projects.flatMap((p) => [
      p.name,
      p.tagline,
      p.summary,
      p.role,
      p.category,
      ...(p.detail ? Object.values(p.detail) : []),
    ]),
    ...experience.flatMap((e) => [e.summary, e.role, e.company]),
    ...education.flatMap((e) => [e.qualification, ...e.highlights]),
    ...skillGroups.flatMap((g) => [g.label, ...g.items]),
  ]

  it('uses no em dashes', () => {
    for (const text of everyString) {
      expect(text, text.slice(0, 60)).not.toContain('\u2014')
    }
  })

  it('uses typographic apostrophes, not straight ones', () => {
    for (const text of everyString) {
      expect(text, text.slice(0, 60)).not.toMatch(/[A-Za-z]'[A-Za-z]/)
    }
  })

  it('uses an ellipsis character rather than three dots', () => {
    for (const text of everyString) {
      expect(text, text.slice(0, 60)).not.toContain('...')
    }
  })
})

describe('profile', () => {
  it('has the contact routes a recruiter needs', () => {
    expect(profile.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)
    expect(profile.links.github.href).toMatch(/^https:\/\/github\.com\//)
    expect(profile.links.linkedin.href).toMatch(/^https:\/\/www\.linkedin\.com\/in\//)
    expect(profile.links.resume.href).toMatch(/^\/resume\/.+\.pdf$/)
  })

  it('has an about section short enough to actually be read', () => {
    expect(profile.about.length).toBeGreaterThanOrEqual(1)
    expect(profile.about.length).toBeLessThanOrEqual(3)
    for (const paragraph of profile.about) {
      expect(paragraph.trim()).not.toBe('')
    }
  })

  it('keeps navigation labels conventional and flavor in the eyebrow', () => {
    const navLabels = sections.map((section) => section.navLabel)
    expect(navLabels).toEqual(['About', 'Projects', 'Skills', 'Experience', 'Contact'])
    for (const section of sections) {
      expect(section.eyebrow.trim()).not.toBe('')
      expect(section.heading.trim()).not.toBe('')
    }
  })

  it('has a section entry for every anchor the nav links to', () => {
    const ids = sections.map((section) => section.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('skills', () => {
  it('groups every skill; a flat list would be the logo wall the brief forbids', () => {
    expect(skillGroups.length).toBeGreaterThanOrEqual(4)
    for (const group of skillGroups) {
      expect(group.items.length).toBeGreaterThan(0)
      expect(group.label.trim()).not.toBe('')
    }
  })

  it('keeps every group small enough to scan', () => {
    // A group that grows without bound turns the section back into the logo
    // wall the design brief rules out.
    for (const group of skillGroups) {
      expect(group.items.length, group.label).toBeLessThanOrEqual(10)
    }
  })
})

describe('experience', () => {
  it('describes each role without exposing employer internals', () => {
    for (const entry of experience) {
      expect(entry.summary.trim()).not.toBe('')
      expect(entry.period).toMatch(/\d{4}/)
      expect(entry.stack.length).toBeGreaterThan(0)
    }
  })

  // Employer work stays a credibility signal, not a case study. These two
  // shapes are what detail creep actually looks like: the summary grows, and
  // hard numbers appear. Both fail here rather than on the live site.
  it('keeps each employer summary high-level', () => {
    for (const entry of experience) {
      expect(entry.summary.length, entry.company).toBeLessThanOrEqual(400)
    }
  })

  it('publishes no metrics for employer work', () => {
    for (const entry of experience) {
      expect(entry.summary, entry.company).not.toMatch(/\d+\s*%|\d{2,}\+/)
    }
  })

  it('records education with real dates', () => {
    expect(education.length).toBeGreaterThan(0)
    for (const entry of education) {
      expect(entry.period).toMatch(/\d{4}/)
      expect(entry.highlights.length).toBeGreaterThan(0)
    }
  })
})
