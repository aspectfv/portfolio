import { renderHook, act } from '@testing-library/react'
import { useInView } from '@/hooks/useInView'
import { usePageVisible } from '@/hooks/usePageVisible'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { useViewMode } from '@/hooks/useViewMode'
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

/**
 * The document element is the store, because an inline script in index.html
 * sets `data-view` before first paint. A second source of truth inside React
 * would let the DOM and the component disagree for one render about which view
 * the visitor is actually looking at.
 */
describe('useViewMode', () => {
  afterEach(() => {
    delete document.documentElement.dataset.view
    localStorage.clear()
  })

  it('defaults to game view when the bootstrap set nothing', () => {
    const { result } = renderHook(() => useViewMode())
    expect(result.current[0]).toBe('game')
  })

  it('reads the mode the bootstrap already applied rather than its own default', () => {
    document.documentElement.dataset.view = 'plain'
    const { result } = renderHook(() => useViewMode())
    expect(result.current[0]).toBe('plain')
  })

  it('writes through to the document and to storage, so a reload keeps the choice', () => {
    const { result } = renderHook(() => useViewMode())
    act(() => result.current[1]('plain'))
    expect(document.documentElement.dataset.view).toBe('plain')
    expect(localStorage.getItem('view-mode')).toBe('plain')
    expect(result.current[0]).toBe('plain')
  })

  it('still switches the view when storage throws, losing only the memory of it', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage disabled')
    })
    const { result } = renderHook(() => useViewMode())
    act(() => result.current[1]('plain'))
    expect(document.documentElement.dataset.view).toBe('plain')
    spy.mockRestore()
  })
})
