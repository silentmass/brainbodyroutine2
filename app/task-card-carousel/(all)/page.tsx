import TouchCarouselTasksWrapper from '@/app/_components/old/touch-carousel-task-wrap'
import { fetchTasks } from '@/app/lib/data'
import { Task } from '@/app/lib/definitions'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Page () {
  const tasks: Task[] = await fetchTasks()
  const task: Task | null = tasks && tasks.length ? tasks[0] : null
  return (
    <div className='flex w-full h-full'>
      <Suspense fallback={<p>Loading tasks...</p>}>
        {tasks && tasks.length && task !== null && (
          <TouchCarouselTasksWrapper
            tasks={tasks}
            initialTask={task}
            horizontal={false}
            invert={false}
          />
        )}
      </Suspense>
    </div>
  )
}
