import { TaskDescriptionList } from '@/app/lib/definitions'
import { DeleteTaskDescriptionList } from './buttons'
import ListDescriptionsTable from './descriptions/table'
import { DescriptionsCardListView } from '@/app/ui/tasks/description-lists/descriptions/card-list'
import { UpdateButton } from '@/app/ui/form-components/buttons'

export const DescriptionListCard = ({
  taskDescriptionList
}: {
  taskDescriptionList: TaskDescriptionList
}) => {
  return (
    <div className='card flex rounded-2xl  flex-col gap-y-3 p-5'>
      <div className='flex justify-between items-center w-full'>
        <div className='flex gap-6 w-full'>
          <label className='flex gap-5 w-full'>
            <h2 className=''>Title</h2>
            {taskDescriptionList.title}
          </label>
          <div className='flex gap-6 items-center'>
            <UpdateButton
              href={`/tasks/${taskDescriptionList.task_id}/description-lists/${taskDescriptionList.id}/edit`}
            />
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
