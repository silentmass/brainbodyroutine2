import LoginForm from '@/app/ui/login/login-form'
import { DeleteUserForm } from '@/app/ui/login/delete-user-form'
import { auth } from '@/app/auth'
import RegisterForm from '../ui/login/register-form'

export default async function LoginPage () {
  const session = await auth()
  return (
    <div className='card rounded-2xl flex flex-col gap-5 w-full p-6 items-center justify-center'>
      {session !== null ? (
        <>
          <h1>Logged in</h1>
          <DeleteUserForm />
        </>
      ) : (
        <div className='flex flex-col gap-6 justify-center'>
          <LoginForm />
          <RegisterForm />
        </div>
      )}
    </div>
  )
}
