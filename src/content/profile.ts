import type { Profile, SectionMeta } from './types'

/** Transcribed from docs/CONTENT.md §1–3, §8–9. Do not paraphrase. */
export const profile: Profile = {
  name: 'Joshua Tating',
  fullName: 'Joshua Nathaniel C. Tating',
  location: 'Manila, Philippines',
  email: 'josh10nathan@gmail.com',
  positioning: 'Backend · Full-Stack · AI Software Engineer',
  personalStatement:
    'I build backend systems for a living and games for the fun of it. Both pull me toward the same thing: the interesting work is usually the part you cannot see from the outside.',
  about: [
    'I’m a Computer Science student at De La Salle University and a software engineer working on payment infrastructure. Most of my day job lives on the backend: service boundaries, authentication, and making a system that moves money fail in predictable ways instead of interesting ones.',
    'Outside of work I build games, and the machinery around them usually turns out to be the more interesting half. It is where I get to be rigorous about things nobody asked me to be rigorous about, which is a good way to learn what rigour actually costs.',
    'I got into software because of games and never found a reason to pick a side. Backend, full-stack, AI: I’m drawn to whichever part of a system is doing the work nobody can see.',
  ],
  contactStatement:
    'Open to Backend, Full-Stack, and AI Engineer roles, Junior through SWE II. The fastest way to reach me is email, and I read everything.',
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
