'use client'
import { PencilIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useFormStatus } from 'react-dom'

export const CreateButton = ({
  children,
  className
}: {
  children: React.ReactNode
  className: string
}) => {
  const { pending } = useFormStatus()

  return (
    <button
      className={`${className} flex w-fit items-center justify-center p-2 rounded-2xl`}
      type='submit'
      aria-disabled={pending}
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
