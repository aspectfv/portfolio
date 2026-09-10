/**
 * A desk, a monitor and a mug; the developer-playground half of the motif,
 * built from boxes so it stays in the same faceted language as the kit props.
 *
 * The screen is emissive rather than lit, so it reads as switched on without
 * adding a light source the rest of the scene would have to account for.
 */
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

      {/* Screen */}
      <mesh position={[0, 0.82, -0.105]}>
        <planeGeometry args={[0.64, 0.36]} />
        <meshStandardMaterial
          color="#7ec4f2"
          emissive="#7ec4f2"
          emissiveIntensity={0.55}
          roughness={1}
        />
      </mesh>

      {/* Keyboard */}
      <mesh position={[0, 0.47, 0.14]} castShadow>
        <boxGeometry args={[0.46, 0.03, 0.16]} />
        <meshStandardMaterial color="#f1e9dc" flatShading roughness={1} />
      </mesh>

      {/* Mug */}
      <mesh position={[0.36, 0.51, 0.12]} castShadow>
        <cylinderGeometry args={[0.06, 0.05, 0.11, 6]} />
        <meshStandardMaterial color="#e8552b" flatShading roughness={1} />
      </mesh>
    </group>
  )
}
