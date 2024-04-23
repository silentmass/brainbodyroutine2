import { TaskCategory } from '@/app/lib/definitions'
import { DeleteTaskCategory, UpdateTaskCategory } from './buttons'

export const CategoryCard = ({ category }: { category: TaskCategory }) => {
  return (
    <div
      key={category.id}
      className='card-create flex rounded-2xl w-full gap-y-3 gap-x-4 p-5 items-center'
    >
      <div className='flex w-full gap-4'>
        <label className='card-create flex gap-5'>
          <h2 className='card-create'>{category.title}</h2>
        </label>
        <UpdateTaskCategory id={`${category.id}`} />
      </div>
      <div className='flex w-fit'></div>
      <DeleteTaskCategory id={`${category.id}`} />
    </div>
  )
}

export default CategoryCard
