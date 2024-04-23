import { TaskDescriptionList } from '@/app/lib/definitions'
import DescriptionLists from './card-list'

export default function DescriptionListsTable ({
  taskDescriptionLists
}: {
  taskDescriptionLists: TaskDescriptionList[]
}) {
  const isList = taskDescriptionLists && taskDescriptionLists.length

  return isList ? (
    <DescriptionLists
      lists={taskDescriptionLists}
      className='flex flex-col w-full gap-y-1'
    />
  ) : (
    <></>
  )
}
