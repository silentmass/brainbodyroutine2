'use client'
import { Task, TaskCategory } from '@/app/lib/definitions'
import { FormEvent, Suspense, useEffect, useRef, useState } from 'react'
import CreateTaskForm from './create-form'
import TasksTable from './table'
import TaskCarouselWrapper from '@/app/_components/task-carousel/task-carousel-wrapper'
import TaskViewBottomNavi from './task-view-bottom-navi'
import TaskViewTopNavi from './task-view-top-navi'

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
  const selectedTaskRef = useRef(selectedTask)
  const selectedCategoryRef = useRef(selectedCategory)

  useEffect(() => {
    selectedTaskRef.current = selectedTask
  }, [selectedTask])

  useEffect(() => {
    selectedCategoryRef.current = selectedCategory
  }, [selectedCategory])

  function handleViewModeClick (event: FormEvent<HTMLButtonElement>) {
    console.log('handleViewTaskClick', event.currentTarget.value)
    if (event.currentTarget.value !== 'null') {
      const taskID = parseInt(event.currentTarget.value)
      const task = tasks.filter(task => task.id === taskID)[0]
      setSelectedTask(task)
      setViewMode('single')
    } else {
      setViewMode(null)
    }
  }

  function handleCategoryClick (event: FormEvent<HTMLButtonElement>) {
    const categoryID = event.currentTarget.value
    console.group('handleCategoryClick', categoryID)

    const newCategory =
      categoryID !== 'null'
        ? categories.filter(category => category.id === parseInt(categoryID))[0]
        : null
    setSelectedCategory(newCategory)

    console.log('handleCategoryClick', newCategory)

    // Change selected task
    if (
      categoryID !== 'null' &&
      selectedTaskRef.current !== null &&
      selectedTaskRef.current?.task_category_id === parseInt(categoryID)
    ) {
      console.log(
        'Selected task category matches',
        categories.filter(category => category.id === parseInt(categoryID))[0],
        selectedTaskRef.current.title,
        selectedTaskRef.current.task_category_id,
        selectedCategoryRef.current,
        categoryTasks.length,
        tasks.filter(task => task.task_category_id === parseInt(categoryID))
          .length
      )
    } else if (
      categoryID !== 'null' &&
      ((selectedTaskRef.current !== null &&
        selectedTaskRef.current?.task_category_id !== parseInt(categoryID)) ||
        selectedTaskRef.current === null)
    ) {
      console.log(
        'Selected task category differs',
        'selectedTask',
        selectedTaskRef.current !== null
          ? selectedTaskRef.current.title
          : selectedTaskRef.current,
        categories.filter(category => category.id === parseInt(categoryID))[0]
      )

      if (
        tasks.filter(task => task.task_category_id === parseInt(categoryID))
          .length
      ) {
        const newTask = tasks.filter(
          task => task.task_category_id === parseInt(categoryID)
        )[0]
        setSelectedTask(newTask)
        console.log(
          selectedTaskRef.current
            ? selectedTaskRef.current.title
            : selectedTaskRef.current,
          '->',
          newTask.title
        )
      } else {
        setSelectedTask(null)
        console.log('No category tasks. Setting selected task to null.')
      }
    } else if (
      categoryID === 'null' &&
      selectedTaskRef.current !== null &&
      tasks.length
    ) {
      console.log(
        'All tasks. No change in selected task',
        selectedTaskRef.current?.title,
        selectedCategoryRef.current
      )
    } else if (
      categoryID === 'null' &&
      selectedTaskRef.current === null &&
      tasks.length
    ) {
      const newTask = tasks[0]
      console.log(
        'All tasks. Initializing selected task to 1st element.',
        selectedTaskRef.current,
        '->',
        newTask
      )
      setSelectedTask(newTask)
    } else {
      console.log('Category with no tasks and selected task is null')
    }
    console.groupEnd()
  }

  const categoryTasks = tasks.filter(task =>
    selectedCategory !== null
      ? task.task_category_id === selectedCategory.id
      : true
  )

  return (
    <div className='flex flex-col w-full h-full'>
      {/* Task view top navi */}
      <div
        id='taskViewTopNavi'
        className='flex justify-center items-center overflow-x-auto'
      >
        <TaskViewTopNavi
          selectedCategory={selectedCategory}
          categories={categories}
          handleCategoryClick={handleCategoryClick}
        />
      </div>

      {/* Task list or carousel */}
      <div className='flex flex-col items-center w-full overflow-auto h-full gap-y-6 p-6'>
        {viewMode === 'single' ? (
          // Viewmode single
          categoryTasks && categoryTasks.length ? (
            <TaskCarouselWrapper
              tasks={categoryTasks}
              selectedTask={selectedTask}
              setSelectedTask={setSelectedTask}
              selectedCategory={selectedCategory}
              horizontal={false}
              invert={true}
            />
          ) : (
            <p>No tasks</p>
          )
        ) : (
          // Viewmode all
          <div className='flex flex-col w-full h-fit gap-y-6'>
            {/* Create task */}
            <Suspense fallback={<p>Loading categories...</p>}>
              {categories && categories.length && (
                <CreateTaskForm taskCategories={categories} />
              )}
            </Suspense>

            {/* Tasks table */}
            <Suspense fallback={<p>Loading tasks...</p>}>
              {categoryTasks && categoryTasks.length ? (
                <TasksTable
                  tasks={categoryTasks}
                  showTaskLink={true}
                  handleViewModeClick={handleViewModeClick}
                  className='flex flex-col gap-y-3 w-full'
                />
              ) : (
                <></>
              )}
            </Suspense>
          </div>
        )}
      </div>

      {/* Tasks bottom navi for list and single views */}
      <div id='taskViewBottomNavi' className='flex justify-center items-center'>
        <TaskViewBottomNavi
          viewMode={viewMode}
          handleViewModeClick={handleViewModeClick}
        />
      </div>
    </div>
  )
}
