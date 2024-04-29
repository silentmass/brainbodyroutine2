import {
  fetchListDescriptions,
  fetchTaskDescriptionListById
} from '@/app/lib/data'
import CreateListDescriptionForm from '@/app/ui/tasks/description-lists/descriptions/create-form'
import ListDescriptionsTable from '@/app/ui/tasks/description-lists/descriptions/table'
import UpdateDescriptionListForm from '@/app/ui/tasks/description-lists/edit-form'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Edit list descriptions'
}

export default async function Page ({
  params
}: {
  params: { id: string; listid: string }
}) {
  const taskId = params.id !== '' ? params.id : null
  const listId = params.listid !== '' ? params.listid : null

  const descriptionList =
    listId !== null ? await fetchTaskDescriptionListById(listId) : null
  const descriptions =
    listId !== null ? await fetchListDescriptions(listId) : null

  return (
    <div className='flex flex-col gap-y-3 w-full'>
      <Suspense fallback={<p>Loading list...</p>}>
        {descriptionList ? (
          <UpdateDescriptionListForm list={descriptionList} />
        ) : (
          <>No list</>
        )}
      </Suspense>

      <div className={``}>
        <Suspense fallback={<p>Loading list...</p>}>
          {descriptionList && taskId !== null ? (
            <CreateListDescriptionForm
              descriptionList={descriptionList}
              redirectTo={`/tasks/${taskId}/edit`}
            />
          ) : (
            <>No list</>
          )}
        </Suspense>
      </div>
      <div className={``}>
        <Suspense fallback={<p>Loading descriptions...</p>}>
          {descriptions ? (
            <ListDescriptionsTable descriptions={descriptions} />
          ) : (
            <>No description</>
          )}
        </Suspense>
      </div>
    </div>
  )
}
