import {
  OrbitControls,
  PerspectiveCamera,
  RenderTexture
} from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef, useCallback, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import { Color } from 'three'
import { TEXTURE_WIDTH } from '../definitions'

import gradientVertexShader from './shaders/gradient.vert'
import gradientFragmentShader from './shaders/gradient.frag'
import { RenderTextureWrapper } from '../materials'

const SHARED_PLANE_GEOMETRY = new THREE.PlaneGeometry(1, 1, 32, 32)
const SHARED_VEC2 = new THREE.Vector2()
const SHARED_VEC_ZERO = new THREE.Vector2(0, 0)
const SHARED_COLOR_BG = new Color('#A1A3F7')
const SHARED_COLOR_A = new Color('#9FBAF9')
const SHARED_COLOR_B = new Color('#FEB3D9')

export const GradientMaterial = () => {
  const shaderMaterialRef = useRef<THREE.ShaderMaterial | null>(null)
  const mousePosition = useRef({ x: 0, y: 0 })

  const updateMousePosition = useCallback((e: any) => {
    mousePosition.current = { x: e.pageX, y: e.pageY }
  }, [])

  const uniforms = useMemo(
    () => ({
      u_time: {
        value: 0.0
      },
      u_mouse: { value: SHARED_VEC_ZERO },
      u_bg: {
        value: SHARED_COLOR_BG
      },
      u_colorA: { value: SHARED_COLOR_A },
      u_colorB: { value: SHARED_COLOR_B }
    }),
    []
  )

  useEffect(() => {
    window.addEventListener('mousemove', updateMousePosition, false)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition, false)
    }
  }, [updateMousePosition])

  useFrame(({ clock }) => {
    if (!shaderMaterialRef.current) return

    shaderMaterialRef.current.uniforms.u_time.value = clock.getElapsedTime()
    shaderMaterialRef.current.uniforms.u_mouse.value = SHARED_VEC2.set(
      mousePosition.current.x,
      mousePosition.current.y
    )
  })

  return (
    <RenderTextureWrapper>
      <color attach={'background'} args={['black']} />
      <mesh position={[0, 0, 0]} scale={1.5} geometry={SHARED_PLANE_GEOMETRY}>
        <shaderMaterial
          ref={shaderMaterialRef}
          fragmentShader={gradientFragmentShader}
          vertexShader={gradientVertexShader}
          uniforms={uniforms}
        />
      </mesh>
    </RenderTextureWrapper>
  )
}
