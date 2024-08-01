'use client'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next/link'
import { FormEvent, useEffect } from 'react'
import { useFormStatus } from 'react-dom'

export default function LargeOpenButton ({
  href = null,
  ariaLabel = undefined,
  type = undefined,
  onClick = undefined,
  defaultValue = undefined,
  isDisabled = undefined,
  onPending = undefined,
  isVisible = true
}: {
  href?: null | string
  ariaLabel?: undefined | string
  type?: 'submit' | 'button' | 'reset' | undefined
  onClick?: undefined | ((event: FormEvent<HTMLButtonElement>) => void)
  defaultValue?: undefined | string | number
  isDisabled?: boolean
  onPending?: undefined | ((isPending: boolean) => void)
  isVisible?: boolean
}) {
  return href ? (
    <Link
      href={href}
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
      prefetch={false}
    >
      <Inner
        type={type}
        aria-label={ariaLabel}
        isDisabled={isDisabled}
        onClick={onClick}
        defaultValue={defaultValue}
        onPending={onPending}
        isVisible={isVisible}
      />
    </Link>
  ) : (
    <Inner
      type={type}
      aria-label={ariaLabel}
      isDisabled={isDisabled}
      onClick={onClick}
      defaultValue={defaultValue}
      onPending={onPending}
      isVisible={isVisible}
    />
  )
}

const Inner = ({
  ariaLabel = undefined,
  type = 'submit',
  onClick = undefined,
  defaultValue = undefined,
  isDisabled = undefined,
  onPending = undefined,
  isVisible = true
}: {
  ariaLabel?: undefined | string
  type?: 'submit' | 'button' | 'reset' | undefined
  onClick?: undefined | ((event: FormEvent<HTMLButtonElement>) => void)
  defaultValue?: undefined | string | number
  isDisabled?: undefined | boolean
  onPending?: undefined | ((isPending: boolean) => void)
  isVisible?: boolean
}) => {
  const { pending } = useFormStatus()

  useEffect(() => {
    if (!onPending) return
    onPending(pending)
  }, [pending])

  return (
    <button
      type={type}
      aria-disabled={pending}
      aria-label={ariaLabel}
      disabled={isDisabled}
      onClick={onClick}
      defaultValue={defaultValue}
      className={`group flex flex-col items-center justify-center w-[50px] h-[50px] rounded-full p-2 ${clsx(
        {
          'cursor-not-allowed bg-accent-0 hover:bg-accent-0 active:bg-accent-0':
            isDisabled,
          'bg-accent-4  hover:bg-accent-5 active:bg-accent-6 transition ease-in-out delay-150 hover:scale-110':
            !isDisabled
        }
      )}`}
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      <ChevronRightIcon
        className={`flex min-w-full min-h-full ${clsx({
          'icon-disabled': isDisabled,
          icon: !isDisabled
        })}`}
      />
    </button>
  )
}
