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
    <div className='relative flex h-fit  w-full p-6 items-center rounded-2xl bg-gray-100 dark:bg-gray-900'>
      <div className=' flex flex-wrap w-full items-center h-full gap-6 justify-between'>
        {/* Open task */}
        <div className=' flex items-center w-1/3 z-10 h-full rounded-2xl justify-center'>
          {children}
        </div>
        {/* Mark task */}
        <div className='flex h-full items-center justify-center  w-1/3 '>
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

export const TaskCardView = ({ task }: { task: Task }) => {
  const [isActive, setIsActive] = useState(task.is_active)
  const updateTaskWithId = updateTask.bind(null, `${task.id}`)
  const [state, formAction] = useFormState(updateTaskWithId, initialState)
  const [isMouseOverCheck, setIsMouseOverCheck] = useState(false)
  const [isMouseActiveCheck, setIsMouseActiveCheck] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const handleOnClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setIsActive(previousValue => !previousValue)

    if (formRef.current) {
      formRef.current.requestSubmit()
    }
  }

  return (
    <div className='relative card flex w-full pt-6 pb-6 pl-4 pr-4 items-center rounded-2xl'>
      <div className='flex flex-col w-full items-center'>
        <div className='flex w-full justify-center items-center'>
          <form
            name='editTaskForm'
            id='editTaskForm'
            action={formAction}
            ref={formRef}
            className='flex flex-col justify-center'
          >
            {/* Task title */}
            <input
              type='hidden'
              name='taskTitle'
              id='taskTitle'
              defaultValue={task.title}
            />
            {/* Task category */}
            <input
              type='hidden'
              name='taskCategoryId'
              id='taskCategoryId'
              defaultValue={task.task_category_id}
            />
            <input
              type='hidden'
              name='taskIsActive'
              id='taskIsActive'
              value={`${!isActive}`}
            />
            <div className='relative'>
              <SetTaskActive
                task={task}
                isMouseOverCheck={isMouseOverCheck}
                isMouseActiveCheck={isMouseActiveCheck}
              />
              <button
                type='submit'
                onMouseEnter={() => setIsMouseOverCheck(true)}
                onMouseLeave={() => {
                  setIsMouseOverCheck(false)
                  setIsMouseActiveCheck(false)
                }}
                onMouseDown={() => setIsMouseActiveCheck(true)}
                onMouseUp={() => setIsMouseActiveCheck(false)}
                onClick={handleOnClick}
                className='absolute flex left-[2px] top-[2px] rounded-full w-[24px] h-[24px]'
              />
            </div>
          </form>
        </div>
        <div className='flex flex-col w-full h-fit text-wrap pl-11 pr-11'>
          <p className='flex justify-center items-center text-xl break-words'>
            {task.title}
          </p>
        </div>
      </div>
      {/* Form action state message floating above the card. Must have relative parent. */}
      <ResponseDurationMessage state={state} />
    </div>
  )
}

export default TaskCard
