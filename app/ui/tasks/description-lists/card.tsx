import {
  TaskDescriptionList,
  TaskDescriptionListBase
} from '@/app/lib/definitions'
import { DeleteTaskDescriptionList } from './buttons'
import ListDescriptionsTable from './descriptions/table'
import { DescriptionsCardListView } from '@/app/ui/tasks/description-lists/descriptions/card-list'
import Link from 'next/link'
import { PencilIcon } from '@heroicons/react/24/outline'
import { useOptimistic } from 'react'
import { FormButton } from '@/app/ui/form-components/buttons'
import {
  optimisticFnDescriptions,
  formActionDeleteDescriptionWrapper
} from './descriptions/optimistic-utils'

export const DescriptionListCard = ({
  list,
  formActionDeleteDescriptionListFun
}: {
  list: TaskDescriptionList | TaskDescriptionListBase
  formActionDeleteDescriptionListFun: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<any>
}) => {
  const [optimisticDescriptions, crudOptimisticDescription] = useOptimistic(
    'descriptions' in list && list.descriptions ? list.descriptions : null,
    optimisticFnDescriptions
  )

  return (
    <div className='card flex rounded-2xl flex-col gap-y-6 p-2'>
      <div className='flex gap-6 w-full'>
        {/* List title */}
        <label className='flex gap-5 w-full'>
          <h2 className=''>Title</h2>
          {list.title}
        </label>
        {/* Controls */}
        <div className='flex gap-6 items-center'>
          {/* Edit list */}
          {'id' in list ? (
            <Link
              href={`/tasks/${list.task_id}/description-lists/${list.id}/edit`}
            >
              <FormButton
                className={`flex items-center justify-center`}
                type={undefined}
                ariaLabel={'Edit list'}
              >
                <PencilIcon className='icon w-5' />
              </FormButton>
            </Link>
          ) : (
            <FormButton
              className={`flex items-center justify-center pending`}
              type={undefined}
              ariaLabel={'Edit list'}
            >
              <PencilIcon className='icon w-5 pending-icon' />
            </FormButton>
          )}

          {/* Delete list */}
          <DeleteTaskDescriptionList
            list={list}
            formActionFun={formActionDeleteDescriptionListFun}
          />
        </div>
      </div>
      {/* Descriptions */}
      <ListDescriptionsTable
        descriptions={optimisticDescriptions}
        formActionDeleteDescriptionFun={formActionDeleteDescriptionWrapper.bind(
          null,
          crudOptimisticDescription
        )}
      />
    </div>
  )
}

export const DescriptionListCardView = ({
  list
}: {
  list: TaskDescriptionList
}) => {
  return (
    <div className='flex w-full card p-6 rounded-2xl'>
      <div className='flex flex-col w-full'>
        <div className='flex w-full gap-2'>
          <h2 className=''>{list.title}</h2>
        </div>
        <DescriptionsCardListView descriptions={list.descriptions} />
      </div>
    </div>
  )
}

export default DescriptionListCard
