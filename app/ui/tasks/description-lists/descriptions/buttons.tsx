'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { TrashIcon } from '@heroicons/react/24/outline'
import { deleteListDescription } from '@/app/lib/actions'
import { initialState } from '@/app/_components/response-state'

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
      <button className='flex items-center justify-center'>
        <TrashIcon className='icon w-5' />
      </button>
    </form>
  )
}
