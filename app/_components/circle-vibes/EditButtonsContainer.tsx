'use client'
import {
  ChevronDownIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import BasicButton from './BasicButton'
import { useState } from 'react'

export default function EditButtonsContainer ({
  children = undefined,
  isOpen = false,
  onOpenChange = undefined
}: {
  children?: undefined | React.ReactNode
  isOpen?: boolean
  onOpenChange?: undefined | ((isOpen: boolean) => void)
}) {
  const [currentIsOpen, setCurrentIsOpen] = useState(isOpen)
  return (
    <div
      className={`flex flex-col items-center gap-2 bg-accent-2 p-1 rounded-[12px]`}
    >
      <BasicButton
        onClick={(ev: React.FormEvent) => {
          setCurrentIsOpen(previousState => !previousState)
        }}
      >
        {currentIsOpen ? (
          <ChevronDownIcon className='icon w-5 h-5' />
        ) : (
          <EllipsisHorizontalIcon className='icon w-5 h-5' />
        )}
      </BasicButton>
      {currentIsOpen && children && <>{children}</>}
      {currentIsOpen && children === undefined && (
        <>
          <BasicButton>
            <TrashIcon className='icon w-5 h-5' />
          </BasicButton>
          <BasicButton>
            <PencilIcon className='icon w-5 h-5' />
          </BasicButton>
        </>
      )}
    </div>
  )
}
