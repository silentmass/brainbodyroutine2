import TouchCarouselTasksWrapper from '@/app/_components/touch-carousel-task-wrap'
import { fetchTasks } from '@/app/lib/data'
import { Suspense } from 'react'

export default async function Page () {
  const tasks = await fetchTasks()
  return (
    <Suspense fallback={<p>Loading tasks...</p>}>
      {tasks ? (
        <TouchCarouselTasksWrapper
          tasks={tasks}
          initialTask={tasks[0]}
          horizontal={false}
          invert={false}
        />
      ) : (
        <>No tasks</>
      )}
    </Suspense>
  )
}
