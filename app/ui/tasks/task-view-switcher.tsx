'use client'
import { Task, TaskCategory } from '@/app/lib/definitions'
import { FormEvent, Suspense, useState } from 'react'
import CreateTaskForm from './create-form'
import TasksTable from './table'
import TaskCarouselWrapper from '@/app/_components/task-carousel/task-carousel-wrapper'
import clsx from 'clsx'
import { ChevronRightIcon, ListBulletIcon } from '@heroicons/react/24/outline'

export default function TaskViewSwitcher ({
  categories,
  tasks
}: {
  categories: TaskCategory[]
  tasks: Task[]
}) {
  const [viewMode, setViewMode] = useState<string | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<TaskCategory | null>(
    selectedTask
      ? categories.filter(
          category => category.id === selectedTask.task_category_id
        )[0]
      : null
  )

  function handleViewTaskClick (event: FormEvent<HTMLButtonElement>) {
    const taskID = parseInt(event.currentTarget.value)
    console.log('handleViewTaskClick', event.currentTarget.value)
    const task = tasks.filter(task => task.id === taskID)[0]
    setSelectedTask(task)
    setSelectedCategory(
      categories.filter(category => category.id === task.task_category_id)[0]
    )
    setViewMode('single')
  }

  function handleCategoryClick (event: FormEvent<HTMLButtonElement>) {
    const categoryID = event.currentTarget.value
    console.log('handleCategoryClick', categoryID)
    setSelectedCategory(
      categoryID !== 'null'
        ? categories.filter(category => category.id === parseInt(categoryID))[0]
        : null
    )
  }

  function handleViewModeClick (event: FormEvent<HTMLButtonElement>) {
    const viewModeValue = event.currentTarget.value
    console.log('viewModeValue', viewModeValue)
    setViewMode(viewModeValue !== `null` ? viewModeValue : null)
    console.log('selectedTask', selectedTask)
    if (selectedTask === null && categoryTasks && categoryTasks.length) {
      setSelectedTask(categoryTasks[0])
    }
  }

  const categoryTasks = tasks.filter(task =>
    selectedCategory ? task.task_category_id === selectedCategory.id : true
  )

  return (
    <>
      <div className='sticky top-[42px] z-30 p-6 gap-6 flex flex-col w-full justify-center items-center'>
        <div className='flex w-fit items-center justify-center h-full gap-6 rounded-2xl'>
          <div
            className={`flex items-center justify-center  border-accent-3 rounded-xl border pr-2 pl-2 ${clsx(
              { 'border-0': viewMode !== null, border: viewMode === null }
            )}`}
          >
            <button onClick={handleViewModeClick} value={`null`} className=''>
              <ListBulletIcon className='w-5 icon' />
            </button>
          </div>
          <div
            className={`flex items-center justify-center border-accent-3 rounded-xl border pr-2 pl-2 ${clsx(
              { 'border-0': viewMode === null, border: viewMode !== null }
            )}`}
          >
            <button onClick={handleViewModeClick} value={`single`}>
              <ChevronRightIcon className='w-5 icon' />
            </button>
          </div>
        </div>
        <div>
          <nav>
            <ul className='flex flex-wrap gap-6 justify-center'>
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
              {categories.map(category => (
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
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {viewMode === 'single' ? (
        categoryTasks &&
        categoryTasks.length && (
          <TaskCarouselWrapper
            tasks={categoryTasks}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            horizontal={false}
            invert={true}
          />
        )
      ) : (
        <div>
          <div className='flex flex-col w-full h-fit overflow-auto gap-y-2 pt-2 pb-2'>
            <Suspense fallback={<p>Loading categories...</p>}>
              {categories && categories.length && (
                <CreateTaskForm taskCategories={categories} />
              )}
            </Suspense>
            <Suspense fallback={<p>Loading tasks...</p>}>
              {categoryTasks && categoryTasks.length && (
                <TasksTable
                  tasks={categoryTasks}
                  showTaskLink={true}
                  onViewTaskClick={handleViewTaskClick}
                />
              )}
            </Suspense>
          </div>
        </div>
      )}
    </>
  )
}
