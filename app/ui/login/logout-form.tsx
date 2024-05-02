import { signOutAction } from '@/app/lib/auth'
import { CreateButton } from '@/app/ui/form-components/buttons'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'

export const LogOutForm = () => {
  return (
    <form action={signOutAction}>
      <button type='submit' className='flex items-center justify-center'>
        <ArrowRightStartOnRectangleIcon className='icon-topnavi w-5' />
      </button>
    </form>
  )
}
