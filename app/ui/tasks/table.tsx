import { Task } from '@/app/lib/definitions'
import TaskCard from './card'
import Link from 'next/link'
import { ChevronRightIcon, PencilIcon } from '@heroicons/react/24/outline'
import { FormEvent } from 'react'

export default function TasksTable ({
  tasks,
  showTaskLink = true,
  onViewTaskClick
}: {
  tasks: Task[]
  showTaskLink: boolean
  onViewTaskClick: (event: FormEvent<HTMLButtonElement>) => void
}) {
  return (
    <div className='flex flex-col gap-y-1 w-full'>
      {tasks ? (
        tasks.map((task: Task) => (
          <TaskCard key={task.id} task={task}>
            {showTaskLink ? (
              <div className='flex items-center gap-6'>
                <button onClick={onViewTaskClick} value={task.id}>
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
        ))
      ) : (
        <>No tasks</>
      )}
    </div>
  )
}
