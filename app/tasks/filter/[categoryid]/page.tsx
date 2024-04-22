import { fetchTaskCategoryById, fetchTasks } from '@/app/lib/data'
import { Task } from '@/app/lib/definitions'
import TasksTable from '@/app/ui/tasks/table'
import { Suspense } from 'react'

export default async function Page ({
  params
}: {
  params: { categoryid: string }
}) {
  const categoryID = params.categoryid
  const tasks = await fetchTasks()

  return (
    <div className='flex w-full'>
      <Suspense fallback={<p>Loading tasks...</p>}>
        <TasksTable
          tasks={tasks.filter(
            (task: Task) => task.task_category_id === parseInt(categoryID)
          )}
        />
      </Suspense>
    </div>
  )
}
