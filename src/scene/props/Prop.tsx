import { useGLTF } from '@react-three/drei'
import { useMemo } from 'react'
import type { Group } from 'three'

/**
 * One instance of a loaded model.
 *
 * The scene is cloned per instance: a single Object3D cannot occupy two places
 * in the graph, so placing the same tree twice without cloning silently moves
 * it rather than duplicating it.
 */
export function Prop({
  url,
  position,
  rotation = 0,
  scale = 1,
}: {
  url: string
  position: [number, number, number]
  rotation?: number
  scale?: number
}) {
  const { scene } = useGLTF(url)
  const model = useMemo(() => scene.clone(true) as Group, [scene])
  return <primitive object={model} position={position} rotation={[0, rotation, 0]} scale={scale} />
}
