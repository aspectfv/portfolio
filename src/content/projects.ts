import type { Project } from './types'

/**
 * Transcribed from docs/CONTENT.md §4.
 *
 * Order in this array is order on the page. Exactly one entry carries
 * `featured: true`; promoting a different project to flagship is that one edit
 * and nothing else. Adding a project is appending one object.
 *
 * `links: []` renders a "Private repository" note rather than a dead anchor.
 * Omitting `image` renders a placeholder panel. Omitting `detail` renders no
 * expansion affordance.
 */
export const projects: readonly Project[] = [
  {
    id: 'arcforge',
    name: 'ArcForge',
    tagline:
      'A 3D browser roguelite whose every run is re-simulated in another language to prove the score is real.',
    summary:
      'A single-player browser roguelite backed by five services in five languages. The browser never gets to claim its own score. It submits a replay, and a separate Java service re-runs the same simulation independently to decide what actually happened.',
    category: 'Game + Distributed Systems',
    role: 'Solo: design, simulation, and all services',
    stack: [
      'TypeScript',
      'React Three Fiber',
      'Go',
      'Java / Spring',
      'C# / .NET',
      'Python / FastAPI',
      'PostgreSQL',
      'Docker',
    ],
    status: 'in-progress',
    featured: true,
    links: [],
    detail: {
      problem:
        'Any score a browser submits can be fabricated. A competitive leaderboard built on client-reported results is decoration, not a leaderboard.',
      built:
        'A fixed-timestep deterministic simulation in TypeScript driven by a seeded PRNG, so a run is fully described by game version, seed, run configuration, and input sequence. A Go gateway issues run configuration and ingests replays. A Java verifier re-runs the same simulation and produces the authoritative result. A .NET service owns player competitive state, and a Python service derives population-level statistics from verified runs only.',
      decision:
        'Determinism had to become a cross-language contract rather than a TypeScript implementation detail. Player aim is quantized to a fixed set of directions built from precomputed double literals shared verbatim with Java, and no runtime trigonometry runs in gameplay at all, because two language runtimes are not guaranteed to agree on sin. When the two implementations diverge, the rule gets fixed; tolerances are never added to hide the divergence.',
      result:
        'Cross-language replay fixtures run as a required CI gate. A replay verified in Java must produce the same authoritative result as the browser, or the build fails.',
    },
  },
  {
    id: 'socratic-ai-tutor',
    name: 'Socratic AI Tutor',
    tagline: 'An LLM tutor that diagnoses why a student’s code is wrong instead of just fixing it.',
    summary:
      'An agentic tutoring system that detects programming misconceptions through structured tool-calling, with educators in the loop governing what context the model is allowed to see.',
    category: 'AI Engineering',
    role: 'Backend and evaluation pipeline',
    stack: ['Next.js', 'PostgreSQL', 'Vercel AI SDK', 'Groq', 'LLM tool calling'],
    status: 'in-progress',
    featured: false,
    links: [],
    detail: {
      problem:
        'An LLM tutor that confidently names a misconception the student does not actually have is worse than one that says nothing. The student is taught a mistake they never made.',
      built:
        'Structured tool-calling that moves the model from open-ended generation to deterministic misconception detection, sequential prompting with in-context reflection constraints, an evaluation pipeline to measure diagnostic quality, and a human-in-the-loop backend where educators govern dynamic context injection.',
      decision:
        'Constraining the model with tools rather than trusting its prose. Free-form explanation is where a tutor invents misconceptions; forcing every diagnosis through a tool call makes the output checkable against a fixed set of known misconceptions instead of merely plausible.',
      result:
        'Diagnostic false-positive rate fell from 13.3% to 1.3%, with 98.0% precision on code-misconception detection.',
    },
  },
  {
    id: 'chronocritters',
    name: 'ChronoCritters',
    tagline:
      'A turn-based creature battler split across Spring Boot microservices with real-time matchmaking.',
    summary:
      'Three Spring Boot services talking over gRPC, a STOMP WebSocket lobby for matchmaking and live battle state, and a type-safe React client generated from the backend schema.',
    category: 'Game + Microservices',
    role: 'Backend and battle engine',
    stack: ['Java', 'Spring Boot', 'gRPC', 'WebSockets / STOMP', 'React', 'TypeScript', 'GraphQL'],
    status: 'complete',
    featured: false,
    links: [{ kind: 'repo', url: 'https://github.com/aspectfv/chronocritters' }],
    detail: {
      problem:
        'Turn execution had grown into one long branching method. Adding an ability meant editing the same function everyone else was editing, and effects interacted in ways nobody could trace.',
      built:
        'A modular battle engine using Chain of Responsibility, so abilities and effects became independent links instead of branches. gRPC between services, a STOMP WebSocket lobby and matchmaking service, and a React frontend built on auto-generated GraphQL hooks so the client cannot drift from the schema.',
      decision:
        'Making turn resolution a chain rather than a switch. Each ability and effect handles what it understands and passes the rest along, which turns "add an ability" into adding a link rather than editing shared control flow.',
      result:
        'Sub-150ms gameplay latency, roughly 40% less duplicated code across services, and a turn pipeline 143 lines shorter where adding an ability became additive rather than invasive.',
    },
  },
  {
    id: 'plaza-transpo',
    name: 'Plaza Transportation Booking',
    tagline:
      'A logistics booking platform where the booking lifecycle is an enforced state machine, not a status column.',
    summary:
      'A booking backend for a transportation company, with a documented 26-endpoint OpenAPI contract and a lifecycle that refuses illegal transitions rather than recording them.',
    category: 'Full-Stack / Client',
    role: 'Backend',
    stack: ['TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'OpenAPI'],
    status: 'complete',
    featured: false,
    links: [],
    detail: {
      problem:
        'Bookings were being edited after dispatch, and nothing recorded who changed what or when.',
      built:
        'The booking lifecycle modeled as an enforced state machine with terminal-state locking and an edit cutoff window, JWT authentication, an audit log written on every status change, and a documented 26-endpoint OpenAPI contract.',
      decision:
        'Putting the lifecycle in the domain rather than in the UI. A status column plus disabled buttons is a convention; a state machine that rejects an illegal transition is a guarantee that survives a direct API call.',
      result:
        'Illegal transitions became impossible rather than discouraged, and every status change is attributable.',
    },
  },
  {
    id: 'nexushub',
    name: 'NexusHub',
    tagline:
      'A themed forum with rank progression, moderation tooling, and cascading data integrity.',
    summary:
      'A full-stack forum with role-based authentication, admin moderation tools, and referential cleanup that keeps threads consistent when content is removed.',
    category: 'Full-Stack',
    role: 'Full-stack',
    stack: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'EJS', 'Passport.js'],
    status: 'complete',
    featured: false,
    links: [{ kind: 'repo', url: 'https://github.com/aspectfv/NexusHub' }],
    detail: {
      problem:
        'Deleting a post left its replies behind, so threads accumulated orphaned content that moderators had to clean up by hand.',
      built:
        'Role-based authentication with Passport.js, regex-based search filtering, admin moderation tooling, and Mongoose cascading deletes so removing a post does not orphan its replies.',
      decision:
        'Handling referential cleanup in the data layer rather than the controller, so every deletion path gets it, including the ones added later.',
      result:
        'Served 100+ registered users across 1000+ posts and replies, cutting moderation time by roughly 40%.',
    },
  },
]

/** The flagship. Layout reads this; it never hardcodes a project id. */
export const featuredProject = projects.find((project) => project.featured)

export const additionalProjects = projects.filter((project) => !project.featured)
