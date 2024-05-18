import { TaskCategory } from '@/app/lib/definitions'

export default function TaskCategoriesSelect ({
  categories,
  defaultCategoryId,
  className = ``
}: {
  categories: TaskCategory[]
  defaultCategoryId: number
  className: string
}) {
  return (
    <select
      name='taskCategoryId'
      id='taskCategoryId'
      defaultValue={defaultCategoryId}
      className={className}
    >
      {categories.map(category => (
        <option key={`${category.id}`} value={category.id}>
          {category.title}
        </option>
      ))}
    </select>
  )
}
