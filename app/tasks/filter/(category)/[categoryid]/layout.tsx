import TaskCategoriesTopNavi from '@/app/_components/categories-top-navi-links'
import { fetchTaskCategories } from '@/app/lib/data'
import { TaskCategory } from '@/app/lib/definitions'
import { Suspense } from 'react'

export default async function Layout ({
  children,
  params
}: {
  children: React.ReactNode
  params: { categoryid: string }
}) {
  const id = params.categoryid !== '' ? parseInt(params.categoryid) : null

  const categories: TaskCategory[] = await fetchTaskCategories()

  return (
    <div className='flex flex-col w-full gap-2 pb-2'>
      <div className='sticky top-[42px] z-10 pb-2 '>
        <Suspense fallback={<p>Loading categories...</p>}>
          {categories && id !== null ? (
            <TaskCategoriesTopNavi
              categories={categories}
              activeID={id}
              className='topnavi flex flex-row w-full gap-x-5 pl-2 pr-2 pb-2 justify-center rounded-br-2xl rounded-bl-2xl'
            />
          ) : (
            <>No categories</>
          )}
        </Suspense>
      </div>
      <div className='flex flex-col w-full'>{children}</div>
    </div>
  )
}
