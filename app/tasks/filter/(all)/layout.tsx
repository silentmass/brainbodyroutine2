import TaskCategoriesTopNavi from '@/app/_components/categories-top-navi-links'
import { fetchTaskCategories } from '@/app/lib/data'
import { TaskCategory } from '@/app/lib/definitions'
import { Suspense } from 'react'

export default async function Layout ({
  children
}: {
  children: React.ReactNode
}) {
  const categories: TaskCategory[] = await fetchTaskCategories()

  return (
    <div className='flex flex-col w-full gap-2 pb-2'>
      <div className='flex flex-col w-full'>{children}</div>
    </div>
  )
}
