import type { SkillGroup } from './types'

/**
 * Transcribed from docs/CONTENT.md §5. Grouped, never a logo wall, never
 * percentage or progress bars.
 */
export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'languages',
    label: 'Languages',
    items: ['TypeScript', 'Java', 'Go', 'Python', 'C / C++', 'JavaScript', 'SQL', 'Bash'],
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
      'Apollo Federation',
      'gRPC / Protocol Buffers',
      'REST / OpenAPI',
      'Zod',
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    items: [
      'React',
      'Next.js',
      'React Three Fiber',
      'Tailwind CSS',
      'Vite',
      'Zustand',
      'HTML / CSS',
    ],
  },
  {
    id: 'data',
    label: 'Databases & Data',
    items: [
      'PostgreSQL',
      'MySQL',
      'MongoDB',
      'Redis',
      'Prisma',
      'Mongoose',
      'SQLAlchemy',
      'ETL pipelines',
      'Star-schema modeling',
    ],
  },
  {
    id: 'data-science',
    label: 'Data Science',
    items: [
      'Pandas',
      'NumPy',
      'scikit-learn',
      'Jupyter',
      'Matplotlib',
      'Seaborn',
      'Chart.js',
      'Selenium',
      'Statistical modeling',
    ],
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
    id: 'networking',
    label: 'Networking & Security',
    items: [
      'TCP/IP',
      'UDP',
      'WebSockets',
      'Socket.IO',
      'TLS',
      'Nginx',
      'OAuth2',
      'JWT',
      'RBAC',
      'Wireshark',
    ],
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure & Tooling',
    items: [
      'Docker / Compose',
      'Git',
      'GitHub Actions',
      'AWS S3',
      'Linux',
      'CMake',
      'Vercel',
      'Render',
      'Supabase',
      'Postman',
    ],
  },
  {
    id: 'testing',
    label: 'Testing',
    items: ['Jest', 'Vitest', 'JUnit', 'Playwright', 'Supertest'],
  },
]
