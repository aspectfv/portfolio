import { createContext, use } from 'react'

export type WorldState = {
  /** Whether scenes run at all. When false every strip shows its still. */
  readonly canRender: boolean
  /** A strip saying whether it is on screen, so the loop can stop when none is. */
  readonly report: (strip: string, onScreen: boolean) => void
}

export const WorldContext = createContext<WorldState | null>(null)

export function useWorld(): WorldState {
  const state = use(WorldContext)
  if (!state) throw new Error('Strip rendered outside World')
  return state
}
