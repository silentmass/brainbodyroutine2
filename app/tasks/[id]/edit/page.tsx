import {
  fetchUserTaskById,
  fetchTaskCategories,
  fetchUserTaskDescriptionLists
} from '@/app/lib/data'
import { Task, TaskCategory, TaskDescriptionList } from '@/app/lib/definitions'
import EditTaskForm from '@/app/ui/tasks/edit-form'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Edit Task'
}

export default async function Page ({ params }: { params: { id: string } }) {
  const id = params.id !== '' ? params.id : null
  const task: Task = id !== null ? await fetchUserTaskById(id) : null
  const taskCategories: TaskCategory[] = await fetchTaskCategories()
  const taskDescriptionLists: TaskDescriptionList[] =
    id !== null ? await fetchUserTaskDescriptionLists(id) : null

  return (
    <div className='flex w-full h-fit flex-col'>
      <Suspense fallback={<p>Loading task...</p>}>
        {task !== null && taskCategories && taskDescriptionLists ? (
          <EditTaskForm
            task={task}
            taskCategories={taskCategories}
            taskDescriptionLists={taskDescriptionLists}
          />
        ) : (
          <>No task</>
        )}
      </Suspense>
    </div>
  )
}
