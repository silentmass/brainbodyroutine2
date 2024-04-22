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

  return (
    <div className='flex flex-col w-full justify-center p-2 gap-y-2'>
      <TaskCardView task={task} />
      <DescriptionListsView lists={task?.description_lists} />
    </div>
  )
}
