import { Metadata } from 'next'
import EditTaskCategoryForm from '@/app/ui/task-categories/edit-form'
import { fetchTaskCategoryById } from '@/app/lib/data'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Edit Task category'
}
export default async function Page ({ params }: { params: { id: string } }) {
  const id = params.id
  const category = await fetchTaskCategoryById(id)
  return (
    <Suspense fallback={<p>Loading task category...</p>}>
      {category ? (
        <EditTaskCategoryForm taskCategory={category} />
      ) : (
        <>No category</>
      )}
    </Suspense>
  )
}
