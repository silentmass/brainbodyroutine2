import TaskCategoriesTable from '@/app/ui/task-categories/table'
import { fetchTaskCategories } from '../lib/data'
import CreateTaskCategoryForm from '@/app/ui/task-categories/create-form'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Task categories'
}

export default async function Page () {
  const taskCategories = await fetchTaskCategories()

  return (
    <>
      <CreateTaskCategoryForm />
      <Suspense fallback={<p>Loading task categories...</p>}>
        <TaskCategoriesTable
          categories={taskCategories}
          className='flex flex-col w-full gap-y-1'
        />
      </Suspense>
    </>
  )
}
