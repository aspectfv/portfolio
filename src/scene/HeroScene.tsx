import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { ContactShadows, useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'
import { Island } from './props/Island'
import { Prop } from './props/Prop'
import { Workstation } from './props/Workstation'

const MODELS = {
  tree: '/models/tree.glb',
  pine: '/models/pine.glb',
  rock: '/models/rock.glb',
  grass: '/models/grass.glb',
  mushroom: '/models/mushroom.glb',
  logs: '/models/logs.glb',
} as const

/** Rotation ceiling for pointer parallax; a few pixels of apparent shift, no more. */
const PARALLAX = 0.075

function Diorama({
  active,
  compact,
  parallax,
}: {
  active: boolean
  compact: boolean
  parallax: boolean
}) {
  const group = useRef<Group>(null)
  const { pointer } = useThree()

  useFrame((state, delta) => {
    const node = group.current
    if (!active || !node) return

    // Idle bob and drift, driven by the clock so the motion is frame-rate
    // independent; the island floats at the same speed at 30fps and 120fps.
    const t = state.clock.getElapsedTime()
    node.position.y = Math.sin(t * 0.6) * 0.07
    const idleYaw = Math.sin(t * 0.22) * 0.09

    // Parallax eases toward the pointer instead of tracking it exactly, so a
    // fast mouse move reads as the island leaning rather than snapping.
    const targetYaw = idleYaw + (parallax ? pointer.x * PARALLAX : 0)
    const targetPitch = parallax ? -pointer.y * PARALLAX * 0.6 : 0
    const ease = 1 - Math.pow(0.001, delta)
    node.rotation.y += (targetYaw - node.rotation.y) * ease
    node.rotation.x += (targetPitch - node.rotation.x) * ease
  })

  return (
    <group ref={group}>
      <Island />
      <Workstation position={[-0.22, 0, 0.34]} rotation={0.42} scale={1.25} />
      <Prop url={MODELS.tree} position={[0.95, 0.04, -0.15]} scale={0.92} rotation={0.5} />
      <Prop url={MODELS.rock} position={[0.42, 0.02, 1.12]} scale={1.15} rotation={1.1} />
      <Prop url={MODELS.grass} position={[0.5, 0.03, 0.82]} scale={1.0} rotation={0.2} />

      {/* Density the 390px composition deliberately does without. */}
      {!compact && (
        <>
          <Prop url={MODELS.pine} position={[-1.32, 0.04, 0.18]} scale={0.82} rotation={-0.4} />
          <Prop url={MODELS.logs} position={[1.0, 0.03, 0.62]} scale={0.72} rotation={-0.9} />
          <Prop url={MODELS.mushroom} position={[-0.78, 0.03, 0.95]} scale={1.7} rotation={0.8} />
          <Prop url={MODELS.grass} position={[0.12, 0.03, -1.15]} scale={0.85} rotation={2.1} />
        </>
      )}

      <ContactShadows
        position={[0, 0.02, 0]}
        opacity={0.32}
        scale={5}
        blur={2.4}
        far={2}
        resolution={256}
        color="#3c2a18"
      />
    </group>
  )
}

/**
 * The hero diorama: a small floating island carrying a developer workstation.
 *
 * Flat shading, a warm key and a cool hemisphere fill, and nothing else; no
 * HDRI, no PBR maps, no postprocessing, per docs/DESIGN.md.
 */
export function HeroScene({
  active,
  compact = false,
  parallax = true,
}: {
  active: boolean
  compact?: boolean
  parallax?: boolean
}) {
  return (
    <Canvas
      // never: no render loop at all while off-screen or backgrounded.
      frameloop={active ? 'always' : 'never'}
      camera={{
        position: compact ? [4.3, 3.2, 5.7] : [4.5, 3.3, 6.0],
        fov: compact ? 40 : 36,
      }}
      dpr={[1, 1.75]}
      shadows
      gl={{ antialias: true, alpha: true }}
      // A <canvas> is not in the tab order by default, and Stage marks the whole
      // subtree aria-hidden, so nothing extra is needed to keep it out of the
      // way of keyboard and screen-reader users.
      style={{ outline: 'none' }}
    >
      <hemisphereLight args={['#7ec4f2', '#c98a4b', 1.7]} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={2.2}
        color="#f5b23e"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 1, -2]} intensity={0.6} color="#7ec4f2" />
      <group position={[0, compact ? 0.75 : 0.7, 0]}>
        <Diorama active={active} compact={compact} parallax={parallax} />
      </group>
    </Canvas>
  )
}

for (const url of Object.values(MODELS)) useGLTF.preload(url)
