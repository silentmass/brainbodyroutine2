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
    <div className='flex w-full h-fit p-6 bg-accent-5 justify-center items-center z-30'>
      <div className='flex w-fit items-center justify-center h-full gap-6 rounded-2xl'>
        <div
          className={`flex items-center justify-center  border-accent-3 rounded-xl border pr-2 pl-2 ${clsx(
            { 'border-0': viewMode !== null, border: viewMode === null }
          )}`}
        >
          <button onClick={handleViewModeClick} value={`null`} className=''>
            <ListBulletIcon className='w-5 icon' />
          </button>
        </div>
        <div
          className={`flex items-center justify-center border-accent-3 rounded-xl border pr-2 pl-2 ${clsx(
            { 'border-0': viewMode === null, border: viewMode !== null }
          )}`}
        >
          <button onClick={handleViewModeClick} value={`single`}>
            <ChevronRightIcon className='w-5 icon' />
          </button>
        </div>
      </div>
    </div>
  )
}
