import { TaskDescriptionList } from '@/app/lib/definitions'
import { DeleteTaskDescriptionList } from './buttons'
import ListDescriptionsTable from './descriptions/table'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { DescriptionsCardListView } from '@/app/ui/tasks/description-lists/descriptions/card-list'

export const DescriptionListCard = ({
  taskDescriptionList
}: {
  taskDescriptionList: TaskDescriptionList
}) => {
  return (
    <div className='card-create rounded-2xl flex flex-col gap-y-3 p-5'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex gap-5'>
          <label className='flex gap-5'>
            <h2 className='card-create'>Title</h2>
            {taskDescriptionList.title}
          </label>
          <Link
            href={`/tasks/${taskDescriptionList.task_id}/description-lists/${taskDescriptionList.id}/edit`}
          >
            <PencilIcon className='icon w-5' />
          </Link>
        </div>

        <DeleteTaskDescriptionList
          taskDescriptionListId={`${taskDescriptionList.id}`}
        />
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
    <div className='flex w-full pb-1 card'>
      <div className='flex w-[4px] pr-2 rounded-2xl'></div>
      <div className='flex flex-col w-full'>
        <div className='flex w-full p-2'>
          <h2 className='text-gray-700 font-semibold text-xl'>{list.title}</h2>
        </div>
        <DescriptionsCardListView descriptions={list.descriptions} />
      </div>
    </div>
  )
}

export default DescriptionListCard
