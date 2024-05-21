import { Tag, Task, TaskBase, TaskDescriptionList } from '@/app/lib/definitions'
import TaskCard from './card'
import { FormEvent } from 'react'
import { formActionDeleteTaskWrapper } from './optimistic-utils'

export default function TasksTable ({
  tasks,
  showTaskLink = true,
  handleViewModeClick,
  className = '',
  formActionDeleteTaskFun,
  formActionUpdateTaskFun,
  formActionDuplicateTaskFun
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
  formActionUpdateTaskFun: (
    user_id: string,
    description_lists: TaskDescriptionList[] | null,
    tags: Tag[] | null,
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<any>
  formActionDuplicateTaskFun: (
    user_id: string,
    description_lists: TaskDescriptionList[] | null,
    tags: Tag[] | null,
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
            formActionUpdateTaskFun={formActionUpdateTaskFun.bind(
              null,
              `${task.user_id}`,
              task.description_lists,
              task.tags
            )}
            formActionDuplicateTaskFun={formActionDuplicateTaskFun.bind(
              null,
              `${task.user_id}`,
              task.description_lists,
              task.tags
            )}
          />
        </li>
      ))}
    </ul>
  ) : (
    <>No tasks</>
  )
}
