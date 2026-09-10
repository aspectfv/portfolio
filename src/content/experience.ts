import type { EducationEntry, ExperienceEntry } from './types'

/**
 * Transcribed from docs/CONTENT.md §6–7.
 *
 * Employer work stays high-level by design. Never add processor names, internal
 * service names or counts, cost figures, migration specifics, PCI scope, or
 * screenshots of internal software. If an edit adds detail here, it is wrong by
 * default — the deep technical storytelling belongs to the personal projects.
 */
export const experience: readonly ExperienceEntry[] = [
  {
    id: 'ngnair',
    company: 'NGnair Payments',
    role: 'Software Engineer',
    period: 'Nov 2025 – Present',
    location: 'Remote (Wyoming, USA)',
    summary:
      'Backend engineer on a payments platform built as federated microservices. I own several of the platform’s core services and work across authentication, payment orchestration, and public API security — mostly service boundaries, migrations, and making a system that moves money fail predictably.',
    stack: ['NestJS', 'Fastify', 'GraphQL', 'Next.js', 'PostgreSQL', 'Prisma', 'Docker'],
  },
  {
    id: 'freelance',
    company: 'Independent Clients',
    role: 'Freelance Developer',
    period: 'Mar 2025 – Present',
    location: 'Manila, Philippines',
    summary:
      'Full-stack work for small businesses — a transportation booking platform, an e-commerce platform with separate admin, staff, and customer portals, and the inventory and analytics tooling around them.',
    stack: ['TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'React', 'MongoDB', 'Node.js'],
  },
]

export const education: readonly EducationEntry[] = [
  {
    id: 'dlsu',
    institution: 'De La Salle University',
    qualification: 'BS Computer Science, Major in Software Technology',
    period: 'Aug 2022 – Dec 2026',
    location: 'Manila, Philippines',
    highlights: [
      "Consistent Dean's Lister",
      'Relevant coursework: Software Engineering, Web Application Development, Database Systems, Intelligent Systems',
    ],
  },
]
