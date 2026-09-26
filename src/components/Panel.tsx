import { Icon, type IconName } from './Icon'

/**
 * A framed surface with an optional solid ribbon header. Grouping related
 * content inside one frame with a titled bar is what makes an interface read
 * as a game rather than as a document; it is structure, not ornament.
 *
 * The frame is built like an object rather than drawn as a border: a solid
 * bottom edge, an inset rule, and a rivet at each corner of that rule. A
 * rounded card with a coloured title bar is one tweak away from the house style
 * of every SaaS landing page, and the rivets are most of what separates the two
 * for the cost of four spans.
 *
 * All three are `data-ornament`, so the decoration is strippable in one place
 * and nothing here learns that it has more than one appearance.
 *
 * Depth is the solid bottom edge, never a blurred shadow.
 */

export type PanelTone = 'ember' | 'leaf' | 'tide'

const ribbonTones: Record<PanelTone, string> = {
  ember: 'bg-ember-strong border-ember-edge',
  leaf: 'bg-leaf-strong border-leaf-edge',
  tide: 'bg-tide-strong border-tide-edge',
}

/**
 * The rivets sit on the corners of the inset rule, inside the content box's
 * padding, so they land on `--color-surface` on every panel. Placing them on
 * the panel's own corners would put two of them on a saturated ribbon, where
 * an edge-coloured square is invisible.
 */
const rivets = [
  'top-[3px] left-[3px]',
  'top-[3px] right-[3px]',
  'bottom-[3px] left-[3px]',
  'bottom-[3px] right-[3px]',
]

export function Panel({
  title,
  icon,
  tone = 'ember',
  headingLevel = 'h3',
  id,
  className = '',
  children,
}: {
  /** Omit for a plain framed surface with no bar. */
  title?: string
  icon?: IconName
  tone?: PanelTone
  /** The bar carries a real heading, so the caller owns its rank. */
  headingLevel?: 'h2' | 'h3' | 'h4'
  id?: string
  className?: string
  children: React.ReactNode
}) {
  const Heading = headingLevel

  return (
    <div
      className={`bg-surface border-edge flex flex-col rounded-lg border-2 border-b-(length:--edge-lg) ${className}`}
    >
      {title && (
        <div
          data-ribbon=""
          className={`flex items-center gap-3 rounded-t-[calc(var(--radius-lg)-2px)] border-b-(length:--edge-sm) px-4 py-3 text-white ${ribbonTones[tone]}`}
        >
          {icon && (
            <span
              data-ornament=""
              className="bg-surface inline-flex size-8 shrink-0 items-center justify-center rounded-sm"
            >
              <Icon name={icon} className="size-5" />
            </span>
          )}
          <Heading {...(id ? { id } : {})} className="font-display text-card font-semibold">
            {title}
          </Heading>
        </div>
      )}
      {/* flex-1 plus flex-col so a caller can pin content to the bottom of the
          panel with mt-auto, which is what keeps card actions aligned across a
          grid row when the cards hold unequal amounts of text. */}
      <div className="relative flex flex-1 flex-col p-4 md:p-6">
        <span
          data-ornament=""
          aria-hidden="true"
          className="border-edge pointer-events-none absolute inset-1.5 rounded-[calc(var(--radius-lg)-0.5rem)] border-2"
        />
        {rivets.map((position) => (
          <span
            key={position}
            data-ornament=""
            aria-hidden="true"
            className={`bg-edge pointer-events-none absolute size-1.5 rounded-[2px] ${position}`}
          />
        ))}
        {children}
      </div>
    </div>
  )
}
