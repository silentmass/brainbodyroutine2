'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { deleteTaskCategory } from '@/app/lib/actions/taskcategories'
import { initialState } from '@/app/_components/response-state'
import { DeleteButton } from '../form-components/buttons'

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
      <DeleteButton ariaDisabled={pending} />
      <p aria-live='polite' className='sr-only' role='status'>
        {state?.message}
      </p>
    </form>
  )
}
