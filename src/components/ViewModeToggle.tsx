import { useAchievements } from '@/hooks/useAchievements'
import { useViewMode } from '@/hooks/useViewMode'

/**
 * Lets the visitor drop the game presentation for a plain document. This is
 * what makes committing to the game language safe: the default no longer has
 * to hedge, because anyone it does not suit is one click from the plain view.
 *
 * Both views carry identical content. The toggle changes presentation only,
 * so it is a switch rather than navigation.
 *
 * It appears twice: in the header at wide widths and in the footer everywhere.
 * Plain view is what licenses the game default to be as loud as it is, and an
 * escape hatch nobody can find is not an escape hatch. The header at 390px
 * already carries a name plate, an area readout and a menu button, so the
 * narrow layout gets it inside the menu instead.
 */
export function ViewModeToggle({ className = '' }: { className?: string }) {
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
      className={`border-ink-muted bg-surface hover:bg-sunken text-meta press inline-flex min-h-11 items-center gap-2 rounded-sm border-2 border-b-(length:--edge-md) px-3 font-medium ${className}`}
    >
      {/* Not marked as ornament: this is the switch's state, and plain view
          strips ornaments, which would leave the control with nothing to read
          but its own label. Filled versus hollow carries the state without
          relying on colour alone. */}
      <span
        aria-hidden="true"
        className={`size-2.5 rounded-full border-2 transition-colors duration-(--dur-fast) ${
          game ? 'bg-leaf-strong border-leaf-edge' : 'bg-transparent border-ink-muted'
        }`}
      />
      Game view
    </button>
  )
}
