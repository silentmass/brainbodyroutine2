'use client'
import { createListDescription } from '@/app/lib/actions'
import { TaskDescriptionList } from '@/app/lib/definitions'
import { useFormState } from 'react-dom'
import { CreateListDescription } from './buttons'
import {
  formLabelStyle,
  rowButtonsStyle
} from '@/app/ui/form-components/form-styles'
import Link from 'next/link'
import clsx from 'clsx'
import { CreateButton } from '@/app/ui/form-components/buttons'
import { useEffect, useRef, useState } from 'react'
import FormActionStateMessage from '@/app/ui/form-components/form-action-message'

const initialState = {
  message: '',
  redirectTo: null,
  responseDuration: 0
}

export default function CreateListDescriptionForm ({
  descriptionList,
  redirectTo
}: {
  descriptionList: TaskDescriptionList
  redirectTo: string
}) {
  const createListDescriptionWithId = createListDescription.bind(
    null,
    `${descriptionList.id}`
  )
  const [state, formAction] = useFormState(
    createListDescriptionWithId,
    initialState
  )

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
      name='createListDescriptionForm'
      id='createListDescriptionForm'
      action={formAction}
      className='relative card-create flex flex-col gap-y-4 w-full rounded-2xl p-5'
    >
      <div className='flex flex-col gap-y-4 w-full'>
        <label className={`flex flex-col w-full`}>
          <h2 className='card-create'>Description</h2>
          <textarea
            name='description'
            id='description'
            className='flex w-full p-2 bg-transparent border border-neutral-300 rounded-2xl'
          ></textarea>
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
