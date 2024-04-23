'use client'
import { Task } from '@/app/lib/definitions'
import { DeleteTask, SetTaskActive, UpdateTask } from './buttons'
import Image from 'next/image'
import clsx from 'clsx'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import FormActionStateMessage from '@/app/ui/form-components/form-action-message'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { initialState } from '@/app/_components/response-state'
import { updateTask } from '@/app/lib/actions'
import { useFormState } from 'react-dom'

const TaskCard = ({ task }: { task: Task }) => {
  const [showStateMessage, setShowStateMessage] = useState(true)
  const [responseState, setResponseState] = useState(initialState)

  const [isActive, setIsActive] = useState(task.is_active)
  const updateTaskWithId = updateTask.bind(null, `${task.id}`)
  const [state, formAction] = useFormState(updateTaskWithId, initialState)
  const [isMouseOverCheck, setIsMouseOverCheck] = useState(false)
  const [isMouseActiveCheck, setIsMouseActiveCheck] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [responseDuration, setResponseDuration] = useState(performance.now())
  const durationRef = useRef(responseDuration)

  useEffect(() => {
    durationRef.current = responseDuration
  }, [responseDuration])

  useEffect(() => {
    const responseTime = performance.now()
    const responseDuration = responseTime - durationRef.current
    setResponseDuration(responseDuration)
    setResponseState(prevState => ({
      ...prevState,
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

  const handleOnClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const valueBefore = isActive
    setIsActive(previousValue => !previousValue)
    console.log('Client before:', valueBefore)
    if (formRef.current) {
      formRef.current.requestSubmit()
      setResponseDuration(performance.now())
    }
  }

  return (
    <div className='relative'>
      <div className='card flex w-full pt-7 pb-6 pl-4 pr-4 items-center rounded-2xl'>
        <div className='flex flex-col w-full items-center'>
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
          <p className='flex w-full h-fit text-wrap pl-11 pr-11 justify-center items-center text-xl break-words'>
            {task.title}
          </p>
        </div>
      </div>
      <ResponseDurationMessage state={responseState} />
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
  const [responseState, setResponseState] = useState(initialState)

  const [isActive, setIsActive] = useState(task.is_active)
  const updateTaskWithId = updateTask.bind(null, `${task.id}`)
  const [state, formAction] = useFormState(updateTaskWithId, initialState)
  const [isMouseOverCheck, setIsMouseOverCheck] = useState(false)
  const [isMouseActiveCheck, setIsMouseActiveCheck] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [responseDuration, setResponseDuration] = useState(performance.now())
  const durationRef = useRef(responseDuration)

  useEffect(() => {
    durationRef.current = responseDuration
  }, [responseDuration])

  useEffect(() => {
    const responseTime = performance.now()
    const responseDuration = responseTime - durationRef.current
    setResponseDuration(responseDuration)
    setResponseState(prevState => ({
      ...prevState,
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

  const handleOnClick = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const valueBefore = isActive
    setIsActive(previousValue => !previousValue)
    console.log('Client before:', valueBefore, '>', !valueBefore)

    if (formRef.current) {
      formRef.current.requestSubmit()
      setResponseDuration(performance.now())
    }
  }

  return (
    <div className='relative'>
      <div className='card flex w-full pt-6 pb-6 pl-4 pr-4 items-center rounded-2xl'>
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
