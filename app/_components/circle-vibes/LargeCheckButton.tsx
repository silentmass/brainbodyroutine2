'use client'
import { CheckIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FormEvent, useEffect } from 'react'
import { useFormStatus } from 'react-dom'

export default function LargeCheckButton ({
  id = 'isActiveButton',
  name = 'isActiveButton',
  checked = false,
  ariaLabel = undefined,
  type = undefined,
  onClick = undefined,
  defaultValue = undefined,
  isDisabled = undefined,
  onPending = undefined
}: {
  id?: string | undefined
  name?: string | undefined
  checked?: boolean
  ariaLabel?: undefined | string
  type?: 'submit' | 'button' | 'reset' | undefined
  onClick?: undefined | ((event: FormEvent<HTMLButtonElement>) => void)
  defaultValue?: undefined | string | number
  isDisabled?: undefined | boolean
  onPending?: undefined | ((isPending: boolean) => void)
}) {
  const { pending } = useFormStatus()

  const handleChange = () => {
    if (onClick !== undefined) return onClick
  }

  useEffect(() => {
    if (!onPending) return
    onPending(pending)
  }, [pending])

  return (
    <div
      className={`group flex flex-col items-center justify-center w-[50px] h-[50px] rounded-full p-2 ${clsx(
        {
          'cursor-not-allowed bg-accent-0 hover:bg-accent-0 active:bg-accent-0 hover:scale-100':
            isDisabled,
          'bg-accent-3 hover:bg-accent-5 active:bg-accent-6 transition ease-in-out delay-150 hover:scale-110':
            !isDisabled
        }
      )}`}
    >
      <button
        id={id}
        name={name}
        type={type}
        aria-disabled={pending}
        aria-label={ariaLabel}
        disabled={isDisabled}
        onClick={handleChange}
        defaultValue={defaultValue}
        className={`peer relative flex items-center justify-center rounded-full border-[3px] min-w-full min-h-full overflow-clip ${clsx(
          {
            'cursor-not-allowed border-accent-1 group-hover:border-accent-1 group-active:border-accent-1':
              isDisabled,
            'border-accent-4 group-hover:border-accent-4 group-active:border-accent-4 transition ease-in-out delay-150':
              !isDisabled
          }
        )}`}
      >
        <CheckIcon
          className={`flex min-w-full min-h-full ${clsx({
            'cursor-not-allowed stroke-accent-1 group-hover:border-accent-1 group-active:border-accent-1':
              isDisabled,
            'stroke-accent-6 group-hover:stroke-accent-8 group-active:stroke-accent-1 transition ease-in-out delay-50 ':
              !isDisabled,
            'opacity-0 group-hover:opacity-20 group-active:opacity-100':
              !checked && !isDisabled,
            'opacity-100 group-hover:opacity-80 group-active:opacity-0':
              checked && !isDisabled
          })}`}
          // style={{ visibility: checked ? 'visible' : 'hidden' }}
        />
      </button>
    </div>
  )
}
