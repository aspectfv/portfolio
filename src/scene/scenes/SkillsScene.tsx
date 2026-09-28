import { ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { MODELS } from '../models'
import { Bench } from '../props/Bench'
import { Chest } from '../props/Chest'
import { Lantern } from '../props/Lantern'
import { Plateau } from '../props/Plateau'
import { Prop } from '../props/Prop'
import { Rise } from '../props/Rise'
import type { SceneProps } from '../StripView'
import { useDiorama } from '../useDiorama'
import { useSpot } from '../useSpot'
import { type AmbientActor, ambientActors, period } from '@/scenery/ambient'

const lantern = ambientActors.skillsLantern
const dust = ambientActors.skillsDust
const palms = ambientActors.skillsPalms
const canvas = ambientActors.skillsCanvas
const pennant = ambientActors.skillsPennant
const steam = ambientActors.skillsSteam

/** Pixels per world unit at the ground, at the desktop capture. */
const PX = 85

/** The palms, swayed one by one about their own trunks. */
const palmStand = [
  { url: MODELS.palm, position: [-2.6, 0, -1.3], scale: 0.9, rotation: 0.6 },
  { url: MODELS.palmShort, position: [2.7, 0, -1.1], scale: 0.85, rotation: -1.2 },
  { url: MODELS.palm, position: [2.0, 0, -1.9], scale: 0.75, rotation: 2.1 },
] as const

/** The camp, gathered around the bench. Survival pieces at 1.4 to 1.7x. */
const still = [
  { url: MODELS.tentCanvas, position: [-1.9, 0, -0.9], scale: 1.6, rotation: 0.35 },
  { url: MODELS.bedroll, position: [-1.5, 0, 0.25], scale: 1.4, rotation: 1.25 },
  { url: MODELS.barrel, position: [1.75, 0, 0.5], scale: 1.4, rotation: 0.4 },
  { url: MODELS.barrel, position: [2.2, 0, 0.9], scale: 1.2, rotation: 1.9 },
  { url: MODELS.box, position: [-0.85, 0, -1.15], scale: 1.4, rotation: 0.3 },
  { url: MODELS.boxOpen, position: [-1.35, 0, -0.65], scale: 1.3, rotation: -0.4 },
  { url: MODELS.bucket, position: [0.55, 0, 1.05], scale: 1.4, rotation: 0.8 },
  { url: MODELS.bottle, position: [-0.15, 0, -0.85], scale: 1.4, rotation: 0.2 },
  { url: MODELS.axe, position: [-0.7, 0, -0.7], scale: 1.4, rotation: 1.1 },
  { url: MODELS.pickaxe, position: [2.4, 0, 0.15], scale: 1.4, rotation: -0.7 },
  { url: MODELS.shovel, position: [1.2, 0, -1.3], scale: 1.4, rotation: 0.5 },
  { url: MODELS.rockSandA, position: [2.75, 0, -0.4], scale: 1.4, rotation: 0.7 },
  { url: MODELS.rockSandB, position: [-2.8, 0, 0.4], scale: 1.3, rotation: 1.9 },
  { url: MODELS.cactus, position: [-2.55, 0, 1.15], scale: 0.85, rotation: 1.7 },
  { url: MODELS.grassLeafs, position: [1.0, 0, 1.55], scale: 1.0, rotation: 0.6 },
  { url: MODELS.grassLeafs, position: [-1.9, 0, 1.25], scale: 0.9, rotation: 2.2 },
  { url: MODELS.plantFlat, position: [2.5, 0, -1.6], scale: 0.9, rotation: 2.6 },
  { url: MODELS.pathStone, position: [-0.35, 0, 1.4], scale: 0.7, rotation: 0.4 },
] as const

/**
 * Skills: the work camp, at golden hour.
 *
 * A cluster rather than a single silhouette: the bench with the kit box on
 * it, the chest, the lantern, and everything a kit in use leaves lying
 * around. The sun sits a hand above the horizon on the left, so every object
 * throws a long shadow across the sand, and the lantern is already lit
 * against the hour that is coming.
 *
 * One object: a dune-coloured plateau a shade deeper than the band, the
 * camp gathered on it under the awning. It sits under the kit board with air
 * around it.
 */
export function SkillsScene({ host, active, parallax, noticed, onNoticed }: SceneProps) {
  const group = useDiorama(host, { active, parallax, bob: 0, yaw: 0, period: 10 })
  const chest = useRef<Group>(null)
  const trunks = useRef<Group>(null)
  const awning = useRef<Group>(null)
  const flag = useRef<Group>(null)
  // The chest is this strip's focal object: point at it and the lid lifts.
  const pointedAt = useSpot(host, chest, { radius: 56, onEnter: onNoticed })

  useFrame((state) => {
    if (!active) return
    const t = state.clock.getElapsedTime()
    const sway = (actor: AmbientActor, phase = 0) =>
      Math.sin((t * 2 * Math.PI) / period(actor) + phase) * ((actor.rotation * Math.PI) / 180)
    // Each palm about its own trunk, a beat apart, rather than the stand as one.
    trunks.current?.children.forEach((palm, index) => {
      palm.rotation.z = sway(palms, index * 1.7)
    })
    if (awning.current) awning.current.rotation.x = sway(canvas, 0.8)
    if (flag.current) flag.current.rotation.y = sway(pennant, 2.1)
  })

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={[0.3, 3.3, 7.0]}
        fov={30}
        onUpdate={(camera) => camera.lookAt(0, 0.7, 0)}
      />
      {/* Golden hour: the key a hand above the horizon on the left, warm
          bounce off the sand in the shadows, and a thread of sky from the
          right so the shaded sides are not mud. */}
      <hemisphereLight args={['#f7e0b0', '#c98a4b', 1.1]} />
      <directionalLight
        position={[-8, 2.8, 2.5]}
        intensity={2.4}
        color="#f5a03a"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[5, 3, -3]} intensity={0.35} color="#7ec4f2" />

      <group ref={group}>
        <Plateau radius={3.1} stretch={[1.15, 0.8]} top="#e6cf9a" rim="#c4a670" rotation={0.5} />

        {/* The cluster. */}
        <Bench position={[0.85, 0, 0.05]} rotation={-0.35}>
          <Rise
            actor={steam}
            px={PX}
            size={0.045}
            color="#f4efe6"
            puff
            animate={active}
            spots={[
              [0.38, 0.86, 0.06],
              [0.4, 0.92, 0.09],
              [0.36, 0.98, 0.04],
            ]}
          />
        </Bench>
        <group ref={chest} position={[-0.7, 0, 0.75]} rotation={[0, 0.4, 0]}>
          <Chest scale={1.7} open={pointedAt || noticed} />
        </group>
        <Lantern
          position={[0.05, 0, -0.35]}
          height={1.25}
          level={1}
          flicker={lantern}
          animate={active}
        />

        {/* An awning over the bench, on two poles, its canvas breathing about
            the ridge it hangs from. */}
        <group position={[1.05, 0, -0.55]} rotation={[0, -0.35, 0]}>
          {([-0.65, 0.65] as const).map((x) => (
            <mesh key={x} position={[x, 0.7, 0]} castShadow>
              <boxGeometry args={[0.05, 1.4, 0.05]} />
              <meshStandardMaterial color="#6b4429" flatShading roughness={1} />
            </mesh>
          ))}
          <mesh position={[0, 1.42, 0]} castShadow>
            <boxGeometry args={[1.5, 0.05, 0.05]} />
            <meshStandardMaterial color="#8a5a3b" flatShading roughness={1} />
          </mesh>
          <group ref={awning} position={[0, 1.42, 0.03]}>
            <mesh position={[0, -0.12, 0.42]} rotation={[0.28, 0, 0]} castShadow>
              <boxGeometry args={[1.5, 0.02, 0.9]} />
              <meshStandardMaterial color="#f1e9dc" flatShading roughness={1} side={2} />
            </mesh>
            <mesh position={[0, -0.109, 0.42]} rotation={[0.28, 0, 0]}>
              <boxGeometry args={[0.22, 0.022, 0.9]} />
              <meshStandardMaterial color="#e8552b" flatShading roughness={1} side={2} />
            </mesh>
          </group>
        </group>

        {/* A pennant by the tent, so the camp has a colour up high. */}
        <group position={[-2.35, 0, -0.2]}>
          <mesh position={[0, 0.8, 0]} castShadow>
            <boxGeometry args={[0.04, 1.6, 0.04]} />
            <meshStandardMaterial color="#6b4429" flatShading roughness={1} />
          </mesh>
          <group ref={flag} position={[0, 1.5, 0]}>
            <mesh position={[0.14, 0, 0]} castShadow>
              <boxGeometry args={[0.26, 0.13, 0.012]} />
              <meshStandardMaterial color="#e8552b" flatShading roughness={1} />
            </mesh>
          </group>
        </group>

        <group ref={trunks}>
          {palmStand.map((prop) => (
            <Prop key={`${prop.position[0]}:${prop.position[2]}`} {...prop} />
          ))}
        </group>
        {still.map((prop) => (
          <Prop key={`${prop.position[0]}:${prop.position[2]}`} {...prop} />
        ))}

        <Rise
          actor={dust}
          px={PX}
          size={0.05}
          color="#c4a670"
          animate={active}
          spots={[
            [-2.4, 0.35, 0.9],
            [-1.4, 0.6, 1.3],
            [-0.4, 0.4, 1.6],
            [0.5, 0.55, 1.4],
            [1.5, 0.35, 1.5],
            [2.4, 0.6, 1.1],
          ]}
        />

        <ContactShadows
          position={[0, 0.005, 0]}
          opacity={0.28}
          scale={7}
          blur={2.2}
          far={2}
          resolution={512}
          color="#6b4429"
        />
      </group>
    </>
  )
}
