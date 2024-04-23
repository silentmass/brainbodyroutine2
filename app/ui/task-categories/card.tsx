import { TaskCategory } from '@/app/lib/definitions'
import { DeleteTaskCategory, UpdateTaskCategory } from './buttons'

export const CategoryCard = ({ category }: { category: TaskCategory }) => {
  return (
    <div
      key={category.id}
      className='card-create flex rounded-2xl w-full gap-y-3 p-5 items-center'
    >
      <div className='flex gap-5'>
        <label className='flex gap-5'>{category.title}</label>
        <UpdateTaskCategory id={`${category.id}`} />
      </div>
      <div className='flex w-full'></div>
      <DeleteTaskCategory id={`${category.id}`} />
    </div>
  )
}

export default CategoryCard
