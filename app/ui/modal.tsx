'use client'

import { XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export function Modal ({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <>
      <div className='flex flex-col w-full bg-accent-2/30 rounded-lg backdrop-blur-sm mt-5 mb-5 h-fit'>
        <button
          onClick={() => {
            router.back()
          }}
          aria-label='Close modal'
        >
          <XMarkIcon className='w-5 ml-2 mt-2' />
        </button>
        <div className='flex flex-col pl-4 pr-4'>{children}</div>
      </div>
    </>
  )
}
