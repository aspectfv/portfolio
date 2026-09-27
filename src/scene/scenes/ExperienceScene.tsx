import { ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'
import { MODELS } from '../models'
import { Brazier } from '../props/Brazier'
import { Fireflies } from '../props/Fireflies'
import { Prop } from '../props/Prop'
import { Rise } from '../props/Rise'
import { Slab } from '../props/Slab'
import { Standard } from '../props/Standard'
import { Watchpost } from '../props/Watchpost'
import type { SceneProps } from '../StripView'
import { useDiorama } from '../useDiorama'
import { useSpot } from '../useSpot'
import { ambientActors } from '@/scenery/ambient'

const embers = ambientActors.experienceEmbers
const smoke = ambientActors.experienceSmoke
const fireflies = ambientActors.experienceFireflies

/** Pixels per world unit at the ground, at the desktop capture. */
const PX = 75

/** Where the fire stands; the embers and the smoke rise from the same spot. */
const fire = [0.75, 0, 0.55] as const

/** Scatter. Every model here is one of the kit's, placed by hand on the ground. */
const treeline = [
  { url: MODELS.pineTallB, position: [-4.3, 0, -1.5], scale: 1.0, rotation: 0.4 },
  { url: MODELS.coneDark, position: [-3.1, 0, -1.9], scale: 0.9, rotation: 1.3 },
  { url: MODELS.pineTall, position: [2.9, 0, -1.95], scale: 0.9, rotation: 2.2 },
  { url: MODELS.coneDark, position: [3.9, 0, -1.6], scale: 1.0, rotation: -0.5 },
  { url: MODELS.pineB, position: [4.5, 0, -0.5], scale: 0.85, rotation: 0.9 },
  { url: MODELS.pineTallB, position: [-4.6, 0, 0.4], scale: 0.85, rotation: 2.6 },
] as const

const camp = [
  { url: MODELS.tentCanvas, position: [-3.35, 0, 0.35], scale: 1.4, rotation: 0.55 },
  { url: MODELS.bedroll, position: [-2.45, 0, 1.05], scale: 1.3, rotation: -0.4 },
  { url: MODELS.box, position: [-2.85, 0, -0.85], scale: 1.2, rotation: 0.3 },
  { url: MODELS.barrel, position: [-2.25, 0, -1.15], scale: 1.2, rotation: 1.1 },
  { url: MODELS.bucket, position: [1.35, 0, 1.15], scale: 1.2, rotation: 0.8 },
  { url: MODELS.log, position: [-0.45, 0, 1.3], scale: 0.7, rotation: 0.25 },
  { url: MODELS.treeLog, position: [1.85, 0, 1.4], scale: 1.2, rotation: -1.2 },
  { url: MODELS.signpostSingle, position: [3.35, 0, 0.9], scale: 1.3, rotation: -0.35 },
  { url: MODELS.fenceFortified, position: [-0.9, 0, -1.75], scale: 1.3, rotation: 0.08 },
  { url: MODELS.fenceFortified, position: [0.7, 0, -1.8], scale: 1.3, rotation: -0.06 },
  { url: MODELS.fenceFortified, position: [2.2, 0, -1.65], scale: 1.3, rotation: 0.35 },
] as const

const ground = [
  { url: MODELS.stoneTall, position: [3.0, 0, 0.15], scale: 0.8, rotation: 0.6 },
  { url: MODELS.stone, position: [-0.25, 0, 1.75], scale: 0.7, rotation: 1.9 },
  { url: MODELS.rockB, position: [2.35, 0, 1.6], scale: 1.0, rotation: 0.7 },
  { url: MODELS.stone, position: [-4.35, 0, 1.4], scale: 0.9, rotation: 2.8 },
  { url: MODELS.stumpOld, position: [-1.15, 0, 1.85], scale: 0.9, rotation: 1.3 },
  { url: MODELS.mushrooms, position: [4.0, 0, 1.55], scale: 0.9, rotation: 0.6 },
  { url: MODELS.grassLeafs, position: [-1.9, 0, 1.6], scale: 0.9, rotation: 0.5 },
  { url: MODELS.grassLeafs, position: [3.6, 0, -0.7], scale: 0.9, rotation: 2.2 },
  { url: MODELS.grassLeafs, position: [0.1, 0, -1.2], scale: 0.8, rotation: 1.0 },
  { url: MODELS.grassLeafs, position: [-3.9, 0, -0.6], scale: 0.8, rotation: -0.7 },
] as const

/**
 * Experience: the outpost, at night.
 *
 * No sun. A cold moon from behind the trees and a low blue fill are all the
 * sky gives; the brazier and the watchpost's lantern are the lights, and the
 * ground, the tower and the standard are seen by them. That is what makes the
 * night band a night rather than a dark daytime.
 *
 * The watchpost is the marker: tall and narrow, somewhere you were posted.
 * The brazier is the focal object and the strip's Notice, held: point at it
 * and the fire flares.
 */
export function ExperienceScene({ host, active, parallax, noticed, onNoticed }: SceneProps) {
  const group = useDiorama(host, { active, parallax, bob: 0, yaw: 0, period: 10 })
  const brazier = useRef<Group>(null)
  const pointedAt = useSpot(host, brazier, { radius: 56, onEnter: onNoticed })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0.3, 3.9, 9.4]}
        fov={30}
        onUpdate={(camera) => camera.lookAt(0, 0.95, 0)}
      />
      <hemisphereLight args={['#2b3a55', '#0f1520', 0.85]} />
      {/* The moon: cool, dim, from behind and to the left, so the lit side of
          everything is the fire's side. */}
      <directionalLight
        position={[-4, 6, -3]}
        intensity={0.35}
        color="#7ec4f2"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={5}
        shadow-camera-bottom={-4}
      />

      <group ref={group}>
        <Slab size={[10.4, 4.6]} top="#3f7a3a" side="#4a3020" />

        <Watchpost position={[-1.55, 0, -0.55]} rotation={0.18} animate={active} />
        <Standard position={[1.95, 0, -0.45]} rotation={-0.3} animate={active} />
        <group ref={brazier} position={[...fire]}>
          <Brazier rotation={0.4} noticed={pointedAt || noticed} animate={active} />
        </group>

        {treeline.map((prop) => (
          <Prop key={`${prop.position[0]}:${prop.position[2]}`} {...prop} />
        ))}
        {camp.map((prop) => (
          <Prop key={`${prop.position[0]}:${prop.position[2]}`} {...prop} />
        ))}
        {ground.map((prop) => (
          <Prop key={`${prop.position[0]}:${prop.position[2]}`} {...prop} />
        ))}

        {/* Off the fire: embers first, smoke above them */}
        <Rise
          actor={embers}
          px={PX}
          size={0.045}
          color="#ff8c3a"
          emissive="#ffb347"
          animate={active}
          spots={[
            [fire[0] - 0.08, 0.95, fire[2] + 0.05],
            [fire[0] + 0.1, 1.0, fire[2] - 0.08],
            [fire[0] - 0.02, 1.1, fire[2] + 0.12],
            [fire[0] + 0.14, 0.9, fire[2] + 0.1],
            [fire[0] - 0.14, 1.05, fire[2] - 0.04],
            [fire[0] + 0.04, 1.15, fire[2] - 0.12],
          ]}
        />
        <Rise
          actor={smoke}
          px={PX}
          size={0.09}
          color="#3a4150"
          puff
          animate={active}
          spots={[
            [fire[0] + 0.02, 1.3, fire[2]],
            [fire[0] - 0.07, 1.45, fire[2] + 0.06],
            [fire[0] + 0.08, 1.6, fire[2] - 0.05],
            [fire[0] - 0.03, 1.75, fire[2] + 0.02],
          ]}
        />

        <Fireflies
          actor={fireflies}
          px={PX}
          animate={active}
          spots={[
            [-3.9, 0.55, 1.2],
            [-2.6, 0.4, 1.7],
            [-0.8, 0.7, 1.55],
            [2.6, 0.45, 1.3],
            [3.7, 0.65, 0.5],
            [4.1, 0.35, 1.7],
            [-3.6, 0.8, -1.0],
          ]}
        />

        <ContactShadows
          position={[0, 0.005, 0]}
          opacity={0.55}
          scale={12}
          blur={2.0}
          far={3}
          resolution={512}
          color="#05080f"
        />
      </group>
    </>
  )
}
