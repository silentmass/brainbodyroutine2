import { fetchUserTaskById } from '@/app/lib/data'
import { Task } from '@/app/lib/definitions'
import CreateTaskDescriptionListForm from '@/app/ui/tasks/description-lists/create-form'
import CreateDescriptionListView from '@/app/ui/tasks/description-lists/create-list-view'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Create Task Description List'
}

export default async function Page ({ params }: { params: { id: string } }) {
  const taskId = params.id !== '' ? parseInt(params.id) : null

  if (taskId === null) {
    console.error('Task id is not a number')
    return redirect('/tasks/filter')
  }

  try {
    const task: Task | { message: string; errors: any } =
      taskId !== null ? await fetchUserTaskById(`${taskId}`) : null

    if (task === null || (typeof task === 'object' && 'message' in task)) {
      console.error('Task not valid')
      return redirect('/tasks/filter')
    }

    return (
      <Suspense fallback={<p>Loading task...</p>}>
        <CreateDescriptionListView task={task} />
      </Suspense>
    )
  } catch (error) {
    console.error('Fetch error:', error)
    return redirect('/tasks/filter')
  }
}
