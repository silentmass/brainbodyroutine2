import { PerspectiveCamera, RenderTexture } from '@react-three/drei'
import { useLoader, useFrame } from '@react-three/fiber'
import { useRef, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { TEXTURE_WIDTH } from '../definitions'

import waveVertexShader from './shaders/wave.vert'
import waveFragmentShader from './shaders/wave.frag'
import { RenderTextureWrapper } from '../materials'

const SHARED_PLANE_GEOMETRY = new THREE.PlaneGeometry(0.6, 0.6, 16, 16)

export const WaveMaterial = () => {
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null)

  const colorVec = new THREE.Color('hotpink')

  const [image] = useLoader(THREE.TextureLoader, [
    'https://images.unsplash.com/photo-1604011092346-0b4346ed714e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1534&q=80'
  ])

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: colorVec },
      uTexture: { value: image }
    }),
    [image]
  )

  useFrame(({ clock }) => {
    if (!shaderMaterialRef.current) return
    shaderMaterialRef.current.uniforms.uTime.value = clock.getElapsedTime()
  })

  useEffect(() => {
    if (!shaderMaterialRef.current) return

    shaderMaterialRef.current.uniforms.uTexture.value = image
    shaderMaterialRef.current.uniforms.uColor.value = colorVec
  }, [image, colorVec])

  return (
    <RenderTextureWrapper>
      <mesh position={[0, 0, 0]} scale={1.5} geometry={SHARED_PLANE_GEOMETRY}>
        <shaderMaterial
          ref={shaderMaterialRef}
          fragmentShader={waveFragmentShader}
          vertexShader={waveVertexShader}
          uniforms={uniforms}
        />
      </mesh>
    </RenderTextureWrapper>
  )
}
