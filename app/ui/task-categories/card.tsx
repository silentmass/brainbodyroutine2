import { TaskCategory } from '@/app/lib/definitions'
import { DeleteTaskCategory } from './buttons'
import { UpdateButton } from '@/app/ui/form-components/buttons'

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
        <UpdateButton href={`/task-categories/${category.id}/edit`} />
      </div>
      <div className='flex w-fit'></div>
      <DeleteTaskCategory id={`${category.id}`} />
    </div>
  )
}

export default CategoryCard
