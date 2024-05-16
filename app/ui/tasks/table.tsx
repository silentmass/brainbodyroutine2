import { Task } from '@/app/lib/definitions'
import TaskCard from './card'
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
          <TaskCard
            task={task}
            showTaskLink={showTaskLink}
            handleViewModeClick={handleViewModeClick}
          />
        </li>
      ))}
    </ul>
  ) : (
    <>No tasks</>
  )
}
