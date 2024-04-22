'use client'
import { CreateTask } from '@/app/ui/tasks/buttons'
import { TaskCategory } from '@/app/lib/definitions'
import { createTask } from '@/app/lib/actions'
import { useFormState } from 'react-dom'
import clsx from 'clsx'
import TaskCategoriesSelect from '../form-components/task-categories-select'
import FormActionStateMessage from '../form-components/form-action-message'
import { fieldBaseStyle, formLabelStyle } from '../form-components/form-styles'
import { IsTaskActive } from '../form-components/is-task-active'
import { useEffect, useRef, useState } from 'react'

const initialState = {
  message: '',
  redirectTo: null
}

export default function CreateTaskForm ({
  taskCategories
}: {
  taskCategories: TaskCategory[]
}) {
  const [state, formAction] = useFormState(createTask, initialState)

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

  return (
    <form
      name='createTaskForm'
      id='createTaskForm'
      action={formAction}
      className='card-create flex flex-col p-2 gap-y-2 w-full rounded-2xl'
    >
      <input
        type='checkbox'
        name='taskIsActive'
        id='taskIsActive'
        className={``}
        required
        defaultChecked
        hidden
      />
      <div className='relative flex flex-col'>
        <label className={`w-full p-2 gap-2`}>
          <h2 className='card-create'>Task Title</h2>
          <input
            type='text'
            name='taskTitle'
            id='taskTitle'
            required
            className={`card-create`}
          />
        </label>
        <label className={`flex pl-2 pr-2 pb-2 gap-4`}>
          <h2 className='card-create'>Category</h2>
          <TaskCategoriesSelect
            categories={taskCategories}
            defaultCategoryId={taskCategories[0].id}
          />
        </label>
        <div className='flex w-full justify-center pb-2'>
          <CreateTask />
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
      </div>
    </form>
  )
}
