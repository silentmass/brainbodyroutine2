import { Suspense } from 'react'
import { fetchTaskCategories, fetchTasks } from '@/app/lib/data'
import CreateTaskForm from '@/app/ui/tasks/create-form'
import TasksTable from '@/app/ui/tasks/table'
import { Task, TaskCategory } from '@/app/lib/definitions'

export default async function Page () {
  const categories: TaskCategory[] = await fetchTaskCategories()
  const tasks: Task[] = await fetchTasks()
  return (
    <div className='flex flex-col w-full h-fit overflow-auto gap-y-2 pt-2 pb-2'>
      <Suspense fallback={<p>Loading categories...</p>}>
        {categories && categories.length && (
          <CreateTaskForm taskCategories={categories} />
        )}
      </Suspense>
      <Suspense fallback={<p>Loading tasks...</p>}>
        {tasks && tasks.length && <TasksTable tasks={tasks} />}
      </Suspense>
    </div>
  )
}
