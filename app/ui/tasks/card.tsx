'use client'
import { Task } from '@/app/lib/definitions'
import { DeleteTask, SetTaskActive, UpdateTask } from './buttons'
import Image from 'next/image'
import clsx from 'clsx'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'
import FormActionStateMessage from '@/app/ui/form-components/form-action-message'

const TaskCard = ({ task }: { task: Task }) => {
  const [showStateMessage, setShowStateMessage] = useState(true)
  const [responseState, setResponseState] = useState({
    message: '',
    redirectTo: null,
    duration: 0
  })

  return (
    <div className='relative'>
      <div className='card flex w-full pt-7 pb-6 pl-4 pr-4 items-center rounded-2xl'>
        <div className='flex flex-col w-full items-center'>
          <SetTaskActive
            task={task}
            handleResponseMessage={setShowStateMessage}
            setResponseState={setResponseState}
          />
          <p className='flex w-full h-fit text-wrap pl-11 pr-11 justify-center items-center text-xl break-words'>
            {task.title}
          </p>
        </div>
      </div>
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
      <div className='absolute flex items-center left-0 top-0 z-10 pt-6 pb-6 pl-4 pr-4 h-full'>
        <Link href={`/tasks/${task.id}`}>
          <ChevronRightIcon className='icon w-10' />
        </Link>
      </div>
      <div className='absolute flex flex-col gap-y-4 right-0 top-0 z-10 pt-6 pb-6 pl-4 pr-4 h-full justify-between'>
        <UpdateTask id={`${task.id}`} />
        <DeleteTask id={`${task.id}`} />
      </div>
    </div>
  )
}

export const TaskCardView = ({ task }: { task: Task }) => {
  const [showStateMessage, setShowStateMessage] = useState(true)
  const [responseState, setResponseState] = useState({
    message: '',
    redirectTo: null,
    duration: 0
  })

  return (
    <div className='relative'>
      <div className='card flex w-full pt-6 pb-6 pl-4 pr-4 items-center rounded-2xl'>
        <div className='flex flex-col w-full items-center'>
          <div className='flex w-full justify-center items-center'>
            <SetTaskActive
              task={task}
              handleResponseMessage={setShowStateMessage}
              setResponseState={setResponseState}
            />
          </div>
          <div className='flex flex-col w-full h-fit text-wrap pl-11 pr-11'>
            <p className='flex justify-center items-center text-xl break-words'>
              {task.title}
            </p>
          </div>
        </div>
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
  )
}

export default TaskCard
