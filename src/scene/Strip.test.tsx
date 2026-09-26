import { act, render, screen } from '@testing-library/react'
import { SceneFallback } from '@/components/SceneFallback'
import { SceneBoundary } from '@/scene/SceneBoundary'
import { Strip } from '@/scene/Strip'
import { World } from '@/scene/World'
import { stills } from '@/scene/stills'
import { mockMatchMedia } from '@/test/setup'

/**
 * jsdom provides no WebGL context, so the capability gate fails here exactly as
 * it would on a device without WebGL. That makes the fallback path the default
 * under test, which is the path that has to be right.
 */
function mount(ui: React.ReactNode) {
  return render(<World>{ui}</World>)
}

describe('Strip', () => {
  afterEach(() => mockMatchMedia(false))

  it('renders the still when WebGL is unavailable', () => {
    const { container } = mount(<Strip scene="about" />)
    const image = container.querySelector('img')
    expect(image).toHaveAttribute('src', stills.about.wide.src)
    expect(container.querySelector('canvas')).toBeNull()
  })

  it('renders the still when the visitor prefers reduced motion', () => {
    mockMatchMedia(true)
    const { container } = mount(<Strip scene="hero" />)
    expect(container.querySelector('img')).toBeInTheDocument()
    expect(container.querySelector('canvas')).toBeNull()
  })

  it('reserves the box it is given, so nothing shifts whichever path runs', () => {
    const { container } = mount(<Strip scene="hero" className="aspect-square w-full" />)
    const root = container.firstElementChild!
    expect(root.className).toContain('aspect-square')
    expect(root.className).toContain('w-full')
  })

  it('is decorative: hidden from assistive tech and never a tab stop', () => {
    const { container } = mount(<Strip scene="hero" />)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
    expect(container.firstElementChild).toHaveAttribute('data-ornament')
    expect(screen.queryByRole('img')).toBeNull()
    expect(container.querySelector('[tabindex]:not([tabindex="-1"])')).toBeNull()
  })

  it('serves the compact still when the narrow composition is active', () => {
    mockMatchMedia(true) // matches every query, including the compact breakpoint
    const { container } = mount(<Strip scene="about" />)
    expect(container.querySelector('img')).toHaveAttribute('src', stills.about.compact.src)
  })

  it('gives the still empty alt text and intrinsic dimensions', () => {
    const { container } = mount(<Strip scene="about" />)
    const image = container.querySelector('img')!
    expect(image).toHaveAttribute('alt', '')
    expect(image).toHaveAttribute('width', String(stills.about.wide.width))
    expect(image).toHaveAttribute('height', String(stills.about.wide.height))
  })

  it('is the Notice surface for its reaction, and holds a tap', () => {
    vi.useFakeTimers()
    try {
      const { container } = mount(<Strip scene="about" reaction="wave" />)
      const root = container.firstElementChild!
      expect(root).toHaveAttribute('data-notice', 'wave')
      expect(root).not.toHaveAttribute('data-tapped')

      act(() => root.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true })))
      expect(root).toHaveAttribute('data-tapped')

      act(() => void vi.advanceTimersByTime(1000))
      expect(root).not.toHaveAttribute('data-tapped')
    } finally {
      vi.useRealTimers()
    }
  })

  it('notices nothing without a reaction, or under reduced motion', () => {
    const { container: hero } = mount(<Strip scene="hero" />)
    expect(hero.firstElementChild).not.toHaveAttribute('data-notice')

    mockMatchMedia(true)
    const { container: about } = mount(<Strip scene="about" reaction="wave" />)
    expect(about.firstElementChild).not.toHaveAttribute('data-notice')
  })
})

describe('SceneBoundary', () => {
  it('falls back to the still instead of taking the page down with it', () => {
    // A rejected lazy import throws during render. Unhandled, it unmounts the
    // whole tree; the page would go blank because a decoration failed.
    const Boom = () => {
      throw new Error('chunk failed to load')
    }
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { container } = render(
      <SceneBoundary fallback={<SceneFallback image={stills.hero.wide} />}>
        <Boom />
      </SceneBoundary>,
    )
    expect(container.querySelector('img')).toHaveAttribute('src', stills.hero.wide.src)
    spy.mockRestore()
  })
})
