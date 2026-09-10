import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// jsdom does not implement IntersectionObserver, which the nav uses to track
// the section in view. A no-op stub is enough; the observer's behaviour is
// verified in the browser, not here.
class IntersectionObserverStub implements IntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly scrollMargin = ''
  readonly thresholds: readonly number[] = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

vi.stubGlobal('IntersectionObserver', IntersectionObserverStub)

// jsdom has no matchMedia. Default to "no preference"; tests that care about
// reduced motion override this with mockMatchMedia below.
export function mockMatchMedia(matches: boolean) {
  vi.stubGlobal(
    'matchMedia',
    (query: string): MediaQueryList =>
      ({
        matches,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  )
}

mockMatchMedia(false)
