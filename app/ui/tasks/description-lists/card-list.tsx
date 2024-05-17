import { TaskDescriptionList } from '@/app/lib/definitions'
import { DescriptionListCardView } from './card'

export const DescriptionListsView = ({
  lists,
  className
}: {
  lists: TaskDescriptionList[] | null
  className: string
}) => {
  const isList = lists && lists.length
  if (!lists) {
    return null
  }

  return (
    <ul className={`${className}`}>
      {lists.map(list => {
        if (list !== null && list.descriptions) {
          return (
            <li key={list.id}>
              <DescriptionListCardView list={list} />
            </li>
          )
        }
      })}
    </ul>
  )
}
