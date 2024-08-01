import ModelViewPreview from '@/app/_components/model-palette/model-preview'
import { SpinnerFormButton } from '@/app/ui/form-components/buttons'
import { PencilIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'

export default function EditModelCard ({
  onEditModel,
  isModal,
  isModelEdit,
  textureText,
  showTextureText,
  adUrl
}: {
  onEditModel: () => void
  isModal: boolean
  isModelEdit: boolean
  textureText: string
  showTextureText: boolean
  adUrl: string | null
}) {
  return (
    <div
      className={`model-editor ${clsx({
        'model-editor-edit-model': isModelEdit,
        'model-editor-preview': !isModelEdit
      })}`}
    >
      <button
        className={`card-pencil-button ${clsx({
          'z-10': !isModelEdit,
          '': isModelEdit
        })}`}
        onClick={() => onEditModel()}
        style={{ visibility: isModal ? 'hidden' : 'visible' }}
      >
        <PencilIcon className='card-pencil-icon' />
      </button>
      <div className='flex flex-col justify-center items-center gap-5'>
        <div className='flex w-[200px] h-[200px]'>
          <ModelViewPreview
            textureText={textureText}
            showTextureText={showTextureText}
          />
        </div>
        {adUrl && (
          <div className='flex'>
            <SpinnerFormButton
              ariaLabel='Order Now'
              type={undefined}
              className=''
              onClick={() => console.log(adUrl)}
              defaultValue={'buttonOrderNow'}
            >
              Order Now
            </SpinnerFormButton>
          </div>
        )}
      </div>
    </div>
  )
}
