import { ListDescription } from '@/app/lib/definitions'
import { DeleteListDescription } from './buttons'
import EditListDescriptionForm from './edit-form'

export default function DescriptionCard ({
  description
}: {
  description: ListDescription
}) {
  return (
    <div className='relative flex justify-between w-full rounded-2xl'>
      <div className='flex w-full'>
        <EditListDescriptionForm description={description} />
      </div>
      <div className='absolute flex top-0 right-0'>
        <DeleteListDescription id={`${description.id}`} />
      </div>
    </div>
  )
}
