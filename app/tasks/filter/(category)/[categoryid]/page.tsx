import { fetchTaskCategories, fetchTasks } from '@/app/lib/data'
import { Task, TaskCategory } from '@/app/lib/definitions'
import TaskViewSwitcher from '@/app/ui/tasks/task-view-switcher'
import { Suspense } from 'react'

export default async function Page ({
  params
}: {
  params: { categoryid: string }
}) {
  const categories: TaskCategory[] = await fetchTaskCategories()
  const tasks: Task[] = await fetchTasks()

  return (
    <Suspense fallback={<p>Loading categories and tasks...</p>}>
      <TaskViewSwitcher
        categories={categories}
        tasks={
          tasks !== null
            ? [
                ...tasks.filter(
                  entry =>
                    entry.task_category_id === parseInt(params.categoryid)
                )
              ]
            : []
        }
      />
    </Suspense>
  )
}
