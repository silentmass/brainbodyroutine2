import { Metadata } from 'next'
import CreateTaskCategoryForm from '@/app/ui/task-categories/create-form'

export const metadata: Metadata = {
  title: 'Create Task category'
}

export default function Page () {
  return (
    <div className='flex w-full pt-2'>
      <CreateTaskCategoryForm />
    </div>
  )
}
