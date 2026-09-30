import { ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'
import { MODELS } from '../models'
import { Lantern } from '../props/Lantern'
import { Floor } from '../props/Floor'
import { Prop } from '../props/Prop'
import { Rise } from '../props/Rise'
import { Stream } from '../props/Stream'
import { Workshop } from '../props/Workshop'
import type { SceneProps } from '../StripView'
import { useAnchor } from '../useAnchor'
import { useDiorama } from '../useDiorama'
import { useSpot } from '../useSpot'
import { ambientActors } from '@/scenery/ambient'

const sawdust = ambientActors.projectsSawdust
const lantern = ambientActors.projectsLantern
const stream = ambientActors.projectsStream

/** Pixels per world unit at the ground, at the desktop capture. */
const PX = 85

/**
 * The yard, gathered around the workshop. The Survival and Fantasy Town
 * pieces are built at half the Nature Kit's scale, so they are placed at
 * about twice their size to stand beside a tree and a person at the same
 * proportion.
 */
const trees = [
  { url: MODELS.oak, position: [-2.6, 0, -1.6], scale: 1.0, rotation: 0.4 },
  { url: MODELS.treeRound, position: [0.9, 0, -2.0], scale: 0.95, rotation: 1.2 },
  { url: MODELS.treeFat, position: [-3.1, 0, -0.2], scale: 0.85, rotation: 2.1 },
  { url: MODELS.bush, position: [-0.4, 0, -1.9], scale: 1.2, rotation: 0.3 },
  { url: MODELS.bushLarge, position: [3.0, 0, -0.9], scale: 1.0, rotation: -1.1 },
] as const

/** The near bank: the yard, where the timber is worked. */
const yard = [
  { url: MODELS.workbench, position: [1.0, 0, 0.95], scale: 1.9, rotation: 0.35 },
  { url: MODELS.hammer, position: [1.08, 0.55, 0.93], scale: 1.9, rotation: 1.2 },
  { url: MODELS.bucket, position: [0.35, 0, 1.5], scale: 1.8, rotation: 0.6 },
  { url: MODELS.planks, position: [2.2, 0, 0.35], scale: 1.9, rotation: 0.25 },
  { url: MODELS.timber, position: [2.7, 0, 1.1], scale: 1.9, rotation: -0.5 },
  { url: MODELS.treeLog, position: [2.9, 0, -0.2], scale: 1.5, rotation: 1.25 },
  { url: MODELS.logs, position: [1.7, 0, 1.6], scale: 0.85, rotation: 0.6 },
  { url: MODELS.stump, position: [2.35, 0, -0.75], scale: 1.0, rotation: 1.0 },
  { url: MODELS.axe, position: [2.55, 0, -0.95], scale: 1.9, rotation: 0.5 },
  { url: MODELS.wheel, position: [0.15, 0, 0.55], scale: 1.5, rotation: 0.25 },
  { url: MODELS.grass, position: [-0.6, 0, 1.75], scale: 0.9, rotation: 0.5 },
] as const

/** The far bank: the workshop's side, and what waits by its door. */
const bank = [
  { url: MODELS.boxLarge, position: [-2.6, 0, 0.55], scale: 1.9, rotation: 0.15 },
  { url: MODELS.box, position: [-2.6, 0.48, 0.55], scale: 1.9, rotation: 0.4 },
  { url: MODELS.barrel, position: [-2.05, 0, 0.95], scale: 1.9, rotation: 0.8 },
  { url: MODELS.fence, position: [-2.2, 0, -1.55], scale: 0.9, rotation: 0.05 },
  { url: MODELS.grassLarge, position: [-1.4, 0, 0.95], scale: 0.8, rotation: 2.2 },
] as const

/**
 * Projects: the workshop, and the yard where the timber is cut.
 *
 * Afternoon. The key comes in lower and warmer than About's, from the right,
 * so every stack and barrel throws a shadow across the yard, and the window is
 * the first thing on the page lit from inside: the day is getting on and
 * somebody is still working.
 *
 * One object: low ground in the band's own warm tone, cut by a stream. The
 * workshop stands on the far bank and the yard works the near one, and the
 * footbridge between them is the route the timber takes. A stream is what a
 * sawmill stands beside, and it is what keeps this place from being another
 * flat pad with a building on it.
 */
export function ProjectsScene({ host, active, parallax, noticed, onNoticed }: SceneProps) {
  const group = useDiorama(host, { active, parallax, bob: 0, yaw: 0, period: 10 })
  const workshop = useRef<Group>(null)
  // The workshop is this strip's focal object: point at it and the window
  // brightens, held for as long as the pointer stays.
  const pointedAt = useSpot(host, workshop, { radius: 64, onEnter: onNoticed })
  // Right of centre, under the space the last card leaves beside it.
  const shift = useAnchor({ target: 2.8, reach: 3.9, distance: 8.3, fov: 30 })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0.3 - shift, 2.9, 7.8]}
        fov={30}
        onUpdate={(camera) => camera.lookAt(-shift, 0.85, 0)}
      />
      <hemisphereLight args={['#7ec4f2', '#c98a4b', 1.3]} />
      <directionalLight
        position={[5, 4.2, 4]}
        intensity={1.9}
        color="#f7b85a"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#7ec4f2" />

      <group ref={group}>
        <Floor shade="#6b4429" opacity={0.18} />
        <Stream
          length={5.6}
          rotation={-0.42}
          actor={stream}
          glints={[-2.3, -1.6, -0.9, 0.6, 1.3, 2.1]}
          bridgeAt={-0.2}
          animate={active}
        />

        <group ref={workshop} position={[-1.15, 0, -0.85]}>
          <Workshop rotation={0.28} noticed={pointedAt || noticed} animate={active} px={PX} />
        </group>
        <Lantern
          position={[-0.35, 0, -0.05]}
          height={1.05}
          level={0.55}
          flicker={lantern}
          power={1.2}
          animate={active}
        />

        {trees.map((prop) => (
          <Prop key={`${prop.position[0]}:${prop.position[2]}`} {...prop} />
        ))}
        {yard.map((prop) => (
          <Prop key={`${prop.position[0]}:${prop.position[1]}:${prop.position[2]}`} {...prop} />
        ))}
        {bank.map((prop) => (
          <Prop key={`${prop.position[0]}:${prop.position[1]}:${prop.position[2]}`} {...prop} />
        ))}

        {/* Sawdust off the bench, adrift in the afternoon light. */}
        <Rise
          actor={sawdust}
          px={PX}
          size={0.05}
          color="#e8cf9c"
          animate={active}
          spots={[
            [0.8, 0.7, 0.8],
            [1.2, 0.75, 1.1],
            [0.9, 0.65, 0.6],
            [1.4, 0.7, 0.9],
            [0.6, 0.8, 1.2],
          ]}
        />

        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.3}
          scale={7}
          blur={2.2}
          far={2.4}
          resolution={512}
          color="#3c2a18"
        />
      </group>
    </>
  )
}
