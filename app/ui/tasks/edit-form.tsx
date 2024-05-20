'use client'
import { Task, TaskCategory } from '@/app/lib/definitions'
import { updateTask } from '@/app/lib/actions/tasks'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useEffect, useOptimistic, useState } from 'react'
import Link from 'next/link'
import DescriptionListsTable from './description-lists/table'
import TaskCategoriesSelect from '@/app/ui/form-components/task-categories-select'
import { IsTaskActive } from '@/app/ui/form-components/is-task-active'
import { DeleteTask } from './buttons'
import clsx from 'clsx'
import { FormButton } from '@/app/ui/form-components/buttons'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { initialState } from '@/app/_components/response-state'
import {
  formActionDeleteDescriptionListWrapper,
  optimisticFnLists
} from './description-lists/optimistic-utils'

export default function EditTaskForm ({
  task,
  categories
}: {
  task: Task
  categories: TaskCategory[]
}) {
  const [isActive, setIsActive] = useState(task.is_active)
  const [state, formAction] = useFormState(
    updateTask.bind(null, `${task.id}`),
    initialState
  )
  const router = useRouter()

  useEffect(() => {
    if (state.redirectTo) {
      router.push(state.redirectTo)
    }
  }, [state, router])

  const [optimisticLists, crudOptimisticList] = useOptimistic(
    task.description_lists,
    optimisticFnLists
  )

  const isList = task.description_lists && task.description_lists.length > 0

  return (
    <div className='flex flex-col w-full gap-y-6'>
      {/* Edit task card */}
      <div className='card relative flex flex-col gap-y-4 w-full rounded-2xl p-6'>
        <form
          name='editTaskForm'
          action={formAction}
          className='flex flex-col gap-y-4 w-full'
        >
          {/* Title */}
          <div className='flex w-full items-center pr-6'>
            <label className={`flex`}>
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
          {/* Category */}
          <div className='flex w-full items-center'>
            <label className={`flex`}>
              <h2 className=''>Category</h2>
            </label>
            <TaskCategoriesSelect
              categories={categories}
              defaultCategoryId={task.task_category_id}
              className=''
            />
          </div>
          {/* Is active */}
          <div className='flex w-full items-center'>
            <label className={`flex`}>
              <h2 className=''>Is active</h2>
            </label>
            <div className='flex items-center h-fit'>
              <IsTaskActive isActiveValue={isActive} />
            </div>
          </div>
          {/* Controls */}
          <div className='flex w-full justify-center items-center gap-6'>
            <Link href={`/tasks/filter`} className={`rounded-2xl`}>
              <FormButton className='' ariaLabel='Cancel' type={undefined}>
                Cancel
              </FormButton>
            </Link>
            <FormButton className='' ariaLabel='Edit task' type='submit'>
              Edit
            </FormButton>
          </div>
        </form>
        {/* Delete form */}
        <div className='absolute top-0 right-0 p-6 flex items-center z-20'>
          <DeleteTask id={`${task.id}`} />
        </div>
        {/* Form action state message floating above card requires relative parent */}
        <ResponseDurationMessage state={state} />
      </div>

      {/* Task description lists */}
      <div className='flex flex-col gap-y-2 w-full'>
        {/* Lists title and create button */}
        <div className='flex justify-between items-center w-full'>
          <div className='flex items-center'>
            <h2 className=''>
              {clsx({
                Lists: isList,
                'No lists': !isList
              })}
            </h2>
          </div>
          <div className='flex items-center'>
            <Link
              href={`/tasks/${task.id}/description-lists/create`}
              className={``}
            >
              <FormButton className='' ariaLabel='Create list' type={undefined}>
                Create List
              </FormButton>
            </Link>
          </div>
        </div>
        {/* Lists  */}
        {task.description_lists !== null && (
          <div className='flex w-full'>
            <DescriptionListsTable
              lists={optimisticLists}
              formActionDeleteDescriptionListFun={formActionDeleteDescriptionListWrapper.bind(
                null,
                crudOptimisticList
              )}
            />
          </div>
        )}
      </div>
    </div>
  )
}
