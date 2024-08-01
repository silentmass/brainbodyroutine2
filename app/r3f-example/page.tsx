'use client'
import {
  OrbitControls,
  PerspectiveCamera,
  Preload,
  useTexture
} from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import style from 'styled-jsx/style'
import { BoxGeometry, Loader, MeshStandardMaterial } from 'three'
import {
  GetCustomMaterial,
  StimulusButtonWrapper
} from '../_components/model-palette/materials'
import {
  createGeometryWithUV,
  sharedCubeGeometry,
  sharedCubeGeometryUvSingleTexture
} from '../_components/model-palette/model-preview'

const Tex = () => {
  const tex = useTexture('/uv_grid_opengl.jpg')
  return <meshStandardMaterial map={tex} />
}

export default function Page () {
  return (
    <div className='relative flex h-full items-center'>
      <R3FTest />
    </div>
  )
}

export const R3FTest = () => {
  const stimulusRef = useRef<() => void | null>(null)

  const triggerStimulusClick = () => {
    if (stimulusRef.current) {
      console.log('R3FTest')
      stimulusRef.current()
    }
  }

  return (
    <>
      <StimulusButtonWrapper onClick={triggerStimulusClick}>
        <Canvas
          className='flex'
          // frameloop='demand'
        >
          <Suspense fallback={null}>
            <PerspectiveCamera
              makeDefault
              fov={25}
              aspect={1}
              near={0.1}
              far={10}
              position={[0, 0, 5]}
            />
            <ambientLight intensity={5} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              shadow-mapSize={2048}
              castShadow
            />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              target={[0, 0, 0]}
              autoRotate={false}
              // minPolarAngle={Math.PI / 2}
              // maxPolarAngle={Math.PI / 2}
            />
            {/* <axesHelper args={[5]} /> */}
            <Test materialName={'chaosToCircle'} stimulusRef={stimulusRef} />
            <Preload all />
          </Suspense>
        </Canvas>
      </StimulusButtonWrapper>
    </>
  )
}

const Test = ({
  materialName,
  stimulusRef = null
}: {
  materialName: string | null
  stimulusRef: any
}) => {
  const isCubeUvSingleTexture = false
  const geometry = useMemo(
    () =>
      isCubeUvSingleTexture
        ? sharedCubeGeometryUvSingleTexture
        : sharedCubeGeometry,
    [isCubeUvSingleTexture]
  )

  return (
    <mesh position={[0, 0, 0]} scale={[1.01, 1.01, 1.01]} geometry={geometry}>
      <GetCustomMaterial
        materialName={materialName}
        stimulusRef={stimulusRef}
      />
    </mesh>
  )
}
