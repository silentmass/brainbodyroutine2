'use client'

import { useOptimistic, useRef } from 'react'
import { Task } from '@/app/lib/definitions'
import CreateTaskDescriptionListForm from './create-form'
import {
  formActionCreateDescriptionListWrapper,
  formActionDeleteDescriptionListWrapper,
  optimisticFnLists
} from './optimistic-utils'
import DescriptionListsTable from './table'

export default function CreateDescriptionListView ({ task }: { task: Task }) {
  const createFormRef = useRef<HTMLFormElement>(null)

  const [optimisticLists, crudOptimisticList] = useOptimistic(
    task.description_lists,
    optimisticFnLists
  )

  if (!task === null) {
    return <>No task</>
  }

  return (
    <div className='flex flex-col gap-y-3 w-full'>
      <CreateTaskDescriptionListForm
        task={task}
        formActionFun={formActionCreateDescriptionListWrapper.bind(
          null,
          crudOptimisticList,
          createFormRef
        )}
        createFormRef={createFormRef}
      />
      {optimisticLists ? (
        <DescriptionListsTable
          lists={optimisticLists}
          formActionDeleteDescriptionListFun={formActionDeleteDescriptionListWrapper.bind(
            null,
            crudOptimisticList
          )}
        />
      ) : (
        <>No description</>
      )}
    </div>
  )
}
