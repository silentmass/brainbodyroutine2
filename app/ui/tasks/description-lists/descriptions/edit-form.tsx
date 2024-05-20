'use client'

import { updateListDescription } from '@/app/lib/actions/descriptions'
import { ListDescription, ListDescriptionBase } from '@/app/lib/definitions'
import { FormButton } from '@/app/ui/form-components/buttons'
import { useFormState } from 'react-dom'
import { initialState } from '@/app/_components/response-state'
import ResponseDurationMessage from '@/app/_components/response-duration'

export default function EditListDescriptionForm ({
  description
}: {
  description: ListDescription | ListDescriptionBase
}) {
  if ('id' in description && description.id !== undefined) {
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
      <div className='relative flex flex-col w-full rounded-2xl'>
        <form
          name='editListDescription'
          id='editListDesription'
          action={formAction}
          className=''
        >
          <div className='flex flex-col w-full gap-2'>
            <div className='flex items-center'>
              <label className={`flex`}>
                <h2 className=''>Description</h2>
              </label>
            </div>
            <textarea
              name='description'
              id='description'
              defaultValue={description.description}
              required
              className='flex w-full p-2 rounded-2xl min-h-20'
            ></textarea>
            <div className='flex justify-end'>
              <FormButton
                className={''}
                ariaLabel='Update description'
                type='submit'
              >
                Update
              </FormButton>
            </div>
          </div>
        </form>
        {/* Form action state message floating above card. Requires relative parent. */}
        <ResponseDurationMessage state={state} />
      </div>
    )
  } else {
    return (
      <div className='relative flex flex-col w-full rounded-2xl'>
        <div className='flex flex-col w-full gap-2'>
          <div className='flex items-center'>
            <label className={`flex`}>
              <h2 className=''>Description</h2>
            </label>
          </div>
          <textarea
            name='description'
            id='description'
            defaultValue={description.description}
            required
            className='flex w-full p-2 rounded-2xl min-h-20'
          ></textarea>
          <div className='flex justify-end'>
            <FormButton
              className={'pending'}
              ariaLabel='Update description'
              type='submit'
            >
              Update
            </FormButton>
          </div>
        </div>
      </div>
    )
  }
}
