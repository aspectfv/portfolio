import { Icon, type IconName } from './Icon'

/**
 * A section heading in one of two treatments.
 *
 * `plate` is an area sign: a raised plate carrying a glyph, the game-flavour
 * eyebrow, and the conventional heading beneath it. It belongs above dense
 * panelled content, where it reads as a sign at the entrance to a busy place.
 *
 * `open` is large display type set straight onto the band, for the sections
 * that carry no panel at all. A single plate floating on an otherwise open
 * band reads as a leftover rather than a decision, which is the whole reason
 * those sections dropped their panels.
 *
 * In both, the heading is the real label; the eyebrow sits beside it and never
 * replaces it.
 *
 * The glyph mapping lives here rather than in `src/content/` because which
 * picture represents a section is presentation, not content. Components render
 * content; they do not author it, and a drawing is not content.
 */
const glyphs: Record<string, IconName> = {
  about: 'pin',
  projects: 'flag',
  skills: 'chest',
  experience: 'scroll',
  contact: 'signpost',
}

export type HeadingStyle = 'plate' | 'open'

export function SectionHeading({
  eyebrow,
  heading,
  id,
  variant = 'plate',
}: {
  eyebrow: string
  heading: string
  id: string
  variant?: HeadingStyle
}) {
  const glyph = glyphs[id]

  if (variant === 'open') {
    return (
      <div className="mb-8 md:mb-10">
        <p className="font-display text-eyebrow text-ember-ink flex items-center gap-2 font-medium tracking-[0.08em] uppercase">
          {glyph && <Icon name={glyph} className="size-5" />}
          {eyebrow}
        </p>
        <h2 id={`${id}-heading`} className="text-title font-display mt-1 font-semibold">
          {heading}
        </h2>
      </div>
    )
  }

  return (
    <div className="mb-8 md:mb-12">
      <div className="bg-surface border-edge inline-flex items-center gap-3 rounded-md border-2 border-b-(length:--edge-md) px-4 py-3">
        {glyph && (
          <span
            data-ornament=""
            className="bg-canvas border-edge inline-flex size-11 shrink-0 items-center justify-center rounded-sm border-2"
          >
            <Icon name={glyph} className="size-6" />
          </span>
        )}
        <div>
          <p className="font-display text-eyebrow text-ember-ink font-medium tracking-[0.08em] uppercase">
            {eyebrow}
          </p>
          <h2 id={`${id}-heading`} className="text-section font-display font-semibold">
            {heading}
          </h2>
        </div>
      </div>
    </div>
  )
}
