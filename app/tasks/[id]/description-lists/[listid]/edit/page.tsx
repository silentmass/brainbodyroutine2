import {
  fetchNullUserListDescriptions,
  fetchNullUserTaskDescriptionListById,
  fetchUserListDescriptions,
  fetchUserTaskDescriptionListById
} from '@/app/lib/data'
import { ListDescription, TaskDescriptionList } from '@/app/lib/definitions'
import CreateListDescriptionForm from '@/app/ui/tasks/description-lists/descriptions/create-form'
import ListDescriptionsTable from '@/app/ui/tasks/description-lists/descriptions/table'
import UpdateDescriptionListForm from '@/app/ui/tasks/description-lists/edit-form'
import { Metadata } from 'next'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Edit list descriptions'
}

function PageComponent ({
  taskId,
  descriptionList,
  descriptions
}: {
  taskId: number | null
  descriptionList: TaskDescriptionList
  descriptions: ListDescription[]
}) {
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

export default async function Page ({
  params
}: {
  params: { id: string; listid: string }
}) {
  const taskId = params.id !== '' ? parseInt(params.id) : null
  const listId = params.listid !== '' ? parseInt(params.listid) : null

  try {
    const nullUserDescriptionList =
      listId !== null
        ? await fetchNullUserTaskDescriptionListById(`${listId}`)
        : null
    const nullUserDescriptions =
      listId !== null ? await fetchNullUserListDescriptions(`${listId}`) : null

    return (
      <PageComponent
        taskId={taskId}
        descriptionList={nullUserDescriptionList}
        descriptions={nullUserDescriptions}
      />
    )
  } catch (error) {
    const userDescriptionList =
      listId !== null
        ? await fetchUserTaskDescriptionListById(`${listId}`)
        : null
    const userDescriptions =
      listId !== null ? await fetchUserListDescriptions(`${listId}`) : null

    return (
      <PageComponent
        taskId={taskId}
        descriptionList={userDescriptionList}
        descriptions={userDescriptions}
      />
    )
  }
}
