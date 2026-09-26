import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import { Mesh, type Group } from 'three'

/**
 * One instance of a loaded model.
 *
 * The scene is cloned per instance: a single Object3D cannot occupy two places
 * in the graph, so placing the same tree twice without cloning silently moves
 * it rather than duplicating it. The clone casts shadows, which the kit's own
 * export does not ask for; the ground under a tree is where the light reads.
 */
export function Prop({
  url,
  position,
  rotation = 0,
  scale = 1,
}: {
  url: string
  position: readonly [number, number, number]
  rotation?: number
  scale?: number
}) {
  const { scene } = useGLTF(url)
  const model = useMemo(() => {
    const clone = scene.clone(true) as Group
    clone.traverse((node) => {
      if (node instanceof Mesh) node.castShadow = true
    })
    return clone
  }, [scene])
  return <primitive object={model} position={position} rotation={[0, rotation, 0]} scale={scale} />
}
