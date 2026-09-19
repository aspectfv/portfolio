import { useEffect, useState } from 'react'
import { pressBase } from './ActionLink'
import { useAchievements } from '@/hooks/useAchievements'

type Status = 'idle' | 'copied' | 'failed'

const labels: Record<Status, string> = {
  idle: 'Copy email',
  copied: 'Copied',
  failed: 'Copy failed',
}

/**
 * Copying is a convenience beside the mailto; never the only way to get the
 * address, which is also rendered as text.
 *
 * All three labels are stacked in one grid cell so the widest of them sets the
 * button's width once. Swapping the text alone re-measured the button on every
 * click and shoved the row beside it sideways, which reads as the page
 * flinching rather than as the copy succeeding.
 */
export function CopyEmail({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const { unlock } = useAchievements()

  useEffect(() => {
    if (status === 'idle') return
    const timer = setTimeout(() => setStatus('idle'), 2000)
    return () => clearTimeout(timer)
  }, [status])

  return (
    <button
      type="button"
      onClick={() => {
        void navigator.clipboard
          .writeText(email)
          .then(() => {
            setStatus('copied')
            unlock('copied-email')
          })
          // A blocked clipboard is not a dead end — the address is rendered as
          // text next to this button — but it must say so rather than look
          // like nothing happened.
          .catch(() => setStatus('failed'))
      }}
      className={`${pressBase} bg-surface transition-colors duration-(--dur-fast) ${
        status === 'copied'
          ? 'border-leaf-strong text-leaf-ink'
          : 'border-ink-muted hover:bg-sunken'
      }`}
    >
      <span className="grid justify-items-center">
        {(Object.keys(labels) as Status[]).map((key) => (
          <span
            key={key}
            aria-hidden={key !== status}
            className={`col-start-1 row-start-1 ${key === status ? '' : 'invisible'}`}
          >
            {labels[key]}
          </span>
        ))}
      </span>
      <span aria-live="polite" className="sr-only">
        {status === 'copied' ? `${email} copied to clipboard` : ''}
        {status === 'failed' ? 'Could not copy. The address is written above.' : ''}
      </span>
    </button>
  )
}
