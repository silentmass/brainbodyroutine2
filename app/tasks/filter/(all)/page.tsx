import { initialState, InitialState } from '@/app/_components/response-state'
import {
  fetchTaskCategories,
  fetchNullUserTasks,
  fetchUserTasks
} from '@/app/lib/data'
import { Task, TaskCategory } from '@/app/lib/definitions'
import TaskViewSwitcher from '@/app/ui/tasks/task-view-switcher'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Tasks'
}

// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'

export default async function Page () {
  const categories: TaskCategory[] = await fetchTaskCategories()
  const userTasks: Task[] | { message: string; errors: any } =
    await fetchUserTasks()
  const nullUserTasks = await fetchNullUserTasks()
  return (
    <Suspense fallback={<p>Loading categories and tasks...</p>}>
      <TaskViewSwitcher
        categories={categories}
        tasks={
          typeof userTasks === 'object' && 'message' in userTasks
            ? [...nullUserTasks]
            : [...userTasks, ...nullUserTasks]
        }
      />
    </Suspense>
  )
}
