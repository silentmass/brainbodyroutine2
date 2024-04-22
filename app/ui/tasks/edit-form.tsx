'use client'
import { Task, TaskCategory, TaskDescriptionList } from '@/app/lib/definitions'
import { updateTask } from '@/app/lib/actions'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import DescriptionListsTable from './description-lists/table'
import {
  fieldBaseStyle,
  formLabelStyle,
  rowButtonsStyle
} from '@/app/ui/form-components/form-styles'
import TaskCategoriesSelect from '@/app/ui/form-components/task-categories-select'
import FormActionStateMessage from '@/app/ui/form-components/form-action-message'
import { IsTaskActive } from '../form-components/is-task-active'
import { EditTask } from './buttons'
import clsx from 'clsx'
import { CreateButton } from '../form-components/buttons'

const initialState = {
  message: '',
  redirectTo: null
}

export default function EditTaskForm ({
  task,
  taskCategories,
  taskDescriptionLists
}: {
  task: Task
  taskCategories: TaskCategory[]
  taskDescriptionLists: TaskDescriptionList[]
}) {
  const updateTaskWithId = updateTask.bind(null, `${task.id}`)
  const [state, formAction] = useFormState(updateTaskWithId, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.redirectTo) {
      router.push(state.redirectTo)
    }
  }, [state, router])

  const [responseDuration, setResponseDuration] = useState(performance.now())
  const durationRef = useRef(responseDuration)
  const [showStateMessage, setShowStateMessage] = useState(true)
  const [responseState, setResponseState] = useState({
    message: '',
    redirectTo: null,
    responseDuration: 0
  })

  useEffect(() => {
    durationRef.current = responseDuration
  }, [responseDuration])

  useEffect(() => {
    const responseTime = performance.now()
    const responseDuration = responseTime - durationRef.current
    setResponseDuration(responseDuration)
    setResponseState(previousState => ({
      ...previousState,
      ...state,
      responseDuration: responseDuration
    }))
    setShowStateMessage(true)

    setTimeout(
      () => {
        setShowStateMessage(false)
      },
      1000,
      state.message
    )
  }, [state])

  const isList = taskDescriptionLists && taskDescriptionLists.length > 0

  return (
    <div className=''>
      <form
        name='editTaskForm'
        action={formAction}
        className='relative card-create flex flex-col p-2 gap-y-2 w-full rounded-2xl'
      >
        {/* Task title */}
        <label className={`w-full p-2 gap-2`}>
          <h2 className='card-create'>Task Title</h2>
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
        <label className={`flex pl-2 pr-2 pb-2 gap-4`}>
          <h2 className='card-create'>Category</h2>
          <TaskCategoriesSelect
            categories={taskCategories}
            defaultCategoryId={task.task_category_id}
          />
        </label>
        {/* Task is active */}
        <label className={`flex pl-2 pr-2 pb-2 gap-4 items-center`}>
          <h2 className='card-create'>Is active</h2>
          <div className='flex w-4 h-4'>
            <IsTaskActive isActiveValue={task.is_active} />
          </div>
        </label>
        {/* Task controls */}

        <div className='flex w-full justify-center pb-2 items-center gap-4'>
          <Link href={`/tasks`} className={`rounded-2xl`}>
            <CreateButton className=''>Cancel</CreateButton>
          </Link>
          <EditTask className={``}>Edit task</EditTask>
        </div>
        {/* Form action state message floating above card */}
        <div
          className={`absolute top-0 flex w-full items-center justify-center rounded-2xl ${clsx(
            {
              'bg-neutral-200/30': showStateMessage,
              'hidden bg-transparent': !showStateMessage
            }
          )}`}
        >
          <FormActionStateMessage state={responseState} />
        </div>
      </form>
      {/* Task description lists */}

      <div className='flex flex-col gap-y-1 p-5'>
        <div className='flex justify-between w-full items-end'>
          <h2>
            {clsx({
              Lists: isList,
              'No lists': !isList
            })}
          </h2>
          <Link
            href={`/tasks/${task.id}/description-lists/create`}
            className={`w-1/2 ${rowButtonsStyle}`}
          >
            Create List
          </Link>
        </div>
        <div className='flex w-full'>
          <DescriptionListsTable taskDescriptionLists={taskDescriptionLists} />
        </div>
      </div>
    </div>
  )
}
