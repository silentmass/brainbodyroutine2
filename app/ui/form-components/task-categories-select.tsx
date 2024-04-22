import { TaskCategory } from '@/app/lib/definitions'

export default function TaskCategoriesSelect ({
  categories,
  defaultCategoryId
}: {
  categories: TaskCategory[]
  defaultCategoryId: number
}) {
  return (
    <select
      name='taskCategoryId'
      id='taskCategoryId'
      defaultValue={defaultCategoryId}
      className={`bg-transparent border-b`}
    >
      {categories.map(category => (
        <option key={`${category.id}`} value={category.id}>
          {category.title}
        </option>
      ))}
    </select>
  )
}
