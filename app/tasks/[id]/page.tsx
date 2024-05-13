import TouchCarouselTasksWrapper from '@/app/_components/old/touch-carousel-task-wrap'
import { fetchTaskById, fetchTasks } from '@/app/lib/data'
import { Task } from '@/app/lib/definitions'
import { Suspense } from 'react'

export default async function Page ({ params }: { params: { id: string } }) {
  const taskId = params.id

  const task = await fetchTaskById(taskId)
  const tasks: Task[] = await fetchTasks()
  const categoryTasks = [
    ...tasks.filter(entry => entry.task_category_id === task.task_category_id)
  ]

  return (
    <Suspense fallback={<p>Loading tasks...</p>}>
      {categoryTasks ? (
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
