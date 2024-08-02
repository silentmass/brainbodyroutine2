'use client'
import { Canvas } from '@react-three/fiber'
import Image from 'next/image'
import { PerspectiveCamera } from '@react-three/drei'
import { GetCustomMaterial } from './materials'
import { useContext } from 'react'
import { MaterialContext } from './MaterialContext'
import { TextureContext, textureContextType } from './TextureContext'
import clsx from 'clsx'
import { DropFile } from '../model-upload-drop-zone/model-upload-drop-zone'

export default function TexturePaletteViews ({
  textures,
  handleTextureNameChange,
  onDropFileChange
}: {
  textures: { name: textureContextType; src: string | null }[]
  handleTextureNameChange: (textureName: textureContextType) => void
  onDropFileChange: (files: DropFile[]) => void
}) {
  const selectedMaterialName = useContext(MaterialContext)
  const selectedTextureName = useContext(TextureContext)

  if (!textures || textures.length === 0) return null

  return (
    <ul className='flex flex-wrap gap-6 w-full p-2'>
      {textures.map(({ name, src }) => (
        <li key={`palette_texture_${name}`} className={`flex`}>
          <div
            className={`${clsx({
              'palette-selected': name === selectedTextureName,
              palette: name !== selectedMaterialName
            })}`}
            onClick={() => handleTextureNameChange(name)}
          >
            {src ? (
              <Image
                width={100}
                height={100}
                src={src}
                alt={name}
                priority={true}
              />
            ) : (
              name === 'custom' && (
                <div className='flex w-[100px] h-[100px]'>
                  <Canvas className='flex'>
                    <PerspectiveCamera
                      makeDefault
                      fov={25}
                      aspect={1}
                      near={0.1}
                      far={10}
                      position={[
                        0,
                        0,
                        1 / 2 / Math.tan((25 / 2 / 180) * Math.PI)
                      ]}
                    />
                    <ambientLight intensity={0.5} />
                    <directionalLight position={[0, 0, 1]} intensity={2} />
                    <mesh>
                      <planeGeometry />
                      <GetCustomMaterial materialName={selectedMaterialName} />
                    </mesh>
                  </Canvas>
                </div>
              )
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
