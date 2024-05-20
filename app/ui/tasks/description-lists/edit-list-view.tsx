'use client'

import { RefObject, Suspense, useOptimistic, useRef, useState } from 'react'
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

export const optimisticFn = (
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

export async function sendDescription (
  listId: string,
  prevState: any,
  formData: FormData
) {
  await createListDescription(listId, prevState, formData)
}

export async function sendDeleteDescription (
  id: string,
  prevState: any,
  formData: FormData
) {
  await deleteListDescription(id, prevState, formData)
}

export async function formActionCreateDescriptionWrapper (
  crudOptimisticFun: (
    action: number | ListDescriptionBase | ListDescription
  ) => void,
  formRef: RefObject<HTMLFormElement>,
  listId: string,
  prevState: any,
  formData: FormData
) {
  crudOptimisticFun({
    description: `${formData.get('description')}`,
    description_list_id: parseInt(listId)
  })
  formRef.current?.reset()
  await sendDescription(listId, prevState, formData)
}

export async function formActionDeleteDescriptionWrapper (
  crudOptimisticFun: (
    action: number | ListDescriptionBase | ListDescription
  ) => void,
  id: string,
  prevState: any,
  formData: FormData
) {
  crudOptimisticFun(parseInt(id))
  await sendDeleteDescription(id, prevState, formData)
}

export default function EditDescriptionListView ({
  descriptionList
}: {
  descriptionList: TaskDescriptionList
}) {
  const createFormRef = useRef<HTMLFormElement>(null)

  const [optimisticDescriptions, crudOptimisticDescription] = useOptimistic(
    descriptionList.descriptions,
    optimisticFn
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
