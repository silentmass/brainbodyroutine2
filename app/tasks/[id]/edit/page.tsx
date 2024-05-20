import { fetchUserTaskById, fetchTaskCategories } from '@/app/lib/data'
import { Task, TaskCategory } from '@/app/lib/definitions'
import EditTaskForm from '@/app/ui/tasks/edit-form'
import { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Edit Task'
}

export default async function Page ({ params }: { params: { id: string } }) {
  const id = params.id !== '' ? parseInt(params.id) : null

  if (id === null) {
    redirect('/tasks/filter')
  }

  try {
    const [task, categories]: [
      Task | { message: string; errors: any },
      TaskCategory[]
    ] = await Promise.all([fetchUserTaskById(`${id}`), fetchTaskCategories()])

    const isTask =
      task !== null && typeof task === 'object' && !('message' in task)

    if (!isTask || !categories || !task.description_lists) {
      notFound()
    }

    return (
      <div className='flex w-full flex-col justify-center'>
        <Suspense fallback={<p>Loading task...</p>}>
          <EditTaskForm task={task} categories={categories} />
        </Suspense>
      </div>
    )
  } catch (error) {
    console.error('Error fetching data:', error)
    // return redirect('/tasks/filter')
    notFound()
  }
}
