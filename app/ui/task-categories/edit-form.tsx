'use client'
import { useFormState } from 'react-dom'
import { updateTaskCategory } from '@/app/lib/actions'
import { TaskCategory } from '@/app/lib/definitions'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import {
  fieldBaseStyle,
  formLabelStyle,
  rowButtonsStyle
} from '../form-components/form-styles'
import FormActionStateMessage from '../form-components/form-action-message'
import { EditCategory } from './buttons'
import { CreateButton } from '../form-components/buttons'

const initialState = {
  message: '',
  redirectTo: null,
  responseDuration: 0
}

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

  const [responseDuration, setResponseDuration] = useState(performance.now())
  const durationRef = useRef(responseDuration)
  const [showStateMessage, setShowStateMessage] = useState(true)
  const [responseState, setResponseState] = useState(initialState)

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
            <CreateButton className='card-create'>Cancel</CreateButton>
          </Link>
          <CreateButton className='card-create'>Update</CreateButton>
        </div>
      </div>
      {/* Form action state message floating above card */}
      <div
        className={`absolute top-0 left-0 flex w-full items-center justify-center rounded-2xl ${clsx(
          {
            'bg-neutral-200/30': showStateMessage,
            'hidden bg-transparent': !showStateMessage
          }
        )}`}
      >
        <FormActionStateMessage state={responseState} />
      </div>
    </form>
  )
}
