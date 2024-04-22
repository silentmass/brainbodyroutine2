'use client'
import Link from 'next/link'
import { Task } from '../lib/definitions'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

export const TasksSideNavi = ({
  tasks,
  activeID,
  className
}: {
  tasks: Task[] | null
  activeID: number | null
  className: string
}) => {
  const pathname = usePathname()

  return tasks && activeID !== null ? (
    <nav>
      <ul className={`${className} flex flex-col gap-5`}>
        {tasks?.map(task => (
          <Link
            key={task.id}
            href={`/tasks/${task.id}${
              pathname && /tasks\/\d{1,}\/edit$/.test(pathname) ? '/edit' : ''
            }`}
            className={`link ${clsx({
              active: activeID === task.id,
              '': activeID !== task.id
            })}`}
          >
            <li className='flex justify-center items-center'>{task.id}</li>
          </Link>
        ))}
      </ul>
    </nav>
  ) : (
    <></>
  )
}

export default TasksSideNavi
