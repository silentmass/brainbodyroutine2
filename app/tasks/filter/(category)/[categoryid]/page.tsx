import { InitialState, initialState } from '@/app/_components/response-state'
import { fetchTaskCategories, fetchUserTasks } from '@/app/lib/data'
import { Task, TaskCategory } from '@/app/lib/definitions'
import TaskViewSwitcher from '@/app/ui/tasks/task-view-switcher'
import { Suspense } from 'react'

export default async function Page ({
  params
}: {
  params: { categoryid: string }
}) {
  const categories: TaskCategory[] = await fetchTaskCategories()
  const tasks: Task[] | InitialState = await fetchUserTasks(initialState)

  return (
    <Suspense fallback={<p>Loading categories and tasks...</p>}>
      <TaskViewSwitcher
        categories={categories}
        tasks={
          typeof tasks === 'object' && 'message' in tasks
            ? []
            : [
                ...tasks.filter(
                  entry =>
                    entry.task_category_id === parseInt(params.categoryid)
                )
              ]
        }
      />
    </Suspense>
  )
}
