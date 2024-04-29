import { Suspense } from 'react'
import { fetchTaskCategories, fetchTasks } from '@/app/lib/data'
import CreateTaskForm from '@/app/ui/tasks/create-form'
import TasksTable from '../ui/tasks/table'

export default async function Page () {
  const categories = await fetchTaskCategories()
  const tasks = await fetchTasks()
  return (
    <div className='flex flex-col w-full justify-center items-center gap-y-2 pt-2 pb-2'>
      <Suspense fallback={<p>Loading task categories...</p>}>
        {categories ? (
          <CreateTaskForm taskCategories={categories} />
        ) : (
          <>No task categories</>
        )}
      </Suspense>
      <Suspense fallback={<p>Loading tasks...</p>}>
        {tasks ? <TasksTable tasks={tasks} /> : <>No tasks</>}
      </Suspense>
    </div>
  )
}
