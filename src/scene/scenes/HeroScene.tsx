import { ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { MODELS, preload, type ModelName } from '../models'
import { ArcadeCabinet } from '../props/ArcadeCabinet'
import { Chest } from '../props/Chest'
import { Island, type Islet } from '../props/Island'
import { Prop } from '../props/Prop'
import { Signpost } from '../props/Signpost'
import { Waterfall } from '../props/Waterfall'
import { Workstation } from '../props/Workstation'
import type { SceneProps } from '../StripView'
import { useDiorama } from '../useDiorama'
import { useSpot } from '../useSpot'
import { ambientActors, period } from '@/scenery/ambient'

const island = ambientActors.heroIsland
const falls = ambientActors.heroFalls
const foliage = ambientActors.heroFoliage

/** The turf's surface, where everything on the island stands. */
const TURF = 0.03

/**
 * The waterfall's lip, on the rim at the screen's right, and its heading. The
 * fall bows out 0.32 as it drops, and the landing islet sits where that puts
 * it, so the water arrives on turf rather than in the air beside it.
 */
const FALL = [1.72, TURF, -0.2] as const
const FALL_TURN = 0.12
const LANDING: Islet = { at: [2.02, -1.45, -0.24], size: 0.32 }
const LANDING_TOP = LANDING.at[1] + (LANDING.size * 0.35) / 2

type Placement = {
  model: ModelName
  at: readonly [number, number]
  scale: number
  rotation: number
  /**
   * Kept at 390px. Everything else is density the compact view does without.
   * The compact set is what the hero preloads, so it is held to six small
   * models: a phone fetches them while the hero still is the page's largest
   * paint, and a heavier set measurably pushed mobile LCP out.
   */
  compact?: boolean
}

/**
 * Layout note: the camera sits out at +X +Z, so larger x and z read as nearer,
 * and the screen's right is along (+0.8, -0.6). The back half of the island
 * carries the height, so nothing tall stands between the camera and the desk.
 */
const trees: readonly Placement[] = [
  { model: 'oak', at: [-0.95, -1.05], scale: 0.85, rotation: 0.4, compact: true },
  { model: 'oak', at: [-1.45, 0.05], scale: 0.6, rotation: 2.4, compact: true },
  { model: 'pineTall', at: [-1.5, -0.35], scale: 0.75, rotation: -0.4 },
  { model: 'treeRound', at: [0.35, -1.35], scale: 0.8, rotation: 1.2 },
  { model: 'pineB', at: [-0.3, -1.45], scale: 0.62, rotation: 2.2 },
  { model: 'treeSmall', at: [1.05, -1.05], scale: 0.75, rotation: 0.8, compact: true },
]

const ground: readonly Placement[] = [
  { model: 'bushLarge', at: [-1.35, -0.95], scale: 0.7, rotation: 0.6 },
  { model: 'bush', at: [0.95, -0.6], scale: 0.6, rotation: 2.1, compact: true },
  { model: 'bush', at: [-1.6, 0.4], scale: 0.55, rotation: 1.0, compact: true },
  { model: 'rockB', at: [1.5, 0.25], scale: 0.45, rotation: 0.5, compact: true },
  { model: 'rockB', at: [1.45, -0.6], scale: 0.5, rotation: 1.9, compact: true },
  { model: 'rock', at: [-1.45, 0.95], scale: 0.7, rotation: 1.1 },
  { model: 'stump', at: [0.55, -0.6], scale: 0.75, rotation: 0.3 },
  { model: 'mushrooms', at: [-1.2, -0.6], scale: 1.1, rotation: 0.8 },
  { model: 'fence', at: [-0.55, -1.6], scale: 0.7, rotation: 0.35 },
  { model: 'pathStone', at: [-0.3, 1.5], scale: 0.9, rotation: 0.2, compact: true },
  { model: 'pathStone', at: [-0.22, 1.18], scale: 0.85, rotation: 1.1, compact: true },
  { model: 'pathStone', at: [-0.12, 0.86], scale: 0.8, rotation: 2.0, compact: true },
  { model: 'flowerYellow', at: [-0.85, 1.25], scale: 0.9, rotation: 0.2, compact: true },
  { model: 'flowerRed', at: [0.5, 1.45], scale: 0.9, rotation: 1.4 },
  { model: 'flowerPurple', at: [1.4, 0.5], scale: 0.9, rotation: 2.6 },
  { model: 'flowerYellow', at: [-1.65, -0.05], scale: 0.8, rotation: 1.1, compact: true },
  { model: 'flowerRed', at: [0.2, -0.85], scale: 0.85, rotation: 0.5 },
  { model: 'flowerPurple', at: [-0.95, 0.6], scale: 0.85, rotation: 1.9 },
  { model: 'grassLarge', at: [0.05, 1.05], scale: 0.8, rotation: 0.4 },
  { model: 'grass', at: [1.15, 1.15], scale: 0.9, rotation: 2.2 },
  { model: 'grassLeafs', at: [-1.2, 0.15], scale: 0.8, rotation: 0.9 },
  { model: 'grass', at: [0.75, -1.4], scale: 0.8, rotation: 1.5 },
  { model: 'flowerYellow', at: [0.6, 1.25], scale: 0.75, rotation: 2.8, compact: true },
  { model: 'bush', at: [0.35, -1.0], scale: 0.5, rotation: 0.4, compact: true },
  { model: 'plantFlat', at: [1.25, -0.25], scale: 0.9, rotation: 0.7 },
]

/**
 * The hero diorama: a floating island where the trail starts. A developer's
 * desk under the trees, the arcade cabinet beside it, a spring running off
 * the rim into open air, and a path of stones leading in from the edge to the
 * signpost.
 *
 * Morning. A warm key, a cool hemisphere fill, and nothing else; no HDRI, no
 * PBR maps, no postprocessing, per docs/DESIGN.md.
 */
export function HeroScene({ host, active, compact, parallax, noticed }: SceneProps) {
  const group = useDiorama(host, {
    active,
    parallax,
    bob: island.travel / 120,
    yaw: (island.rotation * Math.PI) / 180,
    period: period(island),
  })
  const cabinet = useRef<Group>(null)
  const canopy = useRef<Group>(null)
  // The cabinet is the canvas's one focal object: the screen brightens while it
  // is pointed at, and a tap on the strip holds that for the same beat a
  // tapped prop downstairs gets.
  const pointedAt = useSpot(host, cabinet, { radius: 56 })

  // Each tree sways about its own foot, on its own phase, so the canopy moves
  // as a stand of trees rather than as one board rocking.
  useFrame((state) => {
    const root = canopy.current
    if (!active || !root) return
    const turn = (state.clock.getElapsedTime() * 2 * Math.PI) / period(foliage)
    const peak = (foliage.rotation * Math.PI) / 180
    root.children.forEach((tree, index) => {
      tree.rotation.z = Math.sin(turn + index * 1.9) * peak
    })
  })

  const shown = (placement: Placement) => !compact || placement.compact

  return (
    <>
      <PerspectiveCamera
        makeDefault
        position={compact ? [4.3, 3.2, 5.7] : [4.5, 3.3, 6.0]}
        fov={compact ? 40 : 36}
        onUpdate={(camera) => camera.lookAt(0, 0, 0)}
      />
      <hemisphereLight args={['#7ec4f2', '#c98a4b', 1.7]} />
      <directionalLight
        position={[4, 6, 3]}
        intensity={2.2}
        color="#f5b23e"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-3, 1, -2]} intensity={0.6} color="#7ec4f2" />

      <group position={[0, compact ? 0.62 : 0.58, 0]}>
        <group ref={group}>
          <Island landing={LANDING} />

          {/* The desk and the cabinet are kept a full unit apart along the
              camera's axis; closer together they overlap in screen space
              however far apart they are in world space. */}
          <Workstation position={[-0.5, 0, 0.02]} rotation={0.5} scale={1.18} />

          {/* The cabinet is the positioning made into an object: a desk alone
              reads "developer". It is identity, not density, so it stays at
              390px while the scatter drops away. */}
          <group ref={cabinet} position={[0.86, 0, 0.82]}>
            <ArcadeCabinet
              rotation={-0.62}
              scale={1.0}
              animate={active}
              noticed={pointedAt || noticed}
            />
          </group>

          {/* On the rim at the screen's right, pouring outward, so the fall
              hangs against the sky rather than in front of the rock. */}
          <group position={FALL} rotation={[0, FALL_TURN, 0]}>
            <Waterfall run={0.75} drop={TURF - LANDING_TOP} actor={falls} animate={active} />
          </group>

          <group ref={canopy}>
            {trees.filter(shown).map((tree) => (
              <group key={`${tree.at[0]}:${tree.at[1]}`} position={[tree.at[0], TURF, tree.at[1]]}>
                <Prop
                  url={MODELS[tree.model]}
                  position={[0, 0, 0]}
                  scale={tree.scale}
                  rotation={tree.rotation}
                />
              </group>
            ))}
          </group>
          {ground.filter(shown).map((prop) => (
            <Prop
              key={`${prop.at[0]}:${prop.at[1]}`}
              url={MODELS[prop.model]}
              position={[prop.at[0], TURF, prop.at[1]]}
              scale={prop.scale}
              rotation={prop.rotation}
            />
          ))}

          {!compact && (
            <>
              <Signpost position={[-0.95, TURF, 1.0]} rotation={0.6} scale={1.05} />
              <Chest position={[0.3, TURF, 1.2]} rotation={-0.4} scale={0.9} />
            </>
          )}

          {/* Drawn once. It sits inside the bobbing group, so nothing under it
              ever moves relative to the ground it falls on, and re-rendering
              the whole island into it every frame was a third of the
              hero's draw calls. */}
          <ContactShadows
            frames={1}
            position={[0, 0.02, 0]}
            opacity={0.32}
            scale={5}
            blur={2.4}
            far={2}
            resolution={256}
            color="#3c2a18"
          />
        </group>
      </group>
    </>
  )
}

preload([
  ...new Set([...trees, ...ground].filter((placement) => placement.compact).map((p) => p.model)),
])
