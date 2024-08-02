import BasicButton from '@/app/_components/demos/circle-vibes/BasicButton'
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
    <div className='flex w-full p-2 gap-x-3 justify-center items-center'>
      <div>
        <BasicButton
          value={'null'}
          onClick={(ev: React.FormEvent<HTMLButtonElement>) => {
            ev.preventDefault()
            return handleViewModeClick(ev)
          }}
        >
          <div className='flex rounded-cool group-hover:bg-accent-5 group-active:bg-accent-6'>
            <ListBulletIcon
              className={`icon ${clsx({
                'w-6 h-6': viewMode !== null,
                'w-8 h-8': viewMode === null
              })}`}
            />
          </div>
        </BasicButton>
      </div>
      <div>
        <BasicButton
          value={'single'}
          onClick={(ev: React.FormEvent<HTMLButtonElement>) => {
            ev.preventDefault()
            return handleViewModeClick(ev)
          }}
        >
          <div className='flex rounded-cool bg-accent-5 group-hover:bg-accent-5 group-active:bg-accent-5'>
            <ChevronRightIcon
              className={`icon ${clsx({
                'w-8 h-8': viewMode !== null,
                'w-6 h-6': viewMode === null
              })}`}
            />
          </div>
        </BasicButton>
      </div>
    </div>
  )
}
