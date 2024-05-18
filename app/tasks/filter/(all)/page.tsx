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

export default async function Page () {
  try {
    const categories: TaskCategory[] = await fetchTaskCategories()
    const userTasks: Task[] | { message: string; errors: any } =
      await fetchUserTasks()
    const nullUserTasks = await fetchNullUserTasks()

    const tasks =
      typeof userTasks === 'object' && 'message' in userTasks
        ? [...nullUserTasks]
        : [...userTasks, ...nullUserTasks]

    return (
      <Suspense fallback={<p>Loading categories and tasks...</p>}>
        <TaskViewSwitcher categories={categories} tasks={tasks} />
      </Suspense>
    )
  } catch (error) {
    console.error('Error fetching data', error)
    return <p>Error loading categories and tasks</p>
  }
}
