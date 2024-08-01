import * as THREE from 'three'

import blobVertexShader from './shaders/blob.vert'
import blobFragmentShader from './shaders/blob.frag'
import {
  RenderTexture,
  OrbitControls,
  PerspectiveCamera
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import { TEXTURE_WIDTH } from '../definitions'
import { RenderTextureWrapper } from '../materials'

export const BlobMaterial = () => {
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null)
  const hover = useRef(false)

  const uniforms = useMemo(
    () => ({
      u_intensity: {
        value: 0.3
      },
      u_time: {
        value: 0.0
      }
    }),
    []
  )

  useFrame(({ clock }) => {
    if (!shaderMaterialRef.current) return

    shaderMaterialRef.current.uniforms.u_time.value =
      0.4 * clock.getElapsedTime()

    shaderMaterialRef.current.uniforms.u_intensity.value = THREE.MathUtils.lerp(
      shaderMaterialRef.current.uniforms.u_intensity.value,
      hover.current ? 0.85 : 0.15,
      0.02
    )
  })

  return (
    <RenderTextureWrapper>
      <color attach={'background'} args={['black']} />
      <mesh
        position={[0, 0, 0]}
        scale={0.5}
        onPointerOver={() => (hover.current = true)}
        onPointerOut={() => (hover.current = false)}
      >
        <icosahedronGeometry args={[1, 20]} />
        <shaderMaterial
          ref={shaderMaterialRef}
          fragmentShader={blobFragmentShader}
          vertexShader={blobVertexShader}
          uniforms={uniforms}
        />
      </mesh>
    </RenderTextureWrapper>
  )
}
