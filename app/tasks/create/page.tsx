import { fetchTaskCategories } from '@/app/lib/data'
import { TaskCategory } from '@/app/lib/definitions'
import CreateTaskForm from '@/app/ui/tasks/create-form'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Create task'
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function Page () {
  try {
    const categories: TaskCategory[] = await fetchTaskCategories()

    if (!categories || !categories.length) {
      return <p>No categories. Task creation requires categories.</p>
    }

    return (
      <div className='flex flex-col w-full items-center justify-center p-6'>
        <h2>Create task</h2>
        <Suspense fallback={<p>Loading categories...</p>}>
          <CreateTaskForm taskCategories={categories} />
        </Suspense>
      </div>
    )
  } catch (error) {
    console.error('Fetch error:', error)
    return <p>Failed to load categories</p>
  }
}
