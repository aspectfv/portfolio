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
 * Decorative: the scene carries no information, so neither does this.
 */
export function SceneFallback({ image }: { image: SceneImage }) {
  return (
    <img
      src={image.src}
      alt=""
      aria-hidden="true"
      width={image.width}
      height={image.height}
      className="h-full w-full object-contain"
    />
  )
}
