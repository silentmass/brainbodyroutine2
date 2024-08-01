import {
  OrbitControls,
  PerspectiveCamera,
  RenderTexture,
  useFBO,
  Text,
  Html
} from '@react-three/drei'
import {
  createPortal,
  extend,
  Object3DNode,
  useFrame
} from '@react-three/fiber'
import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { TEXTURE_WIDTH } from '@/app/_components/model-palette/definitions'
import * as THREE from 'three'

import ChaosCirclesParticleSimulationMaterial from './chaosCirclesParticleSimulation'
import vertexShader from './shaders/chaosCirclesParticle.vert'
import fragmentShader from './shaders/chaosCirclesParticle.frag'
import {
  NUM_PARTICLES,
  SCENE,
  CAMERA,
  positions,
  uvs,
  PARTICLES_POSITION,
  CAMERA_DISTANCE,
  FOV
} from '../model-preview'

extend({
  ChaosCirclesParticleSimulationMaterial: ChaosCirclesParticleSimulationMaterial
})
declare global {
  namespace JSX {
    interface IntrinsicElements {
      chaosCirclesParticleSimulationMaterial: Object3DNode<
        ChaosCirclesParticleSimulationMaterial,
        typeof ChaosCirclesParticleSimulationMaterial
      >
    }
  }
}

export const ChaosCirclesParticleMaterial = ({
  stimulusRef
}: {
  stimulusRef: any
}) => {
  // This reference gives us direct access to our points
  const pointsMaterialRef = useRef<THREE.ShaderMaterial>(null)
  const simulationMaterialRef =
    useRef<ChaosCirclesParticleSimulationMaterial>(null)

  const renderTarget = useFBO(NUM_PARTICLES, NUM_PARTICLES, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false,
    type: THREE.FloatType
  })

  const uniforms = useMemo(
    () => ({
      uPositions: {
        value: null
      }
    }),
    []
  )

  const memoizedUvs = useMemo(() => uvs, [])

  useFrame(({ gl, clock }) => {
    if (!simulationMaterialRef.current || !pointsMaterialRef.current) return

    gl.setRenderTarget(renderTarget)
    gl.clear()
    gl.render(SCENE, CAMERA)
    gl.setRenderTarget(null)

    // Load previous cycle vertex positions from texture
    pointsMaterialRef.current.uniforms.uPositions.value = renderTarget.texture

    // Shift simulation material time forward
    simulationMaterialRef.current.uniforms.uTime.value = clock.elapsedTime
  })

  const handleStimulusClick = () => {
    console.log('Stimulus')
    if (!simulationMaterialRef.current || !pointsMaterialRef.current) return

    simulationMaterialRef.current.uniforms.uStimulusTime.value =
      simulationMaterialRef.current.uniforms.uTime.value + 1.2
  }

  useEffect(() => {
    if (stimulusRef) {
      stimulusRef.current = handleStimulusClick
    }
  }, [stimulusRef])

  return (
    <>
      <meshStandardMaterial>
        <RenderTexture
          attach='map'
          width={TEXTURE_WIDTH}
          height={TEXTURE_WIDTH}
          anisotropy={16}
        >
          <PerspectiveCamera
            makeDefault
            manual
            aspect={1 / 1}
            position={[0.5, 1.0, 1.0]}
            fov={FOV}
          />
          <ambientLight intensity={0.5} />
          <OrbitControls
            target={[0.5, 0.0, 0.5]}
            enablePan={false}
            enableRotate={false}
            enableZoom={false}
          />
          {/* <axesHelper args={[5]} /> */}
          <>
            {createPortal(
              <mesh>
                <chaosCirclesParticleSimulationMaterial
                  ref={simulationMaterialRef}
                  args={[NUM_PARTICLES]}
                />
                <bufferGeometry>
                  <bufferAttribute
                    attach='attributes-position'
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                  />
                  <bufferAttribute
                    attach='attributes-uv'
                    count={memoizedUvs.length / 2}
                    array={memoizedUvs}
                    itemSize={2}
                  />
                </bufferGeometry>
              </mesh>,
              SCENE
            )}
            <points rotation={[0, 0, 0]}>
              <bufferGeometry>
                <bufferAttribute
                  attach='attributes-position'
                  count={PARTICLES_POSITION.length / 3}
                  array={PARTICLES_POSITION}
                  itemSize={3}
                />
              </bufferGeometry>
              <shaderMaterial
                ref={pointsMaterialRef}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
              />
            </points>
          </>
        </RenderTexture>
      </meshStandardMaterial>
    </>
  )
}
