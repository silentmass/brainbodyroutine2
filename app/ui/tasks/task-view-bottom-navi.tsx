import { ChevronRightIcon, ListBulletIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Dispatch, FormEvent, SetStateAction } from 'react'

export default function TaskViewBottomNavi ({
  viewMode,
  handleViewModeClick
}: {
  viewMode: string | null
  handleViewModeClick: (event: FormEvent<HTMLButtonElement>) => void
}) {
  return (
    <div className='flex w-full h-fit p-3 bg-accent-2 justify-center items-center z-30'>
      <div className='flex w-fit items-center justify-center h-full gap-6 rounded-2xl'>
        <div
          className={`flex items-center justify-center rounded-3xl ${clsx({
            '': viewMode !== null,
            'bg-accent-1': viewMode === null
          })}`}
        >
          <button
            onClick={handleViewModeClick}
            value={`null`}
            className='flex h-full items-center justify-center rounded-3xl p-3 min-w-20'
          >
            <ListBulletIcon className='w-5 icon' />
          </button>
        </div>
        <div
          className={`flex items-center justify-center rounded-3xl ${clsx({
            '': viewMode === null,
            'bg-accent-1': viewMode !== null
          })}`}
        >
          <button
            onClick={handleViewModeClick}
            value={`single`}
            className='flex h-full justify-center items-center rounded-3xl p-3 min-w-20'
          >
            <ChevronRightIcon className='w-5 icon' />
          </button>
        </div>
      </div>
    </div>
  )
}
