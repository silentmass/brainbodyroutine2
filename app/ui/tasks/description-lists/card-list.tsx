import { TaskDescriptionList } from '@/app/lib/definitions'
import DescriptionListCard from './card'
import { DescriptionListCardView } from './card'

export const DescriptionLists = ({
  lists,
  className
}: {
  lists: TaskDescriptionList[]
  className: string
}) => {
  return (
    <ul className={`${className}`}>
      {lists.map(list => (
        <li key={list.id}>
          <DescriptionListCard taskDescriptionList={list} />
        </li>
      ))}
    </ul>
  )
}

export const DescriptionListsView = ({
  lists,
  className
}: {
  lists: TaskDescriptionList[] | null
  className: string
}) => {
  return lists ? (
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
  ) : (
    <></>
  )
}

export default DescriptionLists
