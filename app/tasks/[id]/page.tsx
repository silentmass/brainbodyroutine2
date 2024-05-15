import TouchCarouselTasksWrapper from '@/app/_components/old/touch-carousel-task-wrap'
import { fetchTaskById, fetchUserTasks } from '@/app/lib/data'
import { Task } from '@/app/lib/definitions'
import { Suspense } from 'react'
import { initialState } from '@/app/_components/response-state'
import { InitialState } from '@/app/_components/response-state'

export default async function Page ({ params }: { params: { id: string } }) {
  const taskId = params.id

  const task = await fetchTaskById(taskId)
  const tasks: Task[] | InitialState = await fetchUserTasks(initialState)
  const categoryTasks =
    typeof tasks === 'object' && 'message' in tasks
      ? []
      : [
          ...tasks.filter(
            entry => entry.task_category_id === task.task_category_id
          )
        ]

  return (
    <Suspense fallback={<p>Loading tasks...</p>}>
      {categoryTasks.length ? (
        <TouchCarouselTasksWrapper
          tasks={categoryTasks}
          horizontal={false}
          invert={false}
          selectedTask={task}
        />
      ) : (
        <>No tasks</>
      )}
    </Suspense>
  )
}
