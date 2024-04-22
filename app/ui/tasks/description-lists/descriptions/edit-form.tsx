'use client'
import { updateListDescription } from '@/app/lib/actions'
import { ListDescription } from '@/app/lib/definitions'
import { CreateButton } from '@/app/ui/form-components/buttons'
import FormActionStateMessage from '@/app/ui/form-components/form-action-message'
import {
  formLabelStyle,
  rowButtonsStyle
} from '@/app/ui/form-components/form-styles'
import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'

const initialState = {
  message: '',
  redirectTo: null,
  responseDuration: 0
}

export default function EditListDescriptionForm ({
  description
}: {
  description: ListDescription
}) {
  const updateListDescriptionWithId = updateListDescription.bind(
    null,
    `${description.id}`,
    `${description.description_list_id}`
  )
  const [state, formAction] = useFormState(
    updateListDescriptionWithId,
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
      name='editListDescription'
      id='editListDesription'
      action={formAction}
      className='flex flex-col w-full rounded-2xl'
    >
      <div className='relative flex w-full p-5'>
        <div className={`flex w-full h-full items-end gap-4`}>
          <label className={`flex flex-col w-full`}>
            <h2 className='card-create'>Description</h2>
            <textarea
              name='description'
              id='description'
              defaultValue={description.description}
              required
              className='flex w-full p-2 bg-transparent border border-neutral-300 rounded-2xl'
            ></textarea>
          </label>
          <CreateButton className={'card-create'}>Update</CreateButton>
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
