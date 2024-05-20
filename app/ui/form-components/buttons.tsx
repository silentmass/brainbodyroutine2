'use client'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
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
      className={`${className} flex items-center justify-center px-3 py-1.5 rounded-3xl min-w-16 ${clsx(
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
    <button
      type='submit'
      className='flex items-center justify-center'
      aria-label='Delete'
      aria-disabled={ariaDisabled}
      disabled={ariaDisabled}
    >
      <TrashIcon
        className={`w-5 ${classNameIcon} ${clsx({
          icon: !ariaDisabled,
          'pending-icon': ariaDisabled
        })}`}
      />
    </button>
  )
}
