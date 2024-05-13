import clsx from 'clsx'
import { TaskCategory } from '../lib/definitions'
import Link from 'next/link'

export const TaskCategoriesTopNavi = ({
  categories,
  activeID = null,
  className = ''
}: {
  categories: TaskCategory[] | null
  activeID: number | null
  className: string
}) => {
  return categories ? (
    <nav>
      <ul className={`${className}`}>
        <li key='all'>
          <Link
            href={'/tasks/filter'}
            className={`link ${clsx({
              active: activeID === null,
              '': activeID !== null
            })}`}
          >
            ALL
          </Link>
        </li>
        {categories.map((category: TaskCategory) => (
          <li key={category.id} className={`flex item-center justify-center`}>
            <Link
              href={`/tasks/filter/${category.id}`}
              className={`link ${clsx({
                active: activeID === category.id,
                '': activeID !== category.id
              })}`}
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  ) : (
    <></>
  )
}

export default TaskCategoriesTopNavi
