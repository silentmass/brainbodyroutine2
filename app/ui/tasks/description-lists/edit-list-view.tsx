'use client'

import { useOptimistic, useRef } from 'react'
import CreateListDescriptionForm from './descriptions/create-form'
import ListDescriptionsTable from './descriptions/table'
import UpdateDescriptionListForm from './edit-form'
import { TaskDescriptionList } from '@/app/lib/definitions'
import {
  optimisticFnDescriptions,
  formActionCreateDescriptionWrapper,
  formActionDeleteDescriptionWrapper
} from './descriptions/optimistic-utils'

export default function EditDescriptionListView ({
  descriptionList
}: {
  descriptionList: TaskDescriptionList
}) {
  const createFormRef = useRef<HTMLFormElement>(null)

  const [optimisticDescriptions, crudOptimisticDescription] = useOptimistic(
    descriptionList.descriptions,
    optimisticFnDescriptions
  )

  if (!descriptionList || descriptionList.task_id === null) {
    return <>No list</>
  }

  return (
    <div className='flex flex-col gap-y-3 w-full'>
      <UpdateDescriptionListForm list={descriptionList} />
      <CreateListDescriptionForm
        descriptionList={descriptionList}
        redirectTo={`/tasks/${descriptionList.task_id}/edit`}
        formActionFun={formActionCreateDescriptionWrapper.bind(
          null,
          crudOptimisticDescription,
          createFormRef
        )}
        formRef={createFormRef}
      />
      {optimisticDescriptions ? (
        <ListDescriptionsTable
          descriptions={optimisticDescriptions}
          formActionDeleteDescriptionFun={formActionDeleteDescriptionWrapper.bind(
            null,
            crudOptimisticDescription
          )}
        />
      ) : (
        <>No description</>
      )}
    </div>
  )
}
