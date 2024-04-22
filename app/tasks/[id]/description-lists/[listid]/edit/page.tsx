import {
  fetchListDescriptions,
  fetchTaskById,
  fetchTaskDescriptionListById
} from '@/app/lib/data'
import CreateListDescriptionForm from '@/app/ui/tasks/description-lists/descriptions/create-form'
import ListDescriptionsTable from '@/app/ui/tasks/description-lists/descriptions/table'
import UpdateDescriptionListForm from '@/app/ui/tasks/description-lists/edit-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Edit list descriptions'
}

export default async function Page ({
  params
}: {
  params: { id: string; listid: string }
}) {
  const taskId = params.id
  const listId = params.listid
  const task = await fetchTaskById(taskId)
  const descriptionList = await fetchTaskDescriptionListById(listId)
  const descriptions = await fetchListDescriptions(listId)

  return (
    <div className='flex flex-col gap-y-1 bg-slate-950 w-full'>
      <div className={`formField p-5`}>{task.title}</div>
      <UpdateDescriptionListForm list={descriptionList} />
      <div className={`formField`}>
        <CreateListDescriptionForm
          descriptionList={descriptionList}
          redirectTo={`/tasks/${taskId}/edit`}
        />
      </div>
      <div className={`p-5`}>
        <ListDescriptionsTable descriptions={descriptions} />
      </div>
    </div>
  )
}
