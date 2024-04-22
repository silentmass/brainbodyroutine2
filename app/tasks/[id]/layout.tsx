'use server'
import TaskCategoriesTopNavi from '@/app/_components/categories-links'
import { fetchTaskById, fetchTaskCategories } from '@/app/lib/data'
import { TaskCategory } from '@/app/lib/definitions'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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

  return (
    <div className='w-full'>
      {/* Category navigation */}
      <TaskCategoriesTopNavi
        categories={categories}
        activeID={task.task_category_id}
        className='topnavi flex flex-row w-full gap-x-2 pl-2 pr-2 pb-2 justify-center sticky top-[54px] z-10'
      />
      {children}
    </div>
  )
}
