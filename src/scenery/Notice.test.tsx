import { act, render } from '@testing-library/react'
import App from '@/App'
import { noticeReactions } from './noticeReactions'
import { mockMatchMedia } from '@/test/setup'

/**
 * Notice is the one motion pattern on this site that a visitor triggers on a
 * decorative object, which is the combination most likely to go wrong: a
 * decoration that acknowledges you is one step from a decoration that carries
 * information, or that moves for someone who asked the page to stay still.
 *
 * Nothing here proves the world feels like it notices you; only a person
 * pointing at it does that. These make the known ways of getting it wrong
 * impossible to author by accident.
 */

const notices = (root: HTMLElement) => [...root.querySelectorAll('[data-notice]')]

afterEach(() => {
  mockMatchMedia(false)
  document.documentElement.dataset.view = 'game'
})

describe('notice roster', () => {
  it('gives every band exactly one focal object', () => {
    const perBand = new Map<string, string[]>()

    for (const [name, reaction] of Object.entries(noticeReactions)) {
      perBand.set(reaction.band, [...(perBand.get(reaction.band) ?? []), name])
    }

    // Five bands, five objects. A uniform reaction on every prop is a page you
    // poke at rather than one you read, so the cap is one, not three.
    expect([...perBand.keys()].sort()).toEqual(['canvas', 'dusk', 'meadow', 'sand', 'sky'])
    for (const [band, names] of perBand) {
      expect(names.length, `${band} carries ${names.join(', ')}`).toBe(1)
    }
  })
})

describe('notice on the page', () => {
  it('reacts on every band, and only on decoration', () => {
    const { container } = render(<App />)
    const targets = notices(container)

    expect(targets).toHaveLength(Object.keys(noticeReactions).length)

    for (const target of targets) {
      const reaction = target.getAttribute('data-notice') ?? ''
      // Decorative by construction: the ornament layer is what plain view
      // deletes wholesale, and nothing inside it may say anything.
      expect(target.closest('[data-ornament]'), reaction).not.toBeNull()
      expect(target.textContent, reaction).toBe('')
    }
  })

  it('holds a tapped reaction, then returns to rest', () => {
    vi.useFakeTimers()
    try {
      const { container } = render(<App />)
      const target = notices(container)[0]!
      expect(target).not.toHaveAttribute('data-tapped')

      act(() => target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })))
      expect(target).toHaveAttribute('data-tapped')

      act(() => void vi.advanceTimersByTime(1000))
      expect(target).not.toHaveAttribute('data-tapped')
    } finally {
      vi.useRealTimers()
    }
  })

  it('is absent under reduced motion', () => {
    mockMatchMedia(true)
    const { container } = render(<App />)
    expect(notices(container)).toHaveLength(0)
  })

  it('is absent in plain view', () => {
    document.documentElement.dataset.view = 'plain'
    const { container } = render(<App />)
    expect(notices(container)).toHaveLength(0)
  })
})
