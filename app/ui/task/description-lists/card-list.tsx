import { TaskDescriptionList } from '@/app/lib/definitions'
import DescriptionListCard from './card'
import { DescriptionListCardView } from './card'

export const DescriptionLists = ({
  lists
}: {
  lists: TaskDescriptionList[]
}) => {
  return (
    <>
      {lists.map(list => (
        <DescriptionListCard key={list.id} taskDescriptionList={list} />
      ))}
    </>
  )
}

export const DescriptionListsView = ({
  lists
}: {
  lists: TaskDescriptionList[] | null
}) => {
  return lists ? (
    lists.map(list => {
      if (list !== null && list.descriptions) {
        return <DescriptionListCardView key={list.id} list={list} />
      }
    })
  ) : (
    <></>
  )
}

export default DescriptionLists
