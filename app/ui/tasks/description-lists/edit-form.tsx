'use client'

import { TaskDescriptionList } from '@/app/lib/definitions'
import Link from 'next/link'
import {
  fieldBaseStyle,
  formLabelStyle,
  rowButtonsStyle
} from '../../form-components/form-styles'
import { updateDescriptionList } from '@/app/lib/actions'
import { useFormState } from 'react-dom'
import FormActionStateMessage from '../../form-components/form-action-message'
import { UpdateTaskDescriptionList } from './buttons'
import { CreateButton } from '../../form-components/buttons'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

const initialState = {
  message: '',
  redirectTo: null,
  responseDuration: 0
}

export const UpdateDescriptionListForm = ({
  list
}: {
  list: TaskDescriptionList
}) => {
  const updateDescriptionListWithParams = updateDescriptionList.bind(
    null,
    `${list.id}`,
    list.descriptions
  )
  const [state, formAction] = useFormState(
    updateDescriptionListWithParams,
    initialState
  )

  const [responseDuration, setResponseDuration] = useState(0)
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
      name='updateDescriptionListForm'
      id='updateDescriptionListForm'
      action={formAction}
      className='relative card-create flex flex-col gap-y-4 w-full rounded-2xl p-5'
    >
      <input type='hidden' name='taskId' id='taskId' value={list.task_id} />
      <label className={`flex w-full gap-2`}>
        <h2 className='card-create'>Title</h2>
        <input
          type='text'
          name='title'
          id='title'
          required
          className={`card-create`}
          defaultValue={list.title}
        />
      </label>
      {/* Controls */}
      <div className='flex w-full justify-center items-center gap-4'>
        <Link href={`/tasks/${list.task_id}/edit`} className={``}>
          <CreateButton className='card-create'>Cancel</CreateButton>
        </Link>
        <CreateButton className='card-create'>Update list</CreateButton>
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

export default UpdateDescriptionListForm
