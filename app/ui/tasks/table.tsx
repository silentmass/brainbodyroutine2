import { Task, TaskBase } from '@/app/lib/definitions'
import TaskCard from './card'
import { FormEvent } from 'react'
import { formActionDeleteTaskWrapper } from './optimistic-utils'

export default function TasksTable ({
  tasks,
  showTaskLink = true,
  handleViewModeClick,
  className = '',
  formActionDeleteTaskFun
}: {
  tasks: Task[] | TaskBase[]
  showTaskLink: boolean
  handleViewModeClick: (event: FormEvent<HTMLButtonElement>) => void
  className: string
  formActionDeleteTaskFun: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<any>
}) {
  return tasks ? (
    <ul className={`${className}`}>
      {tasks.map((task, idx) => (
        <li
          key={
            'id' in task && task.id !== undefined
              ? `${task.id}`
              : `${task.title}${idx}`
          }
        >
          <TaskCard
            task={task}
            showTaskLink={showTaskLink}
            handleViewModeClick={handleViewModeClick}
            formActionDeleteTaskFun={formActionDeleteTaskFun}
          />
        </li>
      ))}
    </ul>
  ) : (
    <>No tasks</>
  )
}
