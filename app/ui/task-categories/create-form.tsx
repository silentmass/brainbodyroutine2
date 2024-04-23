'use client'
import { createTaskCategory } from '@/app/lib/actions'
import { useFormState } from 'react-dom'
import { CreateButton } from '../form-components/buttons'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { initialState } from '@/app/_components/response-state'

export default function CreateTaskCategoryForm () {
  const [state, formAction] = useFormState(createTaskCategory, initialState)

  return (
    <form
      name='createTaskCategoryForm'
      className='relative card-create flex flex-col gap-y-4 w-full rounded-2xl p-5'
      action={formAction}
    >
      <div className='flex flex-col gap-y-4 w-full'>
        <label className={`card-create flex flex-col w-full`}>
          <h2 className='card-create'>Title</h2>
          <input
            type='text'
            id='taskCategoryTitle'
            name='taskCategoryTitle'
            required
            className={`card-create`}
          />
        </label>
        <div className='flex w-full justify-center'>
          <CreateButton className='card-create' ariaLabel='Create category'>
            Create
          </CreateButton>
        </div>
      </div>
      {/* Form action state message floating above card requires relative parent */}
      <ResponseDurationMessage state={state} />
    </form>
  )
}
