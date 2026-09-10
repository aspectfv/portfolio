import { useEffect, useState } from 'react'
import { pressBase } from './ActionLink'

/**
 * Copying is a convenience beside the mailto; never the only way to get the
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
      className={`${pressBase} bg-surface border-ink-muted hover:bg-sunken`}
    >
      {copied ? 'Copied' : 'Copy email'}
      <span aria-live="polite" className="sr-only">
        {copied ? `${email} copied to clipboard` : ''}
      </span>
    </button>
  )
}
