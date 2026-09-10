import { useEffect, useState } from 'react'

/**
 * Copying is a convenience beside the mailto — never the only way to get the
 * address, which is also rendered as text.
 */
export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard.writeText(email).then(() => setCopied(true))
      }}
      className="border-ink-muted hover:bg-sunken inline-flex min-h-11 items-center rounded-md border px-5 py-2.5 font-medium transition-colors duration-(--dur-fast) active:translate-y-px"
    >
      {copied ? 'Copied' : 'Copy email'}
      <span aria-live="polite" className="sr-only">
        {copied ? `${email} copied to clipboard` : ''}
      </span>
    </button>
  )
}
