import { TaskCategory } from '@/app/lib/definitions'
import clsx from 'clsx'
import { FormEvent } from 'react'

export default function TaskViewTopNavi ({
  selectedCategory,
  categories,
  handleCategoryClick
}: {
  selectedCategory: TaskCategory | null
  categories: TaskCategory[] | null
  handleCategoryClick: (event: FormEvent<HTMLButtonElement>) => void
}) {
  return (
    <nav className='flex w-full h-full'>
      <ul className='flex gap-6 justify-center h-full w-full p-3 items-center bg-bkg'>
        <li
          key='all'
          className={`link flex item-center justify-center ${clsx({
            active: selectedCategory === null,
            '': selectedCategory !== null
          })}`}
        >
          <button onClick={handleCategoryClick} value={`null`}>
            ALL
          </button>
        </li>
        {categories ? (
          categories.map(category => (
            <li
              key={category.id}
              className={`link flex item-center justify-center ${clsx({
                active:
                  selectedCategory !== null &&
                  selectedCategory.id === category.id,
                '':
                  selectedCategory !== null &&
                  selectedCategory.id !== category.id
              })}`}
            >
              <button onClick={handleCategoryClick} value={category.id}>
                {category.title}
              </button>
            </li>
          ))
        ) : (
          <></>
        )}
      </ul>
    </nav>
  )
}
