'use'
import TaskCategoriesTopNavi from '@/app/_components/categories-links'
import { fetchTaskCategories } from '@/app/lib/data'

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
    <div className='w-full'>
      <TaskCategoriesTopNavi
        categories={categories}
        activeID={parseInt(id)}
        className='topnavi flex flex-row w-full gap-x-2 pl-2 pr-2 pb-2 justify-center sticky top-[54px] z-10'
      />
      {children}
    </div>
  )
}
