import { ListDescription } from '@/app/lib/definitions'

export const DescriptionsCardListView = ({
  descriptions
}: {
  descriptions: ListDescription[] | null
}) => {
  if (!descriptions) {
    return null
  }

  return (
    <ul className='flex flex-col w-full pl-2 pr-2 pb-2 list-disc list-inside'>
      {descriptions.map(description => (
        <li key={description.id} className='w-full h-full items-center'>
          {description.description}
        </li>
      ))}
    </ul>
  )
}
