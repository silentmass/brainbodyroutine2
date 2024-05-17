import { TaskDescriptionList } from '@/app/lib/definitions'
import DescriptionListCard from './card'

export default function DescriptionListsTable ({
  lists
}: {
  lists: TaskDescriptionList[]
}) {
  if (!lists || !lists.length) {
    return null
  }

  return (
    <ul className={`flex flex-col w-full gap-y-2`}>
      {lists.map(list => (
        <li key={list.id}>
          <DescriptionListCard list={list} />
        </li>
      ))}
    </ul>
  )
}
