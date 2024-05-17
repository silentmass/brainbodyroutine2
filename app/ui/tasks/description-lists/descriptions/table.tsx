import { ListDescription } from '@/app/lib/definitions'
import DescriptionCard from './card'

export default function ListDescriptionsTable ({
  descriptions
}: {
  descriptions: ListDescription[] | null
}) {
  if (!descriptions || !descriptions.length) return <p>No descriptions</p>

  return (
    <ul className='flex flex-col w-full gap-y-4'>
      {descriptions.map(description => (
        <li key={`${description.id}`}>
          <DescriptionCard description={description} />
        </li>
      ))}
    </ul>
  )
}
