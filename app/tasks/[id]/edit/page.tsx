import { fetchUserTaskById, fetchTaskCategories } from '@/app/lib/data'
import { Task, TaskCategory } from '@/app/lib/definitions'
import EditTaskForm from '@/app/ui/tasks/edit-form'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
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
    const task: Task | { message: string; errors: any } =
      id !== null ? await fetchUserTaskById(`${id}`) : null
    const categories: TaskCategory[] = await fetchTaskCategories()

    const isTask =
      task !== null && typeof task === 'object' && !('message' in task)

    if (!isTask || !categories || !task.description_lists) {
      return redirect('/tasks/filter')
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
    return redirect('/tasks/filter')
  }
}
