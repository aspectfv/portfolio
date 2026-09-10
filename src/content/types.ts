/**
 * Content contract between docs/CONTENT.md and the layout.
 *
 * docs/CONTENT.md is authoritative. When the two disagree, this file is wrong.
 * Components render content; they never author it.
 */

export type ProjectStatus = 'in-progress' | 'complete'

export type ProjectLinkKind = 'repo' | 'demo' | 'writeup'

export interface ProjectLink {
  readonly kind: ProjectLinkKind
  readonly url: string
}

export interface ProjectImage {
  readonly src: string
  readonly alt: string
}

/** The 1–2 minute read. Four short paragraphs, in this order. */
export interface ProjectDetail {
  readonly problem: string
  readonly built: string
  readonly decision: string
  readonly result: string
}

export interface Project {
  readonly id: string
  readonly name: string
  /** The 3-second read: one sentence. */
  readonly tagline: string
  /** The 15-second read: purpose, contribution, technologies. */
  readonly summary: string
  readonly category: string
  readonly role: string
  readonly stack: readonly string[]
  readonly status: ProjectStatus
  /** Exactly one project in the array carries `true`. Layout reads the flag. */
  readonly featured: boolean
  /** Absent renders a low-poly placeholder panel — never a stretched or stock image. */
  readonly image?: ProjectImage
  /** Empty renders a plain "Private repository" note — never a dead anchor. */
  readonly links: readonly ProjectLink[]
  /** Absent renders no expansion affordance — an empty expansion is worse than none. */
  readonly detail?: ProjectDetail
}

export interface SkillGroup {
  readonly id: string
  readonly label: string
  readonly items: readonly string[]
}

export interface ExperienceEntry {
  readonly id: string
  readonly company: string
  readonly role: string
  readonly period: string
  readonly location: string
  readonly summary: string
  readonly stack: readonly string[]
}

export interface EducationEntry {
  readonly id: string
  readonly institution: string
  readonly qualification: string
  readonly period: string
  readonly location: string
  readonly highlights: readonly string[]
}

export interface ProfileLink {
  readonly label: string
  readonly href: string
  /** Résumé is served from the site itself, so it is not an external navigation. */
  readonly external: boolean
}

export interface Profile {
  readonly name: string
  readonly fullName: string
  readonly location: string
  readonly email: string
  readonly positioning: string
  readonly personalStatement: string
  readonly about: readonly string[]
  readonly contactStatement: string
  readonly links: {
    readonly github: ProfileLink
    readonly linkedin: ProfileLink
    readonly resume: ProfileLink
  }
}

export interface SectionMeta {
  readonly id: string
  /** Conventional and immediately understandable. Never replaced by game flavor. */
  readonly navLabel: string
  readonly heading: string
  /** Game flavor lives here, beside the label — never instead of it. */
  readonly eyebrow: string
}
