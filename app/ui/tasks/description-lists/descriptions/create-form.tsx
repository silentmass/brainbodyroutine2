'use client'
import { createListDescription } from '@/app/lib/actions/descriptions'
import { TaskDescriptionList } from '@/app/lib/definitions'
import { useFormState } from 'react-dom'
import { CreateButton } from '@/app/ui/form-components/buttons'
import { initialState } from '@/app/_components/response-state'
import ResponseDurationMessage from '@/app/_components/response-duration'

export default function CreateListDescriptionForm ({
  descriptionList,
  redirectTo
}: {
  descriptionList: TaskDescriptionList
  redirectTo: string
}) {
  const createListDescriptionWithId = createListDescription.bind(
    null,
    `${descriptionList.id}`
  )
  const [state, formAction] = useFormState(
    createListDescriptionWithId,
    initialState
  )

  return (
    <form
      name='createListDescriptionForm'
      id='createListDescriptionForm'
      action={formAction}
      className='card relative flex flex-col gap-y-4 w-full rounded-2xl p-6'
    >
      <div className='flex flex-col gap-y-4 w-full'>
        <div className='flex flex-col w-full gap-2'>
          <label className={`flex flex-col w-full`}>
            <h2 className=''>Description</h2>
          </label>
          <textarea
            name='description'
            id='description'
            className='flex w-full p-2 rounded-2xl'
          ></textarea>
        </div>

        <div className='flex w-full justify-center'>
          <CreateButton className='' ariaLabel='Create description'>
            Create
          </CreateButton>
        </div>
      </div>
      {/* Form action state message floating above card. Requires relative parent. */}
      <ResponseDurationMessage state={state} />
    </form>
  )
}
