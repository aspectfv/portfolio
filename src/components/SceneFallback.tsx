export interface SceneImage {
  readonly src: string
  readonly width: number
  readonly height: number
}

/**
 * The static stand-in for a scene that is not going to run; reduced motion, no
 * WebGL, or still loading. Intrinsic dimensions are declared so the box is
 * reserved before the bytes arrive and nothing shifts whichever path runs.
 *
 * Covers its box rather than fitting inside it: a strip's box follows the
 * viewport and the still has one fixed aspect, and a strip with a gap at
 * each end is a picture on the band rather than a place in it. The scene it
 * stands in for is composed the same way, wider than any box shows.
 *
 * Decorative: the scene carries no information, so neither does this.
 */
export function SceneFallback({
  image,
  priority = false,
}: {
  image: SceneImage
  /**
   * Above the fold and likely the largest paint on a phone, so it is fetched
   * ahead of everything else. Every other still waits until its strip is
   * near the viewport, so it never competes with the one that decides LCP.
   */
  priority?: boolean
}) {
  return (
    <img
      src={image.src}
      alt=""
      aria-hidden="true"
      width={image.width}
      height={image.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      className="h-full w-full object-cover"
    />
  )
}
