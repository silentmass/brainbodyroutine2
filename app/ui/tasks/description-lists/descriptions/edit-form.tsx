'use client'
import { updateListDescription } from '@/app/lib/actions/descriptions'
import { ListDescription } from '@/app/lib/definitions'
import { CreateButton } from '@/app/ui/form-components/buttons'
import { useFormState } from 'react-dom'
import { initialState } from '@/app/_components/response-state'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { DeleteListDescription } from './buttons'

export default function EditListDescriptionForm ({
  description
}: {
  description: ListDescription
}) {
  const updateListDescriptionWithId = updateListDescription.bind(
    null,
    `${description.id}`,
    `${description.description_list_id}`
  )
  const [state, formAction] = useFormState(
    updateListDescriptionWithId,
    initialState
  )

  return (
    <form
      name='editListDescription'
      id='editListDesription'
      action={formAction}
      className='relative flex flex-col w-full rounded-2xl'
    >
      <div className='flex w-full p-6'>
        <div className={`flex w-full items-end gap-4`}>
          <div className='flex flex-col w-full gap-2'>
            <label className={``}>
              <h2 className=''>Description</h2>
            </label>
            <textarea
              name='description'
              id='description'
              defaultValue={description.description}
              required
              className='flex w-full p-2 rounded-2xl'
            ></textarea>
          </div>
          <div className='flex h-full flex-col justify-end items-center gap-6'>
            <CreateButton className={''} ariaLabel='Update description'>
              Update
            </CreateButton>
          </div>
        </div>
      </div>
      {/* Form action state message floating above card. Requires relative parent. */}
      <ResponseDurationMessage state={state} />
    </form>
  )
}
