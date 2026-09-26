import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import App from '@/App'
import '@/styles/index.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found')

/**
 * The site is one page. The only other route exists in development, for
 * scripts/render-stills.mjs, and the guard is a build-time constant so the
 * production bundle carries neither the branch nor the chunk.
 */
function page() {
  if (import.meta.env.DEV && window.location.pathname === '/stills') {
    const StillsPage = lazy(() =>
      import('@/scene/StillsPage').then((m) => ({ default: m.StillsPage })),
    )
    return (
      <Suspense fallback={null}>
        <StillsPage />
      </Suspense>
    )
  }
  return <App />
}

createRoot(root).render(<StrictMode>{page()}</StrictMode>)
