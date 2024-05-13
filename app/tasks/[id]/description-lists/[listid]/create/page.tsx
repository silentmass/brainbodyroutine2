import { fetchTaskById, fetchTaskDescriptionListById } from '@/app/lib/data'
import { Task, TaskDescriptionList } from '@/app/lib/definitions'
import CreateListDescriptionForm from '@/app/ui/tasks/description-lists/descriptions/create-form'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Create list descriptions'
}

export default async function Page ({
  params
}: {
  params: { id: string; listid: string }
}) {
  const taskId = params.id !== '' ? params.id : null
  const listId = params.listid !== '' ? params.listid : null

  const task: Task = taskId !== null ? await fetchTaskById(taskId) : null
  const descriptionList: TaskDescriptionList =
    listId !== null ? await fetchTaskDescriptionListById(listId) : null

  return (
    <div className='flex flex-col gap-y-1 w-full'>
      <div className={` p-5`}>{task ? task.title : <></>}</div>
      <div className={` p-5`}>
        {descriptionList ? descriptionList.title : <></>}
      </div>
      <div className={``}>
        <Suspense fallback={<p>Loading list...</p>}>
          {descriptionList ? (
            <CreateListDescriptionForm
              descriptionList={descriptionList}
              redirectTo={`/tasks/${taskId}/edit`}
            />
          ) : (
            <>No list</>
          )}
        </Suspense>
      </div>
    </div>
  )
}
