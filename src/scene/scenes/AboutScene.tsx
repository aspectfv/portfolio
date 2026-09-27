import { ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { MODELS } from '../models'
import { Butterflies } from '../props/Butterflies'
import { Island } from '../props/Island'
import { Prop } from '../props/Prop'
import { Rise } from '../props/Rise'
import { Trailhead } from '../props/Trailhead'
import { Traveller } from '../props/Traveller'
import type { SceneProps } from '../StripView'
import { useDiorama } from '../useDiorama'
import { useSpot } from '../useSpot'
import { ambientActors, period } from '@/scenery/ambient'

const shard = ambientActors.aboutShard
const foliage = ambientActors.aboutFoliage
const grass = ambientActors.aboutGrass
const adrift = ambientActors.aboutAdrift
const leaves = ambientActors.aboutLeaves

/** Pixels per world unit at the ground, at the desktop capture. */
const PX = 75

/** Scatter. Every model here is one of the kit's, placed by hand on the cap. */
const trees = [
  { url: MODELS.oak, position: [-3.0, 0.03, -0.6], scale: 1.0, rotation: 0.4 },
  { url: MODELS.treeRound, position: [2.9, 0.03, -0.9], scale: 0.95, rotation: 1.2 },
  { url: MODELS.tree, position: [-1.9, 0.03, -1.15], scale: 0.85, rotation: 2.4 },
  { url: MODELS.pineTall, position: [3.6, 0.03, 0.1], scale: 0.8, rotation: 0.9 },
  { url: MODELS.treeSmall, position: [-3.5, 0.03, 0.5], scale: 0.9, rotation: -0.6 },
  { url: MODELS.pine, position: [1.9, 0.03, -1.25], scale: 0.8, rotation: 1.7 },
  { url: MODELS.treeSmall, position: [3.2, 0.03, -1.5], scale: 0.8, rotation: 0.2 },
  { url: MODELS.bush, position: [-2.4, 0.03, 0.55], scale: 1.0, rotation: 0.3 },
  { url: MODELS.bushLarge, position: [2.2, 0.03, 0.65], scale: 0.9, rotation: -1.1 },
  { url: MODELS.bush, position: [1.1, 0.03, -1.0], scale: 0.85, rotation: 2.0 },
] as const

const grasses = [
  { url: MODELS.grassLarge, position: [-1.3, 0.03, 0.2], scale: 0.9, rotation: 0.5 },
  { url: MODELS.grass, position: [2.7, 0.03, 0.3], scale: 1.0, rotation: 1.4 },
  { url: MODELS.grassLarge, position: [0.9, 0.03, 0.9], scale: 0.8, rotation: -0.7 },
  { url: MODELS.grass, position: [-3.0, 0.03, 1.1], scale: 0.9, rotation: 2.2 },
  { url: MODELS.grass, position: [-0.2, 0.03, -1.3], scale: 0.95, rotation: 0.1 },
] as const

const still = [
  { url: MODELS.flowerRed, position: [-1.25, 0.03, 0.95], scale: 1.0, rotation: 0.2 },
  { url: MODELS.flowerYellow, position: [1.55, 0.03, 1.05], scale: 1.0, rotation: 1.1 },
  { url: MODELS.flowerPurple, position: [-2.85, 0.03, 1.05], scale: 1.0, rotation: 2.6 },
  { url: MODELS.flowerYellow, position: [2.6, 0.03, -0.25], scale: 0.9, rotation: -0.4 },
  { url: MODELS.rockB, position: [2.55, 0.03, 1.25], scale: 1.1, rotation: 0.7 },
  { url: MODELS.stone, position: [-3.7, 0.03, -0.9], scale: 0.9, rotation: 1.9 },
  { url: MODELS.rock, position: [0.85, 0.03, 1.35], scale: 1.0, rotation: 2.8 },
  { url: MODELS.mushrooms, position: [-1.65, 0.03, 1.25], scale: 1.0, rotation: 0.6 },
  { url: MODELS.stump, position: [1.4, 0.03, -0.45], scale: 1.0, rotation: 1.3 },
  { url: MODELS.logs, position: [2.0, 0.03, 0.15], scale: 0.7, rotation: -0.9 },
  { url: MODELS.fence, position: [-2.35, 0.03, -0.45], scale: 0.9, rotation: 0.25 },
  { url: MODELS.fence, position: [-1.55, 0.03, -0.55], scale: 0.9, rotation: 0.25 },
  { url: MODELS.pathStone, position: [0.2, 0.03, 1.25], scale: 0.8, rotation: 0.3 },
  { url: MODELS.pathStone, position: [0.35, 0.03, 0.75], scale: 0.8, rotation: -0.5 },
  { url: MODELS.pathStone, position: [0.5, 0.03, 0.25], scale: 0.8, rotation: 0.4 },
] as const

/**
 * About: the trailhead, on the only island left in the world.
 *
 * Late morning. The key sits higher and a shade paler than the hero's, the
 * same cool sky fills the shadows, and the shard is the tie to the island
 * directly above it: same lit cap, same soil rim, same dark underside. The
 * two are close enough on the page that severing the tie would make the hero
 * look imported from a different project.
 *
 * Camera and composition are wider than any viewport shows. A wide screen
 * sees more of the sides; a phone sees the middle, where the board and the
 * traveller stand.
 */
export function AboutScene({ host, active, parallax, noticed, onNoticed }: SceneProps) {
  const group = useDiorama(host, {
    active,
    parallax,
    bob: shard.travel / PX,
    yaw: (shard.rotation * Math.PI) / 180,
    period: period(shard),
  })
  const traveller = useRef<Group>(null)
  const canopy = useRef<Group>(null)
  const blades = useRef<Group>(null)
  const drifting = useRef<Group>(null)
  // The traveller is this strip's focal object: point at them and they wave.
  const pointedAt = useSpot(host, traveller, { radius: 56, onEnter: onNoticed })

  useFrame((state) => {
    if (!active) return
    const t = state.clock.getElapsedTime()
    const sway = (deg: number, seconds: number, phase = 0) =>
      Math.sin((t * 2 * Math.PI) / seconds + phase) * ((deg * Math.PI) / 180)
    if (canopy.current) canopy.current.rotation.z = sway(foliage.rotation, period(foliage))
    if (blades.current) blades.current.rotation.z = sway(grass.rotation, period(grass), 1.3)
    if (drifting.current) {
      drifting.current.position.y =
        -1.1 + Math.sin((t * 2 * Math.PI) / period(adrift)) * (adrift.travel / PX)
    }
  })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0.3, 3.0, 8.4]}
        fov={30}
        onUpdate={(camera) => camera.lookAt(0, -0.4, 0)}
      />
      <hemisphereLight args={['#7ec4f2', '#c98a4b', 1.5]} />
      <directionalLight
        position={[3, 8, 4]}
        intensity={2.0}
        color="#f8cf7a"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      <directionalLight position={[-4, 2, -3]} intensity={0.5} color="#7ec4f2" />

      <group ref={group}>
        <Island stretch={[2.3, 1.15]} />

        <Trailhead position={[0.45, 0.03, -0.15]} rotation={-0.15} animate={active} />
        <group ref={traveller} position={[-0.55, 0.03, 0.55]} rotation={[0, 0.35, 0]}>
          <Traveller waving={pointedAt || noticed} />
        </group>

        {/* Foliage sways as one actor about the ground. */}
        <group ref={canopy}>
          {trees.map((prop) => (
            <Prop key={`${prop.position[0]}:${prop.position[2]}`} {...prop} />
          ))}
        </group>
        <group ref={blades}>
          {grasses.map((prop) => (
            <Prop key={`${prop.position[0]}:${prop.position[2]}`} {...prop} />
          ))}
        </group>
        {still.map((prop) => (
          <Prop key={`${prop.position[0]}:${prop.position[2]}`} {...prop} />
        ))}

        <Rise
          actor={leaves}
          px={PX}
          size={0.09}
          color="#4e9c41"
          animate={active}
          spots={[
            [-3.1, 0.5, 0.2],
            [-2.0, 0.9, 0.9],
            [-0.9, 0.7, -0.8],
            [0.3, 1.1, 0.6],
            [1.4, 0.6, 1.0],
            [2.3, 1.0, -0.5],
            [3.2, 0.7, 0.4],
            [-1.4, 1.3, 1.3],
          ]}
        />
        <Butterflies animate={active} />

        <ContactShadows
          position={[0, 0.02, 0]}
          opacity={0.3}
          scale={12}
          blur={2.2}
          far={2}
          resolution={512}
          color="#3c2a18"
        />
      </group>

      {/* A piece adrift behind, on its own slower rhythm. A single object hangs
          in space; two of them at different speeds read as floating. */}
      <group ref={drifting} position={[3.6, -1.1, -2.4]} rotation={[Math.PI - 0.3, 0.5, 0.2]}>
        <mesh>
          <coneGeometry args={[0.32, 0.6, 6]} />
          <meshStandardMaterial color="#7a4d31" flatShading roughness={1} />
        </mesh>
        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.36, 0.32, 0.1, 6]} />
          <meshStandardMaterial color="#6fbf57" flatShading roughness={1} />
        </mesh>
      </group>
    </>
  )
}
