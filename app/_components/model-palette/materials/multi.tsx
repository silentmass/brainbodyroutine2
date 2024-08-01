import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

import multiVertexShader from './shaders/multi.vert'
import multiFragmentShader from './shaders/multi.frag'
import { RenderTextureWrapper } from '../materials'

const SHARED_PLANE_GEOMETRY = new THREE.PlaneGeometry(1, 1, 16, 16)
const SHARED_COLOR_A = new THREE.Color('#FFE486')
const SHARED_COLOR_B = new THREE.Color('#FEB3D9')

export const MultiMaterial = () => {
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null)

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0
      },
      u_colorA: { value: SHARED_COLOR_A },
      u_colorB: { value: SHARED_COLOR_B }
    }),
    []
  )

  useFrame(({ clock }) => {
    if (!shaderMaterialRef.current) return

    shaderMaterialRef.current.uniforms.u_time.value = clock.getElapsedTime()
  })

  return (
    <RenderTextureWrapper>
      <mesh
        position={[0, -0.1, 0]}
        rotation={[Math.PI / 3, 0, Math.PI / 4]}
        scale={1}
        geometry={SHARED_PLANE_GEOMETRY}
      >
        <shaderMaterial
          ref={shaderMaterialRef}
          fragmentShader={multiFragmentShader}
          vertexShader={multiVertexShader}
          uniforms={uniforms}
        />
      </mesh>
    </RenderTextureWrapper>
  )
}
