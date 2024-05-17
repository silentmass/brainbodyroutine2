import { TaskDescriptionList } from '@/app/lib/definitions'
import { DeleteTaskDescriptionList } from './buttons'
import ListDescriptionsTable from './descriptions/table'
import { DescriptionsCardListView } from '@/app/ui/tasks/description-lists/descriptions/card-list'
import { FormButton, UpdateButton } from '@/app/ui/form-components/buttons'
import Link from 'next/link'
import { PencilIcon } from '@heroicons/react/24/outline'

export const DescriptionListCard = ({
  taskDescriptionList
}: {
  taskDescriptionList: TaskDescriptionList
}) => {
  return (
    <div className='card flex rounded-2xl flex-col gap-y-6 p-2'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex gap-6 w-full'>
          <label className='flex gap-5 w-full'>
            <h2 className=''>Title</h2>
            {taskDescriptionList.title}
          </label>
          <div className='flex gap-6 items-center'>
            <Link
              href={`/tasks/${taskDescriptionList.task_id}/description-lists/${taskDescriptionList.id}/edit`}
            >
              <button
                className={`flex items-center justify-center`}
                type={undefined}
                aria-label={'Edit list'}
              >
                <PencilIcon className='icon w-5' />
              </button>
            </Link>
            <DeleteTaskDescriptionList
              taskDescriptionListId={`${taskDescriptionList.id}`}
            />
          </div>
        </div>
      </div>
      <ListDescriptionsTable descriptions={taskDescriptionList.descriptions} />
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
