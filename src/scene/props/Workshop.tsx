import { useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import {
  ExtrudeGeometry,
  Shape,
  type Group,
  type MeshStandardMaterial,
  type PointLight,
} from 'three'
import { Rise } from './Rise'
import { ambientActors, period } from '@/scenery/ambient'

const banner = ambientActors.projectsBanner
const sign = ambientActors.projectsSign
const windowLight = ambientActors.projectsWindow
const smoke = ambientActors.projectsSmoke

const materials = {
  plaster: '#e8cf9c',
  beam: '#8a5a3b',
  dark: '#6b4429',
  roof: '#a06a34',
  stone: '#98a0ae',
  stoneDark: '#6e7787',
  lamp: '#f7c948',
  cloth: '#e8552b',
  smoke: '#d9d4cc',
} as const

/** Half the wall span, and the height of the gable above the wall top. */
const HALF = 0.95
const PITCH = 0.66
const WALL_TOP = 1.14
const SLOPE = Math.atan2(PITCH, HALF)
const SLOPE_LENGTH = Math.hypot(HALF, PITCH)

/**
 * The workshop: a timber-framed shed with a lit window, a chimney that smokes,
 * a sign over the door and a banner at the corner. The one building in the
 * world, and the object that says "projects": a building is where things get
 * made, and the timber stacked in the yard beside it is what makes it a
 * workshop rather than a house.
 *
 * Boxes on a stone footing, with a gable extruded from a triangle so the roof
 * has ends rather than hanging open. Every proud element stands off the face
 * it sits on: coplanar faces flicker, and equal dimensions are the easiest way
 * to author one by accident.
 *
 * The window is this strip's Notice: it is lit from inside, breathing on the
 * ambient rhythm, and it brightens while pointed at or while the strip is
 * tapped. Held, not one-shot: a window that goes dark under the cursor reads
 * as broken.
 */
export function Workshop({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  noticed = false,
  animate = true,
  px,
}: {
  position?: [number, number, number]
  rotation?: number
  noticed?: boolean
  animate?: boolean
  /** Pixels per world unit at the strip's desktop capture, for the smoke. */
  px: number
}) {
  const pane = useRef<MeshStandardMaterial>(null)
  const lamp = useRef<PointLight>(null)
  const cloth = useRef<Group>(null)
  const board = useRef<Group>(null)
  /** The eased brightness, so the window comes up and goes down rather than switching. */
  const glow = useRef(0)

  const gable = useMemo(() => {
    const outline = new Shape()
    outline.moveTo(-HALF, 0)
    outline.lineTo(HALF, 0)
    outline.lineTo(0, PITCH)
    outline.closePath()
    const geometry = new ExtrudeGeometry(outline, { depth: 1.4, bevelEnabled: false })
    geometry.translate(0, 0, -0.7)
    return geometry
  }, [])

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    glow.current += ((noticed ? 1 : 0) - glow.current) * (1 - Math.pow(0.002, delta))
    if (pane.current && lamp.current) {
      // A slow breath from the ambient roster, and the Notice glow on top of it.
      const breath = animate ? Math.sin((t * 2 * Math.PI) / period(windowLight)) * 0.12 : 0
      pane.current.emissiveIntensity = 0.5 + breath + glow.current * 0.9
      lamp.current.intensity = 0.5 + breath * 0.6 + glow.current * 1.4
    }
    if (!animate) return
    if (cloth.current) {
      cloth.current.rotation.x =
        Math.sin((t * 2 * Math.PI) / period(banner)) * ((banner.rotation * Math.PI) / 180)
    }
    if (board.current) {
      board.current.rotation.z =
        Math.sin((t * 2 * Math.PI) / period(sign) + 0.7) * ((sign.rotation * Math.PI) / 180)
    }
  })

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Footing */}
      <mesh position={[0, 0.07, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.84, 0.14, 1.36]} />
        <meshStandardMaterial color={materials.stone} flatShading roughness={1} />
      </mesh>

      {/* Walls, and the beams that frame them */}
      <mesh position={[0, 0.64, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 1.0, 1.24]} />
        <meshStandardMaterial color={materials.plaster} flatShading roughness={1} />
      </mesh>
      {(
        [
          [-0.83, -0.6],
          [0.83, -0.6],
          [-0.83, 0.6],
          [0.83, 0.6],
        ] as const
      ).map(([x, z]) => (
        <mesh key={`${x}:${z}`} position={[x, 0.64, z]} castShadow>
          <boxGeometry args={[0.1, 1.02, 0.1]} />
          <meshStandardMaterial color={materials.beam} flatShading roughness={1} />
        </mesh>
      ))}
      <mesh position={[0, 1.1, 0.62]} castShadow>
        <boxGeometry args={[1.78, 0.08, 0.1]} />
        <meshStandardMaterial color={materials.beam} flatShading roughness={1} />
      </mesh>

      {/* Gable and roof. The slabs sit on the slopes, proud by their own
          thickness, and the ridge beam caps the join. */}
      <mesh geometry={gable} position={[0, WALL_TOP, 0]} castShadow>
        <meshStandardMaterial color={materials.plaster} flatShading roughness={1} />
      </mesh>
      {([-1, 1] as const).map((side) => (
        <mesh
          key={side}
          position={[
            side * (HALF / 2 + 0.05 * Math.sin(SLOPE)),
            WALL_TOP + PITCH / 2 + 0.05 * Math.cos(SLOPE),
            0,
          ]}
          rotation={[0, 0, -side * SLOPE]}
          castShadow
        >
          <boxGeometry args={[SLOPE_LENGTH + 0.12, 0.08, 1.56]} />
          <meshStandardMaterial color={materials.roof} flatShading roughness={1} />
        </mesh>
      ))}
      <mesh position={[0, WALL_TOP + PITCH + 0.05, 0]} castShadow>
        <boxGeometry args={[0.07, 0.07, 1.6]} />
        <meshStandardMaterial color={materials.dark} flatShading roughness={1} />
      </mesh>

      {/* Chimney, through the right slope, and the smoke off it */}
      <mesh position={[0.55, WALL_TOP + 0.5, -0.35]} castShadow>
        <boxGeometry args={[0.24, 0.64, 0.24]} />
        <meshStandardMaterial color={materials.stone} flatShading roughness={1} />
      </mesh>
      <mesh position={[0.55, WALL_TOP + 0.85, -0.35]} castShadow>
        <boxGeometry args={[0.3, 0.06, 0.3]} />
        <meshStandardMaterial color={materials.stoneDark} flatShading roughness={1} />
      </mesh>
      <Rise
        actor={smoke}
        px={px}
        size={0.09}
        color={materials.smoke}
        puff
        animate={animate}
        spots={[
          [0.55, 2.05, -0.35],
          [0.6, 2.12, -0.3],
          [0.5, 2.2, -0.4],
          [0.58, 2.08, -0.38],
        ]}
      />

      {/* Door, with a step and a handle */}
      <mesh position={[-0.35, 0.47, 0.645]} castShadow>
        <boxGeometry args={[0.42, 0.66, 0.05]} />
        <meshStandardMaterial color={materials.dark} flatShading roughness={1} />
      </mesh>
      <mesh position={[-0.22, 0.46, 0.675]}>
        <boxGeometry args={[0.04, 0.04, 0.02]} />
        <meshStandardMaterial color={materials.lamp} flatShading roughness={1} />
      </mesh>
      <mesh position={[-0.35, 0.16, 0.76]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 0.06, 0.2]} />
        <meshStandardMaterial color={materials.stoneDark} flatShading roughness={1} />
      </mesh>

      {/* The lit window: frame, pane, mullion, and the light it throws on the
          yard. The pane stands proud of the frame, the mullion proud of the pane. */}
      <mesh position={[0.42, 0.78, 0.64]} castShadow>
        <boxGeometry args={[0.44, 0.38, 0.05]} />
        <meshStandardMaterial color={materials.dark} flatShading roughness={1} />
      </mesh>
      <mesh position={[0.42, 0.78, 0.66]}>
        <boxGeometry args={[0.34, 0.28, 0.03]} />
        <meshStandardMaterial
          ref={pane}
          color={materials.lamp}
          emissive={materials.lamp}
          emissiveIntensity={0.5}
          roughness={1}
        />
      </mesh>
      <mesh position={[0.42, 0.78, 0.68]}>
        <boxGeometry args={[0.03, 0.29, 0.012]} />
        <meshStandardMaterial color={materials.dark} flatShading roughness={1} />
      </mesh>
      <mesh position={[0.42, 0.78, 0.68]}>
        <boxGeometry args={[0.35, 0.03, 0.012]} />
        <meshStandardMaterial color={materials.dark} flatShading roughness={1} />
      </mesh>
      <pointLight
        ref={lamp}
        position={[0.42, 0.7, 1.0]}
        color={materials.lamp}
        intensity={0.5}
        distance={2.6}
        decay={2}
      />

      {/* The sign, hung from a bracket on the gable over the door. Wordless:
          the pale slab is the shape of a name, not a name. It swings about the
          bracket, which is where a hung board pivots. */}
      <mesh position={[-0.35, 1.36, 0.8]} castShadow>
        <boxGeometry args={[0.04, 0.04, 0.24]} />
        <meshStandardMaterial color={materials.beam} flatShading roughness={1} />
      </mesh>
      <group ref={board} position={[-0.35, 1.34, 0.9]}>
        {([-0.12, 0.12] as const).map((x) => (
          <mesh key={x} position={[x, -0.06, 0]}>
            <boxGeometry args={[0.015, 0.12, 0.015]} />
            <meshStandardMaterial color={materials.dark} flatShading roughness={1} />
          </mesh>
        ))}
        <mesh position={[0, -0.22, 0]} castShadow>
          <boxGeometry args={[0.36, 0.2, 0.03]} />
          <meshStandardMaterial color={materials.roof} flatShading roughness={1} />
        </mesh>
        <mesh position={[0, -0.2, 0.02]}>
          <boxGeometry args={[0.24, 0.07, 0.012]} />
          <meshStandardMaterial color={materials.plaster} flatShading roughness={1} />
        </mesh>
      </group>

      {/* The banner at the corner: a pole, a crossbar, and a cloth that swings
          about the bar it hangs from. */}
      <mesh position={[-1.05, 0.95, 0.5]} castShadow>
        <boxGeometry args={[0.05, 1.9, 0.05]} />
        <meshStandardMaterial color={materials.dark} flatShading roughness={1} />
      </mesh>
      <mesh position={[-1.05, 1.88, 0.5]} castShadow>
        <boxGeometry args={[0.36, 0.04, 0.04]} />
        <meshStandardMaterial color={materials.dark} flatShading roughness={1} />
      </mesh>
      <group ref={cloth} position={[-1.05, 1.86, 0.5]}>
        <mesh position={[0, -0.27, 0]} castShadow>
          <boxGeometry args={[0.3, 0.52, 0.02]} />
          <meshStandardMaterial color={materials.cloth} flatShading roughness={1} side={2} />
        </mesh>
        <mesh position={[0, -0.36, 0.014]}>
          <boxGeometry args={[0.16, 0.16, 0.008]} />
          <meshStandardMaterial color={materials.lamp} flatShading roughness={1} />
        </mesh>
      </group>
    </group>
  )
}
