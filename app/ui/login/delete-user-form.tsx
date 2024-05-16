'use client'
import { initialState } from '@/app/_components/response-state'
import { deleteUser } from '@/app/lib/actions/users'
import { CreateButton } from '@/app/ui/form-components/buttons'
import { useFormState } from 'react-dom'

export const DeleteUserForm = () => {
  const [state, formAction] = useFormState(deleteUser, initialState)

  return (
    <form action={formAction} className='w-fit'>
      <CreateButton className='' ariaLabel=''>
        Delete account
      </CreateButton>
    </form>
  )
}
