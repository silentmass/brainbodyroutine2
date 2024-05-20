'use client'
import { Task, TaskBase } from '@/app/lib/definitions'
import { SetTaskActiveForm } from './buttons'
import { ChevronRightIcon, PencilIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { FormEvent, useEffect, useRef, useState } from 'react'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { initialState } from '@/app/_components/response-state'
import { duplicateNullUserTask, updateTask } from '@/app/lib/actions/tasks'
import { useFormState } from 'react-dom'
import clsx from 'clsx'
import { FormButton, FormButtonView } from '../form-components/buttons'

const TaskCard = ({
  task,
  showTaskLink,
  handleViewModeClick,
  formActionDeleteTaskFun
}: {
  task: Task | TaskBase
  showTaskLink: boolean
  handleViewModeClick: (event: FormEvent<HTMLButtonElement>) => void
  formActionDeleteTaskFun: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<any>
}) => {
  const isOptimistic = !('id' in task) || task.id === undefined

  const duplicateNullUserTaskWithID = duplicateNullUserTask.bind(
    null,
    isOptimistic ? '' : `${task.id}`
  )
  const [stateDuplicateTask, formActionDuplicateTask] = useFormState(
    duplicateNullUserTaskWithID,
    initialState
  )

  const [isActive, setIsActive] = useState(task.is_active)

  const updateTaskWithId = updateTask.bind(
    null,
    isOptimistic ? '' : `${task.id}`
  )
  const [state, formAction] = useFormState(updateTaskWithId, initialState)

  const formRef = useRef<HTMLFormElement>(null)

  function isActiveOnClick (event: FormEvent<HTMLButtonElement>) {
    // event.preventDefault()
    // This is executed before form server action !!!!
    const isActiveValue = event.currentTarget.value === 'true' ? true : false
    console.log('isActiveOnClick', isActiveValue)
    setIsActive(!isActiveValue)
  }

  useEffect(() => {
    if (state.message !== 'Task updated' && state.message !== '') {
      // When update fails change state back
      console.log('isActive:', isActive, '->', `${!isActive}`, task.is_active)
      setIsActive(prevState => !prevState)
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
              isOptimistic ? (
                <FormButton
                  className={`flex items-center justify-center pending`}
                  type={undefined}
                  ariaLabel={'View task'}
                >
                  <ChevronRightIcon className='icon w-10 pending-icon' />
                </FormButton>
              ) : (
                <FormButtonView
                  onClick={handleViewModeClick}
                  type={undefined}
                  ariaLabel={'View task'}
                  value={task.id}
                  className='flex items-center justify-center'
                >
                  <ChevronRightIcon className='icon w-10' />
                </FormButtonView>
              )
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
                <FormButton
                  className=''
                  ariaLabel='Duplicate task'
                  type='submit'
                >
                  Duplicate
                </FormButton>
              </form>
            </div>
          ) : (
            <>
              {showTaskLink ? (
                <div>
                  {isOptimistic ? (
                    <FormButton
                      className={`flex items-center justify-center pending`}
                      type={undefined}
                      ariaLabel={'View task'}
                    >
                      <PencilIcon className='icon w-5 pending-icon' />
                    </FormButton>
                  ) : (
                    <Link href={`/tasks/${task.id}/edit`}>
                      <FormButton
                        className={`flex items-center justify-center`}
                        type={undefined}
                        ariaLabel={'Edit task'}
                      >
                        <PencilIcon className='icon w-5' />
                      </FormButton>
                    </Link>
                  )}
                </div>
              ) : (
                <></>
              )}

              {/* Mark task as done: isActive = false or not done: isActive = true */}
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
