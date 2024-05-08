import TouchCarouselTasksWrapper from '@/app/_components/touch-carousel-task-wrap'
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
  const tasks: Task[] = await fetchTasks()

  const categoryTasks =
    tasks !== null
      ? [
          ...tasks.filter(
            entry => entry.task_category_id === parseInt(categoryID)
          )
        ]
      : []

  const task = tasks ? tasks[0] : null

  console.log('task', task)

  return (
    <div className='flex w-full justify-center'>
      <Suspense fallback={<p>Loading tasks...</p>}>
        {categoryTasks.length ? (
          <TouchCarouselTasksWrapper
            tasks={categoryTasks}
            horizontal={false}
            invert={false}
            selectedTask={task}
          />
        ) : (
          <>No tasks</>
        )}
      </Suspense>
    </div>
  )
}
