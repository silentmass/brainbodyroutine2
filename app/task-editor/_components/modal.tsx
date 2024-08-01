import { XMarkIcon } from '@heroicons/react/24/outline'

export const StateModal = ({
  children,
  onClose,
  classNames,
  isCloseVisible = true
}: {
  children: React.ReactNode
  onClose: () => void
  classNames: { outer: string; inner: string; button: string } | null
  isCloseVisible?: boolean
}) => {
  const { outer, inner, button } = classNames
    ? classNames
    : {
        outer:
          'fixed flex top-0 bg-bkg/95 w-screen h-screen justify-center items-center',
        inner:
          'flex flex-col max-h-[85vh] bg-accent-2/80 rounded-md backdrop-blur-sm my-5 mx-2 pb-5 shadow-md',
        button: ''
      }
  return (
    <div id='outerModalContainer' className={`${outer}`}>
      <div id='innerModaltContainer' className={`${inner}`}>
        <button
          id={'closeModal'}
          onClick={e => onClose()}
          aria-label='Close modal'
          className={`${button}`}
          disabled={!isCloseVisible}
        >
          <XMarkIcon className='w-5 ml-2 mt-2' />
        </button>
        {children}
      </div>
    </div>
  )
}

export const ModalTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id='modalTitle' className='flex w-full justify-center'>
      {children}
    </div>
  )
}
export const ModalBody = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      id='modalBody'
      className='flex max-h-[70vh] flex-col mx-5 overflow-y-auto overflow-x-visible'
    >
      {children}
    </div>
  )
}
