'use'
import TaskCategoriesTopNavi from '@/app/_components/categories-links'
import TasksSideNavi from '@/app/_components/tasks-links'
import { fetchTaskCategories, fetchTasks } from '@/app/lib/data'
import { Task } from '@/app/lib/definitions'

export default async function Layout ({
  children,
  params
}: {
  children: React.ReactNode
  params: { categoryid: string }
}) {
  const categories = await fetchTaskCategories()
  const id = params.categoryid
  return (
    <div className='flex flex-col w-full gap-2 pb-2'>
      <div className='sticky top-[42px] z-10 pb-2 '>
        <TaskCategoriesTopNavi
          categories={categories}
          activeID={parseInt(id)}
          className='topnavi flex flex-row w-full gap-x-5 pl-2 pr-2 pb-2 justify-center rounded-br-2xl rounded-bl-2xl'
        />
      </div>
      <div className='flex flex-col w-full'>{children}</div>
    </div>
  )
}
