'use client'
import { initialState } from '@/app/_components/response-state'
import { deleteUser } from '@/app/lib/actions/users'
import { CreateButton } from '@/app/ui/form-components/buttons'
import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'

export const DeleteUserForm = () => {
  const [state, formAction] = useFormState(deleteUser, initialState)
  const [isConfirmDeleteButton, setIsConfirmDeleteButton] = useState(false)

  const { pending } = useFormStatus()

  return isConfirmDeleteButton ? (
    <form action={formAction} className='w-fit'>
      <button
        className={`flex w-fit items-center justify-center p-3 rounded-2xl bg-red-500 outline-double outline-offset-2 outline-red-500 hover:outline-red-600 active:bg-red-800  active:outline-red-800 active:outline-offset-4`}
        type='submit'
        aria-disabled={pending}
        aria-label={'Confirm delete account'}
      >
        Confirm delete account
      </button>
    </form>
  ) : (
    <div className='flex flex-col items-center justify-center gap-6'>
      <button
        onClick={() => setIsConfirmDeleteButton(true)}
        className={`flex w-fit items-center justify-center p-3 rounded-2xl bg-red-500 hover:bg-red-600 active:bg-red-800 active:outline-double active:outline-red-800 active:outline-offset-2`}
      >
        Delete account
      </button>
    </div>
  )
}
