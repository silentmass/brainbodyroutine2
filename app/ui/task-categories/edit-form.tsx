'use client'
import { useFormState } from 'react-dom'
import { updateTaskCategory } from '@/app/lib/actions'
import { TaskCategory } from '@/app/lib/definitions'
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CreateButton } from '../form-components/buttons'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { initialState } from '@/app/_components/response-state'

export default function EditTaskCategoryForm ({
  taskCategory
}: {
  taskCategory: TaskCategory
}) {
  const updateTaskCategoryWithId = updateTaskCategory.bind(
    null,
    `${taskCategory.id}`
  )
  const [state, formAction] = useFormState(
    updateTaskCategoryWithId,
    initialState
  )
  const router = useRouter()
  useEffect(() => {
    if (state.redirectTo) {
      router.push(state.redirectTo)
    }
  }, [state, router])

  return (
    <form
      name='editTaskCategoryForm'
      action={formAction}
      className='relative card-create flex flex-col gap-y-4 w-full rounded-2xl p-5'
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
            defaultValue={taskCategory.title}
          />
        </label>
        <label className={`card-create flex flex-col w-full`}>
          <h2 className='card-create'>Description</h2>
          <input
            type='text'
            id='taskCategoryDescription'
            name='taskCategoryDescription'
            className={`card-create`}
            defaultValue={
              taskCategory.description ? taskCategory.description : ''
            }
          />
        </label>

        {/* Controls */}
        <div className='flex w-full justify-center items-center gap-4'>
          <Link href={`/task-categories`} className={``}>
            <CreateButton className='card-create' ariaLabel='Cancel'>
              Cancel
            </CreateButton>
          </Link>
          <CreateButton className='card-create' ariaLabel='Update category'>
            Update
          </CreateButton>
        </div>
      </div>
      {/* Form action state message floating above card requires relative parent */}
      <ResponseDurationMessage state={state} />
    </form>
  )
}
