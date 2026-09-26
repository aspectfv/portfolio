import { useEffect, useRef, useState } from 'react'
import { StripView } from './StripView'
import { WorldCanvas } from './WorldCanvas'
import { stills, type SceneName } from './stills'

/**
 * Every scene at its capture size, for scripts/render-stills.mjs.
 *
 * Development only; main.tsx mounts this in place of the app on /stills and
 * the production bundle never sees it. Each box declares which scene and
 * composition it holds and marks itself ready once the view has drawn, which
 * is what the script waits for before it screenshots the box.
 *
 * The page background is cleared so the capture keeps its alpha: a still is
 * composed over its band colour by the stylesheet, exactly as the live view
 * is, so the band tokens stay the only place that colour lives.
 */
export function StillsPage() {
  useEffect(() => {
    document.body.style.background = 'transparent'
  }, [])

  return (
    <div className="flex flex-col items-start gap-6 p-6">
      {(Object.keys(stills) as SceneName[]).map((scene) =>
        (['wide', 'compact'] as const).map((variant) => (
          <StillBox key={`${scene}-${variant}`} scene={scene} variant={variant} />
        )),
      )}
      <WorldCanvas running dpr={2} />
    </div>
  )
}

function StillBox({ scene, variant }: { scene: SceneName; variant: 'wide' | 'compact' }) {
  const host = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const { width, height } = stills[scene][variant]

  return (
    <div
      ref={host}
      data-still={scene}
      data-variant={variant}
      {...(ready ? { 'data-ready': '' } : {})}
      style={{ width, height }}
      className="relative shrink-0"
    >
      <StripView
        scene={scene}
        host={host}
        active
        compact={variant === 'compact'}
        parallax={false}
        noticed={false}
        onFirstFrame={() => setReady(true)}
      />
    </div>
  )
}
