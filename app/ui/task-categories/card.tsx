import { TaskCategory } from '@/app/lib/definitions'
import { DeleteTaskCategory } from './buttons'
import { UpdateButton } from '@/app/ui/form-components/buttons'

export const CategoryCard = ({ category }: { category: TaskCategory }) => {
  return (
    <div
      key={category.id}
      className='card flex rounded-2xl w-full gap-y-3 gap-x-4 p-5 items-center'
    >
      <div className='flex w-full gap-4'>
        <label className=' flex'>
          <h2 className=''>{category.title}</h2>
        </label>
        <label className=' flex'>
          <h2 className=''>{category.description}</h2>
        </label>
      </div>
      <div className='flex w-fit'></div>
    </div>
  )
}

export default CategoryCard
