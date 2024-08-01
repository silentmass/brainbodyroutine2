'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import {
  OrbitControls,
  PerspectiveCamera,
  RenderTexture
} from '@react-three/drei'

export const PaletteModelCubeMesh = () => {
  const params = { width: 1, height: 1, depth: 1 }
  const ref = useRef<null | THREE.Mesh>(null)

  useEffect(() => {
    console.log('PaletteModelCubeMesh')
  }, [])

  useFrame(({ clock }) => {
    if (ref.current === null) return

    const t = clock.getElapsedTime()

    ref.current.position.y = (1 + Math.sin(t / 1.5)) / 10
    ref.current.rotation.y += 0.01
  })

  return (
    <mesh ref={ref} position={[0, 0.5, 0]} scale={1} rotation={[0, 0, 0]}>
      <boxGeometry args={[params.width, params.height, params.depth]} />
      <meshStandardMaterial wireframe />
    </mesh>
  )
}

const PaletteModelView = ({ model }: { model: string }) => {
  const ref = useRef<null | THREE.Group>(null)

  switch (model) {
    case 'cube':
      return <PaletteModelCubeMesh />
    case 'card':
      return <PaletteModelCubeMesh />
    case 'cylinder':
      return <PaletteModelCubeMesh />
    case 'sphere':
      return <PaletteModelCubeMesh />
  }
}

export const ModelPaletteViews = ({ models }: { models: any[] }) => {
  return (
    <ul className='flex flex-wrap gap-6'>
      {models.map(model => (
        <li
          key={`palette_model_${model.name}`}
          className='relative flex justify-center items-center'
          style={{ height: 100, width: 100 }}
        >
          <Canvas className='flex'>
            <PerspectiveCamera
              makeDefault
              fov={75}
              aspect={1}
              near={0.1}
              far={5}
              position={[0, 0, 2]}
            />
            <ambientLight intensity={Math.PI / 2} />
            <pointLight position={[5, 5, 5]} intensity={2} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              target={[0, 0.5, 0]}
              // autoRotate={false}
              // minPolarAngle={Math.PI / 2}
              // maxPolarAngle={Math.PI / 2}
            />
            <PaletteModelView model={model.name} />
          </Canvas>
        </li>
      ))}
    </ul>
  )
}

export const ModelPaletteRadioButtons = ({
  models,
  selectedModelName,
  setSelectedModelName
}: {
  models: any[]
  selectedModelName: string | null
  setSelectedModelName: Dispatch<SetStateAction<string | null>>
}) => {
  return (
    <ul className='flex'>
      {models.map(model => {
        const key = `model_${model.name}_radio`
        return (
          <li key={key} className='flex justify-center items-center '>
            <div className='flex gap-2'>
              <input
                type='radio'
                id={key}
                name='model'
                value={model.name}
                checked={
                  selectedModelName ? model.name === selectedModelName : false
                }
                onChange={() => setSelectedModelName(model.name)}
              />
              <label htmlFor={key} className='hover:bg-blue-200/50 '>
                {model.name}
              </label>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default function ModelPalette ({ models }: { models: any[] }) {
  if (!models || models.length === 0) return <></>

  return (
    <>
      <ModelPaletteViews models={models} />
    </>
  )
}
