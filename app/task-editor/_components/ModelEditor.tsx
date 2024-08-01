import { TextureType } from '@/app/_components/model-palette/definitions'
import TextureTextInput from '@/app/_components/model-palette/InputTextureText'
import { CUSTOM_MATERIAL_NAMES } from '@/app/_components/model-palette/materials'
import { ChangeUvButton } from '@/app/_components/model-palette/model-viewer'
import TexturePaletteViews from '@/app/_components/model-palette/texture-palette'
import { SelectMaterialDropDown } from '@/app/_components/model-palette/texture-viewer'
import {
  textureContextType,
  TextureContext
} from '@/app/_components/model-palette/TextureContext'
import ModelUploadDropZone, {
  DropFile
} from '@/app/_components/model-upload-drop-zone/model-upload-drop-zone'
import { LinkIcon } from '@heroicons/react/24/outline'
import { useContext, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export default function EditModel ({
  selectedTextures,
  handleTextureNameChange,
  isCubeUvSingleTexture,
  handleCubeUvChange,
  textureText,
  showTextureText,
  handleTextChange,
  handleChangeShowTextureText,
  selectedMaterialName,
  onSelecteMaterialNameChange,
  onDropFileChange,
  adUrl,
  onAdUrlChange
}: {
  selectedTextures: TextureType[]
  handleTextureNameChange: (textureName: textureContextType) => void
  isCubeUvSingleTexture: boolean
  handleCubeUvChange: () => void
  textureText: string
  showTextureText: boolean
  handleTextChange: (term: string) => void
  handleChangeShowTextureText: () => void
  selectedMaterialName: string | null
  onSelecteMaterialNameChange: (materialName: string) => void
  onDropFileChange: (files: DropFile[]) => void
  adUrl: string | null
  onAdUrlChange: (url: string) => void
}) {
  const selectedTextureName = useContext(TextureContext)
  return (
    <div className='flex flex-col z-50 gap-5'>
      <TexturePaletteViews
        textures={selectedTextures}
        handleTextureNameChange={handleTextureNameChange}
        onDropFileChange={onDropFileChange}
      />
      <div className='flex w-full justify-center'>
        <div className='flex min-w-[15vh] min-h-[15vh]'>
          <ModelUploadDropZone onFileChange={onDropFileChange} />
        </div>
      </div>
      <div>
        <SelectMaterialDropDown
          names={CUSTOM_MATERIAL_NAMES}
          selected={`${selectedMaterialName}`}
          onSelecteMaterialNameChange={onSelecteMaterialNameChange}
          className={``}
          readOnly={selectedTextureName !== 'custom'}
        />
      </div>
      <div>
        <ChangeUvButton
          isCubeUvSingleTexture={isCubeUvSingleTexture}
          handleCubeUvChange={handleCubeUvChange}
        />
      </div>
      <TextureTextInput
        textureText={textureText}
        handleChange={handleTextChange}
        showTextureText={showTextureText}
        onChangeShowTextureText={handleChangeShowTextureText}
      />
      <AdUrl url={adUrl} onChange={onAdUrlChange} />
    </div>
  )
}

export const AdUrl = ({
  url,
  onChange
}: {
  url: string | null
  onChange: (url: string) => void
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [adUrl, setAdUrl] = useState<string | null>(url)
  const handleChange = useDebouncedCallback(
    (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      console.log('handleChange', ev.target.value)
      setAdUrl(ev.target.value)
      onChange(ev.target.value)
    },
    300
  )
  const handleBlur = (ev: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!textareaRef.current) return

    console.log('Update Ad Url')
    handleChange(ev)
  }
  const handleKeyDown = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (ev.code !== 'Enter' || !textareaRef.current) return
    ev.preventDefault()
    handleChange.cancel()
    textareaRef.current.blur()
  }
  return (
    <div className='flex relative w-full rounded-cool bg-rose-500 p-2'>
      <textarea
        ref={textareaRef}
        id='adUrl'
        name='adURl'
        className='peer description-input-create'
        placeholder='Ad URL'
        defaultValue={adUrl ? adUrl : ''}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <LinkIcon className='absolute top-1/2 -translate-y-1/2 left-3 h-5 w-5 stroke-cyan-700 peer-focus:stroke-content peer-placeholder-shown:stroke-accent-4 z-10' />
    </div>
  )
}
