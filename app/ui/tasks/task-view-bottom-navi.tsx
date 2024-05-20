import { ChevronRightIcon, ListBulletIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { FormEvent } from 'react'

export default function TaskViewBottomNavi ({
  viewMode,
  handleViewModeClick
}: {
  viewMode: string | null
  handleViewModeClick: (event: FormEvent<HTMLButtonElement>) => void
}) {
  return (
    <div
      className={`flex w-full gap-6 p-3 bottom-navi justify-center items-center z-30`}
    >
      {/* List view */}
      <div className={`flex items-center justify-center`}>
        <button
          onClick={handleViewModeClick}
          value={`null`}
          className={`${bottomNaviButtonStyle} ${clsx({
            'bottom-navi-active': viewMode === null,
            'bottom-navi': viewMode !== null
          })}`}
        >
          <ListBulletIcon className='w-5 icon-bottomnavi' />
        </button>
      </div>
      {/* Single view */}
      <div className={`flex items-center justify-center`}>
        <button
          onClick={handleViewModeClick}
          value={`single`}
          className={`${bottomNaviButtonStyle} ${clsx({
            'bottom-navi': viewMode === null,
            'bottom-navi-active': viewMode !== null
          })}`}
        >
          <ChevronRightIcon className='w-5 icon-bottomnavi' />
        </button>
      </div>
    </div>
  )
}

const bottomNaviButtonStyle =
  'flex h-full items-center justify-center rounded-3xl p-3 min-w-20'
