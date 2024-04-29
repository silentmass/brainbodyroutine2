import { fetchTaskCategories } from '@/app/lib/data'
import { TaskCategory } from '@/app/lib/definitions'
import CreateTaskForm from '@/app/ui/tasks/create-form'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Create task'
}

export default async function Page () {
  const categories: TaskCategory[] = await fetchTaskCategories()
  return (
    <div className='flex flex-col w-full max-w-2xl border items-center justify-center p-5'>
      <h2>Create task</h2>
      <Suspense fallback={<p>Loading categories...</p>}>
        {categories ? (
          <CreateTaskForm taskCategories={categories} />
        ) : (
          <>No task categories</>
        )}
      </Suspense>
    </div>
  )
}
