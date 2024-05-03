'use client'
import { useFormState, useFormStatus } from 'react-dom'
import { deleteTask } from '@/app/lib/actions/tasks'
import { PencilIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { Task } from '@/app/lib/definitions'
import { CreateButton, DeleteButton } from '../form-components/buttons'

import { initialState } from '@/app/_components/response-state'
import ResponseDurationMessage from '@/app/_components/response-duration'

export function CreateTask () {
  const { pending } = useFormStatus()

  return (
    <button
      className='card-create flex w-fit items-center justify-center p-2 rounded-2xl'
      type='submit'
      aria-disabled={pending}
      aria-label='Create'
    >
      Create
    </button>
  )
}

export function DeleteTask ({ id }: { id: string }) {
  const deleteTaskWithId = deleteTask.bind(null, id)
  const [state, formAction] = useFormState(deleteTaskWithId, initialState)
  const { pending } = useFormStatus()

  return (
    <form name='deleteTaskForm' action={formAction}>
      <DeleteButton ariaDisabled={pending} />
      <ResponseDurationMessage state={state} />
    </form>
  )
}

export function UpdateTask ({ id }: { id: string }) {
  return (
    <Link href={`/tasks/${id}/edit`}>
      <PencilIcon className='icon w-5' />
    </Link>
  )
}

export function EditTask ({
  children,
  className,
  ariaLabel
}: Readonly<{
  children: React.ReactNode
  className: string
  ariaLabel: string
}>) {
  const { pending } = useFormStatus()

  return (
    <CreateButton className={className} ariaLabel={ariaLabel}>
      {children}
    </CreateButton>
  )
}

export function SetTaskActive ({
  task,
  isMouseOverCheck,
  isMouseActiveCheck
}: {
  task: Task
  isMouseOverCheck: boolean
  isMouseActiveCheck: boolean
}) {
  const isActive = task.is_active

  const mouseOverStyle = isMouseOverCheck ? 'check-over' : 'check-out'
  const mouseActiveStyle = isMouseActiveCheck
    ? 'check-active'
    : 'check-nonactive'

  return isActive === true ? (
    <svg
      width='28'
      height='38'
      viewBox='0 0 28 38'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_102_1221)'>
        <circle
          cx='14'
          cy='14'
          r='11.5'
          fill='transparent'
          stroke='#374151'
          className={`unchecked ${mouseOverStyle} ${mouseActiveStyle}`}
        />
        <g clipPath='url(#clip1_102_1221)'>
          {/* Reflection */}
          <path
            opacity='0.1'
            d='M23 30.5C23 29.5631 22.1801 28.5641 20.5035 27.7699C18.8649 26.9937 16.5662 26.5 14 26.5C11.4338 26.5 9.13506 26.9937 7.49653 27.7699C5.81986 28.5641 5 29.5631 5 30.5C5 31.4369 5.81986 32.4359 7.49653 33.2301C9.13506 34.0063 11.4338 34.5 14 34.5C16.5662 34.5 18.8649 34.0063 20.5035 33.2301C22.1801 32.4359 23 31.4369 23 30.5Z'
            fill='transparent'
            stroke='#374151'
            className={`unchecked ${mouseOverStyle} ${mouseActiveStyle}`}
          />
          <g opacity='0.1' filter='url(#filter0_d_102_1221)'>
            <path
              d='M24 36C12.9276 33.1564 16.7083 24.4554 10 32.0115'
              stroke='#374151'
              strokeWidth='2'
              className={`mark unchecked ${mouseOverStyle} ${mouseActiveStyle}`}
            />
          </g>
          <rect
            width='28'
            height='12'
            transform='translate(0 26)'
            fill='url(#paint0_linear_102_1221)'
          />
        </g>
        <g filter='url(#filter1_d_102_1221)'>
          <path
            d='M27 1C12.764 7.90595 17.625 29.0368 9 10.6864'
            stroke='#374151'
            strokeWidth='2'
            className={`mark unchecked ${mouseOverStyle} ${mouseActiveStyle}`}
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_d_102_1221'
          x='6.2522'
          y='25.9999'
          width='20.9966'
          height='14.9686'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='1' />
          <feGaussianBlur stdDeviation='1.5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0.52 0 0 0 0 1 0 0 0 0.8 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_102_1221'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_102_1221'
            result='shape'
          />
        </filter>
        <linearGradient
          id='paint0_linear_102_1221'
          x1='14'
          y1='0'
          x2='14'
          y2='12'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='transparent' stopOpacity='0' />
          <stop offset='1' stopColor='transparent' />
        </linearGradient>
        <clipPath id='clip0_102_1221'>
          <rect width='28' height='38' fill='transparent' />
        </clipPath>
        <clipPath id='clip1_102_1221'>
          <rect
            width='28'
            height='12'
            fill='transparent'
            transform='translate(0 26)'
          />
        </clipPath>
      </defs>
    </svg>
  ) : (
    <svg
      width='28'
      height='38'
      viewBox='0 0 28 38'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_102_1221)'>
        <circle
          cx='14'
          cy='14'
          r='11.5'
          fill='transparent'
          stroke='#374151'
          className={`checked ${mouseOverStyle} ${mouseActiveStyle}`}
        />
        <g clipPath='url(#clip1_102_1221)'>
          <path
            opacity='0.1'
            d='M23 30.5C23 29.5631 22.1801 28.5641 20.5035 27.7699C18.8649 26.9937 16.5662 26.5 14 26.5C11.4338 26.5 9.13506 26.9937 7.49653 27.7699C5.81986 28.5641 5 29.5631 5 30.5C5 31.4369 5.81986 32.4359 7.49653 33.2301C9.13506 34.0063 11.4338 34.5 14 34.5C16.5662 34.5 18.8649 34.0063 20.5035 33.2301C22.1801 32.4359 23 31.4369 23 30.5Z'
            fill='transparent'
            stroke='#374151'
            className={`checked ${mouseOverStyle} ${mouseActiveStyle}`}
          />
          <g opacity='0.1' filter='url(#filter0_d_102_1221)'>
            <path
              d='M24 36C12.9276 33.1564 16.7083 24.4554 10 32.0115'
              stroke='#374151'
              strokeWidth='2'
            />
          </g>
          <rect
            width='28'
            height='12'
            transform='translate(0 26)'
            fill='url(#paint0_linear_102_1221)'
          />
        </g>
        <g filter='url(#filter1_d_102_1221)'>
          <path
            d='M27 1C12.764 7.90595 17.625 29.0368 9 10.6864'
            stroke='#374151'
            strokeWidth='2'
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_d_102_1221'
          x='6.2522'
          y='25.9999'
          width='20.9966'
          height='14.9686'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='1' />
          <feGaussianBlur stdDeviation='1.5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0.52 0 0 0 0 1 0 0 0 0.8 0'
          />
          <feBlend
            mode='normal'
            in2='BackgroundImageFix'
            result='effect1_dropShadow_102_1221'
          />
          <feBlend
            mode='normal'
            in='SourceGraphic'
            in2='effect1_dropShadow_102_1221'
            result='shape'
          />
        </filter>
        <linearGradient
          id='paint0_linear_102_1221'
          x1='14'
          y1='0'
          x2='14'
          y2='12'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='transparent' stopOpacity='0' />
          <stop offset='1' stopColor='transparent' />
        </linearGradient>
        <clipPath id='clip0_102_1221'>
          <rect width='28' height='38' fill='transparent' />
        </clipPath>
        <clipPath id='clip1_102_1221'>
          <rect
            width='28'
            height='12'
            fill='transparent'
            transform='translate(0 26)'
          />
        </clipPath>
      </defs>
    </svg>
  )
}
