import type { Profile, SectionMeta } from './types'

/** Transcribed from docs/CONTENT.md §1–3, §8–9. Do not paraphrase. */
export const profile: Profile = {
  name: 'Joshua Tating',
  fullName: 'Joshua Nathaniel C. Tating',
  location: 'Manila, Philippines',
  email: 'josh10nathan@gmail.com',
  positioning: 'Backend · Full-Stack · AI Software Engineer',
  personalStatement:
    'Currently building payment infrastructure at NGnair, and a 3D browser roguelite whose scores are re-verified in a different language. I like problems where correctness is provable and the result is still fun to look at.',
  about: [
    "I'm a Computer Science student at De La Salle University and a software engineer working on payment infrastructure. Most of my day job lives on the backend: service boundaries, authentication, and making a system that moves money fail in predictable ways instead of interesting ones.",
    "The rest of my time goes to building games and the machinery around them. My current project is a 3D browser roguelite where the browser is not trusted — every run is replayed and re-scored by a separate service written in a different language, and the two have to agree exactly or the build fails. It's a game, but the interesting part is the contract underneath it.",
    "I got into software because of games, and I've never really found a reason to pick a side. Backend, full-stack, or AI work — I'm mostly drawn to the parts of a system you can't see from the outside.",
  ],
  contactStatement:
    'Open to Backend, Full-Stack, and AI Engineer roles, Junior through SWE II. The fastest way to reach me is email — I read everything.',
  links: {
    github: { label: 'GitHub', href: 'https://github.com/aspectfv', external: true },
    linkedin: {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/joshuatating/',
      external: true,
    },
    resume: { label: 'Resume', href: '/resume/joshua-tating-resume.pdf', external: false },
  },
}

/** Nav labels stay conventional; eyebrows carry the game flavor. */
export const sections: readonly SectionMeta[] = [
  { id: 'about', navLabel: 'About', heading: 'About', eyebrow: 'Character' },
  { id: 'projects', navLabel: 'Projects', heading: 'Projects', eyebrow: 'Quest Log' },
  { id: 'skills', navLabel: 'Skills', heading: 'Skills & Stack', eyebrow: 'Inventory' },
  {
    id: 'experience',
    navLabel: 'Experience',
    heading: 'Experience & Education',
    eyebrow: 'Records',
  },
  { id: 'contact', navLabel: 'Contact', heading: 'Get in touch', eyebrow: 'Party Up' },
]
