'use client'
import { Task } from '@/app/lib/definitions'
import { SetTaskActiveForm } from './buttons'
import { ChevronRightIcon, PencilIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { FormEvent, useEffect, useRef, useState } from 'react'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { initialState } from '@/app/_components/response-state'
import { duplicateNullUserTask, updateTask } from '@/app/lib/actions/tasks'
import { useFormState } from 'react-dom'
import clsx from 'clsx'

const TaskCard = ({
  task,
  showTaskLink,
  handleViewModeClick
}: {
  task: Task
  showTaskLink: boolean
  handleViewModeClick: (event: FormEvent<HTMLButtonElement>) => void
}) => {
  const duplicateNullUserTaskWithID = duplicateNullUserTask.bind(
    null,
    `${task.id}`
  )
  const [stateDuplicateTask, formActionDuplicateTask] = useFormState(
    duplicateNullUserTaskWithID,
    initialState
  )

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
    <div
      className={`relative flex h-fit w-full p-6 items-center rounded-2xl ${clsx(
        {
          'card-nulluser': task.user_id === null,
          card: task.user_id !== null
        }
      )}`}
    >
      <div className='flex flex-col w-full items-center h-full gap-6 justify-between'>
        {/* Open task */}
        <div className='flex items-center rounded-2xl justify-between gap-6 w-full'>
          <div>
            {showTaskLink ? (
              <button
                onClick={handleViewModeClick}
                value={task.id}
                className='flex'
              >
                <ChevronRightIcon className='icon w-10' />
              </button>
            ) : (
              <></>
            )}
          </div>
          {task.user_id === null ? (
            // Duplicate task
            <div className=''>
              <form
                id='duplicateTaskForm'
                name='duplicateTaskForm'
                action={formActionDuplicateTask}
              >
                <button
                  type='submit'
                  className='flex bg-accent-3 items-center justify-center p-3 rounded-3xl hover:bg-accent-4 active:bg-accent-5'
                >
                  Duplicate
                </button>
              </form>
            </div>
          ) : (
            <>
              <div>
                <Link href={`/tasks/${task.id}/edit`}>
                  <PencilIcon className='icon w-5' />
                </Link>
              </div>

              <div className='flex h-full items-center justify-center '>
                <SetTaskActiveForm
                  task={task}
                  isActive={isActive}
                  isActiveOnClick={isActiveOnClick}
                  formAction={formAction}
                  formRef={formRef}
                />
              </div>
            </>
          )}
        </div>

        <div className='flex h-full w-full'>
          <p className='flex h-full text-wrap items-center text-xl break-words'>
            {task.title}
          </p>
        </div>
      </div>
      {/* Form action state message floating above the card. Must have relative parent. */}
      <ResponseDurationMessage state={state} />
      <ResponseDurationMessage state={stateDuplicateTask} />
      {/* Other controls */}
    </div>
  )
}

export default TaskCard
