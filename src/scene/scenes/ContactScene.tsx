import { PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { MODELS } from '../models'
import { Dock } from '../props/Dock'
import { Fireflies } from '../props/Fireflies'
import { Lantern } from '../props/Lantern'
import { Prop } from '../props/Prop'
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
const PX = 85

/** The shore's surface. The islet stands this far above the water. */
const SHORE = 0.14
/** The deck's surface above the water. */
const DECK = 0.42

/** On the islet, the left third of the pond. */
const shore = [
  { url: MODELS.treeSimple, position: [-2.7, SHORE, -1.0], scale: 0.9, rotation: 0.4 },
  { url: MODELS.treeFat, position: [-1.9, SHORE, -1.3], scale: 0.85, rotation: 1.6 },
  { url: MODELS.bushLarge, position: [-2.6, SHORE, 0.1], scale: 0.85, rotation: 0.8 },
  { url: MODELS.bush, position: [-1.6, SHORE, -0.6], scale: 0.8, rotation: 2.9 },
  { url: MODELS.stone, position: [-2.9, SHORE, -0.5], scale: 0.7, rotation: 0.5 },
  { url: MODELS.log, position: [-2.4, SHORE, 0.75], scale: 0.75, rotation: 0.9 },
  { url: MODELS.barrel, position: [-1.85, SHORE, 0.45], scale: 1.2, rotation: 0.3 },
  { url: MODELS.signpostSingle, position: [-1.2, SHORE, -1.1], scale: 1.3, rotation: 0.35 },
  { url: MODELS.fishingStand, position: [-1.35, SHORE, 0.9], scale: 1.2, rotation: -0.5 },
] as const

/** On the deck: what someone fishing at dusk has beside them. */
const deck = [
  { url: MODELS.box, position: [-0.35, DECK, -0.28], scale: 0.8, rotation: 0.2 },
  { url: MODELS.bucket, position: [0.25, DECK, -0.3], scale: 0.85, rotation: 1.0 },
] as const

/** In the water: pads a little proud of the surface. */
const shallows = [
  { url: MODELS.lilyLarge, position: [0.8, 0.02, 1.4], scale: 0.9, rotation: 0.3 },
  { url: MODELS.lilySmall, position: [1.7, 0.02, 1.6], scale: 0.9, rotation: 1.9 },
  { url: MODELS.lilyLarge, position: [2.7, 0.02, 0.2], scale: 0.8, rotation: 2.4 },
  { url: MODELS.lilySmall, position: [-0.3, 0.02, 1.3], scale: 0.85, rotation: 0.7 },
] as const

/** The reeds at the water's edge, swaying together as one actor. */
const rushes = [
  { url: MODELS.reeds, position: [-1.0, SHORE, 0.3], scale: 0.55, rotation: 0.3 },
  { url: MODELS.reeds, position: [-0.85, 0.0, -0.8], scale: 0.5, rotation: 1.4 },
  { url: MODELS.grassLeafs, position: [-0.7, 0.0, 1.0], scale: 0.9, rotation: 0.6 },
  { url: MODELS.grassLeafs, position: [-0.95, SHORE, -0.35], scale: 0.9, rotation: 1.7 },
] as const

/** Where the light lands on the water: kept off the dock and the islet. */
const glints = [
  [0.4, 1.1],
  [1.3, 0.85],
  [2.0, 1.25],
  [2.6, 0.5],
  [2.9, -0.4],
  [1.7, -1.1],
  [2.4, -1.4],
  [0.9, -1.35],
  [1.1, 1.7],
] as const

/**
 * Contact: the dock at dusk, where the trail ends.
 *
 * The sun is low behind the far bank, so the key comes warm from behind and
 * the shadows fill with the band's blue. The lantern on the end post is the
 * one warm light in the near ground and the water catches it; point at it or
 * tap the strip and it comes all the way up. The traveller sits on the deck
 * edge with their feet over the water: they arrived by the boat moored beside
 * them, and this is as far as the route goes.
 *
 * One object: a pond in the band's own blue with a stone rim, the islet in
 * its left third and the dock reaching from it across the water. It stands
 * beside the copy the way the island stands beside the hero.
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
        position={[0.3, 3.3, 7.0]}
        fov={30}
        onUpdate={(camera) => camera.lookAt(0, 0.3, 0)}
      />
      <hemisphereLight args={['#dff0fa', '#8fa7c4', 1.2]} />
      <directionalLight
        position={[4, 2.6, -6]}
        intensity={1.5}
        color="#f5b76a"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
      />
      {/* A little of the sky bouncing back off the water, so the near faces
          are dusk-blue rather than black. */}
      <directionalLight position={[-3, 2, 5]} intensity={0.45} color="#7ec4f2" />

      <group ref={group}>
        <Water
          radius={3.1}
          stretch={[1.15, 0.8]}
          rotation={0.25}
          actor={shimmer}
          glints={glints}
          color="#8fc3e6"
          glint="#ffffff"
          rim="#6e7787"
          animate={active}
        />

        {/* The islet: a hand above the water, its rim going under it. */}
        <group position={[-2.1, 0, -0.1]} scale={[1.2, 1, 1.0]}>
          <mesh position={[0, SHORE - 0.07, 0]} receiveShadow>
            <cylinderGeometry args={[1.5, 1.4, 0.14, 8]} />
            <meshStandardMaterial color="#6fbf57" flatShading roughness={1} />
          </mesh>
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[1.4, 1.25, 0.14, 8]} />
            <meshStandardMaterial color="#7a4d31" flatShading roughness={1} />
          </mesh>
        </group>

        <Dock position={[-1.0, 0, 0]} length={2.4} width={1.0} height={DECK} />

        {/* The end post's lantern, at the origin the spot test aims at. */}
        <group ref={focal} position={[1.15, DECK + 0.78, -0.36]}>
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
        <group position={[0.65, DECK, 0.34]} rotation={[0, 0.25, 0]}>
          <Traveller pose="seated" />
        </group>

        {/* Moored beside the dock, riding its own small swell. */}
        <group ref={canoe} position={[2.05, 0.02, 0.75]} rotation={[0, 0.35, 0]}>
          <Prop url={MODELS.canoe} position={[0, 0, 0]} scale={0.85} rotation={0} />
          <Prop url={MODELS.paddle} position={[0.15, 0.16, 0.05]} scale={0.85} rotation={1.2} />
        </group>

        {/* A float marking the channel, on its own slower rhythm. */}
        <group ref={float} position={[2.5, 0, -1.15]}>
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
            [-1.3, 0.55, 0.8],
            [-0.6, 0.4, 1.5],
            [-1.8, 0.7, -0.5],
            [0.3, 0.3, 1.7],
            [2.2, 0.35, 1.3],
          ]}
        />
      </group>
    </>
  )
}
