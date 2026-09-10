/**
 * Temporary style guide. Exists so the M1 tokens and content registry are seen
 * before any layout is built on them. Deleted in M2.
 */
import { profile, sections } from '@/content/profile'
import { projects } from '@/content/projects'
import { skillGroups } from '@/content/skills'
import { education, experience } from '@/content/experience'

const interfaceSwatches = [
  ['canvas', 'bg-canvas'],
  ['surface', 'bg-surface'],
  ['sunken', 'bg-sunken'],
  ['ink', 'bg-ink'],
  ['ink-muted', 'bg-ink-muted'],
  ['hairline', 'bg-hairline'],
] as const

const accentSwatches = [
  ['ember', 'bg-ember'],
  ['ember-strong', 'bg-ember-strong'],
  ['ember-ink', 'bg-ember-ink'],
  ['leaf', 'bg-leaf'],
  ['leaf-strong', 'bg-leaf-strong'],
  ['leaf-ink', 'bg-leaf-ink'],
] as const

const worldSwatches = [
  ['sky', 'bg-world-sky'],
  ['sun', 'bg-world-sun'],
  ['grass', 'bg-world-grass'],
  ['grass-dark', 'bg-world-grass-dark'],
  ['soil', 'bg-world-soil'],
  ['stone', 'bg-world-stone'],
  ['water', 'bg-world-water'],
  ['wood', 'bg-world-wood'],
] as const

function Swatches({
  title,
  swatches,
}: {
  title: string
  swatches: readonly (readonly [string, string])[]
}) {
  return (
    <div>
      <h3 className="font-display text-eyebrow text-ink-muted uppercase">{title}</h3>
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {swatches.map(([name, className]) => (
          <div key={name}>
            <div className={`${className} h-16 rounded-md border border-hairline shadow-card`} />
            <p className="text-meta text-ink-muted mt-1.5">{name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-hairline border-t pt-10">
      <h2 className="text-section font-semibold">{title}</h2>
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  )
}

export default function App() {
  return (
    <main className="mx-auto max-w-content space-y-14 px-6 py-16">
      <header>
        <p className="font-display text-eyebrow text-ember-ink uppercase">Style Guide</p>
        <h1 className="text-hero font-display mt-2 font-semibold">{profile.name}</h1>
        <p className="text-lede text-ink-muted mt-3">{profile.positioning}</p>
        <p className="prose-measure mt-4">{profile.personalStatement}</p>
      </header>

      <Block title="Color">
        <Swatches title="Interface" swatches={interfaceSwatches} />
        <Swatches title="Accents" swatches={accentSwatches} />
        <Swatches title="World (illustration only)" swatches={worldSwatches} />
      </Block>

      <Block title="Type">
        <p className="text-hero font-display font-semibold">Hero — Fredoka 600</p>
        <p className="text-lede font-medium">Lede — Inter 500</p>
        <p className="text-section font-semibold">Section heading — Inter 650</p>
        <p className="font-display text-eyebrow text-ink-muted uppercase">Eyebrow — Fredoka</p>
        <p className="text-card font-semibold">Card title — Inter 620</p>
        <p className="prose-measure">Body — Inter 400. {profile.about[0]}</p>
        <p className="text-meta text-ink-muted">Meta — Inter 450 · {profile.location}</p>
      </Block>

      <Block title="Surfaces & Buttons">
        <div className="flex flex-wrap gap-3">
          <button className="bg-ember-strong rounded-md px-5 py-2.5 font-medium text-white transition-shadow duration-(--dur-base)">
            Primary
          </button>
          <button className="bg-leaf-strong rounded-md px-5 py-2.5 font-medium text-white">
            Secondary
          </button>
          <button className="border-ink-muted rounded-md border px-5 py-2.5 font-medium">
            Outline
          </button>
        </div>
        <div className="bg-surface border-hairline border-b-edge rounded-lg border border-b-[3px] p-6 shadow-card">
          <p className="text-card font-semibold">Card</p>
          <p className="text-ink-muted mt-2">
            Hairline border, solid bottom edge, warm shadow. No backdrop blur.
          </p>
        </div>
      </Block>

      <Block title={`Sections (${sections.length})`}>
        <ul className="space-y-1">
          {sections.map((section) => (
            <li key={section.id}>
              <span className="font-display text-eyebrow text-ember-ink uppercase">
                {section.eyebrow}
              </span>{' '}
              <span className="font-semibold">{section.heading}</span>{' '}
              <span className="text-meta text-ink-muted">nav: {section.navLabel}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title={`Projects (${projects.length})`}>
        {projects.map((project) => (
          <article
            key={project.id}
            className="bg-surface border-hairline border-b-edge rounded-lg border border-b-[3px] p-6 shadow-card"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-card font-semibold">{project.name}</h3>
              {project.featured && (
                <span className="bg-ember-strong font-display text-eyebrow rounded-full px-2.5 py-0.5 uppercase text-white">
                  Flagship
                </span>
              )}
              {project.status === 'in-progress' && (
                <span className="border-leaf-ink text-leaf-ink font-display text-eyebrow rounded-full border px-2.5 py-0.5 uppercase">
                  In Progress
                </span>
              )}
            </div>
            <p className="prose-measure mt-2">{project.tagline}</p>
            <p className="text-meta text-ink-muted prose-measure mt-2">{project.summary}</p>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li key={tech} className="bg-sunken text-meta rounded-full px-2.5 py-0.5">
                  {tech}
                </li>
              ))}
            </ul>
            <p className="text-meta text-ink-muted mt-3">
              {project.links.length > 0
                ? project.links.map((link) => link.url).join(' · ')
                : 'Private repository'}
              {project.detail ? ' · has detail' : ' · no detail'}
              {project.image ? ' · has image' : ' · placeholder'}
            </p>
          </article>
        ))}
      </Block>

      <Block title="Skills">
        {skillGroups.map((group) => (
          <div key={group.id}>
            <h3 className="font-display text-eyebrow text-ink-muted uppercase">{group.label}</h3>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item} className="bg-sunken text-meta rounded-full px-2.5 py-0.5">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Block>

      <Block title="Experience & Education">
        {experience.map((entry) => (
          <div key={entry.id}>
            <h3 className="text-card font-semibold">
              {entry.company} — {entry.role}
            </h3>
            <p className="text-meta text-ink-muted">
              {entry.period} · {entry.location}
            </p>
            <p className="prose-measure mt-2">{entry.summary}</p>
          </div>
        ))}
        {education.map((entry) => (
          <div key={entry.id}>
            <h3 className="text-card font-semibold">{entry.institution}</h3>
            <p className="text-meta text-ink-muted">
              {entry.qualification} · {entry.period}
            </p>
            <ul className="prose-measure mt-2 list-disc pl-5">
              {entry.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </Block>

      <Block title="Contact">
        <p className="prose-measure">{profile.contactStatement}</p>
        <p className="text-meta text-ink-muted">
          {profile.email} · {profile.links.github.href} · {profile.links.linkedin.href} ·{' '}
          {profile.links.resume.href}
        </p>
      </Block>
    </main>
  )
}
