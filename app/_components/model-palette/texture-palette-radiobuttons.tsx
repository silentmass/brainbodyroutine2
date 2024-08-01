import { useContext, useEffect } from 'react'
import { TextureContext, textureContextType } from './TextureContext'
import { useRenderTracker } from '../renderTracker'

export default function TexturePaletteRadioButtons ({
  textures,
  handleTextureNameChange
}: {
  textures: { name: textureContextType; src: string | null }[]
  handleTextureNameChange: (textureName: textureContextType) => void
}) {
  if (!textures || textures.length === 0) return null

  useRenderTracker('TexturePaletteRadioButtons')

  const selectedTextureName = useContext(TextureContext)

  return (
    <ul className='flex flex-wrap gap-6 w-full justify-between bg-purple-400'>
      {textures.map(({ name }) => {
        const key = `texture_${name}_radio`
        return (
          <li key={key} className='flex justify-center items-center'>
            <div className='flex gap-2 w-fit'>
              <input
                type='radio'
                id={key}
                name='texture'
                value={name}
                checked={
                  selectedTextureName ? name === selectedTextureName : false
                }
                onChange={() => handleTextureNameChange(name)}
                className='flex bg-pink-400 w-fit'
              />
              <label
                htmlFor={key}
                className='flex w-fit bg-orange-400 hover:bg-blue-200/50'
              >
                {name}
              </label>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
