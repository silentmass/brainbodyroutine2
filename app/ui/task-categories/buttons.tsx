'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { deleteTaskCategory } from '@/app/lib/actions'
import { TrashIcon } from '@heroicons/react/24/outline'
import { initialState } from '@/app/_components/response-state'

export function DeleteTaskCategory ({ id }: { id: string }) {
  const { pending } = useFormStatus()
  const deleteTaskCategoryWithId = deleteTaskCategory.bind(null, id)
  const [state, formAction] = useFormState(
    deleteTaskCategoryWithId,
    initialState
  )

  return (
    <form
      name='deleteTaskCategoryForm'
      id='deleteTaskCategoryForm'
      action={formAction}
    >
      <button
        className='flex items-center justify-center w-fit'
        type='submit'
        aria-disabled={pending}
      >
        <TrashIcon className='icon w-5' />
      </button>
      <p aria-live='polite' className='sr-only' role='status'>
        {state?.message}
      </p>
    </form>
  )
}
