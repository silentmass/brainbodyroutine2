import {
  OrbitControls,
  PerspectiveCamera,
  RenderTexture,
  useFBO
} from '@react-three/drei'
import {
  createPortal,
  extend,
  Object3DNode,
  useFrame
} from '@react-three/fiber'
import React, { useMemo, useRef } from 'react'
import { TEXTURE_WIDTH } from '@/app/_components/model-palette/definitions'
import * as THREE from 'three'

import SimulationMaterial from './cubeToSphereParticleSimulation'
import cubeToSphereVertexShader from '@/app/_components/model-palette/materials/shaders/cubeToSphere.vert'
import cubeToSphereFragmentShader from '@/app/_components/model-palette/materials/shaders/cubeToSphere.frag'
import {
  CAMERA,
  NUM_PARTICLES,
  PARTICLES_POSITION,
  positions,
  SCENE,
  uvs
} from '../model-preview'

extend({ SimulationMaterial: SimulationMaterial })
declare global {
  namespace JSX {
    interface IntrinsicElements {
      simulationMaterial: Object3DNode<
        SimulationMaterial,
        typeof SimulationMaterial
      >
    }
  }
}

export const CubeToSphereParticlesMaterial = () => {
  // This reference gives us direct access to our points
  const pointsMaterialRef = useRef<THREE.ShaderMaterial>(null)
  const simulationMaterialRef = useRef<SimulationMaterial>(null)

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

  return (
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
          position={[0.5, 3.5, 3.5]}
        />
        <ambientLight intensity={0.5} />
        <OrbitControls
          target={[0.0, 0.0, 0]}
          enablePan={false}
          enableRotate={false}
          enableZoom={false}
        />
        <>
          {createPortal(
            <mesh>
              <simulationMaterial
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
                  count={uvs.length / 2}
                  array={uvs}
                  itemSize={2}
                />
              </bufferGeometry>
            </mesh>,
            SCENE
          )}
          <points rotation={[0, Math.PI / 4, 0]}>
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
              fragmentShader={cubeToSphereFragmentShader}
              vertexShader={cubeToSphereVertexShader}
              uniforms={uniforms}
            />
          </points>
        </>
      </RenderTexture>
    </meshStandardMaterial>
  )
}
