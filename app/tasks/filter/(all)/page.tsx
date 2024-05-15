import { initialState, InitialState } from '@/app/_components/response-state'
import { fetchTaskCategories, fetchTasks, fetchUserTasks } from '@/app/lib/data'
import { Task, TaskCategory } from '@/app/lib/definitions'
import TaskViewSwitcher from '@/app/ui/tasks/task-view-switcher'
import { Suspense } from 'react'

// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'

export default async function Page () {
  const categories: TaskCategory[] = await fetchTaskCategories()
  const userTasks: Task[] | InitialState = await fetchUserTasks(initialState)
  const nullUserTasks = await fetchTasks()
  return (
    <Suspense fallback={<p>Loading categories and tasks...</p>}>
      <TaskViewSwitcher
        categories={categories}
        tasks={
          typeof userTasks === 'object' && 'message' in userTasks
            ? []
            : [...userTasks, ...nullUserTasks]
        }
      />
    </Suspense>
  )
}
