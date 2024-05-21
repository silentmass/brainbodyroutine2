'use client'
import { Task, TaskBase } from '@/app/lib/definitions'
import { DuplicateTaskForm, SetTaskActiveForm } from './buttons'
import { ChevronRightIcon, PencilIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { FormEvent } from 'react'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { initialState } from '@/app/_components/response-state'
import { useFormState } from 'react-dom'
import clsx from 'clsx'
import { FormButton, FormButtonView } from '../form-components/buttons'

const TaskCard = ({
  task,
  showTaskLink,
  handleViewModeClick,
  formActionDeleteTaskFun,
  formActionUpdateTaskFun,
  formActionDuplicateTaskFun
}: {
  task: Task | TaskBase
  showTaskLink: boolean
  handleViewModeClick: (event: FormEvent<HTMLButtonElement>) => void
  formActionDeleteTaskFun: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<any>
  formActionUpdateTaskFun: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<any>
  formActionDuplicateTaskFun: (
    prevState: any,
    formData: FormData
  ) => Promise<any>
}) => {
  const isOptimistic = !('id' in task) || task.id === undefined

  const [stateDuplicateTask, formActionDuplicateTask] = useFormState(
    formActionDuplicateTaskFun,
    initialState
  )

  const updateTaskWithId = formActionUpdateTaskFun.bind(
    null,
    isOptimistic ? '' : `${task.id}`
  )
  const [state, formAction] = useFormState(updateTaskWithId, initialState)

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
                <FormButtonView
                  onClick={() => {}}
                  className={`flex items-center justify-center pending`}
                  type={undefined}
                  ariaLabel={'View task'}
                  value={''}
                >
                  <ChevronRightIcon className='icon w-10 pending-icon' />
                </FormButtonView>
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
              <DuplicateTaskForm
                task={task}
                formAction={formActionDuplicateTask}
              />
            </div>
          ) : (
            <>
              {showTaskLink ? (
                <div>
                  {isOptimistic ? (
                    <FormButton
                      className={`flex items-center justify-center pending`}
                      type={undefined}
                      ariaLabel={'Edit task'}
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

              <div className='flex h-full items-center justify-center z-40'>
                <SetTaskActiveForm task={task} formAction={formAction} />
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
