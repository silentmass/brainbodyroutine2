'use server'
import { fetchTaskById, fetchTaskCategories, fetchTasks } from '@/app/lib/data'
import { Task, TaskCategory } from '@/app/lib/definitions'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { Suspense } from 'react'

export default async function Layout ({
  children,
  params
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const categories: TaskCategory[] = await fetchTaskCategories()

  const taskID = params.id !== '' ? params.id : null

  const task: Task = taskID !== null ? await fetchTaskById(taskID) : null

  const categoryID: number | null = task ? task.task_category_id : null
  const tasks = await fetchTasks()

  const categoryTasks =
    tasks && categoryID !== null
      ? tasks.filter((task: Task) => task.task_category_id === categoryID)
      : null

  return (
    <div className='flex flex-col w-full gap-2 pb-2'>
      <div className='flex w-full gap-4 pb-4'>
        <div className='flex flex-col w-full h-fit'>{children}</div>
      </div>
    </div>
  )
}
