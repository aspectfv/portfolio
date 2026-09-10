import { render, screen, act } from '@testing-library/react'
import { Reveal } from '@/components/Reveal'

/**
 * The reveal must never be able to hide content permanently. Its hidden state
 * lives in CSS behind a no-preference media query, so these tests cover the
 * JS half: the content is always in the DOM, and the observer only ever adds
 * the revealed marker.
 */
describe('Reveal', () => {
  let callback: (entries: { isIntersecting: boolean; target: Element }[]) => void
  let disconnected: boolean

  beforeEach(() => {
    disconnected = false
    vi.stubGlobal(
      'IntersectionObserver',
      class {
        constructor(cb: typeof callback) {
          callback = cb
        }
        observe() {}
        unobserve() {}
        disconnect() {
          disconnected = true
        }
        takeRecords() {
          return []
        }
      },
    )
  })

  it('renders its children immediately, before any observer fires', () => {
    render(<Reveal>content</Reveal>)
    expect(screen.getByText('content')).toBeInTheDocument()
  })

  it('marks itself revealed once it intersects', () => {
    const { container } = render(<Reveal>content</Reveal>)
    const node = container.firstElementChild!
    expect(node).not.toHaveAttribute('data-revealed')

    act(() => callback([{ isIntersecting: true, target: node }]))
    expect(node).toHaveAttribute('data-revealed')
  })

  it('stays unrevealed while off screen', () => {
    const { container } = render(<Reveal>content</Reveal>)
    const node = container.firstElementChild!
    act(() => callback([{ isIntersecting: false, target: node }]))
    expect(node).not.toHaveAttribute('data-revealed')
  })

  it('reveals outright when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    const { container } = render(<Reveal>content</Reveal>)
    expect(container.firstElementChild).toHaveAttribute('data-revealed')
  })

  it('disconnects on unmount', () => {
    const { unmount } = render(<Reveal>content</Reveal>)
    unmount()
    expect(disconnected).toBe(true)
  })
})
