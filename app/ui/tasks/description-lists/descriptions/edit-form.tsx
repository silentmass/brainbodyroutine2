'use client'
import { updateListDescription } from '@/app/lib/actions/descriptions'
import { ListDescription } from '@/app/lib/definitions'
import { CreateButton } from '@/app/ui/form-components/buttons'
import { useFormState } from 'react-dom'
import { initialState } from '@/app/_components/response-state'
import ResponseDurationMessage from '@/app/_components/response-duration'

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
      <div className='flex w-full p-5'>
        <div className={`flex w-full h-full items-end gap-4`}>
          <label className={`flex flex-col w-full`}>
            <h2 className='card-create'>Description</h2>
            <textarea
              name='description'
              id='description'
              defaultValue={description.description}
              required
              className='flex w-full p-2 bg-transparent border border-neutral-300 rounded-2xl'
            ></textarea>
          </label>
          <CreateButton
            className={'card-create'}
            ariaLabel='Update description'
          >
            Update
          </CreateButton>
        </div>
      </div>
      {/* Form action state message floating above card. Requires relative parent. */}
      <ResponseDurationMessage state={state} />
    </form>
  )
}
