import TaskCategoriesTable from '@/app/ui/task-categories/table'
import { fetchTaskCategories } from '../lib/data'
import CreateTaskCategoryForm from '@/app/ui/task-categories/create-form'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export const metadata: Metadata = {
  title: 'Task categories'
}

export default async function Page () {
  const categories = await fetchTaskCategories()

  return (
    <>
      <CreateTaskCategoryForm />
      <Suspense fallback={<p>Loading task categories...</p>}>
        {categories ? (
          <TaskCategoriesTable
            categories={categories}
            className='flex flex-col w-full gap-y-1'
          />
        ) : (
          <>No categories</>
        )}
      </Suspense>
    </>
  )
}
