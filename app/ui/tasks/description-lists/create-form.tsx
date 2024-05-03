'use client'
import { useFormState } from 'react-dom'
import { createDescriptionList } from '@/app/lib/actions/descriptionlists'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Task } from '@/app/lib/definitions'
import Link from 'next/link'
import { CreateButton } from '../../form-components/buttons'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { initialState } from '@/app/_components/response-state'

export default function CreateTaskDescriptionListForm ({
  task
}: {
  task: Task
}) {
  const createTaskDescriptionListWithTaskId = createDescriptionList.bind(
    null,
    `${task.id}`
  )
  const [state, formAction] = useFormState(
    createTaskDescriptionListWithTaskId,
    initialState
  )
  const router = useRouter()

  useEffect(() => {
    if (state?.redirectTo !== '' && state.redirectTo !== null) {
      router.push(state?.redirectTo)
    }
  }, [state, router])

  return (
    <form
      name='createTaskDescriptionListForm'
      id='createTaskDescriptionListForm'
      action={formAction}
      className='relative card-create flex flex-col gap-y-4 w-full rounded-2xl p-5'
    >
      <label className={`card-create`}>
        <h2 className='card-create'>List Title</h2>
        <input
          type='text'
          name='taskDescriptionListTitle'
          id='taskDescriptionListTitle'
          required
          className={`card-create`}
        />
      </label>
      {/* Form controls */}
      <div className='flex w-full justify-center items-center gap-4'>
        <Link href={`/tasks/${task.id}/edit`} className={`rounded-2xl`}>
          <CreateButton className='card-create' ariaLabel='Cancel'>
            Cancel
          </CreateButton>
        </Link>
        <CreateButton className='card-create' ariaLabel='Create list'>
          Create
        </CreateButton>
      </div>
      {/* Form action state message floating above card requires relative parent */}
      <ResponseDurationMessage state={state} />
    </form>
  )
}
