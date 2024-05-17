'use client'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
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
      className={`${className} formActionButton flex items-center justify-center p-3 rounded-3xl min-w-24`}
      type={type}
      aria-disabled={pending}
      aria-label={ariaLabel}
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

export const DeleteButton = ({ ariaDisabled }: { ariaDisabled: boolean }) => {
  return (
    <button
      type='submit'
      className='flex items-center justify-center'
      aria-label='Delete'
      aria-disabled={ariaDisabled}
    >
      <TrashIcon className='icon w-5' />
    </button>
  )
}
