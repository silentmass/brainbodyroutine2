'use client'

import { useFormState } from 'react-dom'
import { initialState } from '@/app/_components/response-state'
import { FormButton } from '@/app/ui/form-components/buttons'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { useSession } from 'next-auth/react'
import { createUser } from '@/app/lib/actions/users'

export default function RegisterForm () {
  const [state, dispatch] = useFormState(createUser, initialState)
  const { update: updateSession, data: session, status } = useSession()

  return (
    <form
      name='registerForm'
      className='card relative flex flex-col w-full rounded-2xl p-6'
      action={dispatch}
    >
      <div className='flex flex-col gap-y-4 w-full items-center'>
        <div className='flex flex-col gap-2'>
          <label className={`flex flex-col`} htmlFor='username'>
            <h2 className=''>Username</h2>
          </label>
          <input
            className='peer'
            id='username'
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
            id='password'
            type='password'
            name='password'
            placeholder='Enter password'
            required
            minLength={6}
          />
        </div>
        <div className='flex justify-center'>
          <FormButton className='' ariaLabel='Register user' type='submit'>
            Register
          </FormButton>
        </div>
        {/* {state.message} */}
      </div>
      {/* Form action state message floating above card requires relative parent */}
      <ResponseDurationMessage state={state} />
    </form>
  )
}
