import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'

/**
 * The hero scene. M4 establishes the canvas, lighting rig and asset loading;
 * M5 composes the actual diorama.
 *
 * Flat-shaded, faceted, warm key plus cool hemisphere fill — no HDRI, no PBR
 * realism, no postprocessing, per docs/DESIGN.md.
 */
function Tree({ active }: { active: boolean }) {
  const group = useRef<Group>(null)
  const { scene } = useGLTF('/models/tree.glb')

  useFrame((state) => {
    if (!active || !group.current) return
    // Idle sway driven by the clock, never by frame count — the motion stays
    // the same speed whatever the frame rate.
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = Math.sin(t * 0.3) * 0.15
    group.current.position.y = Math.sin(t * 0.8) * 0.04
  })

  return (
    <group ref={group}>
      <primitive object={scene} scale={1.55} position={[0, -1.35, 0]} />
    </group>
  )
}

export function HeroScene({ active }: { active: boolean }) {
  return (
    <Canvas
      // never: no render loop at all while off-screen or backgrounded.
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [3.6, 2.2, 5.0], fov: 38 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      // A <canvas> is not in the tab order by default, and Stage marks the whole
      // subtree aria-hidden — so nothing extra is needed to keep it out of the
      // way of keyboard and screen-reader users.
      style={{ outline: 'none' }}
    >
      {/* Warm key plus cool hemisphere fill, and nothing else. drei's
          Environment presets fetch an HDRI from a CDN, which both breaks the
          flat-shaded art direction and adds an external request. */}
      <hemisphereLight args={['#7ec4f2', '#8a5a3b', 1.6]} />
      <directionalLight position={[4, 6, 3]} intensity={2.4} color="#f5b23e" />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#7ec4f2" />
      <Tree active={active} />
    </Canvas>
  )
}

useGLTF.preload('/models/tree.glb')
