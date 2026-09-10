type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 font-medium ' +
  'min-h-11 transition-[transform,box-shadow,background-color] duration-(--dur-base) ' +
  'ease-(--ease-standard) active:translate-y-px'

const variants: Record<Variant, string> = {
  primary: 'bg-ember-strong text-white shadow-card hover:shadow-card-lift',
  secondary: 'bg-surface text-ink border border-ink-muted hover:bg-sunken',
  ghost: 'text-ink-muted hover:text-ink underline decoration-hairline underline-offset-4',
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
      className={`${base} ${variants[variant]}`}
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
