import type { SkillGroup } from './types'

/**
 * Transcribed from docs/CONTENT.md §5. Grouped, never a logo wall, never
 * percentage or progress bars.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: ['TypeScript', 'Java', 'Python', 'C / C++', 'JavaScript', 'SQL', 'Bash'],
  },
  {
    id: 'backend',
    label: 'Backend',
    items: [
      'NestJS',
      'Spring Boot',
      'Express',
      'Fastify',
      'Node.js',
      'GraphQL',
      'gRPC',
      'REST / OpenAPI',
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['React', 'Next.js', 'React Three Fiber', 'Tailwind CSS', 'Vite', 'Zustand'],
  },
  {
    id: 'data',
    label: 'Databases & Data',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
  },
  {
    id: 'ai',
    label: 'AI',
    items: [
      'LLM tool calling',
      'Vercel AI SDK',
      'Prompt & evaluation pipelines',
      'Human-in-the-loop validation',
    ],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure & Tooling',
    items: [
      'Docker',
      'Git',
      'GitHub Actions',
      'Vercel',
      'Render',
      'Supabase',
      'Jest',
      'Vitest',
      'Playwright',
      'Linux',
    ],
  },
]
