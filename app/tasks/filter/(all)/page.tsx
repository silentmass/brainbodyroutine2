import { fetchTaskCategories, fetchTasks } from '@/app/lib/data'
import { Task, TaskCategory } from '@/app/lib/definitions'
import TaskViewSwitcher from '@/app/ui/tasks/task-view-switcher'
import { Suspense } from 'react'

// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'

export default async function Page () {
  const categories: TaskCategory[] = await fetchTaskCategories()
  const tasks: Task[] = await fetchTasks()
  return (
    <Suspense fallback={<p>Loading categories and tasks...</p>}>
      <TaskViewSwitcher categories={categories} tasks={tasks} />
    </Suspense>
  )
}
