'use server'
import TaskCategoriesTopNavi from '@/app/_components/categories-links'
import TasksSideNavi from '@/app/_components/tasks-links'
import { fetchTaskById, fetchTaskCategories, fetchTasks } from '@/app/lib/data'
import { Task, TaskCategory } from '@/app/lib/definitions'
import { Suspense } from 'react'

export default async function Layout ({
  children,
  params
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const categories: TaskCategory[] = await fetchTaskCategories()

  const taskID = params.id !== '' ? params.id : null

  const task: Task = taskID !== null ? await fetchTaskById(taskID) : null

  const categoryID: number | null = task ? task.task_category_id : null
  const tasks = await fetchTasks()

  const categoryTasks =
    tasks && categoryID !== null
      ? tasks.filter((task: Task) => task.task_category_id === categoryID)
      : null

  return (
    <div className='flex flex-col w-full gap-2 pb-2'>
      <div className='sticky top-[42px] z-10 pb-2'>
        <Suspense fallback={<p>Loading categories...</p>}>
          {categories && categoryID !== null ? (
            <TaskCategoriesTopNavi
              categories={categories}
              activeID={categoryID}
              className='topnavi flex flex-row w-full gap-x-5 pl-2 pr-2 pb-2 justify-center rounded-br-2xl rounded-bl-2xl'
            />
          ) : (
            <>No categories</>
          )}
        </Suspense>
      </div>
      <div className='flex w-full gap-4 pb-4'>
        <div className='sticky top-[82px] flex flex-col h-fit items-center justify-center pt-5 pb-5 pl-4 pr-4 text-xl gap-5 font-extrabold rounded-tr-2xl rounded-br-2xl from-neutral-500 to-neutral-100 bg-gradient-to-b '>
          <Suspense fallback={<p>Loading tasks...</p>}>
            {categoryTasks && taskID !== null ? (
              <TasksSideNavi
                tasks={categoryTasks}
                activeID={parseInt(taskID)}
                className=''
              />
            ) : (
              <>No tasks</>
            )}
          </Suspense>
        </div>
        <div className='flex flex-col w-full h-fit'>{children}</div>
      </div>
    </div>
  )
}
