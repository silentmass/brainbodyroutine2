import TouchCarouselTasksWrapper from '@/app/_components/touch-carousel-task-wrap'
import { fetchTaskCategories, fetchTasks } from '@/app/lib/data'

export default async function Page () {
  const tasks = await fetchTasks()
  const categories = await fetchTaskCategories()
  return (
    <TouchCarouselTasksWrapper
      tasks={tasks}
      initialTask={tasks[0]}
      horizontal={false}
      invert={true}
    />
  )
}
