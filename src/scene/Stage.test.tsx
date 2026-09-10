import { render, screen } from '@testing-library/react'
import { Stage } from '@/scene/Stage'
import { heroSceneImage } from '@/scene/heroSceneImage'
import { mockMatchMedia } from '@/test/setup'

/**
 * jsdom provides no WebGL context, so the capability gate fails here exactly as
 * it would on a device without WebGL. That makes the fallback path the default
 * under test — which is the path that has to be right.
 */
describe('Stage', () => {
  afterEach(() => mockMatchMedia(false))

  it('renders the static image when WebGL is unavailable', () => {
    const { container } = render(<Stage />)
    const image = container.querySelector('img')
    expect(image).toHaveAttribute('src', heroSceneImage.src)
    expect(container.querySelector('canvas')).toBeNull()
  })

  it('renders the static image when the visitor prefers reduced motion', () => {
    mockMatchMedia(true)
    const { container } = render(<Stage />)
    expect(container.querySelector('img')).toBeInTheDocument()
    expect(container.querySelector('canvas')).toBeNull()
  })

  it('reserves the box it is given, so nothing shifts whichever path runs', () => {
    const { container } = render(<Stage className="aspect-square w-full" />)
    const root = container.firstElementChild!
    expect(root.className).toContain('aspect-square')
    expect(root.className).toContain('w-full')
  })

  it('is decorative: hidden from assistive tech and never a tab stop', () => {
    const { container } = render(<Stage />)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
    expect(screen.queryByRole('img')).toBeNull()
    expect(container.querySelector('[tabindex]:not([tabindex="-1"])')).toBeNull()
  })

  it('gives the fallback empty alt text — the scene carries no information', () => {
    const { container } = render(<Stage />)
    expect(container.querySelector('img')).toHaveAttribute('alt', '')
  })

  it('sets intrinsic dimensions on the fallback to prevent layout shift', () => {
    const { container } = render(<Stage />)
    const image = container.querySelector('img')!
    expect(image).toHaveAttribute('width', String(heroSceneImage.width))
    expect(image).toHaveAttribute('height', String(heroSceneImage.height))
  })
})
