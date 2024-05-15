import { Task } from '@/app/lib/definitions'
import TaskCard from './card'
import Link from 'next/link'
import { ChevronRightIcon, PencilIcon } from '@heroicons/react/24/outline'
import { FormEvent } from 'react'

export default function TasksTable ({
  tasks,
  showTaskLink = true,
  handleViewModeClick,
  className = ''
}: {
  tasks: Task[]
  showTaskLink: boolean
  handleViewModeClick: (event: FormEvent<HTMLButtonElement>) => void
  className: string
}) {
  return tasks ? (
    <ul className={`${className}`}>
      {tasks.map((task: Task) => (
        <li key={`${task.id}`}>
          <TaskCard task={task}>
            {showTaskLink ? (
              <div className='flex items-center gap-6'>
                <button onClick={handleViewModeClick} value={task.id}>
                  <ChevronRightIcon className='icon w-10' />
                </button>
                <Link href={`/tasks/${task.id}/edit`}>
                  <PencilIcon className='icon w-5' />
                </Link>
              </div>
            ) : (
              <></>
            )}
          </TaskCard>
        </li>
      ))}
    </ul>
  ) : (
    <>No tasks</>
  )
}
