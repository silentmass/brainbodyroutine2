'use client'

import { Suspense, useOptimistic, useRef, useState } from 'react'
import CreateListDescriptionForm from './descriptions/create-form'
import ListDescriptionsTable from './descriptions/table'
import UpdateDescriptionListForm from './edit-form'
import {
  ListDescription,
  ListDescriptionBase,
  TaskDescriptionList
} from '@/app/lib/definitions'
import {
  createListDescription,
  deleteListDescription
} from '@/app/lib/actions/descriptions'

export default function EditDescriptionListView ({
  descriptionList
}: {
  descriptionList: TaskDescriptionList
}) {
  const createFormRef = useRef<HTMLFormElement>(null)

  const optimisticFn = (
    state: ListDescriptionBase[] | null,
    crudDescription: ListDescriptionBase | ListDescription | number
  ) => {
    if (typeof crudDescription !== 'number' && !('id' in crudDescription)) {
      // Create
      if (state) {
        return [...state, { ...crudDescription }]
      } else if (!state) {
        return [{ ...crudDescription }]
      } else {
        return null
      }
    } else if (typeof crudDescription === 'number') {
      // Delete
      if (state && crudDescription) {
        return [
          ...state.filter(description =>
            'id' in description ? description.id !== crudDescription : true
          )
        ]
      } else if (state && !crudDescription) {
        return [...state]
      } else {
        return null
      }
    } else {
      if (state && !crudDescription) {
        return [...state]
      } else {
        return null
      }
    }
  }

  const [optimisticDescriptions, crudOptimisticDescription] = useOptimistic(
    descriptionList.descriptions,
    optimisticFn
  )

  async function sendDescription (
    listId: string,
    prevState: any,
    formData: FormData
  ) {
    await createListDescription(listId, prevState, formData)
  }

  async function formActionCreateDescription (
    listId: string,
    prevState: any,
    formData: FormData
  ) {
    crudOptimisticDescription({
      description: `${formData.get('description')}`,
      description_list_id: parseInt(listId)
    })
    createFormRef.current?.reset()
    await sendDescription(listId, prevState, formData)
  }

  async function sendDeleteDescription (
    id: string,
    prevState: any,
    formData: FormData
  ) {
    await deleteListDescription(id, prevState, formData)
  }

  async function formActionDeleteDescription (
    id: string,
    prevState: any,
    formData: FormData
  ) {
    crudOptimisticDescription(parseInt(id))
    await sendDeleteDescription(id, prevState, formData)
  }

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
          {descriptionList && descriptionList.task_id !== null ? (
            <CreateListDescriptionForm
              descriptionList={descriptionList}
              redirectTo={`/tasks/${descriptionList.task_id}/edit`}
              formActionFun={formActionCreateDescription}
              formRef={createFormRef}
            />
          ) : (
            <>No list</>
          )}
        </Suspense>
      </div>
      <div className={``}>
        <Suspense fallback={<p>Loading descriptions...</p>}>
          {optimisticDescriptions ? (
            <ListDescriptionsTable
              descriptions={optimisticDescriptions}
              formActionDeleteDescriptionFun={formActionDeleteDescription}
            />
          ) : (
            <>No description</>
          )}
        </Suspense>
      </div>
    </div>
  )
}
