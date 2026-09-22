import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import type { MeshStandardMaterial } from 'three'
import { NOTICE_HOLD } from '@/scenery/noticeReactions'

/**
 * An arcade cabinet, standing beside the desk.
 *
 * This is the object that carries the whole positioning: a workstation alone
 * reads "developer", and a workstation with a cabinet next to it reads
 * "developer who makes games". It is identity rather than decoration, which is
 * why it survives into the compact composition while density props do not.
 *
 * Built from boxes rather than sourced, for the same reason the desk is: every
 * man-made object here is code and every organic one comes from the kit, so a
 * cabinet from a different kit would arrive with different proportions and read
 * as imported.
 *
 * It is also the canvas's Notice target, and the only one: the flat world below
 * gives each band a single focal object, and the scene follows the same rule
 * rather than lighting up every prop on it. The screen brightens while it is
 * pointed at, and a tap holds that for the same beat a tapped prop downstairs
 * gets.
 */
export function ArcadeCabinet({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  scale = 1,
  animate = true,
}) {
  const screen = useRef<MeshStandardMaterial>(null)
  const [noticed, setNoticed] = useState(false)
  /** The eased brightness, so the screen comes up and goes down rather than switching. */
  const glow = useRef(0)

  // Touch has no leave event, so a tapped reaction is held for a fixed beat and
  // then released. A pointer that leaves first ends it sooner, which is what
  // the timer is cleaned up for.
  useEffect(() => {
    if (!noticed) return
    const timer = setTimeout(() => setNoticed(false), NOTICE_HOLD)
    return () => clearTimeout(timer)
  }, [noticed])

  // The attract-mode blink: the one ambient detail on the island that is not
  // motion. Slow and low-contrast on purpose; a fast blink beside body copy is
  // an accessibility problem, not charm.
  useFrame((state, delta) => {
    const material = screen.current
    if (!animate || !material) return
    const t = state.clock.getElapsedTime()
    glow.current += ((noticed ? 1 : 0) - glow.current) * (1 - Math.pow(0.002, delta))
    material.emissiveIntensity = 0.45 + Math.sin(t * 1.6) * 0.12 + glow.current * 0.85
  })

  return (
    <group
      position={position}
      rotation={[0, rotation, 0]}
      scale={scale}
      onPointerOver={() => setNoticed(true)}
      onPointerOut={() => setNoticed(false)}
      onPointerDown={() => setNoticed(true)}
    >
      {/* Body.
          Lifted so its underside is buried in the plinth rather than sitting
          in the plinth's own bottom plane. Every neighbour here is sized to
          avoid sharing a plane with this box: two surfaces that coincide
          flicker, because the depth buffer has no basis to prefer one. */}
      <mesh position={[0, 0.46, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.42, 0.84, 0.34]} />
        <meshStandardMaterial color="#d2453a" flatShading roughness={1} />
      </mesh>

      {/* Marquee, the lit header panel. Stands proud of the body front rather
          than flush with it: flush is coplanar, and coplanar flickers. */}
      <mesh position={[0, 0.94, 0.05]} castShadow>
        <boxGeometry args={[0.44, 0.14, 0.3]} />
        <meshStandardMaterial color="#f7c948" flatShading roughness={1} />
      </mesh>

      {/* Screen, set into the cabinet front as a solid rather than laid on it
          as a plane. Front proud of the face, back buried inside the body, so
          it shares no plane with anything. */}
      <mesh position={[0, 0.7, 0.165]}>
        <boxGeometry args={[0.3, 0.22, 0.03]} />
        <meshStandardMaterial
          ref={screen}
          color="#2f8fd8"
          emissive="#6fd3f2"
          emissiveIntensity={0.45}
          roughness={1}
        />
      </mesh>

      {/* Control deck. Narrower than the body on purpose: at the same 0.42 its
          two sides lay exactly in the body's own side planes, which is what was
          still flickering after the screen was fixed. */}
      <mesh position={[0, 0.54, 0.22]} rotation={[0.32, 0, 0]} castShadow>
        <boxGeometry args={[0.37, 0.05, 0.18]} />
        <meshStandardMaterial color="#3a2f46" flatShading roughness={1} />
      </mesh>

      {/* Stick and two buttons */}
      <mesh position={[-0.1, 0.59, 0.235]} castShadow>
        <cylinderGeometry args={[0.014, 0.014, 0.09, 6]} />
        <meshStandardMaterial color="#1d1a26" flatShading roughness={1} />
      </mesh>
      <mesh position={[-0.1, 0.64, 0.235]} castShadow>
        <sphereGeometry args={[0.028, 8, 6]} />
        <meshStandardMaterial color="#e8552b" flatShading roughness={1} />
      </mesh>
      {([0.04, 0.11] as const).map((x) => (
        <mesh key={x} position={[x, 0.585, 0.238]} rotation={[0.32, 0, 0]} castShadow>
          <cylinderGeometry args={[0.026, 0.026, 0.02, 6]} />
          <meshStandardMaterial color="#f7c948" flatShading roughness={1} />
        </mesh>
      ))}

      {/* Base plinth */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.46, 0.08, 0.38]} />
        <meshStandardMaterial color="#8f2f28" flatShading roughness={1} />
      </mesh>
    </group>
  )
}
