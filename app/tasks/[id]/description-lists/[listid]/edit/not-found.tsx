import Link from 'next/link'
import { FaceFrownIcon } from '@heroicons/react/24/outline'
import { FormButton } from '@/app/ui/form-components/buttons'

export default function NotFound () {
  return (
    <div className='flex h-full flex-col items-center justify-center gap-2'>
      <FaceFrownIcon className='w-10 text-accent-5' />
      <h2 className='text-xl font-semibold'>404 Not Found</h2>
      <p>Could not find the requested task.</p>
      <Link href='/tasks/filter'>
        <FormButton className='' ariaLabel='Go Back' type={undefined}>
          Go Back
        </FormButton>
      </Link>
    </div>
  )
}
