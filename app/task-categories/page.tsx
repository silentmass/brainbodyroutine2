import TaskCategoriesTable from '@/app/ui/task-categories/table'
import { fetchTaskCategories } from '@/app/lib/data'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export const metadata: Metadata = {
  title: 'Task categories'
}

export default async function Page () {
  try {
    const categories = await fetchTaskCategories()

    if (!categories || !categories.length) {
      return <p>No categories</p>
    }

    return (
      <Suspense fallback={<p>Loading task categories...</p>}>
        <TaskCategoriesTable
          categories={categories}
          className='flex flex-col w-full gap-y-6 p-6'
        />
      </Suspense>
    )
  } catch (error) {
    console.error('Fetching error:', error)
    return <p>Failed to load categories</p>
  }
}
