/**
 * A work bench with the kit box open for business on top of it, and a kettle
 * going at one end.
 *
 * Built from boxes so it stays in the same faceted language as the desk in
 * the hero: every man-made object here is code and every organic one comes
 * from the kit. A bench with a kit box on it is a kit in use rather than
 * stores in transit, which is the difference between a skill and a crate.
 *
 * The kettle sits at local [0.38, 0.62, 0.06]; a host that wants steam puts a
 * Rise above that point inside this group.
 */
export function Bench({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  scale = 1,
  children,
}: {
  position?: [number, number, number]
  rotation?: number
  scale?: number
  children?: React.ReactNode
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      {/* Top */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.1, 0.07, 0.5]} />
        <meshStandardMaterial color="#c98a4b" flatShading roughness={1} />
      </mesh>
      {/* Apron under the top, narrower than the top so no face is shared */}
      <mesh position={[0, 0.43, 0]} castShadow>
        <boxGeometry args={[1.0, 0.07, 0.4]} />
        <meshStandardMaterial color="#a06a34" flatShading roughness={1} />
      </mesh>

      {/* Legs */}
      {(
        [
          [-0.47, 0.2, -0.18],
          [0.47, 0.2, -0.18],
          [-0.47, 0.2, 0.18],
          [0.47, 0.2, 0.18],
        ] as const
      ).map(([x, y, z]) => (
        <mesh key={`${x}:${z}`} position={[x, y, z]} castShadow>
          <boxGeometry args={[0.07, 0.4, 0.07]} />
          <meshStandardMaterial color="#8a5a3b" flatShading roughness={1} />
        </mesh>
      ))}
      {/* Stretcher */}
      <mesh position={[0, 0.12, 0]} castShadow>
        <boxGeometry args={[0.9, 0.05, 0.05]} />
        <meshStandardMaterial color="#8a5a3b" flatShading roughness={1} />
      </mesh>

      {/* The kit box, lid off, straps proud of its faces */}
      <group position={[-0.22, 0.535, 0.02]} rotation={[0, -0.25, 0]}>
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.36, 0.24, 0.26]} />
          <meshStandardMaterial color="#8a5a3b" flatShading roughness={1} />
        </mesh>
        {([-0.1, 0.1] as const).map((x) => (
          <mesh key={x} position={[x, 0.12, 0]} castShadow>
            <boxGeometry args={[0.05, 0.25, 0.272]} />
            <meshStandardMaterial color="#c4a670" flatShading roughness={1} />
          </mesh>
        ))}
        {/* What is in it: a row of tool handles standing up */}
        {([-0.11, -0.02, 0.08] as const).map((x, index) => (
          <mesh key={x} position={[x, 0.3, -0.03 + index * 0.03]} castShadow>
            <boxGeometry args={[0.035, 0.16, 0.035]} />
            <meshStandardMaterial
              color={index === 1 ? '#98a0ae' : '#6b4429'}
              flatShading
              roughness={1}
            />
          </mesh>
        ))}
      </group>

      {/* The kettle */}
      <group position={[0.38, 0.535, 0.06]}>
        <mesh position={[0, 0.08, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.1, 0.16, 6]} />
          <meshStandardMaterial color="#6e7787" flatShading roughness={1} />
        </mesh>
        <mesh position={[0, 0.18, 0]} castShadow>
          <coneGeometry args={[0.07, 0.05, 6]} />
          <meshStandardMaterial color="#98a0ae" flatShading roughness={1} />
        </mesh>
        <mesh position={[0.1, 0.1, 0]} rotation={[0, 0, -0.6]} castShadow>
          <boxGeometry args={[0.1, 0.03, 0.03]} />
          <meshStandardMaterial color="#6e7787" flatShading roughness={1} />
        </mesh>
        <mesh position={[0, 0.24, 0]} castShadow>
          <boxGeometry args={[0.12, 0.025, 0.025]} />
          <meshStandardMaterial color="#3a2f46" flatShading roughness={1} />
        </mesh>
      </group>

      {children}
    </group>
  )
}
