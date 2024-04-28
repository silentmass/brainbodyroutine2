import { fetchTaskCategories, fetchTaskCategoryById } from '@/app/lib/data'
import {
  DownArrowTriangleButton,
  LeftArrowTriangleButton,
  RightArrowTriangleButton,
  TopArrowTriangleButton
} from '@/app/_components/buttons'
import { TaskCategory } from '@/app/lib/definitions'
import Link from 'next/link'
import clsx from 'clsx'

export default async function Layout ({
  children,
  params
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const taskCategories: TaskCategory[] = await fetchTaskCategories()
  const categoryID = parseInt(params.id)
  const category = await fetchTaskCategoryById(`${categoryID}`)

  const arrowStyle = `icon fill-gray-100 stroke-none hover:fill-gray-200 active:fill-gray-500 `
  const arrowShortSideLength = 5

  const naviList = [...taskCategories.map(category => category.id)]
  const naviIdx = naviList
    .map((navi, idx) => {
      if (navi === categoryID) {
        return idx
      } else {
        return null
      }
    })
    .filter(navi => navi !== null)[0]

  return (
    <div className='flex flex-col w-full'>
      <ul className='flex w-full justify-between p-4'>
        <li key='all' className='opacity-30'>
          ALL
        </li>
        {taskCategories.map(category => (
          <li
            key={category.id}
            className={`${clsx({
              '': category.id === categoryID,
              'opacity-30': category.id !== categoryID
            })}`}
          >
            {category.title}
          </li>
        ))}
      </ul>
      <div className='flex w-full items-center p-4'>
        <div className='flex w-fit'>
          <Link
            href={`/task-card-carousel${
              naviIdx === 0
                ? ''
                : naviIdx === null
                ? `/${naviList[naviList.length - 1]}`
                : `/${naviList[naviIdx - 1]}`
            }`}
          >
            <LeftArrowTriangleButton
              className={`w-${arrowShortSideLength} ${arrowStyle}`}
            />
          </Link>
        </div>
        <div className='flex w-full flex-col'>
          <div className='flex w-full justify-center items-center'>
            <TopArrowTriangleButton
              className={`h-${arrowShortSideLength} ${arrowStyle}`}
            />
          </div>
          <div className='w-full flex flex-col justify-center p-4'>
            {children}
          </div>
          <div className='flex w-full justify-center items-center'>
            <DownArrowTriangleButton
              className={`h-${arrowShortSideLength} ${arrowStyle}`}
            />
          </div>
        </div>

        <div className='flex w-fit'>
          <Link
            href={`/task-card-carousel${
              naviIdx === naviList.length - 1
                ? ``
                : naviIdx === null
                ? `/${naviList[0]}`
                : `/${naviList[naviIdx + 1]}`
            }`}
          >
            <RightArrowTriangleButton
              className={`w-${arrowShortSideLength} ${arrowStyle}`}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
