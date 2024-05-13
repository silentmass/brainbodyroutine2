'use client'
import { Task, TaskCategory, TaskDescriptionList } from '@/app/lib/definitions'
import { updateTask } from '@/app/lib/actions/tasks'
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
        className='card relative flex flex-col gap-y-4 w-full rounded-2xl p-6'
      >
        {/* Task title */}
        <div className='flex gap-6 w-full items-center'>
          <label className={``}>
            <h2 className=''>Title</h2>
          </label>
          <input
            type='text'
            name='taskTitle'
            id='taskTitle'
            required
            className={`w-full`}
            defaultValue={task.title}
          />
        </div>

        {/* Task category */}
        <div className='flex gap-6 w-full items-center'>
          <label className={``}>
            <h2 className=''>Category</h2>
          </label>
          <TaskCategoriesSelect
            categories={taskCategories}
            defaultCategoryId={task.task_category_id}
            className=''
          />
        </div>

        {/* Task is active */}
        <div className='flex gap-6 w-full items-center'>
          <label className={``}>
            <h2 className=''>Is active</h2>
          </label>
          <div className='flex items-center h-fit'>
            <IsTaskActive isActiveValue={isActive} />
          </div>
        </div>

        {/* Task controls */}
        <div className='flex w-full justify-center items-center gap-4'>
          <Link href={`/tasks/filter`} className={`rounded-2xl`}>
            <CreateButton className='' ariaLabel='Cancel'>
              Cancel
            </CreateButton>
          </Link>
          <EditTask className={``} ariaLabel='Edit task'>
            Edit task
          </EditTask>
        </div>
        {/* Form action state message floating above card requires relative parent */}
        <ResponseDurationMessage state={state} />
      </form>

      {/* Task description lists */}

      <div className='flex flex-col gap-y-2 w-full p-6'>
        <div className='flex justify-between items-center w-full'>
          <h2 className=''>
            {clsx({
              Lists: isList,
              'No lists': !isList
            })}
          </h2>
          <Link
            href={`/tasks/${task.id}/description-lists/create`}
            className={``}
          >
            <CreateButton className='' ariaLabel='Create list'>
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
