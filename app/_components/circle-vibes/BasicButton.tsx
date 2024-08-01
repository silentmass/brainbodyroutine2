'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { FormEvent, useEffect } from 'react'
import { useFormStatus } from 'react-dom'

export default function BasicButton ({
  children,
  href = null,
  ariaLabel = undefined,
  type = undefined,
  onClick = undefined,
  value = undefined,
  defaultValue = undefined,
  isDisabled = undefined,
  onPending = undefined,
  isVisible = true
}: {
  children: React.ReactNode
  href?: null | string
  ariaLabel?: undefined | string
  type?: 'submit' | 'button' | 'reset' | undefined | 'delete'
  onClick?: undefined | ((event: FormEvent<HTMLButtonElement>) => void)
  value?: undefined | string | number
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
        value={value}
        onPending={onPending}
      >
        {children}
      </Inner>
    </Link>
  ) : (
    <Inner
      type={type}
      aria-label={ariaLabel}
      isDisabled={isDisabled}
      onClick={onClick}
      defaultValue={defaultValue}
      value={value}
      onPending={onPending}
      isVisible={isVisible}
    >
      {children}
    </Inner>
  )
}

const Inner = ({
  children,
  ariaLabel = undefined,
  type = undefined,
  onClick = undefined,
  defaultValue = undefined,
  value = undefined,
  isDisabled = undefined,
  onPending = undefined,
  isVisible = true
}: {
  children: React.ReactNode
  ariaLabel?: undefined | string
  type?: 'submit' | 'button' | 'reset' | undefined | 'delete'
  onClick?: undefined | ((event: FormEvent<HTMLButtonElement>) => void)
  defaultValue?: undefined | string | number
  value?: undefined | string | number
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
      type={type !== 'delete' ? type : undefined}
      aria-disabled={pending}
      aria-label={ariaLabel}
      disabled={isDisabled}
      onClick={onClick}
      defaultValue={defaultValue}
      value={value}
      className={`relative group flex items-center justify-center px-3 py-1 rounded-[16px] ${clsx(
        {
          'bg-delete-default hover:bg-delete-hover active:bg-delete-active text-accent-8 hover:text-accent-1 hover:scale-110 transition ease-in-out delay-150':
            type === 'delete' && !isDisabled,
          'cursor-not-allowed bg-accent-0 hover:bg-accent-0 active:bg-accent-0':
            type !== 'delete' && isDisabled,
          'cursor-not-allowed bg-delete-disabled hover:bg-delete-disabled active:bg-delete-disabled text-accent-2 hover:text-accent-2 transition-none':
            type === 'delete' && isDisabled,
          'bg-accent-3 hover:bg-accent-4 active:bg-accent-5 transition ease-in-out delay-150 hover:scale-110':
            type !== 'delete' && !isDisabled
        }
      )}`}
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      {children}
    </button>
  )
}
