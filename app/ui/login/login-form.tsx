'use client'

import { useFormState } from 'react-dom'
import { authenticate } from '@/app/lib/actions/auth'
import { initialState } from '@/app/_components/response-state'
import { CreateButton } from '@/app/ui/form-components/buttons'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

export default function LoginForm () {
  const [state, dispatch] = useFormState(authenticate, initialState)
  const { update: updateSession, data: session, status } = useSession()

  useEffect(() => {
    if (state.redirectTo !== null) {
      console.log(state.redirectTo, 'status', status, 'session', session)
      window.location.replace(state.redirectTo)
    }
  }, [state])

  return (
    <form
      name='signinForm'
      className='card relative flex flex-col gap-y-4 w-full rounded-2xl p-5'
      action={dispatch}
    >
      <div className='flex flex-col gap-y-4 w-full items-center'>
        {status === 'unauthenticated' ? (
          <h1>Please log in to continue</h1>
        ) : status === 'authenticated' ? (
          <h1>Logged in</h1>
        ) : (
          <h1>Loading</h1>
        )}
        <div className='flex flex-col gap-2'>
          <label className={`flex flex-col`} htmlFor='username'>
            <h2 className=''>Username</h2>
          </label>
          <input
            className='peer'
            id='usernameSignIn'
            type='text'
            name='username'
            placeholder='Enter your username'
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <label className={`flex flex-col`} htmlFor='password'>
            <h2 className=''>Password</h2>
          </label>
          <input
            className='peer'
            id='passwordSignIn'
            type='password'
            name='password'
            placeholder='Enter password'
            required
            minLength={6}
          />
        </div>
        <div className='flex justify-center'>
          <CreateButton className='' ariaLabel='Login user'>
            Login
          </CreateButton>
        </div>
        {/* {state.message} */}
      </div>
      {/* Form action state message floating above card requires relative parent */}
      <ResponseDurationMessage state={state} />
      <div className='flex justify-center'>{status}</div>
    </form>
  )
}
