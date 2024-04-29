import { fetchTaskById } from '@/app/lib/data'
import CreateTaskDescriptionListForm from '@/app/ui/tasks/description-lists/create-form'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Edit Task Description List'
}

export default async function Page ({ params }: { params: { id: string } }) {
  const taskId = params.id !== '' ? params.id : null
  const task = taskId !== null ? await fetchTaskById(taskId) : null

  return (
    <Suspense fallback={<p>Loading task...</p>}>
      {task ? <CreateTaskDescriptionListForm task={task} /> : <>No task</>}
    </Suspense>
  )
}
