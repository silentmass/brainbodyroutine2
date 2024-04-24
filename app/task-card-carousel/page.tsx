import TouchCarouselTasks from '../_components/touch-carousel-tasks'
import { fetchTasks } from '../lib/data'
import { Task } from '../lib/definitions'
import { TaskCardView } from '../ui/tasks/card'

export default async function Page () {
  const tasks = await fetchTasks()
  return (
    <TouchCarouselTasks
      tasks={tasks}
      initialTask={tasks[0]}
      horizontal={false}
      invert={true}
    />
  )
}
