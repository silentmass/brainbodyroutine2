import TouchCarouselTasksWrapper from '@/app/_components/touch-carousel-task-wrap'
import { fetchTasks } from '@/app/lib/data'
import { Task } from '@/app/lib/definitions'
import { Suspense } from 'react'

export default async function Page () {
  const tasks: Task[] = await fetchTasks()
  return (
    <Suspense fallback={<p>Loading tasks...</p>}>
      {tasks && tasks.length && (
        <TouchCarouselTasksWrapper
          tasks={tasks}
          initialTask={tasks[0]}
          horizontal={false}
          invert={false}
        />
      )}
    </Suspense>
  )
}
