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
      {/* Body */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.42, 0.84, 0.34]} />
        <meshStandardMaterial color="#d2453a" flatShading roughness={1} />
      </mesh>

      {/* Marquee, the lit header panel */}
      <mesh position={[0, 0.9, 0.02]} castShadow>
        <boxGeometry args={[0.44, 0.14, 0.3]} />
        <meshStandardMaterial color="#f7c948" flatShading roughness={1} />
      </mesh>

      {/* Screen, set into the cabinet front as a solid rather than laid on it
          as a plane.

          The body's front face is at z = 0.17, and the plane this replaces sat
          at 0.172 with a tilt that carried its top edge back onto that face.
          Two surfaces that close flicker at this camera distance as the depth
          buffer picks a winner per frame. A box whose front stands 0.01 proud
          and whose back is buried inside the body has no coplanar face with
          anything, so the fight cannot happen — and unlike simply pushing a
          plane forward, the screen still reads as part of the cabinet instead
          of floating off its corner. */}
      <mesh position={[0, 0.66, 0.165]}>
        <boxGeometry args={[0.3, 0.22, 0.03]} />
        <meshStandardMaterial
          ref={screen}
          color="#2f8fd8"
          emissive="#6fd3f2"
          emissiveIntensity={0.45}
          roughness={1}
        />
      </mesh>

      {/* Control deck */}
      <mesh position={[0, 0.5, 0.22]} rotation={[0.32, 0, 0]} castShadow>
        <boxGeometry args={[0.42, 0.05, 0.18]} />
        <meshStandardMaterial color="#3a2f46" flatShading roughness={1} />
      </mesh>

      {/* Stick and two buttons */}
      <mesh position={[-0.11, 0.55, 0.235]} castShadow>
        <cylinderGeometry args={[0.014, 0.014, 0.09, 6]} />
        <meshStandardMaterial color="#1d1a26" flatShading roughness={1} />
      </mesh>
      <mesh position={[-0.11, 0.6, 0.235]} castShadow>
        <sphereGeometry args={[0.028, 8, 6]} />
        <meshStandardMaterial color="#e8552b" flatShading roughness={1} />
      </mesh>
      {([0.04, 0.11] as const).map((x) => (
        <mesh key={x} position={[x, 0.545, 0.238]} rotation={[0.32, 0, 0]} castShadow>
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
