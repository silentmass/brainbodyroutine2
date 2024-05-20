import { ListDescription, ListDescriptionBase } from '@/app/lib/definitions'
import { DeleteListDescription } from './buttons'
import EditListDescriptionForm from './edit-form'

export default function DescriptionCard ({
  description,
  formActionDeleteDescriptionFun
}: {
  description: ListDescription | ListDescriptionBase
  formActionDeleteDescriptionFun: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<any>
}) {
  return (
    <div className='relative flex justify-between w-full rounded-2xl'>
      <div className='flex w-full'>
        <EditListDescriptionForm description={description} />
      </div>
      <div className='absolute flex top-0 right-0'>
        <DeleteListDescription
          description={description}
          formActionFun={formActionDeleteDescriptionFun}
        />
      </div>
    </div>
  )
}
