'use client'
import { PerspectiveCamera } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import {
  CUSTOM_MATERIAL_NAMES,
  DEFAULT_MATERIAL_NAME,
  GetCustomMaterial,
  StimulusButtonWrapper
} from './materials'
import { RefObject, Suspense, useRef, useState } from 'react'
import clsx from 'clsx'

const TEXTURE_PREVIEW_DIMENSIONS = { width: 600, height: 600 }

export default function TextureViewer () {
  const [selectedMaterialName, setSelectedMaterialName] = useState<
    null | string
  >(DEFAULT_MATERIAL_NAME)

  const stimulusRef = useRef<() => void | null>(null)

  const triggerStimulusClick = () => {
    if (stimulusRef.current) {
      stimulusRef.current()
    }
  }

  const handleSetSelectedMaterialName = (materialName: string) => {
    setSelectedMaterialName(materialName)
  }

  return (
    <div className='flex h-full flex-col'>
      <div className='flex h-full justify-center items-center w-full'>
        <SelectMaterialDropDown
          names={CUSTOM_MATERIAL_NAMES}
          selected={`${selectedMaterialName}`}
          onSelecteMaterialNameChange={handleSetSelectedMaterialName}
          className='flex flex-col'
          readOnly={false}
        />
      </div>
      <div className='flex h-fit items-center'>
        <div
          className='flex'
          style={{
            width: TEXTURE_PREVIEW_DIMENSIONS.width,
            height: TEXTURE_PREVIEW_DIMENSIONS.height
          }}
        >
          <StimulusButtonWrapper onClick={triggerStimulusClick}>
            <Suspense fallback={null}>
              <Canvas className='flex'>
                <PerspectiveCamera
                  makeDefault
                  fov={25}
                  aspect={1}
                  near={0.1}
                  far={10}
                  position={[0, 0, 1 / 2 / Math.tan((25 / 2 / 180) * Math.PI)]}
                />
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 0, 1]} intensity={2} />

                <mesh>
                  <planeGeometry />
                  <GetCustomMaterial
                    materialName={selectedMaterialName}
                    stimulusRef={stimulusRef}
                  />
                </mesh>
              </Canvas>
            </Suspense>
          </StimulusButtonWrapper>
        </div>
      </div>
      <div className='flex h-full'></div>
    </div>
  )
}

const SelectMaterialRadio = ({
  selected,
  onSelecteMaterialNameChange
}: {
  selected: string
  onSelecteMaterialNameChange: (materialName: string) => void
}) => {
  return (
    <ul className='flex flex-col'>
      <fieldset>
        {CUSTOM_MATERIAL_NAMES.map(textureName => (
          <li key={`${textureName}`} className='flex gap-6 items-center w-full'>
            <label
              htmlFor={`radio_${textureName}`}
              className='flex hover:bg-accent-2 w-full'
            >{`${textureName}`}</label>
            <input
              type='radio'
              id={`radio_${textureName}`}
              name={`texture`}
              value={`${textureName}`}
              onChange={e => onSelecteMaterialNameChange(`${textureName}`)}
              className='flex'
              checked={selected === `${textureName}`}
            />
          </li>
        ))}
      </fieldset>
    </ul>
  )
}
export const SelectMaterialDropDown = ({
  names,
  selected,
  onSelecteMaterialNameChange,
  className,
  readOnly = false
}: {
  names: (string | null)[]
  selected: string
  onSelecteMaterialNameChange: (materialName: string) => void
  className: string
  readOnly: boolean
}) => {
  if (!names) return null
  return (
    <div className='flex gap-5 items-center'>
      <label htmlFor='selectCustomMaterial'>Select custom material</label>
      <select
        id='selectCustomMaterial'
        className={`${className} ${clsx({
          '': !readOnly,
          'material-disabled': readOnly
        })}`}
        defaultValue={`${selected}`}
        onChange={e => onSelecteMaterialNameChange(e.target.value)}
        disabled={readOnly}
      >
        {names
          .filter(textureName => textureName)
          .map(textureName => (
            <option
              key={`${textureName}`}
              className='flex gap-6 items-center w-full'
              value={`${textureName}`}
            >
              {textureName}
            </option>
          ))}
      </select>
    </div>
  )
}
