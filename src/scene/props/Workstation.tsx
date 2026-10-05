/**
 * A desk, a monitor, a mug, a plant and a chair pushed back from it; the
 * developer-playground half of the motif,
 * built from boxes so it stays in the same faceted language as the kit props.
 *
 * The screen is emissive rather than lit, so it reads as switched on without
 * adding a light source the rest of the scene would have to account for.
 */
/** Lines on the editor: indent, length, height on the screen, colour. */
const code = [
  [0, 0.2, 0.95, '#f5b23e'],
  [0.05, 0.28, 0.91, '#7ec4f2'],
  [0.05, 0.16, 0.87, '#62d6c6'],
  [0.1, 0.24, 0.83, '#f4f7fb'],
  [0.1, 0.12, 0.79, '#ff9e73'],
  [0.05, 0.08, 0.75, '#7ec4f2'],
  [0, 0.05, 0.71, '#f5b23e'],
] as const

export function Workstation({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  scale = 1,
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Desktop */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.0, 0.07, 0.56]} />
        <meshStandardMaterial color="#c98a4b" flatShading roughness={1} />
      </mesh>

      {/* Legs */}
      {(
        [
          [-0.42, 0.19, -0.21],
          [0.42, 0.19, -0.21],
          [-0.42, 0.19, 0.21],
          [0.42, 0.19, 0.21],
        ] as const
      ).map(([x, y, z]) => (
        <mesh key={`${x}:${z}`} position={[x, y, z]} castShadow>
          <boxGeometry args={[0.07, 0.38, 0.07]} />
          <meshStandardMaterial color="#8a5a3b" flatShading roughness={1} />
        </mesh>
      ))}

      {/* Monitor stand and back */}
      <mesh position={[0, 0.56, -0.14]} castShadow>
        <boxGeometry args={[0.1, 0.2, 0.08]} />
        <meshStandardMaterial color="#4e5a6e" flatShading roughness={1} />
      </mesh>
      <mesh position={[0, 0.82, -0.14]} castShadow>
        <boxGeometry args={[0.72, 0.44, 0.06]} />
        <meshStandardMaterial color="#16202e" flatShading roughness={1} />
      </mesh>

      {/* Screen: an editor, dark, with a few lines of code on it. The code is
          a handful of emissive bars rather than a texture, so it stays in the
          same flat language as everything else and costs no download. */}
      <mesh position={[0, 0.82, -0.105]}>
        <planeGeometry args={[0.64, 0.36]} />
        <meshStandardMaterial
          color="#1c2739"
          emissive="#1c2739"
          emissiveIntensity={0.6}
          roughness={1}
        />
      </mesh>
      {code.map(([indent, length, y, tone]) => (
        <mesh key={y} position={[-0.27 + indent + length / 2, y, -0.1]}>
          <planeGeometry args={[length, 0.022]} />
          <meshStandardMaterial
            color={tone}
            emissive={tone}
            emissiveIntensity={0.9}
            roughness={1}
          />
        </mesh>
      ))}

      {/* Keyboard */}
      <mesh position={[0, 0.47, 0.14]} castShadow>
        <boxGeometry args={[0.46, 0.03, 0.16]} />
        <meshStandardMaterial color="#f1e9dc" flatShading roughness={1} />
      </mesh>

      {/* A plant on the far corner: a pot and a faceted crown */}
      <mesh position={[-0.38, 0.52, -0.1]} castShadow>
        <cylinderGeometry args={[0.07, 0.055, 0.13, 6]} />
        <meshStandardMaterial color="#c6421c" flatShading roughness={1} />
      </mesh>
      <mesh position={[-0.38, 0.66, -0.1]} castShadow>
        <icosahedronGeometry args={[0.11, 0]} />
        <meshStandardMaterial color="#4e9c41" flatShading roughness={1} />
      </mesh>

      {/* The chair, pushed back and swung aside, as if just left: a seat and a
          back on one pedestal, with faces big enough to catch the light. Off
          to the side so it never stands between the camera and the screen. */}
      <group position={[-0.32, 0, 0.5]} rotation={[0, -0.9, 0]} scale={0.78}>
        <mesh position={[0, 0.29, 0]} castShadow>
          <boxGeometry args={[0.38, 0.06, 0.36]} />
          <meshStandardMaterial color="#2f6fa8" flatShading roughness={1} />
        </mesh>
        <mesh position={[0, 0.5, 0.17]} rotation={[-0.12, 0, 0]} castShadow>
          <boxGeometry args={[0.36, 0.38, 0.06]} />
          <meshStandardMaterial color="#2f6fa8" flatShading roughness={1} />
        </mesh>
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.03, 0.03, 0.24, 6]} />
          <meshStandardMaterial color="#4e5a6e" flatShading roughness={1} />
        </mesh>
        <mesh position={[0, 0.025, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.2, 0.05, 5]} />
          <meshStandardMaterial color="#4e5a6e" flatShading roughness={1} />
        </mesh>
      </group>

      {/* Mug */}
      <mesh position={[0.36, 0.51, 0.12]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.11, 6]} />
        <meshStandardMaterial color="#e8552b" flatShading roughness={1} />
      </mesh>
    </group>
  )
}
