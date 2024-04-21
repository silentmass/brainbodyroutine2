import { updateTask } from '@/app/lib/actions'
import { fetchTaskById, fetchTaskCategories } from '@/app/lib/data'
import { Task, TaskCategory } from '@/app/lib/definitions'
import { SetTaskActive } from '@/app/ui/task/buttons'
import { TaskCardView } from '@/app/ui/task/card'
import clsx from 'clsx'
import { redirect } from 'next/dist/server/api-utils'
import Image from 'next/image'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { DescriptionListsView } from '@/app/ui/task/description-lists/card-list'

export default async function Page ({ params }: { params: { id: string } }) {
  const taskId = params.id

  const task: Task = await fetchTaskById(taskId)
  const taskCategories = await fetchTaskCategories()

  return (
    <div>
      {/* Category navigation */}
      <div className='flex w-full pl-2 pr-2 pb-2 justify-center sticky top-[54px] gap-x-2 bg-gray-200/70'>
        {taskCategories.map((category: TaskCategory) => (
          <Link
            key={category.id}
            href=''
            className={`link ${clsx({
              active: task.task_category_id === category.id,
              '': task.task_category_id !== category.id
            })}`}
          >
            <div className={`flex item-center justify-center`}>
              <p>{category.title}</p>
            </div>
          </Link>
        ))}
      </div>
      {/* Body */}
      <div className='flex flex-col w-full justify-center p-2 gap-y-2'>
        {/* Task */}
        <TaskCardView task={task} />
        {/* Description lists */}
        <DescriptionListsView lists={task?.description_lists} />
      </div>
    </div>
  )
}
