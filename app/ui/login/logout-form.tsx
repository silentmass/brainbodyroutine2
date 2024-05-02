import { signOutAction } from '@/app/lib/actions'
import { CreateButton } from '@/app/ui/form-components/buttons'

export const LogOutForm = () => {
  return (
    <form action={signOutAction}>
      <CreateButton className='card-create' ariaLabel='Create category'>
        Sign Out
      </CreateButton>
    </form>
  )
}
