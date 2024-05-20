import {
  TaskDescriptionList,
  TaskDescriptionListBase
} from '@/app/lib/definitions'
import DescriptionListCard from './card'

export default function DescriptionListsTable ({
  lists,
  formActionDeleteDescriptionListFun
}: {
  lists: TaskDescriptionList[] | TaskDescriptionListBase[] | null
  formActionDeleteDescriptionListFun: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<any>
}) {
  if (!lists || !lists.length) {
    return null
  }

  return (
    <ul className={`flex flex-col w-full gap-y-2`}>
      {lists.map((list, idx) => (
        <li
          key={
            'id' in list && list.id !== undefined
              ? `${list.id}`
              : `${list.title}${idx}`
          }
        >
          <DescriptionListCard
            list={list}
            formActionDeleteDescriptionListFun={
              formActionDeleteDescriptionListFun
            }
          />
        </li>
      ))}
    </ul>
  )
}
