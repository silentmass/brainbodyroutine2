import TouchCarouselTasksWrapper from '@/app/_components/touch-carousel-task-wrap'
import { fetchTaskCategories, fetchTasks } from '@/app/lib/data'
import { Task } from '@/app/lib/definitions'

export default async function Page ({ params }: { params: { id: string } }) {
  const categoryID = parseInt(params.id)
  const tasks: Task[] = await fetchTasks()
  const categoryTasks = [
    ...tasks.filter(task => task.task_category_id === categoryID)
  ]
  const categories = await fetchTaskCategories()
  return (
    <TouchCarouselTasksWrapper
      tasks={categoryTasks}
      initialTask={categoryTasks[0]}
      horizontal={false}
      invert={false}
    />
  )
}
