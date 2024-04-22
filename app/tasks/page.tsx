import { Suspense } from 'react'
import { fetchTaskCategories, fetchTasks } from '@/app/lib/data'
import CreateTaskForm from '@/app/ui/tasks/create-form'
import TasksTable from '../ui/tasks/table'

export default async function Page () {
  const taskCategories = await fetchTaskCategories()
  const tasks = await fetchTasks()
  return (
    <div className='flex flex-col w-full justify-center items-center gap-y-2 pt-2 pb-2'>
      <Suspense fallback={<p>Loading task categories...</p>}>
        <CreateTaskForm taskCategories={taskCategories} />
      </Suspense>
      <Suspense fallback={<p>Loading tasks...</p>}>
        <TasksTable tasks={tasks} />
      </Suspense>
    </div>
  )
}
