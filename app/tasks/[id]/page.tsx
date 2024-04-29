import { fetchTasks } from '@/app/lib/data'
import { Task } from '@/app/lib/definitions'
import { TaskCardView } from '@/app/ui/tasks/card'
import { DescriptionListsView } from '@/app/ui/tasks/description-lists/card-list'
import { Suspense } from 'react'

export default async function Page ({ params }: { params: { id: string } }) {
  const taskId = params.id

  const tasks: Task[] = await fetchTasks()
  const task = tasks.filter(element => element.id === parseInt(taskId))[0]

  return (
    <div className='flex flex-col w-full justify-center pb-2 gap-y-2'>
      <Suspense fallback={<p>Loading task...</p>}>
        {task ? (
          <>
            <TaskCardView task={task} />
            <DescriptionListsView
              lists={task?.description_lists}
              className='flex flex-col'
            />
          </>
        ) : (
          <>No task</>
        )}
      </Suspense>
    </div>
  )
}
