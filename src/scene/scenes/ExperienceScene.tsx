import { ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'
import { MODELS } from '../models'
import { Brazier } from '../props/Brazier'
import { Crag } from '../props/Crag'
import { Fireflies } from '../props/Fireflies'
import { Plateau } from '../props/Plateau'
import { Prop } from '../props/Prop'
import { Rise } from '../props/Rise'
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
const PX = 85

/** The crag's tiers: the camp at the foot, the fire on the ledge, the tower on the summit. */
const TIERS = { ledge: 0.7, summit: 1.4 } as const

/** Where the fire stands; the embers and the smoke rise from the same spot. */
const fire = [0.55, TIERS.ledge, 0.35] as const

/** The trees, at the foot of the crag and on its far side. */
const treeline = [
  { url: MODELS.pineTallB, position: [2.6, 0, -1.6], scale: 0.95, rotation: 0.4 },
  { url: MODELS.coneDark, position: [3.0, 0, -0.5], scale: 0.85, rotation: 1.3 },
  { url: MODELS.pineTall, position: [-2.9, 0, 0.9], scale: 0.85, rotation: 2.2 },
  { url: MODELS.coneDark, position: [-3.1, 0, -0.3], scale: 0.8, rotation: -0.5 },
  { url: MODELS.pineB, position: [2.2, 0, 1.4], scale: 0.7, rotation: 0.9 },
] as const

/** The camp at the foot, where the climb starts. Survival pieces at 1.2 to 1.4x. */
const camp = [
  { url: MODELS.tentCanvas, position: [2.15, 0, 0.55], scale: 1.3, rotation: -0.9 },
  { url: MODELS.bedroll, position: [1.4, 0, 1.55], scale: 1.2, rotation: -0.4 },
  { url: MODELS.box, position: [-2.4, 0, 1.15], scale: 1.2, rotation: 0.3 },
  { url: MODELS.barrel, position: [-1.9, 0, 1.55], scale: 1.2, rotation: 1.1 },
  { url: MODELS.bucket, position: [0.35, 0, 1.75], scale: 1.2, rotation: 0.8 },
  { url: MODELS.log, position: [-0.6, 0, 1.7], scale: 0.7, rotation: 0.25 },
  { url: MODELS.signpostSingle, position: [1.75, 0, 1.05], scale: 1.3, rotation: -0.35 },
  { url: MODELS.stone, position: [2.75, 0, 0.9], scale: 0.7, rotation: 1.9 },
  { url: MODELS.rockB, position: [-2.85, 0, 1.75], scale: 1.0, rotation: 0.7 },
  { url: MODELS.grassLeafs, position: [-1.3, 0, 1.75], scale: 0.9, rotation: 0.5 },
  { url: MODELS.grassLeafs, position: [2.55, 0, 1.75], scale: 0.8, rotation: 1.0 },
] as const

/** On the ledge, around the fire. */
const ledge = [
  { url: MODELS.treeLog, position: [1.05, TIERS.ledge, 0.85], scale: 1.1, rotation: -1.2 },
  { url: MODELS.fenceFortified, position: [0.4, TIERS.ledge, -1.35], scale: 1.1, rotation: 0.08 },
  { url: MODELS.stoneTall, position: [-1.7, TIERS.ledge, 0.6], scale: 0.7, rotation: 0.6 },
  { url: MODELS.stumpOld, position: [-0.4, TIERS.ledge, 0.95], scale: 0.8, rotation: 1.3 },
] as const

/**
 * Experience: the outpost, at night.
 *
 * No sun. A cold moon from behind the trees and a low blue fill are all the
 * sky gives; the brazier and the watchpost's lantern are the lights, and the
 * ground, the tower and the standard are seen by them. That is what makes the
 * night band a night rather than a dark daytime.
 *
 * One object: a crag in the band's own blue-black, rising in three tiers. The
 * tower stands on the summit, the fire burns on the ledge below it, and the
 * camp waits at the foot where the steps begin. A watchpost is a place you
 * climb to, and the height is what keeps this from being a flat pad with a
 * tower on it. The rock is what the fire lights, so the pool of warmth on the
 * ground is the light itself and not a disc painted under it.
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
        position={[0.3, 4.3, 8.2]}
        fov={30}
        onUpdate={(camera) => camera.lookAt(0, 1.35, 0)}
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
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-4}
      />

      <group ref={group}>
        <Plateau radius={3.1} stretch={[1.15, 0.8]} top="#27344a" rim="#141c2b" rotation={0.4} />
        <Crag ledge={TIERS.ledge} summit={TIERS.summit} />

        <group position={[-1.15, TIERS.summit, -0.75]} scale={0.65}>
          <Watchpost rotation={0.18} animate={active} />
        </group>
        <Standard
          position={[-1.7, TIERS.ledge, -0.9]}
          rotation={-0.3}
          height={2.0}
          animate={active}
        />
        <group ref={brazier} position={[...fire]}>
          <Brazier rotation={0.4} noticed={pointedAt || noticed} animate={active} />
        </group>

        {treeline.map((prop) => (
          <Prop key={`${prop.position[0]}:${prop.position[2]}`} {...prop} />
        ))}
        {camp.map((prop) => (
          <Prop key={`${prop.position[0]}:${prop.position[2]}`} {...prop} />
        ))}
        {ledge.map((prop) => (
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
            [fire[0] - 0.08, fire[1] + 0.95, fire[2] + 0.05],
            [fire[0] + 0.1, fire[1] + 1.0, fire[2] - 0.08],
            [fire[0] - 0.02, fire[1] + 1.1, fire[2] + 0.12],
            [fire[0] + 0.14, fire[1] + 0.9, fire[2] + 0.1],
            [fire[0] - 0.14, fire[1] + 1.05, fire[2] - 0.04],
            [fire[0] + 0.04, fire[1] + 1.15, fire[2] - 0.12],
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
            [fire[0] + 0.02, fire[1] + 1.3, fire[2]],
            [fire[0] - 0.07, fire[1] + 1.45, fire[2] + 0.06],
            [fire[0] + 0.08, fire[1] + 1.6, fire[2] - 0.05],
            [fire[0] - 0.03, fire[1] + 1.75, fire[2] + 0.02],
          ]}
        />

        <Fireflies
          actor={fireflies}
          px={PX}
          animate={active}
          spots={[
            [-2.6, 0.55, 1.3],
            [-1.4, 0.4, 1.9],
            [-0.6, 1.3, 1.1],
            [1.9, 0.45, 1.9],
            [2.7, 0.65, 0.3],
            [-2.4, 1.7, -0.4],
          ]}
        />

        <ContactShadows
          position={[0, 0.005, 0]}
          opacity={0.5}
          scale={7}
          blur={2.0}
          far={3}
          resolution={512}
          color="#05080f"
        />
      </group>
    </>
  )
}
