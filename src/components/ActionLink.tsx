type Variant = 'primary' | 'secondary' | 'ghost'

/**
 * Raised controls sit on a solid bottom edge and sink onto it when held; the
 * `press` utility in the stylesheet owns that behaviour. Ghost is flat on
 * purpose, because a text link has no body to raise.
 */
export const pressBase =
  'inline-flex items-center justify-center gap-2 rounded-sm px-5 py-2.5 font-medium ' +
  'min-h-11 press border-2 border-b-(length:--edge-md)'

const variants: Record<Variant, string> = {
  // Hover deepens rather than brightens. --color-ember is the illustration
  // value; white on it is 3.64:1, which the token table rules out by name.
  primary: 'bg-ember-strong border-ember-edge text-white hover:bg-ember-ink',
  secondary: 'bg-surface border-ink-muted text-ink hover:bg-sunken',
  ghost:
    'inline-flex items-center gap-2 min-h-11 font-medium text-ink-muted hover:text-ink ' +
    'underline decoration-hairline underline-offset-4',
}

export function ActionLink({
  href,
  external = false,
  variant = 'secondary',
  download = false,
  children,
}: {
  href: string
  external?: boolean
  variant?: Variant
  download?: boolean
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      className={variant === 'ghost' ? variants.ghost : `${pressBase} ${variants[variant]}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...(download ? { download: '' } : {})}
    >
      {children}
      {external && (
        <span aria-hidden="true" className="text-[0.8em] leading-none">
          ↗
        </span>
      )}
      {external && <span className="sr-only">(opens in a new tab)</span>}
    </a>
  )
}
