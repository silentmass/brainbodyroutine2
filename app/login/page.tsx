import LoginForm from '@/app/ui/login/login-form'
// import { auth } from '../api/auth/[...nextauth]/route'
import { LogOutForm } from '../ui/login/logout-form'
import { auth } from '@/app/auth'

export default async function LoginPage () {
  // const session = await auth()
  const session = await auth()
  return (
    <div className='flex gap-5 w-full h-full items-center justify-center'>
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
