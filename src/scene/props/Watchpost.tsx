import { Lantern } from './Lantern'
import { ambientActors } from '@/scenery/ambient'

const wood = '#6b4429'
const plank = '#8a5a3b'
const roof = '#4a3226'

/**
 * A timber watchpost: four posts braced against each other, a railed
 * platform on top, a small roof over it, and a ladder up the front. Somewhere
 * you were posted, which is what an experience entry is.
 *
 * Tall and narrow on purpose. It is the marker in a world where every other
 * section carries a different class of object, and the class is the axis that
 * carries at strip scale. One lantern hangs at the rail; at night it and the
 * brazier are the only lights.
 */
export function Watchpost({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  animate = true,
}) {
  const deck = 2.1
  const half = 0.46

  return (
    <group position={position} rotation={[0, rotation, 0]}>
      {/* Posts, leaning in a touch so the tower stands rather than sits */}
      {(
        [
          [-half, -half],
          [half, -half],
          [-half, half],
          [half, half],
        ] as const
      ).map(([x, z]) => (
        <mesh
          key={`${x}:${z}`}
          position={[x * 1.06, deck / 2, z * 1.06]}
          rotation={[z * 0.05, 0, -x * 0.05]}
          castShadow
        >
          <boxGeometry args={[0.11, deck + 0.1, 0.11]} />
          <meshStandardMaterial color={wood} flatShading roughness={1} />
        </mesh>
      ))}

      {/* Cross braces on the two visible faces */}
      {([-0.55, 0.55] as const).map((z) => (
        <group key={z} position={[0, deck * 0.42, z]}>
          <mesh rotation={[0, 0, 0.72]} castShadow>
            <boxGeometry args={[0.06, 1.34, 0.05]} />
            <meshStandardMaterial color={plank} flatShading roughness={1} />
          </mesh>
          <mesh rotation={[0, 0, -0.72]} castShadow>
            <boxGeometry args={[0.06, 1.34, 0.05]} />
            <meshStandardMaterial color={plank} flatShading roughness={1} />
          </mesh>
        </group>
      ))}

      {/* Platform: a deck of planks, proud of the posts on every side */}
      <mesh position={[0, deck + 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.32, 0.1, 1.32]} />
        <meshStandardMaterial color={plank} flatShading roughness={1} />
      </mesh>
      <mesh position={[0, deck - 0.02, 0]}>
        <boxGeometry args={[1.1, 0.06, 1.1]} />
        <meshStandardMaterial color={wood} flatShading roughness={1} />
      </mesh>

      {/* Railing: four corner posts and a top rail on each side */}
      {(
        [
          [-0.6, -0.6],
          [0.6, -0.6],
          [-0.6, 0.6],
          [0.6, 0.6],
        ] as const
      ).map(([x, z]) => (
        <mesh key={`${x}:${z}`} position={[x, deck + 0.32, z]} castShadow>
          <boxGeometry args={[0.07, 0.46, 0.07]} />
          <meshStandardMaterial color={wood} flatShading roughness={1} />
        </mesh>
      ))}
      {([-0.6, 0.6] as const).map((z) => (
        <mesh key={`z${z}`} position={[0, deck + 0.52, z]} castShadow>
          <boxGeometry args={[1.26, 0.05, 0.05]} />
          <meshStandardMaterial color={plank} flatShading roughness={1} />
        </mesh>
      ))}
      {([-0.6, 0.6] as const).map((x) => (
        <mesh key={`x${x}`} position={[x, deck + 0.52, 0]} castShadow>
          <boxGeometry args={[0.05, 0.05, 1.26]} />
          <meshStandardMaterial color={plank} flatShading roughness={1} />
        </mesh>
      ))}

      {/* Roof: four thin posts up from the rail corners, a pyramid on top */}
      {(
        [
          [-0.5, -0.5],
          [0.5, -0.5],
          [-0.5, 0.5],
          [0.5, 0.5],
        ] as const
      ).map(([x, z]) => (
        <mesh key={`r${x}:${z}`} position={[x, deck + 0.98, z]} castShadow>
          <boxGeometry args={[0.06, 0.9, 0.06]} />
          <meshStandardMaterial color={wood} flatShading roughness={1} />
        </mesh>
      ))}
      <mesh position={[0, deck + 1.66, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[1.02, 0.5, 4]} />
        <meshStandardMaterial color={roof} flatShading roughness={1} />
      </mesh>
      <mesh position={[0, deck + 1.42, 0]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[1.0, 1.0, 0.05, 4]} />
        <meshStandardMaterial color="#5e4030" flatShading roughness={1} />
      </mesh>

      {/* Ladder up the front face */}
      <group position={[0.15, 0, half + 0.12]} rotation={[-0.12, 0, 0]}>
        {([-0.16, 0.16] as const).map((x) => (
          <mesh key={x} position={[x, deck / 2 + 0.06, 0]} castShadow>
            <boxGeometry args={[0.05, deck + 0.12, 0.05]} />
            <meshStandardMaterial color={plank} flatShading roughness={1} />
          </mesh>
        ))}
        {[0.3, 0.62, 0.94, 1.26, 1.58, 1.9].map((y) => (
          <mesh key={y} position={[0, y, 0]} castShadow>
            <boxGeometry args={[0.36, 0.04, 0.04]} />
            <meshStandardMaterial color={wood} flatShading roughness={1} />
          </mesh>
        ))}
      </group>

      {/* The lantern, hung at the near rail corner */}
      <Lantern
        position={[-0.62, deck + 0.1, 0.62]}
        height={0.62}
        level={0.85}
        power={1.6}
        flicker={ambientActors.experienceLantern}
        animate={animate}
      />
    </group>
  )
}
