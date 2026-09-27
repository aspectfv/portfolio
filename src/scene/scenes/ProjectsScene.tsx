import { ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'
import { MODELS } from '../models'
import { Lantern } from '../props/Lantern'
import { Prop } from '../props/Prop'
import { Rise } from '../props/Rise'
import { Ground } from '../props/Ground'
import { Workshop } from '../props/Workshop'
import type { SceneProps } from '../StripView'
import { useDiorama } from '../useDiorama'
import { useSpot } from '../useSpot'
import { ambientActors } from '@/scenery/ambient'

const sawdust = ambientActors.projectsSawdust
const lantern = ambientActors.projectsLantern

/** Pixels per world unit at the ground, at the desktop capture. */
const PX = 75

/**
 * Scatter. Every model here is one of the kit's, placed by hand on the yard.
 * The Survival and Fantasy Town pieces are built at half the Nature Kit's
 * scale, so they are placed at about twice their size to stand beside a tree
 * and a person at the same proportion.
 */
const trees = [
  { url: MODELS.oak, position: [-4.6, 0, -1.5], scale: 1.05, rotation: 0.4 },
  { url: MODELS.treeRound, position: [4.7, 0, -1.6], scale: 1.0, rotation: 1.2 },
  { url: MODELS.treeFat, position: [-2.5, 0, -1.9], scale: 1.1, rotation: 2.1 },
  { url: MODELS.treeSimple, position: [6.2, 0, -1.2], scale: 1.0, rotation: 0.7 },
  { url: MODELS.treeRound, position: [-6.3, 0, -1.0], scale: 0.9, rotation: 2.6 },
  { url: MODELS.oak, position: [2.4, 0, -2.0], scale: 0.9, rotation: -0.8 },
  { url: MODELS.bush, position: [-6.1, 0, 0.6], scale: 1.3, rotation: 0.3 },
  { url: MODELS.bushLarge, position: [5.9, 0, -0.1], scale: 1.3, rotation: -1.1 },
  { url: MODELS.bush, position: [3.3, 0, -1.4], scale: 1.2, rotation: 2.0 },
  { url: MODELS.hedge, position: [-5.3, 0, -1.2], scale: 1.6, rotation: 0 },
  { url: MODELS.treeSimple, position: [-7.7, 0, -0.8], scale: 1.0, rotation: 1.9 },
  { url: MODELS.oak, position: [7.8, 0, -1.4], scale: 0.95, rotation: 0.3 },
  { url: MODELS.bush, position: [-7.3, 0, 1.2], scale: 1.2, rotation: 2.4 },
  { url: MODELS.grass, position: [7.1, 0, 1.5], scale: 1.0, rotation: 0.8 },
] as const

const yard = [
  { url: MODELS.fence, position: [-3.6, 0, 1.7], scale: 1.0, rotation: 0 },
  { url: MODELS.fence, position: [-2.6, 0, 1.7], scale: 1.0, rotation: 0 },
  { url: MODELS.planks, position: [2.0, 0, 0.6], scale: 2.0, rotation: 0.25 },
  { url: MODELS.timber, position: [2.9, 0, 1.3], scale: 2.0, rotation: -0.5 },
  { url: MODELS.treeLog, position: [3.6, 0, 0.2], scale: 1.6, rotation: 1.25 },
  { url: MODELS.log, position: [4.3, 0, 1.4], scale: 1.5, rotation: 0.4 },
  { url: MODELS.logs, position: [4.9, 0, 0.3], scale: 0.9, rotation: 0.6 },
  { url: MODELS.stump, position: [5.4, 0, 1.4], scale: 1.1, rotation: 1.0 },
  { url: MODELS.axe, position: [5.7, 0, 1.2], scale: 2.0, rotation: 0.5 },
  { url: MODELS.workbench, position: [-1.8, 0, 0.9], scale: 2.0, rotation: 0.3 },
  { url: MODELS.hammer, position: [-1.72, 0.58, 0.88], scale: 2.0, rotation: 1.2 },
  { url: MODELS.boxLarge, position: [-3.1, 0, 0.2], scale: 2.0, rotation: 0.15 },
  { url: MODELS.box, position: [-3.1, 0.5, 0.2], scale: 2.0, rotation: 0.4 },
  { url: MODELS.barrel, position: [-4.1, 0, 0.9], scale: 2.0, rotation: 0.8 },
  { url: MODELS.barrel, position: [-4.5, 0, 0.1], scale: 2.0, rotation: 2.0 },
  { url: MODELS.bucket, position: [-1.1, 0, 1.5], scale: 2.0, rotation: 0.6 },
  { url: MODELS.cart, position: [4.0, 0, -0.6], scale: 1.6, rotation: -0.55 },
  { url: MODELS.wheel, position: [1.35, 0, 0.75], scale: 1.6, rotation: 0.25 },
  { url: MODELS.grassLarge, position: [0.9, 0, 1.7], scale: 0.9, rotation: 0.5 },
  { url: MODELS.grass, position: [-5.9, 0, 1.4], scale: 1.0, rotation: 1.4 },
  { url: MODELS.grass, position: [-0.2, 0, 1.95], scale: 0.9, rotation: 2.2 },
] as const

/**
 * Projects: the workshop, and the yard where the timber is cut.
 *
 * Afternoon. The key comes in lower and warmer than About's, from the right,
 * so every stack and barrel throws a shadow across the yard, and the window is
 * the first thing on the page lit from inside: the day is getting on and
 * somebody is still working.
 *
 * On the band rather than adrift: the yard stands on the section's own
 * colour, with nothing under it but shadow. On desktop this strip bleeds both
 * edges, so the yard runs the full width under the cards with the workshop
 * near the middle, and a phone sees the workshop and the nearest stacks.
 */
export function ProjectsScene({ host, active, parallax, noticed, onNoticed }: SceneProps) {
  const group = useDiorama(host, { active, parallax, bob: 0, yaw: 0, period: 10 })
  const workshop = useRef<Group>(null)
  // The workshop is this strip's focal object: point at it and the window
  // brightens, held for as long as the pointer stays.
  const pointedAt = useSpot(host, workshop, { radius: 64, onEnter: onNoticed })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0.3, 3.2, 7.2]}
        fov={30}
        onUpdate={(camera) => camera.lookAt(0, 0.8, 0)}
      />
      <hemisphereLight args={['#7ec4f2', '#c98a4b', 1.3]} />
      <directionalLight
        position={[5, 4.2, 4]}
        intensity={1.9}
        color="#f7b85a"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#7ec4f2" />

      <group ref={group}>
        <Ground />
        {/* Packed earth in front of the door, where the work happens: a patch
            worn into the band, not a floor laid on it. */}
        <mesh position={[-0.6, 0.008, 0.9]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[1.5, 8]} />
          <meshStandardMaterial color="#efdcb8" flatShading roughness={1} />
        </mesh>

        <group ref={workshop} position={[0.4, 0, -0.5]}>
          <Workshop rotation={-0.18} noticed={pointedAt || noticed} animate={active} px={PX} />
        </group>
        <Lantern
          position={[-0.7, 0, 0.45]}
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

        {/* Sawdust off the bench, adrift in the afternoon light. */}
        <Rise
          actor={sawdust}
          px={PX}
          size={0.05}
          color="#e8cf9c"
          animate={active}
          spots={[
            [-2.1, 0.7, 0.8],
            [-1.6, 0.75, 1.1],
            [-1.9, 0.65, 0.6],
            [-1.4, 0.7, 0.9],
            [-2.3, 0.8, 1.2],
          ]}
        />

        <ContactShadows
          position={[0, 0.02, 0]}
          opacity={0.3}
          scale={15}
          blur={2.2}
          far={2.4}
          resolution={512}
          color="#3c2a18"
        />
      </group>
    </>
  )
}
