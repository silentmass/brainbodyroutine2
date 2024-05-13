import { ListDescription } from '@/app/lib/definitions'
import DescriptionCard from './card'

export default function DescriptionsCardList ({
  descriptions
}: {
  descriptions: ListDescription[]
}) {
  return (
    <div className='flex flex-col w-full gap-y-1'>
      {descriptions.map(description => (
        <DescriptionCard key={`${description.id}`} description={description} />
      ))}
    </div>
  )
}

export const DescriptionsCardListView = ({
  descriptions
}: {
  descriptions: ListDescription[] | null
}) => {
  return (
    <ul className='flex flex-col w-full pl-2 pr-2 pb-2 list-disc list-inside'>
      {descriptions ? (
        descriptions.map(description => (
          <li key={description.id} className='w-full h-full items-center'>
            {description.description}
          </li>
        ))
      ) : (
        <></>
      )}
    </ul>
  )
}
