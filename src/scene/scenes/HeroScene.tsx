import { ContactShadows, PerspectiveCamera } from '@react-three/drei'
import { useRef } from 'react'
import type { Group } from 'three'
import { MODELS, preload } from '../models'
import { ArcadeCabinet } from '../props/ArcadeCabinet'
import { Chest } from '../props/Chest'
import { Island } from '../props/Island'
import { Prop } from '../props/Prop'
import { Signpost } from '../props/Signpost'
import { Workstation } from '../props/Workstation'
import type { SceneProps } from '../StripView'
import { useDiorama } from '../useDiorama'
import { useSpot } from '../useSpot'
import { ambientActors, period } from '@/scenery/ambient'

const island = ambientActors.heroIsland

/**
 * The hero diorama: a small floating island carrying a developer workstation.
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
  // The cabinet is the canvas's one focal object: the screen brightens while it
  // is pointed at, and a tap on the strip holds that for the same beat a
  // tapped prop downstairs gets.
  const pointedAt = useSpot(host, cabinet, { radius: 56 })

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

      <group position={[0, compact ? 0.75 : 0.7, 0]}>
        <group ref={group}>
          <Island />

          {/* Layout note: the camera sits out at +X +Z, so larger x and z read as
              nearer and further right on screen. The desk and the cabinet are kept
              a full unit apart along that axis; closer together they overlap in
              screen space however far apart they are in world space. */}
          <Workstation position={[-0.5, 0, 0.02]} rotation={0.5} scale={1.18} />

          {/* The cabinet is the positioning made into an object: a desk alone reads
              "developer". It is identity, not density, so it stays at 390px while
              the scatter props below drop away. */}
          <group ref={cabinet} position={[0.86, 0, 0.82]}>
            <ArcadeCabinet
              rotation={-0.62}
              scale={1.1}
              animate={active}
              noticed={pointedAt || noticed}
            />
          </group>

          <Prop url={MODELS.tree} position={[1.18, 0.04, -0.52]} scale={0.92} rotation={0.5} />
          <Prop url={MODELS.rock} position={[-0.28, 0.02, 1.24]} scale={1.1} rotation={1.1} />
          <Prop url={MODELS.grass} position={[0.52, 0.03, -0.75]} scale={1.0} rotation={0.2} />

          {/* Density the 390px composition deliberately does without. */}
          {!compact && (
            <>
              <Prop
                url={MODELS.pine}
                position={[-1.42, 0.04, -0.38]}
                scale={0.82}
                rotation={-0.4}
              />
              <Prop url={MODELS.logs} position={[1.34, 0.03, 0.26]} scale={0.72} rotation={-0.9} />
              <Prop url={MODELS.mushroom} position={[-1.3, 0.03, 0.3]} scale={1.7} rotation={0.8} />
              <Prop url={MODELS.grass} position={[0.12, 0.03, -1.15]} scale={0.85} rotation={2.1} />
              <Signpost position={[-1.08, 0.03, 0.88]} rotation={0.6} scale={1.05} />
              <Chest position={[0.02, 0.03, 0.98]} rotation={-0.4} scale={1.0} />
            </>
          )}

          <ContactShadows
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

preload(['tree', 'pine', 'rock', 'grass', 'mushroom', 'logs'])
