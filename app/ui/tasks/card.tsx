'use client'
import { Task } from '@/app/lib/definitions'
import {
  DeleteTask,
  SetTaskActive,
  SetTaskActiveForm,
  UpdateTask
} from './buttons'
import { ChevronRightIcon, CheckIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { FormEvent, useEffect, useRef, useState } from 'react'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { initialState } from '@/app/_components/response-state'
import { updateTask } from '@/app/lib/actions/tasks'
import { useFormState } from 'react-dom'

const TaskCard = ({
  children,
  task
}: {
  children: React.ReactNode
  task: Task
}) => {
  const [isActive, setIsActive] = useState(task.is_active)
  const updateTaskWithId = updateTask.bind(null, `${task.id}`)
  const [state, formAction] = useFormState(updateTaskWithId, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  function isActiveOnClick (event: FormEvent<HTMLButtonElement>) {
    // event.preventDefault()
    setIsActive(previousState => !previousState)
  }

  useEffect(() => {
    if (state.message !== 'Task updated' && state.message != '') {
      setIsActive(previousState => !previousState)
    }
  }, [state])

  return (
    <div className='card relative flex h-fit  w-full p-6 items-center rounded-2xl'>
      <div className=' flex flex-wrap w-full items-center h-full gap-6 justify-between'>
        {/* Open task */}
        <div className=' flex items-center w-1/3 z-10 h-full rounded-2xl justify-center'>
          {children}
        </div>
        {/* Mark task */}
        <div className='flex h-full items-center justify-center w-1/3 '>
          <SetTaskActiveForm
            task={task}
            isActive={isActive}
            isActiveOnClick={isActiveOnClick}
            formAction={formAction}
            formRef={formRef}
          />
        </div>
        <div className='flex h-full w-full'>
          <p className='flex h-full text-wrap items-center text-xl break-words'>
            {task.title}
          </p>
        </div>
      </div>
      {/* Form action state message floating above the card. Must have relative parent. */}
      <ResponseDurationMessage state={state} />
      {/* Other controls */}
    </div>
  )
}

export default TaskCard
