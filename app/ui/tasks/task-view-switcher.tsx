'use client'
import { Task, TaskCategory } from '@/app/lib/definitions'
import { FormEvent, useEffect, useOptimistic, useRef, useState } from 'react'
import CreateTaskForm from './create-form'
import TaskViewBottomNavi from './task-view-bottom-navi'
import TaskViewTopNavi from './task-view-top-navi'
import {
  formActionCreateTaskWrapper,
  formActionDeleteTaskWrapper,
  formActionDuplicateTaskWrapper,
  formActionUpdateTaskWrapper,
  optimisticFnTasks
} from './optimistic-utils'
import TaskCard from './card'
import TaskCarousel from '@/app/_components/task-carousel/task-carousel'
import Card from '../Card'
import {
  CardRow,
  CardTitleRow
} from '@/app/_components/demos/circle-vibes/UpdateTaskCard'

export default function TaskViewSwitcher ({
  categories,
  tasks,
  isTokenValid = false
}: {
  categories: TaskCategory[]
  tasks: Task[]
  isTokenValid?: boolean
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

  const categoryTasks = tasks.filter(task =>
    selectedCategory !== null
      ? task.task_category_id === selectedCategory.id
      : true
  )

  const createFormRef = useRef<HTMLFormElement>(null)
  const [optimisticTasks, crudOptimisticTask] = useOptimistic(
    categoryTasks,
    optimisticFnTasks
  )

  function handleViewModeClick (event: FormEvent<HTMLButtonElement>) {
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
      }
    } else if (
      categoryID === 'null' &&
      selectedTaskRef.current !== null &&
      tasks.length
    ) {
    } else if (
      categoryID === 'null' &&
      selectedTaskRef.current === null &&
      tasks.length
    ) {
      const newTask = tasks[0]
      setSelectedTask(newTask)
    } else {
      console.log('Category with no tasks and selected task is null')
    }
    console.groupEnd()
  }

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
      <div className='flex flex-col items-center w-full overflow-auto h-full gap-y-6 pl-6 pr-6 pb-6'>
        {viewMode === 'single' ? (
          optimisticTasks !== null && (
            <div className='flex w-full justify-center pt-2'>
              <div className='flex flex-col w-full gap-6 h-full'>
                <div className='flex w-full'>
                  {tasks && selectedTask !== null && (
                    <TaskCarousel
                      tasks={optimisticTasks as Task[]}
                      selectedTask={selectedTask}
                      handleTaskChange={setSelectedTask}
                      selectedCategory={selectedCategory}
                      showOpenTaskLink={false}
                      showEditTaskButtons={false}
                      handleViewModeClick={handleViewModeClick}
                      horizontal={false}
                      invert={true}
                      formActionDeleteTaskFun={formActionDeleteTaskWrapper.bind(
                        null,
                        crudOptimisticTask
                      )}
                      formActionUpdateTaskFun={formActionUpdateTaskWrapper.bind(
                        null,
                        crudOptimisticTask
                      )}
                      formActionDuplicateTaskFun={formActionDuplicateTaskWrapper.bind(
                        null,
                        crudOptimisticTask
                      )}
                      isTokenValid={isTokenValid}
                    />
                  )}
                </div>
                <div className='flex w-full'>
                  <ul className={`flex flex-col w-full gap-2`}>
                    {selectedTask &&
                      selectedTask.description_lists &&
                      selectedTask.description_lists.map(
                        ({ id, title, descriptions }) => {
                          if (id) {
                            return (
                              <li key={`list_${id}`}>
                                <Card>
                                  <CardTitleRow>
                                    <h2 className=''>{title}</h2>
                                  </CardTitleRow>
                                  <CardRow>
                                    {descriptions && (
                                      <ul className='flex flex-col w-full pl-2 list-disc list-inside'>
                                        {descriptions.map(
                                          ({
                                            id: descriptionId,
                                            description
                                          }) => {
                                            return (
                                              <li
                                                key={`description_${descriptionId}`}
                                                className={`w-full h-full items-center`}
                                              >
                                                {description}
                                              </li>
                                            )
                                          }
                                        )}
                                      </ul>
                                    )}
                                  </CardRow>
                                </Card>
                              </li>
                            )
                          }
                        }
                      )}
                  </ul>
                </div>
              </div>
            </div>
          )
        ) : (
          // Viewmode all
          <div className='flex flex-col w-full h-fit gap-y-large pt-large'>
            {/* Create task */}
            {categories && categories.length && (
              <CreateTaskForm
                taskCategories={categories}
                formActionFun={formActionCreateTaskWrapper.bind(
                  null,
                  crudOptimisticTask,
                  createFormRef,
                  tasks && tasks.length && tasks[0].user_id !== null
                    ? tasks[0].user_id
                    : null
                )}
                createFormRef={createFormRef}
              />
            )}
            {/* Tasks table */}
            {optimisticTasks && optimisticTasks.length && (
              <ul className={`flex flex-col gap-y-3 w-full`}>
                {optimisticTasks.map((task, idx) => (
                  <li
                    key={
                      'id' in task && task.id !== undefined
                        ? `${task.id}`
                        : `${task.title}${idx}`
                    }
                  >
                    <TaskCard
                      task={task}
                      showOpenTaskLink={true}
                      handleViewModeClick={handleViewModeClick}
                      formActionDeleteTaskFun={formActionDeleteTaskWrapper.bind(
                        null,
                        crudOptimisticTask
                      )}
                      formActionUpdateTaskFun={formActionUpdateTaskWrapper
                        .bind(null, crudOptimisticTask)
                        .bind(
                          null,
                          `${task.user_id}`,
                          task.description_lists,
                          task.tags,
                          !('id' in task) || task.id === undefined
                            ? ''
                            : `${task.id}`
                        )}
                      formActionDuplicateTaskFun={formActionDuplicateTaskWrapper
                        .bind(null, crudOptimisticTask)
                        .bind(
                          null,
                          `${task.user_id}`,
                          task.description_lists,
                          task.tags
                        )}
                      isTokenValid={isTokenValid}
                    />
                  </li>
                ))}
              </ul>
            )}
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
