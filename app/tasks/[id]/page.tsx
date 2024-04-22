import { updateTask } from '@/app/lib/actions'
import { fetchTaskById, fetchTaskCategories, fetchTasks } from '@/app/lib/data'
import { Task, TaskCategory } from '@/app/lib/definitions'
import { SetTaskActive } from '@/app/ui/tasks/buttons'
import { TaskCardView } from '@/app/ui/tasks/card'
import clsx from 'clsx'
import { redirect } from 'next/dist/server/api-utils'
import Image from 'next/image'
import Link from 'next/link'
import { useFormState } from 'react-dom'
import { DescriptionListsView } from '@/app/ui/tasks/description-lists/card-list'

export default async function Page ({ params }: { params: { id: string } }) {
  const taskId = params.id

  const tasks: Task[] = await fetchTasks()
  const task = tasks.filter(element => element.id === parseInt(taskId))[0]

  return (
    <div className='flex flex-col w-full justify-center pb-2 gap-y-2'>
      <TaskCardView task={task} />
      <DescriptionListsView lists={task?.description_lists} />
    </div>
  )
}
