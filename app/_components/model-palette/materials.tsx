import React, { RefObject } from 'react'

import { CubeToSphereParticlesMaterial } from './materials/cubeToSphereParticle'
import { BlobMaterial } from './materials/blob'
import { DefaultMaterial } from './materials/default'
import { GradientMaterial } from './materials/gradient'
import { MetalRoughnessMaterial } from './materials/metalRoughness'
import { MultiMaterial } from './materials/multi'
import { OrangeBackgroundWithDodecahedron } from './materials/orangeBackGroundDodecahedron'
import { WaveMaterial } from './materials/wave'
import { ChaosCirclesParticleMaterial } from './materials/chaosCirclesParticle'
import {
  OrbitControls,
  PerspectiveCamera,
  RenderTexture
} from '@react-three/drei'
import { TEXTURE_WIDTH } from './definitions'

export const CUSTOM_MATERIAL_NAMES = [
  null,
  'bg-orange-dodeca',
  'metal-roughness',
  'multi',
  'blob',
  'gradient',
  'wave',
  'cubeToSphere',
  'chaosToCircle'
]

export const DEFAULT_MATERIAL_NAME =
  CUSTOM_MATERIAL_NAMES[CUSTOM_MATERIAL_NAMES.length - 1]

export const GetCustomMaterial = ({
  materialName,
  stimulusRef = null
}: {
  materialName: string | null
  stimulusRef?: any
}) => {
  switch (materialName) {
    case 'bg-orange-dodeca':
      return <OrangeBackgroundWithDodecahedron />
    case 'metal-roughness':
      return <MetalRoughnessMaterial />
    case 'multi':
      return <MultiMaterial />
    case 'blob':
      return <BlobMaterial />
    case 'gradient':
      return <GradientMaterial />
    case 'wave':
      return <WaveMaterial />
    case 'cubeToSphere':
      return <CubeToSphereParticlesMaterial />
    case 'chaosToCircle':
      return <ChaosCirclesParticleMaterial stimulusRef={stimulusRef} />
    default:
      return <DefaultMaterial />
  }
}

export function StimulusButtonWrapper ({
  children,
  onClick,
  visible = false
}: {
  children: React.ReactNode
  onClick: (() => void) | null
  visible?: boolean
}) {
  return (
    <div className='flex relative w-full h-full'>
      {children}
      <button
        className='absolute flex bg-accent-5/50 bottom-0 right-0 rounded-cool p-1 text-xs items-center justify-center'
        onClick={e => {
          e.preventDefault()
          onClick !== null ? onClick() : null
        }}
        style={{ visibility: visible ? 'visible' : 'hidden' }}
      >
        Stimulate
      </button>
    </div>
  )
}

export function RenderTextureWrapper ({
  children
}: {
  children: React.ReactNode
}) {
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
          position={[0, 0, 1.5]}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        {children}
        {/* <axesHelper />
        <OrbitControls /> */}
      </RenderTexture>
    </meshStandardMaterial>
  )
}
