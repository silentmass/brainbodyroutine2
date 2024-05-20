'use client'

import { TaskDescriptionList } from '@/app/lib/definitions'
import Link from 'next/link'
import { updateDescriptionList } from '@/app/lib/actions/descriptionlists'
import { useFormState } from 'react-dom'
import { FormButton } from '../../form-components/buttons'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { initialState } from '@/app/_components/response-state'

export const UpdateDescriptionListForm = ({
  list
}: {
  list: TaskDescriptionList
}) => {
  const updateDescriptionListWithParams = updateDescriptionList.bind(
    null,
    `${list.id}`,
    list.descriptions
  )
  const [state, formAction] = useFormState(
    updateDescriptionListWithParams,
    initialState
  )

  return (
    <form
      name='updateDescriptionListForm'
      id='updateDescriptionListForm'
      action={formAction}
      className='card relative flex flex-col gap-y-4 w-full rounded-2xl p-5'
    >
      <input type='hidden' name='taskId' id='taskId' value={list.task_id} />
      <label className={`flex flex-col w-full gap-2`}>
        <h2 className=''>List Title</h2>
        <input
          type='text'
          name='title'
          id='title'
          required
          className={``}
          defaultValue={list.title}
        />
      </label>
      {/* Controls */}
      <div className='flex w-full justify-center items-center gap-4'>
        <Link href={`/tasks/${list.task_id}/edit`} className={``}>
          <FormButton className='' ariaLabel='Cancel' type={undefined}>
            Cancel
          </FormButton>
        </Link>
        <FormButton className='' ariaLabel='Update list' type='submit'>
          Update list
        </FormButton>
      </div>
      {/* Form action state message floating above card requires relative parent */}
      <ResponseDurationMessage state={state} />
    </form>
  )
}

export default UpdateDescriptionListForm
