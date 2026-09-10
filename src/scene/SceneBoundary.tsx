import { Component, type ReactNode } from 'react'

/**
 * Catches anything the 3D subtree throws — most importantly a failed chunk
 * fetch.
 *
 * Without this, a rejected `React.lazy` import propagates to the root and
 * unmounts the whole page: a flaky network would take the entire portfolio down
 * to a blank screen, not just the decoration. The scene is optional; the page
 * is not.
 */
export class SceneBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { failed: boolean }
> {
  override state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  override render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
