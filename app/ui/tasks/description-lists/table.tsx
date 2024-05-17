import { TaskDescriptionList } from '@/app/lib/definitions'
import DescriptionListCard from './card'

export default function DescriptionListsTable ({
  lists
}: {
  lists: TaskDescriptionList[]
}) {
  const isList = lists && lists.length

  if (!isList) {
    return null
  }

  return (
    <ul className={`flex flex-col w-full gap-y-1`}>
      {lists.map(list => (
        <li key={list.id}>
          <DescriptionListCard taskDescriptionList={list} />
        </li>
      ))}
    </ul>
  )
}
