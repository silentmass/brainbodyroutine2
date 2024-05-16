import { fetchUserTaskById } from '@/app/lib/data'
import { Task } from '@/app/lib/definitions'
import CreateTaskDescriptionListForm from '@/app/ui/tasks/description-lists/create-form'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Create Task Description List'
}

export default async function Page ({ params }: { params: { id: string } }) {
  const taskId = params.id !== '' ? parseInt(params.id) : null
  const task: Task | { message: string; errors: any } =
    taskId !== null ? await fetchUserTaskById(`${taskId}`) : null

  return (
    <Suspense fallback={<p>Loading task...</p>}>
      {typeof task === 'object' && !('message' in task) ? (
        <CreateTaskDescriptionListForm task={task} />
      ) : (
        <>No task</>
      )}
    </Suspense>
  )
}
