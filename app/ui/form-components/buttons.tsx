'use client'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { FormEvent, useEffect } from 'react'
import { useFormStatus } from 'react-dom'

export const CreateButton = ({
  children,
  className,
  ariaLabel
}: {
  children: React.ReactNode
  className: string
  ariaLabel: string
}) => {
  const { pending } = useFormStatus()

  return (
    <button
      className={`${className} formActionButton flex w-fit items-center justify-center p-3 rounded-2xl`}
      type='submit'
      aria-disabled={pending}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export const SpinnerFormButton = ({
  children,
  ariaLabel,
  className = '',
  type = 'submit',
  onClick = null,
  defaultValue = null,
  isDisabled = false,
  onPending = null
}: {
  children: React.ReactNode
  ariaLabel: string
  className?: string
  type?: 'submit' | 'button' | 'reset' | undefined
  onClick?: null | ((event: FormEvent<HTMLButtonElement>) => void)
  defaultValue?: null | string | number
  isDisabled?: boolean
  onPending?: null | ((isPending: boolean) => void)
}) => {
  const { pending } = useFormStatus()

  useEffect(() => {
    if (!onPending) return
    onPending(pending)
  }, [pending, onPending])

  return (
    <button
      className={`flex items-center justify-center px-3 py-1.5 min-w-16 gap-2 ${clsx(
        type !== 'reset'
          ? {
              pending: pending,
              formActionButton: !pending && !isDisabled,
              'disable-button': !pending && isDisabled
            }
          : { 'pending delete': pending, delete: !pending }
      )} ${className}`}
      type={type}
      aria-disabled={pending}
      aria-label={ariaLabel}
      disabled={isDisabled}
      onClick={onClick !== null ? onClick : () => null}
      defaultValue={`${defaultValue}`}
    >
      <svg
        viewBox='0 0 14 14'
        xmlns='http://www.w3.org/2000/svg'
        fill='#000000'
        className='size-6 animate-spin'
        style={{ display: pending ? 'inline-block' : 'none' }}
      >
        <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
        <g
          id='SVGRepo_tracerCarrier'
          strokeLinecap='round'
          strokeLinejoin='round'
        ></g>
        <g id='SVGRepo_iconCarrier'>
          {' '}
          <g fill='none' fillRule='evenodd'>
            {' '}
            <circle
              cx='7'
              cy='7'
              r='6'
              className='spinner-circle'
              strokeOpacity='.1'
              strokeWidth='2'
            ></circle>{' '}
            <path
              className='spinner-path'
              fillOpacity='.1'
              fillRule='nonzero'
              d='M7 0a7 7 0 0 1 7 7h-2a5 5 0 0 0-5-5V0z'
            ></path>{' '}
          </g>{' '}
        </g>
      </svg>
      {!pending ? children : 'Processing...'}
    </button>
  )
}
export const FormButton = ({
  children,
  ariaLabel,
  className = '',
  type = 'submit'
}: {
  children: React.ReactNode
  ariaLabel: string
  className: string
  type: 'submit' | 'button' | 'reset' | undefined
}) => {
  const { pending } = useFormStatus()

  return (
    <button
      className={`${className} flex items-center justify-center px-small py-1.5 rounded-cool min-w-16 ${clsx(
        { pending: pending, formActionButton: !pending }
      )}`}
      type={type}
      aria-disabled={pending}
      aria-label={ariaLabel}
      disabled={pending}
    >
      {children}
    </button>
  )
}

export const FormButtonView = ({
  children,
  ariaLabel,
  className = '',
  type = 'submit',
  onClick,
  value
}: {
  children: React.ReactNode
  ariaLabel: string
  className: string
  type: 'submit' | 'button' | 'reset' | undefined
  onClick: (event: FormEvent<HTMLButtonElement>) => void
  value: number | string
}) => {
  const { pending } = useFormStatus()

  return (
    <button
      className={`${className} formActionButton flex items-center justify-center min-w-16 ${clsx(
        { pending: pending, '': !pending }
      )}`}
      type={type}
      aria-disabled={pending}
      aria-label={ariaLabel}
      disabled={pending}
      value={value}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export function UpdateButton ({ href }: { href: string }) {
  return (
    <Link href={href}>
      <PencilIcon className='icon w-5' />
    </Link>
  )
}

export const DeleteButton = ({
  ariaDisabled,
  classNameIcon = ''
}: {
  ariaDisabled: boolean
  classNameIcon: string
}) => {
  return (
    // <button
    //   type='submit'
    //   className='flex items-center justify-center'
    //   aria-label='Delete'
    //   aria-disabled={ariaDisabled}
    //   disabled={ariaDisabled}
    // >
    //   <TrashIcon
    //     className={`w-5 ${classNameIcon} ${clsx({
    //       icon: !ariaDisabled,
    //       'pending-icon': ariaDisabled
    //     })}`}
    //   />
    // </button>
    <SpinnerFormButton type='reset' ariaLabel='Delete' className=''>
      <TrashIcon
        className={`w-5 ${classNameIcon} ${clsx({
          icon: !ariaDisabled,
          'pending-icon': ariaDisabled
        })}`}
      />
    </SpinnerFormButton>
  )
}
