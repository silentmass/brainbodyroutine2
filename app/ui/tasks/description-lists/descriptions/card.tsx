import { ListDescription } from '@/app/lib/definitions'
import { DeleteListDescription } from './buttons'
import EditListDescriptionForm from './edit-form'

export default function DescriptionCard ({
  description
}: {
  description: ListDescription
}) {
  return (
    <div className='relative flex justify-between w-full bg-gray-200 rounded-2xl'>
      <EditListDescriptionForm description={description} />
      <div className='absolute top-0 w-full flex justify-end p-5'>
        <DeleteListDescription id={`${description.id}`} />
      </div>
    </div>
  )
}
