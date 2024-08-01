import { CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

export default function TextureTextInput ({
  textureText,
  handleChange,
  showTextureText,
  onChangeShowTextureText
}: {
  textureText: string
  handleChange: (term: string) => void
  showTextureText: boolean
  onChangeShowTextureText: () => void
}) {
  return (
    <div className='flex flex-col'>
      <div className='flex gap-5'>
        <label htmlFor='textureText'>Texture Text</label>
        <input
          type='checkbox'
          id='showText'
          name='showText'
          onChange={onChangeShowTextureText}
          checked={showTextureText}
        />
      </div>
      <input
        type='text'
        id='textureText'
        name='textureText'
        defaultValue={textureText}
        onChange={e => handleChange(e.target.value)}
        className={`${clsx({
          'material-disabled': !showTextureText,
          '': showTextureText
        })}`}
        disabled={!showTextureText}
      />
    </div>
  )
}
