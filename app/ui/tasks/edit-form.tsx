'use client'
import { Task, TaskCategory, TaskDescriptionList } from '@/app/lib/definitions'
import { updateTask } from '@/app/lib/actions'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import DescriptionListsTable from './description-lists/table'
import TaskCategoriesSelect from '@/app/ui/form-components/task-categories-select'
import { IsTaskActive } from '../form-components/is-task-active'
import { EditTask } from './buttons'
import clsx from 'clsx'
import { CreateButton } from '../form-components/buttons'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { initialState } from '@/app/_components/response-state'
export default function EditTaskForm ({
  task,
  taskCategories,
  taskDescriptionLists
}: {
  task: Task
  taskCategories: TaskCategory[]
  taskDescriptionLists: TaskDescriptionList[]
}) {
  const [isActive, setIsActive] = useState(task.is_active)
  const updateTaskWithId = updateTask.bind(null, `${task.id}`)
  const [state, formAction] = useFormState(updateTaskWithId, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.redirectTo) {
      router.push(state.redirectTo)
    }
  }, [state, router])

  const isList = taskDescriptionLists && taskDescriptionLists.length > 0

  return (
    <div className='flex flex-col w-full gap-y-4'>
      <form
        name='editTaskForm'
        action={formAction}
        className='relative card-create flex flex-col gap-y-4 w-full rounded-2xl p-5'
      >
        {/* Task title */}
        <label className={`card-create flex w-full gap-2`}>
          <h2 className='card-create'>Title</h2>
          <input
            type='text'
            name='taskTitle'
            id='taskTitle'
            required
            className={`card-create`}
            defaultValue={task.title}
          />
        </label>
        {/* Task category */}
        <label className={`card-create flex gap-4`}>
          <h2 className='card-create'>Category</h2>
          <TaskCategoriesSelect
            categories={taskCategories}
            defaultCategoryId={task.task_category_id}
          />
        </label>
        {/* Task is active */}
        <label className={`card-create flex gap-4 items-center`}>
          <h2 className='card-create'>Is active</h2>
          <div className='flex w-4 h-4'>
            <IsTaskActive isActiveValue={isActive} />
          </div>
        </label>
        {/* Task controls */}
        <div className='flex w-full justify-center items-center gap-4'>
          <Link href={`/tasks`} className={`rounded-2xl`}>
            <CreateButton className='card-create' ariaLabel='Cancel'>
              Cancel
            </CreateButton>
          </Link>
          <EditTask className={`card-create`} ariaLabel='Edit task'>
            Edit task
          </EditTask>
        </div>
        {/* Form action state message floating above card requires relative parent */}
        <ResponseDurationMessage state={state} />
      </form>

      {/* Task description lists */}

      <div className='flex flex-col gap-y-2 w-full'>
        <div className='flex justify-between items-center w-full pl-5'>
          <h2 className='card-create'>
            {clsx({
              Lists: isList,
              'No lists': !isList
            })}
          </h2>
          <Link
            href={`/tasks/${task.id}/description-lists/create`}
            className={``}
          >
            <CreateButton className='card-create-dim' ariaLabel='Create list'>
              Create List
            </CreateButton>
          </Link>
        </div>
        <div className='flex w-full'>
          <DescriptionListsTable taskDescriptionLists={taskDescriptionLists} />
        </div>
      </div>
    </div>
  )
}
