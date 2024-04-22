'use client'
import { useFormState } from 'react-dom'
import { CreateTaskDescriptionList } from './buttons'
import { createDescriptionList } from '@/app/lib/actions'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import {
  fieldBaseStyle,
  formLabelStyle,
  rowButtonsStyle
} from '../../form-components/form-styles'
import FormActionStateMessage from '../../form-components/form-action-message'
import { Task } from '@/app/lib/definitions'
import Link from 'next/link'
import { CreateButton } from '../../form-components/buttons'
import clsx from 'clsx'

const initialState = {
  message: '',
  redirectTo: null,
  responseDuration: 0
}

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
      name='createTaskDescriptionListForm'
      id='createTaskDescriptionListForm'
      action={formAction}
      className='relative card-create flex flex-col gap-y-4 w-full rounded-2xl p-5'
    >
      <div className='flex flex-col w-full gap-y-4'>
        <label className={`card-create`}>
          <h2 className='card-create'>Title</h2>
          <input
            type='text'
            name='taskDescriptionListTitle'
            id='taskDescriptionListTitle'
            required
            className={`card-create`}
          />
        </label>
        {/* Form ontrols */}
        <div className='flex w-full justify-center items-center gap-4'>
          <Link href={`/tasks/${task.id}/edit`} className={`rounded-2xl`}>
            <CreateButton className='card-create '>Cancel</CreateButton>
          </Link>
          <CreateButton className='card-create '>Create</CreateButton>
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
      </div>
    </form>
  )
}
