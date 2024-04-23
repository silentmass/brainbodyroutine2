import { useEffect } from 'react'
import { TaskCategory } from '../../lib/definitions'
import { DeleteTaskCategory, UpdateTaskCategory } from './buttons'
import clsx from 'clsx'
import CategoryCard from './card'

export default function TaskCategoriesTable ({
  categories,
  className
}: {
  categories: TaskCategory[] | null
  className: string
}) {
  return categories ? (
    <ul className={`${className}`}>
      {categories.map(category => (
        <li key={category.id}>
          <CategoryCard category={category} />
        </li>
      ))}
    </ul>
  ) : (
    <p>No task categories</p>
  )
}
