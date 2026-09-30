import type { Project } from './types'

/**
 * Transcribed from docs/CONTENT.md §4.
 *
 * Order in this array is order on the page: the flagship first, then the
 * rest newest first by when the work ended. Exactly one entry carries
 * `featured: true`; promoting a different project to flagship is that one edit
 * and nothing else. Adding a project is appending one object.
 *
 * `links: []` renders a "Private repository" note rather than a dead anchor.
 * Omitting `image` renders a placeholder panel. Omitting `detail` renders no
 * expansion affordance.
 */
export const projects: readonly Project[] = [
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
    featured: true,
    image: {
      src: '/images/chronocritters.webp',
      alt: 'A battle in progress: BlueOak has sent out Searfiend, a fire critter at full health, against RedAsh and an identical Searfiend across the arena. Both benches show a knocked-out Sylvan Sentinel greyed out at zero health. The log records the hit that felled it as super effective, and the move list offers Cinder Lash for 4 damage or Ashen Brand for 1 damage plus a burn.',
    },
    links: [{ kind: 'repo', url: 'https://github.com/aspectfv/chronocritters' }],
    detail: {
      problem:
        'Turn execution had grown into one long branching method. Adding an ability meant editing the same function everyone else was editing, and effects interacted in ways nobody could trace.',
      built:
        'A modular battle engine using Chain of Responsibility, so abilities and effects became independent links instead of branches. gRPC between services, a STOMP WebSocket lobby and matchmaking service, and a React frontend typed by GraphQL Code Generator across its 8 queries and mutations, so the client cannot drift from the schema.',
      decision:
        'Making turn resolution a chain rather than a switch. Each ability and effect handles what it understands and passes the rest along, which turns "add an ability" into adding a link rather than editing shared control flow.',
      result:
        'Four turn handlers took the core battle service from 257 to 182 lines (29%), and shared models, mappers and security config moved into a common library of 40 classes reused by 29 service files.',
    },
  },
  {
    id: 'distributed-enrollment',
    name: 'Distributed Online Enrollment System',
    tagline:
      'A course enrollment platform split into Go services, built so one node going down does not take sign-in or seats with it.',
    summary:
      'Five Go services on Docker Compose behind a React client, with local Ed25519 JWT verification, row-level locking against over-enrollment, a PostgreSQL streaming replica, and a notifier that emails enrollment and grade events.',
    category: 'Distributed Systems',
    role: 'Design and implementation',
    stack: ['Go', 'PostgreSQL', 'React', 'TypeScript', 'Docker'],
    status: 'complete',
    featured: false,
    links: [{ kind: 'repo', url: 'https://github.com/aspectfv/STDISCM-P4' }],
    detail: {
      problem:
        'Enrollment is the moment everyone asks for the same courses at once. A seat count read and then written in two steps lets two students take the last seat, and a system that sends every request through one auth node goes down with that node.',
      built:
        'Five Go services on Docker Compose behind a React and TypeScript client, PostgreSQL row-level locking on seat allocation, a PostgreSQL 17 streaming replica set up with pg_basebackup, and a cursor-based notifier service that emails enrollment and grade events and resumes after a restart.',
      decision:
        'Verifying Ed25519-signed JWTs locally in each service instead of asking the auth service on every request, so signed-in users kept working while the auth node was down.',
      result:
        'Integration tests race 20 concurrent enrollments into a 5-seat course, and exactly 5 are admitted.',
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
    status: 'complete',
    featured: false,
    image: {
      src: '/images/socratic-ai-tutor.webp',
      alt: 'A course page listing instructor-defined topics such as Problem Analysis and Iterative Statements, each with its own button to open a tutoring chat.',
    },
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
    id: 'os-emulator',
    name: 'Multi-Core OS Process Emulator',
    tagline:
      'A process emulator that schedules instruction streams across up to 255 simulated CPU cores.',
    summary:
      'A C++20 emulator running processes of 1,000 to 2,000 instructions under FCFS and Round-Robin scheduling with configurable time quanta, each busy core stepped on its own thread against a shared cycle clock.',
    category: 'Systems',
    role: 'Design and implementation',
    stack: ['C++20', 'CMake'],
    status: 'complete',
    featured: false,
    links: [{ kind: 'repo', url: 'https://github.com/aspectfv/os-emulator' }],
    detail: {
      problem:
        'A scheduler can only be reasoned about if every core agrees on what time it is. Cores left to run freely drift apart, and a Round-Robin quantum stops meaning the same thing on each of them.',
      built:
        'An emulator of up to 255 CPU cores running processes of 1,000 to 2,000 instructions under FCFS and Round-Robin scheduling with configurable time quanta, and an interpreter for 5 instruction types including nested loops.',
      decision:
        'Stepping each CPU tick in parallel with one std::jthread per busy core, synchronized on a global cycle clock with mutexes and condition variables, so the cores run concurrently but never out of step.',
      result:
        'Both scheduling policies run across up to 255 cores from configuration, with the time quantum a setting rather than a constant.',
    },
  },
  {
    id: 'plaza-transpo',
    name: 'Plaza Transportation Booking',
    tagline:
      'A logistics booking platform where the booking lifecycle is an enforced state machine, not a status column.',
    summary:
      'A booking backend for a transportation company, with a documented 25-endpoint OpenAPI contract and a lifecycle that refuses illegal transitions rather than recording them.',
    category: 'Full-Stack / Client',
    role: 'Backend',
    stack: ['TypeScript', 'Express', 'Prisma', 'PostgreSQL', 'OpenAPI'],
    status: 'complete',
    featured: false,
    image: {
      src: '/images/plaza-transpo.webp',
      alt: 'A list of transportation bookings in three different lifecycle states, where only the pending booking offers edit and cancel actions.',
    },
    links: [],
    detail: {
      problem:
        'Bookings were being edited after dispatch, and nothing recorded who changed what or when.',
      built:
        'The booking lifecycle modeled as an enforced state machine with terminal-state locking and an edit cutoff window, JWT authentication, an audit log written on every status change, and a documented 25-endpoint OpenAPI contract.',
      decision:
        'Putting the lifecycle in the domain rather than in the UI. A status column plus disabled buttons is a convention; a state machine that rejects an illegal transition is a guarantee that survives a direct API call.',
      result:
        'Illegal transitions became impossible rather than discouraged, and every status change is attributable.',
    },
  },
  {
    id: 'electricity-access-prediction',
    name: 'Household Electricity Access Prediction',
    tagline:
      'A classifier that predicts household electricity access in the Philippines, tuned for the minority class rather than for accuracy.',
    summary:
      'A scikit-learn logistic regression trained on 40,171 records from the 2012 Family Income and Expenditure Survey, with a preprocessing pipeline for missing values and class weighting for an 87/13 imbalance.',
    category: 'Data Science',
    role: 'Pipeline and model',
    stack: ['Python', 'scikit-learn', 'Pandas', 'NumPy', 'Seaborn', 'Matplotlib'],
    status: 'complete',
    featured: false,
    links: [],
    detail: {
      problem:
        'With the classes split 87 to 13, a model that always predicts the majority is 87% accurate and useless. The households worth finding are the minority it would never flag.',
      built:
        'A preprocessing pipeline on ColumnTransformer, with median and mode imputation for more than 14,000 missing values, one-hot encoding and standard scaling, expanding 8 raw socioeconomic and housing features into 90 model inputs for a logistic regression classifier.',
      decision:
        'Optimizing for minority-class recall instead of accuracy: class weighting in the model, and RandomizedSearchCV tuning under 5-fold cross-validation.',
      result: 'Minority-class recall rose from 42% to 80%, at a ROC AUC of 0.89.',
    },
  },
  {
    id: 'data-warehouse',
    name: 'Multi-Source Data Warehouse',
    tagline:
      'A star-schema warehouse that brings four differently shaped sources into one place to query.',
    summary:
      'Python and Pandas ETL from two cloud MySQL databases, a CSV dataset and a MongoDB collection into a MySQL star schema, containerized with Docker Compose.',
    category: 'Data Engineering',
    role: 'ETL pipeline',
    stack: ['Python', 'Pandas', 'SQLAlchemy', 'MySQL', 'MongoDB', 'Docker'],
    status: 'complete',
    featured: false,
    links: [],
    detail: {
      problem:
        'The four sources disagreed on shape: relational tables, a flat CSV, and nested MongoDB documents. None of them could be queried against the others as they stood.',
      built:
        'A MySQL star schema of 6 dimension tables around a central fact table, ETL from 2 cloud MySQL databases, a CSV dataset and a MongoDB collection, and a consumer complaints pipeline in Pandas with deduplication, date normalization and NaN-to-NULL cleaning.',
      decision:
        'Flattening the nested MongoDB order documents into normalized order, item and tag tables, so orders join the rest of the warehouse the way any relational source does.',
      result:
        '5,000 nested order documents load as rows, and the whole pipeline runs with one command on macOS, Linux and Windows through Docker Compose.',
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
    image: {
      src: '/images/nexushub.webp',
      alt: 'A retro pixel-art forum index with a neon NexusHub banner over grouped discussion boards listing post and reply counts and the most recent post in each.',
    },
    links: [
      { kind: 'demo', url: 'https://nexushub-3snn.onrender.com/' },
      { kind: 'repo', url: 'https://github.com/aspectfv/NexusHub' },
    ],
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
