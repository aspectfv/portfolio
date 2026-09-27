import { View } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { Suspense, useRef, type RefObject } from 'react'
import { AboutScene } from './scenes/AboutScene'
import { ContactScene } from './scenes/ContactScene'
import { ExperienceScene } from './scenes/ExperienceScene'
import { HeroScene } from './scenes/HeroScene'
import { ProjectsScene } from './scenes/ProjectsScene'
import { SkillsScene } from './scenes/SkillsScene'
import type { SceneName } from './stills'

export type SceneProps = {
  /** The strip element. Pointer listeners go here; the canvas never gets them. */
  host: RefObject<HTMLDivElement | null>
  /** On screen and foregrounded; off, the scene skips its frame work. */
  active: boolean
  /** The narrow composition: tighter camera, fewer props. */
  compact: boolean
  /** A fine pointer exists, so leaning toward it means something. */
  parallax: boolean
  /** The strip was tapped; the focal object reacts as if pointed at. */
  noticed: boolean
  /** The focal object was pointed at. Absent when the strip has no reaction. */
  onNoticed?: (() => void) | undefined
}

const scenes: Record<SceneName, (props: SceneProps) => React.JSX.Element> = {
  hero: HeroScene,
  about: AboutScene,
  projects: ProjectsScene,
  skills: SkillsScene,
  experience: ExperienceScene,
  contact: ContactScene,
}

/**
 * One scene's view, cut out of the shared canvas to the strip it sits in.
 *
 * The Suspense here is the one that matters for models: it holds inside the
 * view, so a strip whose kit is still arriving leaves the other strips
 * drawing. `FirstFrame` sits behind the same boundary and therefore fires
 * only once everything the scene needs has loaded and been drawn once.
 */
export function StripView({
  scene,
  onFirstFrame,
  ...props
}: SceneProps & { scene: SceneName; onFirstFrame: () => void }) {
  const Scene = scenes[scene]

  return (
    <View className="absolute inset-0">
      <Suspense fallback={null}>
        <Scene {...props} />
        <FirstFrame onFirstFrame={onFirstFrame} />
      </Suspense>
    </View>
  )
}

/**
 * Reports the frame after the view has drawn. Priority 2 runs after the view's
 * own render at 1, so by the time the still is pulled out from under the
 * canvas there are pixels in its place.
 */
function FirstFrame({ onFirstFrame }: { onFirstFrame: () => void }) {
  const done = useRef(false)
  useFrame(() => {
    if (done.current) return
    done.current = true
    onFirstFrame()
  }, 2)
  return null
}
