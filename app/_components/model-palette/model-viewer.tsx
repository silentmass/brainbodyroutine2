'use client'
import {
  CSSProperties,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { ModelPaletteRadioButtons, ModelPaletteViews } from './model-palette'
import TexturePaletteViews from './texture-palette'
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  Preload,
  RenderTexture,
  Text,
  useProgress,
  useTexture
} from '@react-three/drei'
import { Canvas, useThree } from '@react-three/fiber'
import { useDebouncedCallback } from 'use-debounce'
import * as THREE from 'three'
import {
  TextureContext,
  textureContextType,
  TexturesContext
} from './TextureContext'
import TexturePaletteRadioButtons from './texture-palette-radiobuttons'
import clsx from 'clsx'
import { TextureUvContext } from './TextureUvContext'
import { CheckIcon } from '@heroicons/react/24/outline'
import { DEFAULT_MODELS, TEXTURE_WIDTH, TextureType } from './definitions'
import { CUBE_UVS_SINGLE_TEXTURE } from './uvs'
import { GetCustomMaterial } from './materials'
import { MaterialContext } from './MaterialContext'
import TextureTextInput from './InputTextureText'
import { attach } from '@react-three/fiber/dist/declarations/src/core/utils'
import { array } from 'zod'
import ModelViewPreview from './model-preview'

export default function ModelViewer ({
  selectedTextures = null
}: {
  selectedTextures: TextureType[] | null
}) {
  const [textureText, setTextureText] = useState('Hello')
  const [selectedTextureName, setSelectedTextureName] =
    useState<textureContextType>('default')
  const [selectedModelName, setSelectedModelName] = useState<string | null>(
    'cube'
  )
  const [selectedMaterialName, setSelectedMaterialName] = useState<
    string | null
  >(null)

  const [isCubeUvSingleTexture, setIsCubeUvSingleTexture] = useState(false)
  const [showTextureText, setShowTextureText] = useState(true)

  const handleTextureNameChange = (textureName: textureContextType) => {
    setSelectedTextureName(textureName)
  }

  const handleTextChange = useDebouncedCallback((term: string) => {
    setTextureText(term)
    console.log('Text...', term)
  }, 300)

  const handleCubeUvChange = () => {
    setIsCubeUvSingleTexture(previousState => !previousState)
  }

  const handleChangeShowTextureText = () => {
    setShowTextureText(previousState => !previousState)
  }

  return (
    <>
      <MaterialContext.Provider value={selectedMaterialName}>
        <TextureContext.Provider value={selectedTextureName}>
          <TextureUvContext.Provider value={isCubeUvSingleTexture}>
            <ModelPaletteViews models={DEFAULT_MODELS} />
            <fieldset>
              <legend>Select 3D model:</legend>
              <ModelPaletteRadioButtons
                models={DEFAULT_MODELS}
                selectedModelName={selectedModelName}
                setSelectedModelName={setSelectedModelName}
              />
            </fieldset>
            {selectedTextures && (
              <>
                <TexturePaletteViews
                  textures={selectedTextures}
                  handleTextureNameChange={handleTextureNameChange}
                  onDropFileChange={e => {}}
                />
                <TexturePaletteRadioButtons
                  textures={selectedTextures}
                  handleTextureNameChange={handleTextureNameChange}
                />
              </>
            )}
            {
              <ChangeUvButton
                isCubeUvSingleTexture={isCubeUvSingleTexture}
                handleCubeUvChange={handleCubeUvChange}
              />
            }
            <TextureTextInput
              textureText={textureText}
              handleChange={handleTextChange}
              showTextureText={showTextureText}
              onChangeShowTextureText={handleChangeShowTextureText}
            />
            <div className='flex w-[200px] h-[200px]'></div>
            <ModelViewPreview
              textureText={textureText}
              showTextureText={showTextureText}
            />
          </TextureUvContext.Provider>
        </TextureContext.Provider>
      </MaterialContext.Provider>
    </>
  )
}

export const ChangeUvButton = ({
  isCubeUvSingleTexture,
  handleCubeUvChange
}: {
  isCubeUvSingleTexture: boolean
  handleCubeUvChange: () => void
}) => {
  return (
    <div className='flex gap-5 items-center'>
      <label htmlFor='cubeUvSingleTexture'>Cube single UV texture</label>
      <input
        type='checkbox'
        id='cubeUvSingleTexture'
        name='cubeUvSingleTexture'
        onChange={handleCubeUvChange}
        checked={isCubeUvSingleTexture}
      />
    </div>
  )
}
