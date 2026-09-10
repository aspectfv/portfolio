import { renderHook, act } from '@testing-library/react'
import { useInView } from '@/hooks/useInView'
import { usePageVisible } from '@/hooks/usePageVisible'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { mockMatchMedia } from '@/test/setup'
import { createRef } from 'react'

/**
 * These three decide whether the hero canvas renders at all, and whether it
 * keeps rendering once nobody is looking. The frame loop itself is R3F's
 * `frameloop` prop reacting to their output, which is not observable from
 * outside the canvas, so the gating is verified here, at the inputs.
 */
describe('useInView', () => {
  let callback: (entries: { isIntersecting: boolean }[]) => void

  beforeEach(() => {
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: typeof callback) {
          callback = cb
        }
        observe() {}
        unobserve() {}
        disconnect() {}
        takeRecords() {
          return []
        }
      },
    )
  })

  it('reports false once the element leaves the viewport', () => {
    const ref = createRef<HTMLDivElement>()
    Object.defineProperty(ref, 'current', { value: document.createElement('div') })
    const { result } = renderHook(() => useInView(ref))

    act(() => callback([{ isIntersecting: false }]))
    expect(result.current).toBe(false)

    act(() => callback([{ isIntersecting: true }]))
    expect(result.current).toBe(true)
  })
})

describe('usePageVisible', () => {
  afterEach(() => {
    Object.defineProperty(document, 'hidden', { value: false, configurable: true })
  })

  it('reports false when the tab is backgrounded', () => {
    const { result } = renderHook(() => usePageVisible())
    expect(result.current).toBe(true)

    act(() => {
      Object.defineProperty(document, 'hidden', { value: true, configurable: true })
      document.dispatchEvent(new Event('visibilitychange'))
    })
    expect(result.current).toBe(false)
  })
})

describe('usePrefersReducedMotion', () => {
  afterEach(() => mockMatchMedia(false))

  it('reflects the OS preference', () => {
    mockMatchMedia(true)
    expect(renderHook(() => usePrefersReducedMotion()).result.current).toBe(true)
    mockMatchMedia(false)
    expect(renderHook(() => usePrefersReducedMotion()).result.current).toBe(false)
  })
})
