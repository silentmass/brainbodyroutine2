'use client'
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
      className={`${className} card-create flex w-fit items-center justify-center p-2 rounded-2xl`}
      type='submit'
      aria-disabled={pending}
    >
      {children}
    </button>
  )
}
