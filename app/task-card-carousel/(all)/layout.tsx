import { fetchTaskCategories, fetchTaskCategoryById } from '@/app/lib/data'
import {
  DownArrowTriangleButton,
  LeftArrowTriangleButton,
  RightArrowTriangleButton,
  TopArrowTriangleButton
} from '@/app/_components/buttons'
import { TaskCategory } from '@/app/lib/definitions'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Layout ({
  children
}: {
  children: React.ReactNode
}) {
  const taskCategories: TaskCategory[] = await fetchTaskCategories()

  const arrowStyle = `icon fill-gray-100 stroke-none hover:fill-gray-200 active:fill-gray-500 `
  const arrowShortSideLength = 5

  const naviList = [...taskCategories.map(category => category.id)]

  return (
    <div className='flex flex-col w-full'>
      <ul className='flex w-full justify-between p-4'>
        <li key='all'>ALL</li>
        <Suspense fallback={<p>Loading categories...</p>}>
          {taskCategories ? (
            taskCategories.map(category => (
              <li key={category.id} className='opacity-30'>
                {category.title}
              </li>
            ))
          ) : (
            <>No categories</>
          )}
        </Suspense>
      </ul>
      <div className='flex w-full items-center p-4'>
        <div className='flex w-fit'>
          {naviList ? (
            <Link
              href={`/task-card-carousel${
                naviList.length ? `/${naviList[naviList.length - 1]}` : ''
              }`}
            >
              <LeftArrowTriangleButton
                className={`w-${arrowShortSideLength} ${arrowStyle}`}
              />
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className='flex w-full flex-col'>
          <div className='flex w-full justify-center items-center'>
            {naviList ? (
              <TopArrowTriangleButton
                className={`h-${arrowShortSideLength} ${arrowStyle}`}
              />
            ) : (
              <></>
            )}
          </div>
          <div className='w-full flex flex-col justify-center p-4'>
            {children}
          </div>
          <div className='flex w-full justify-center items-center'>
            {naviList ? (
              <DownArrowTriangleButton
                className={`h-${arrowShortSideLength} ${arrowStyle}`}
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className='flex w-fit'>
          {naviList ? (
            <Link
              href={`/task-card-carousel${
                naviList.length > 0 ? `/${naviList[0]}` : ''
              }`}
            >
              <RightArrowTriangleButton
                className={`w-${arrowShortSideLength} ${arrowStyle}`}
              />
            </Link>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
