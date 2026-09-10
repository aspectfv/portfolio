import { SectionHeading } from './SectionHeading'

/**
 * A page section. `tone` alternates the background so sections read as distinct
 * bands without a border between every one of them.
 */
export function Section({
  id,
  eyebrow,
  heading,
  tone = 'canvas',
  children,
}: {
  id: string
  eyebrow: string
  heading: string
  tone?: 'canvas' | 'sunken'
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={tone === 'sunken' ? 'bg-sunken' : 'bg-canvas'}
    >
      <div className="mx-auto max-w-content px-6 py-(--spacing-section)">
        <SectionHeading id={id} eyebrow={eyebrow} heading={heading} />
        {children}
      </div>
    </section>
  )
}
