import LoginForm from '@/app/ui/login/login-form'
import { DeleteUserForm } from '@/app/ui/login/delete-user-form'
import { auth } from '@/app/auth'
import RegisterForm from '../ui/login/register-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login'
}

export default async function LoginPage () {
  const session = await auth()
  return (
    <div className=' rounded-2xl flex flex-col gap-6 w-full p-6 items-center justify-center'>
      {session !== null ? (
        <>
          <h1>Logged in</h1>
          <DeleteUserForm />
        </>
      ) : (
        <div className='flex flex-col gap-6 justify-center w-full'>
          <div className='relative flex  justify-center items-center w-full rounded-2xl p-6'>
            <div className='flex w-full'>
              <LoginForm />
            </div>
          </div>
          <div className='relative flex'>
            <div className='relative flex bg-gradient-to-r from-accent-2 to-accent-4 justify-center items-center w-full rounded-2xl p-6'>
              <div className='flex w-full'>
                <RegisterForm />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
