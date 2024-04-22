'use server'
import TaskCategoriesTopNavi from '@/app/_components/categories-links'
import TasksSideNavi from '@/app/_components/tasks-links'
import { fetchTaskById, fetchTaskCategories, fetchTasks } from '@/app/lib/data'
import { Task } from '@/app/lib/definitions'

export default async function Layout ({
  children,
  params
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const categories = await fetchTaskCategories()
  const taskID = params.id
  const task = await fetchTaskById(taskID)

  const categoryID = task.task_category_id
  const tasks = await fetchTasks()
  const categoryTasks = tasks.filter(
    (task: Task) => task.task_category_id === parseInt(categoryID)
  )

  return (
    <div className='flex flex-col w-full gap-2 pb-2'>
      <div className='sticky top-[42px] z-10 pb-2'>
        <TaskCategoriesTopNavi
          categories={categories}
          activeID={parseInt(categoryID)}
          className='topnavi flex flex-row w-full gap-x-5 pl-2 pr-2 pb-2 justify-center rounded-br-2xl rounded-bl-2xl'
        />
      </div>
      <div className='flex w-full gap-4 pr-4 pb-4'>
        <div className='sticky top-[82px] flex flex-col h-fit items-center justify-center pt-5 pb-5 pl-4 pr-4 text-xl gap-5 font-extrabold rounded-tr-2xl rounded-br-2xl from-neutral-500 to-neutral-100 bg-gradient-to-b '>
          <TasksSideNavi
            tasks={categoryTasks}
            activeID={parseInt(taskID)}
            className=''
          />
        </div>
        <div className='flex flex-col w-full'>{children}</div>
      </div>
    </div>
  )
}