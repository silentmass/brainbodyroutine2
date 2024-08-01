import BasicTextButton from '@/app/_components/circle-vibes/BasicTextButton'
import { SpinnerFormButton } from '@/app/ui/form-components/buttons'

export default function ConfirmationDialog ({
  onCancelClick,
  onConfirmClick
}: {
  onCancelClick: (e: React.FormEvent<HTMLButtonElement>) => void
  onConfirmClick: (e: React.FormEvent<HTMLButtonElement>) => void
}) {
  return (
    <div className='absolute top-0 flex flex-col gap-5 justify-center w-full h-full items-center z-20 bg-accent-1/80 backdrop-blur-sm rounded-md'>
      <div>Unsaved changes</div>
      <div className='flex gap-5'>
        <BasicTextButton ariaLabel='Cancel' onClick={onCancelClick}>
          Cancel
        </BasicTextButton>
        <BasicTextButton ariaLabel='Confirm' onClick={onConfirmClick}>
          Confirm
        </BasicTextButton>
      </div>
    </div>
  )
}
