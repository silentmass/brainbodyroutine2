import { signOutAction } from '@/app/lib/actions/auth'
import { ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'

export const LogOutForm = () => {
  return (
    <form action={signOutAction} className='w-fit'>
      <button type='submit' className='flex items-center justify-center'>
        <ArrowRightStartOnRectangleIcon className='icon w-5' />
      </button>
    </form>
  )
}
