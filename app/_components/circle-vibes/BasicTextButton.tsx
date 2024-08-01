'use client'
import clsx from 'clsx'
import Link from 'next/link'
import { FormEvent, useEffect } from 'react'
import { useFormStatus } from 'react-dom'

export default function BasicTextButton ({
  children,
  href = null,
  ariaLabel = undefined,
  type = undefined,
  onClick = undefined,
  defaultValue = undefined,
  isDisabled = undefined,
  onPending = undefined,
  isVisible = true,
  isPing = false
}: {
  children: React.ReactNode
  href?: null | string
  ariaLabel?: undefined | string
  type?: 'submit' | 'button' | 'reset' | undefined | 'delete'
  onClick?: undefined | ((event: FormEvent<HTMLButtonElement>) => void)
  defaultValue?: undefined | string | number
  isDisabled?: boolean
  onPending?: undefined | ((isPending: boolean) => void)
  isVisible?: boolean
  isPing?: boolean
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
        isPing={isPing}
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
      onPending={onPending}
      isVisible={isVisible}
      isPing={isPing}
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
  isDisabled = undefined,
  onPending = undefined,
  isVisible = true,
  isPing = false
}: {
  children: React.ReactNode
  ariaLabel?: undefined | string
  type?: 'submit' | 'button' | 'reset' | undefined | 'delete'
  onClick?: undefined | ((event: FormEvent<HTMLButtonElement>) => void)
  defaultValue?: undefined | string | number
  isDisabled?: undefined | boolean
  onPending?: undefined | ((isPending: boolean) => void)
  isVisible?: boolean
  isPing?: boolean
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
      className={`relative group flex flex-col min-w-[6rem] px-3 py-1 rounded-[16px] items-center justify-center font-medium transition ease-in-out delay-150 ${clsx(
        {
          'bg-delete-default hover:bg-delete-hover active:bg-delete-active text-accent-8 hover:text-accent-1 hover:scale-110':
            type === 'delete' && !isDisabled,
          'bg-accent-4 hover:bg-accent-5 active:bg-accent-6 text-accent-8 hover:text-accent-1 hover:scale-110':
            type !== 'delete' && !isDisabled,
          'cursor-not-allowed bg-delete-disabled hover:bg-delete-disabled active:bg-delete-disabled text-accent-2 hover:text-accent-2 transition-none':
            type === 'delete' && isDisabled,
          'cursor-not-allowed bg-accent-0 hover:bg-accent-0 active:bg-accent-0 text-accent-2 hover:text-accent-2 transition-none':
            type !== 'delete' && isDisabled
        }
      )}`}
      style={{ visibility: isVisible ? 'visible' : 'hidden' }}
    >
      <svg
        viewBox='0 0 14 14'
        xmlns='http://www.w3.org/2000/svg'
        fill='#000000'
        className='size-6 animate-spin'
        style={{
          display: type === 'submit' && pending ? 'inline-block' : 'none'
        }}
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
      {isPing && (
        <div className='absolute top-0 right-0'>
          <span className='relative flex h-3 w-3'>
            <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'></span>
            <span className='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
          </span>
        </div>
      )}
      {type === 'submit' && pending ? 'Processing...' : children}
    </button>
  )
}
