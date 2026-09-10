import { Icon, type IconName } from './Icon'

/**
 * A framed surface with an optional solid ribbon header. Grouping related
 * content inside one frame with a titled bar is what makes an interface read
 * as a game rather than as a document; it is structure, not ornament.
 *
 * Depth is the solid bottom edge, never a blurred shadow.
 */

export type PanelTone = 'ember' | 'leaf' | 'tide'

const ribbonTones: Record<PanelTone, string> = {
  ember: 'bg-ember-strong border-ember-edge',
  leaf: 'bg-leaf-strong border-leaf-edge',
  tide: 'bg-tide-strong border-tide-edge',
}

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
      className={`bg-surface border-edge rounded-lg border-2 border-b-(length:--edge-lg) ${className}`}
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
      <div className="p-4 md:p-6">{children}</div>
    </div>
  )
}
