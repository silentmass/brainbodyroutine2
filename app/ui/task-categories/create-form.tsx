'use client'
import { createTaskCategory } from '@/app/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
import { CreateTaskCategory } from './buttons'
import clsx from 'clsx'
import FormActionStateMessage from '../form-components/form-action-message'
import {
  fieldBaseStyle,
  formLabelStyle,
  rowButtonsStyle
} from '../form-components/form-styles'
import { CreateButton } from '../form-components/buttons'
import { useState, useRef, useEffect } from 'react'

const initialState = {
  message: '',
  redirectTo: null,
  responseDuration: 0
}

export default function CreateTaskCategoryForm () {
  const [state, formAction] = useFormState(createTaskCategory, initialState)

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
      name='createTaskCategoryForm'
      className='relative card-create flex flex-col gap-y-4 w-full rounded-2xl p-5'
      action={formAction}
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
          />
        </label>
        <div className='flex w-full justify-center'>
          <CreateButton className='card-create'>Create</CreateButton>
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
