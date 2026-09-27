import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { MODELS } from '../models'
import { Dock } from '../props/Dock'
import { Fireflies } from '../props/Fireflies'
import { Lantern } from '../props/Lantern'
import { Prop } from '../props/Prop'
import { Slab } from '../props/Slab'
import { Traveller } from '../props/Traveller'
import { Water } from '../props/Water'
import type { SceneProps } from '../StripView'
import { useDiorama } from '../useDiorama'
import { useSpot } from '../useSpot'
import { ambientActors, period } from '@/scenery/ambient'

const shimmer = ambientActors.contactShimmer
const boat = ambientActors.contactBoat
const lantern = ambientActors.contactLantern
const reeds = ambientActors.contactReeds
const fireflies = ambientActors.contactFireflies
const buoy = ambientActors.contactBuoy

/** Pixels per world unit at the ground, at the desktop capture. */
const PX = 75

/** The shore's surface. The slab stands this far above the water. */
const SHORE = 0.12
/** The deck's surface above the water. */
const DECK = 0.42

/** Scatter on the shore, the left third. Every model is one of the kit's. */
const shore = [
  { url: MODELS.treeSimple, position: [-4.0, SHORE, -1.3], scale: 1.0, rotation: 0.4 },
  { url: MODELS.treeFat, position: [-2.7, SHORE, -1.5], scale: 0.95, rotation: 1.6 },
  { url: MODELS.treeSimple, position: [-4.4, SHORE, 0.6], scale: 0.85, rotation: 2.3 },
  { url: MODELS.bushLarge, position: [-3.4, SHORE, -0.3], scale: 0.9, rotation: 0.8 },
  { url: MODELS.bush, position: [-2.1, SHORE, -0.9], scale: 0.9, rotation: 2.9 },
  { url: MODELS.bush, position: [-4.1, SHORE, 1.6], scale: 0.8, rotation: 1.1 },
  { url: MODELS.stone, position: [-3.8, SHORE, -0.6], scale: 0.7, rotation: 0.5 },
  { url: MODELS.log, position: [-3.1, SHORE, 1.1], scale: 0.8, rotation: 0.9 },
  { url: MODELS.barrel, position: [-2.4, SHORE, 0.7], scale: 1.3, rotation: 0.3 },
  { url: MODELS.signpostSingle, position: [-1.6, SHORE, -1.2], scale: 1.4, rotation: 0.35 },
  { url: MODELS.fishingStand, position: [-1.7, SHORE, 1.2], scale: 1.3, rotation: -0.5 },
  { url: MODELS.pathStone, position: [-2.6, SHORE, 0.1], scale: 0.7, rotation: 0.2 },
  { url: MODELS.pathStone, position: [-1.9, SHORE, 0.0], scale: 0.7, rotation: -0.6 },
] as const

/** On the deck: what someone fishing at dusk has beside them. */
const deck = [
  { url: MODELS.box, position: [-0.55, DECK, -0.28], scale: 0.8, rotation: 0.2 },
  { url: MODELS.bucket, position: [0.05, DECK, -0.3], scale: 0.85, rotation: 1.0 },
  { url: MODELS.bottle, position: [0.62, DECK, 0.1], scale: 0.8, rotation: 0.4 },
] as const

/** In the water: pads and stones a little proud of the surface. */
const shallows = [
  { url: MODELS.lilyLarge, position: [1.1, 0.02, 1.7], scale: 0.9, rotation: 0.3 },
  { url: MODELS.lilySmall, position: [2.1, 0.02, 1.9], scale: 0.9, rotation: 1.9 },
  { url: MODELS.lilyLarge, position: [3.9, 0.02, 0.6], scale: 0.8, rotation: 2.4 },
  { url: MODELS.lilySmall, position: [-0.4, 0.02, 1.5], scale: 0.85, rotation: 0.7 },
  { url: MODELS.rock, position: [-1.35, 0.0, 1.55], scale: 1.0, rotation: 1.2 },
  { url: MODELS.rockB, position: [3.3, 0.0, -1.6], scale: 1.1, rotation: 0.6 },
] as const

/** The reeds at the water's edge, swaying together as one actor. */
const rushes = [
  { url: MODELS.reeds, position: [-1.4, SHORE, 0.35], scale: 0.55, rotation: 0.3 },
  { url: MODELS.reeds, position: [-1.15, 0.0, -0.75], scale: 0.5, rotation: 1.4 },
  { url: MODELS.reeds, position: [-1.55, 0.0, 1.75], scale: 0.5, rotation: 2.2 },
  { url: MODELS.grassLeafs, position: [-1.0, 0.0, 1.05], scale: 0.9, rotation: 0.6 },
  { url: MODELS.grassLeafs, position: [-1.3, SHORE, -0.35], scale: 0.9, rotation: 1.7 },
  { url: MODELS.grassLeafs, position: [-2.3, SHORE, 1.55], scale: 0.85, rotation: 2.5 },
] as const

/** Where the light lands on the water: kept off the dock and the shore. */
const glints = [
  [0.4, 1.3],
  [1.3, 0.95],
  [2.0, 1.45],
  [2.6, 0.2],
  [3.1, 1.15],
  [3.7, -0.45],
  [4.3, 0.85],
  [1.7, -1.4],
  [2.5, -1.95],
  [3.6, -1.05],
  [0.9, -1.75],
  [4.6, -1.6],
  [-0.6, 2.15],
  [1.5, 2.3],
] as const

/**
 * Contact: the dock at dusk, where the trail ends.
 *
 * The sun is already behind the far bank, so the key comes low and warm from
 * behind and the shadows fill with violet. The lantern on the end post is the
 * one warm light in the near ground and the water catches it; point at it or
 * tap the strip and it comes all the way up. The traveller sits on the deck
 * edge with their feet over the water: they arrived by the boat moored beside
 * them, and this is as far as the route goes.
 *
 * The shore holds the left third and the dock reaches from it out over open
 * water, so a phone, which sees the middle, still gets the dock end, the
 * lantern and the figure.
 */
export function ContactScene({ host, active, parallax, noticed, onNoticed }: SceneProps) {
  const group = useDiorama(host, { active, parallax, bob: 0, yaw: 0, period: 10 })
  const focal = useRef<Group>(null)
  const canoe = useRef<Group>(null)
  const float = useRef<Group>(null)
  const rush = useRef<Group>(null)
  // The lantern is this strip's focal object: point at it and it comes up.
  const pointedAt = useSpot(host, focal, { radius: 56, onEnter: onNoticed })

  useFrame((state) => {
    if (!active) return
    const t = state.clock.getElapsedTime()
    if (canoe.current) {
      const turn = (t * 2 * Math.PI) / period(boat)
      canoe.current.position.y = 0.02 + Math.sin(turn) * (boat.travel / PX)
      canoe.current.rotation.z = Math.sin(turn + 1.1) * ((boat.rotation * Math.PI) / 180)
    }
    if (float.current) {
      float.current.position.y = Math.sin((t * 2 * Math.PI) / period(buoy)) * (buoy.travel / PX)
    }
    if (rush.current) {
      rush.current.rotation.z =
        Math.sin((t * 2 * Math.PI) / period(reeds)) * ((reeds.rotation * Math.PI) / 180)
    }
  })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0.3, 3.2, 8.4]}
        fov={30}
        onUpdate={(camera) => camera.lookAt(0, 0.2, 0)}
      />
      <hemisphereLight args={['#6a5a9a', '#3a4a6a', 0.9]} />
      {/* The sun, already down behind the far bank: low, warm, from behind. */}
      <directionalLight
        position={[4, 2.4, -6]}
        intensity={1.5}
        color="#f08a5d"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      {/* A little of the sky bouncing back off the water, so the near faces
          are dusk-blue rather than black. */}
      <directionalLight position={[-3, 2, 5]} intensity={0.35} color="#7ec4f2" />

      <group ref={group}>
        <Water
          size={[22, 12]}
          position={[0, 0, 1.2]}
          actor={shimmer}
          glints={glints}
          color="#3d8dc2"
          glint="#f2d6c2"
          animate={active}
        />

        <Slab size={[4.6, 4.8]} top="#6fbf57" side="#7a4d31" position={[-3.5, SHORE, 0]} />

        <Dock position={[-1.35, 0, 0]} length={2.8} width={1.0} height={DECK} />

        {/* The end post's lantern, at the origin the spot test aims at. */}
        <group ref={focal} position={[1.16, DECK + 0.78, -0.36]}>
          <Lantern
            position={[0, -0.78, 0]}
            height={0.98}
            level={pointedAt || noticed ? 1 : 0.35}
            flicker={lantern}
            power={2.6}
            animate={active}
          />
        </group>

        {/* Seated on the deck edge, feet over the water. */}
        <group position={[0.7, DECK, 0.34]} rotation={[0, 0.25, 0]}>
          <Traveller pose="seated" />
        </group>

        {/* Moored beside the dock, riding its own small swell. */}
        <group ref={canoe} position={[2.35, 0.02, 0.75]} rotation={[0, 0.35, 0]}>
          <Prop url={MODELS.canoe} position={[0, 0, 0]} scale={0.9} rotation={0} />
          <Prop url={MODELS.paddle} position={[0.15, 0.16, 0.05]} scale={0.9} rotation={1.2} />
        </group>

        {/* A float marking the channel, on its own slower rhythm. */}
        <group ref={float} position={[3.7, 0, -1.25]}>
          <mesh position={[0, 0.06, 0]} castShadow>
            <cylinderGeometry args={[0.16, 0.12, 0.16, 6]} />
            <meshStandardMaterial color="#e8552b" flatShading roughness={1} />
          </mesh>
          <mesh position={[0, 0.2, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.14, 6]} />
            <meshStandardMaterial color="#e8cf9c" flatShading roughness={1} />
          </mesh>
          <mesh position={[0, 0.31, 0]}>
            <coneGeometry args={[0.07, 0.09, 4]} />
            <meshStandardMaterial color="#e8552b" flatShading roughness={1} />
          </mesh>
        </group>

        <group ref={rush}>
          {rushes.map((prop) => (
            <Prop key={`${prop.position[0]}:${prop.position[2]}`} {...prop} />
          ))}
        </group>
        {shore.map((prop) => (
          <Prop key={`${prop.position[0]}:${prop.position[2]}`} {...prop} />
        ))}
        {deck.map((prop) => (
          <Prop key={`${prop.position[0]}:${prop.position[2]}`} {...prop} />
        ))}
        {shallows.map((prop) => (
          <Prop key={`${prop.position[0]}:${prop.position[2]}`} {...prop} />
        ))}

        <Fireflies
          actor={fireflies}
          px={PX}
          animate={active}
          spots={[
            [-1.6, 0.55, 0.9],
            [-0.9, 0.4, 1.9],
            [-2.1, 0.7, -0.6],
            [0.3, 0.3, 2.1],
            [-1.2, 0.5, -1.5],
            [2.9, 0.35, 1.6],
          ]}
        />
      </group>
    </>
  )
}
