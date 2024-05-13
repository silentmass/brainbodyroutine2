'use client'
import clsx from 'clsx'
import { useState, useRef, useEffect } from 'react'
import FormActionStateMessage from '../ui/form-components/form-action-message'
import { InitialState } from './response-state'

export default function ResponseDurationMessage ({
  state
}: {
  state: InitialState
}) {
  const [responseDuration, setResponseDuration] = useState(performance.now())
  const durationRef = useRef(responseDuration)
  const [showStateMessage, setShowStateMessage] = useState(true)
  const [responseState, setResponseState] = useState(state)

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
      state
        ? state.message !== ''
          ? state.message
          : state.errors
        : 'Something went wrong'
    )
  }, [state])
  return (
    <div
      className={`absolute top-0 left-0 flex w-full items-center justify-center rounded-2xl ${clsx(
        {
          'bg-accent-4/30': showStateMessage,
          'hidden bg-transparent': !showStateMessage
        }
      )}`}
    >
      <FormActionStateMessage state={responseState} />
    </div>
  )
}
