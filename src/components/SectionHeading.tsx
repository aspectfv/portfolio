import { Icon, type IconName } from './Icon'

/**
 * A section heading drawn as an area sign: a raised plate carrying a glyph, the
 * game-flavour eyebrow, and the conventional heading beneath it. The heading is
 * always the real label; the eyebrow sits beside it and never replaces it.
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

export function SectionHeading({
  eyebrow,
  heading,
  id,
}: {
  eyebrow: string
  heading: string
  id: string
}) {
  const glyph = glyphs[id]

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
