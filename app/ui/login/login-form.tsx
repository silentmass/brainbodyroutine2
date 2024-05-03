'use client'

import { useFormState } from 'react-dom'
import { authenticate } from '@/app/lib/actions/auth'
import { initialState } from '@/app/_components/response-state'
import { CreateButton } from '@/app/ui/form-components/buttons'
import ResponseDurationMessage from '@/app/_components/response-duration'

export default function LoginForm () {
  const [state, dispatch] = useFormState(authenticate, initialState)

  return (
    <form
      name='signinForm'
      className='relative card-create flex flex-col gap-y-4 w-full rounded-2xl p-5'
      action={dispatch}
    >
      <div className='flex flex-col gap-y-4 w-full'>
        <h1>Please log in to continue</h1>
        <div className=''>
          <label
            className={`card-create flex flex-col w-full`}
            htmlFor='username'
          >
            <h2 className='card-create'>Username</h2>
          </label>
          <input
            className='peer card-create'
            id='username'
            type='text'
            name='username'
            placeholder='Enter your username'
            required
          />
        </div>
        <div>
          <label
            className={`card-create flex flex-col w-full`}
            htmlFor='password'
          >
            <h2 className='card-create'>Password</h2>
          </label>
          <input
            className='peer card-create'
            id='password'
            type='password'
            name='password'
            placeholder='Enter password'
            required
            minLength={6}
          />
        </div>
        <div className='flex w-full justify-center'>
          <CreateButton className='card-create' ariaLabel='Create category'>
            Login
          </CreateButton>
        </div>
        {state.message}
      </div>
      {/* Form action state message floating above card requires relative parent */}
      <ResponseDurationMessage state={state} />
    </form>
  )
}
