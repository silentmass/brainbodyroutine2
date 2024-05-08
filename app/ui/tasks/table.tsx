import { Task } from '@/app/lib/definitions'
import TaskCard from './card'
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'

export default function TasksTable ({
  tasks,
  showTaskLink = true
}: {
  tasks: Task[]
  showTaskLink: boolean
}) {
  return (
    <div className='flex flex-col gap-y-1 w-full'>
      {tasks ? (
        tasks.map((task: Task) => (
          <TaskCard key={task.id} task={task}>
            {showTaskLink ? (
              <Link href={`/tasks/${task.id}`}>
                <ChevronRightIcon className='icon w-10' />
              </Link>
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
