'use client'

import { deleteDescriptionList } from '@/app/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
import { TrashIcon } from '@heroicons/react/24/outline'
import { initialState } from '@/app/_components/response-state'

export const DeleteTaskDescriptionList = ({
  taskDescriptionListId
}: {
  taskDescriptionListId: string
}) => {
  const deleteTaskDescriptionListWithId = deleteDescriptionList.bind(
    null,
    taskDescriptionListId
  )
  const [state, formAction] = useFormState(
    deleteTaskDescriptionListWithId,
    initialState
  )
  return (
    <form
      name='deleteTaskDescriptionListForm'
      id='deleteTaskDescriptionListForm'
      action={formAction}
    >
      <button type='submit' className='flex'>
        <TrashIcon className='icon w-5' />
      </button>
    </form>
  )
}
