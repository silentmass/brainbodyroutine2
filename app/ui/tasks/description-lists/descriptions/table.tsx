import { ListDescription, ListDescriptionBase } from '@/app/lib/definitions'
import DescriptionCard from './card'

export default function ListDescriptionsTable ({
  descriptions,
  formActionDeleteDescriptionFun
}: {
  descriptions: ListDescription[] | null | ListDescriptionBase[]
  formActionDeleteDescriptionFun: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<any>
}) {
  if (!descriptions || !descriptions.length) return <p>No descriptions</p>

  return (
    <ul className='flex flex-col w-full gap-y-4'>
      {descriptions.map((description, idx) => (
        <li
          // key={`${idx}`}
          key={`${
            'id' in description && description.id !== undefined
              ? description?.id
              : `${description.description}${idx}`
          }`}
        >
          <DescriptionCard
            description={description}
            formActionDeleteDescriptionFun={formActionDeleteDescriptionFun}
          />
        </li>
      ))}
    </ul>
  )
}
