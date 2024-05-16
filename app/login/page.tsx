import LoginForm from '@/app/ui/login/login-form'
import { LogOutForm } from '@/app/ui/login/logout-form'
import { auth } from '@/app/auth'

export default async function LoginPage () {
  const session = await auth()
  return (
    <div className='flex flex-col gap-5 w-full h-full items-center justify-center'>
      {session !== null ? (
        <>
          <h1>Logged in</h1>
          <LogOutForm />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  )
}
