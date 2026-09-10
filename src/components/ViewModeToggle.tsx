import { useAchievements } from '@/hooks/useAchievements'
import { useViewMode } from '@/hooks/useViewMode'

/**
 * Lets the visitor drop the game presentation for a plain document. This is
 * what makes committing to the game language safe: the default no longer has
 * to hedge, because anyone it does not suit is one click from the plain view.
 *
 * Both views carry identical content. The toggle changes presentation only,
 * so it is a switch rather than navigation.
 */
export function ViewModeToggle() {
  const [mode, setMode] = useViewMode()
  const { unlock } = useAchievements()
  const game = mode === 'game'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={game}
      onClick={() => {
        // Unlock before switching: in plain view the writer is a no-op, so
        // leaving game view is the only moment this can be recorded.
        unlock('found-plain-view')
        setMode(game ? 'plain' : 'game')
      }}
      className="border-ink-muted bg-surface hover:bg-sunken text-meta press inline-flex min-h-11 items-center gap-2 rounded-sm border-2 border-b-(length:--edge-md) px-3 font-medium"
    >
      <span
        data-ornament=""
        aria-hidden="true"
        className={`size-2.5 rounded-full ${game ? 'bg-leaf-strong' : 'bg-ink-muted'}`}
      />
      Game view
    </button>
  )
}
