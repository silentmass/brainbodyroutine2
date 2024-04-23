'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { deleteListDescription } from '@/app/lib/actions'
import { initialState } from '@/app/_components/response-state'
import { DeleteButton } from '@/app/ui/form-components/buttons'

export function DeleteListDescription ({ id }: { id: string }) {
  const { pending } = useFormStatus()
  const deleteListDescriptionWithId = deleteListDescription.bind(null, id)
  const [state, formAction] = useFormState(
    deleteListDescriptionWithId,
    initialState
  )

  return (
    <form
      name='deleteListDescriptionForm'
      id='deleteListDescriptionForm'
      action={formAction}
      className='flex h-full'
    >
      <DeleteButton ariaDisabled={pending} />
    </form>
  )
}
