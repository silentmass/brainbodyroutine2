'use client'
import {
  Dispatch,
  FormEvent,
  MutableRefObject,
  SetStateAction,
  useState
} from 'react'
import { Task, TaskCategory } from '@/app/lib/definitions'
import { DescriptionListsView } from '../../ui/tasks/description-lists/card-list'
import { TaskCarousel } from './task-carousel'

export default function TaskCarouselWrapper ({
  tasks,
  selectedTask,
  setSelectedTask,
  selectedCategory,
  handleViewModeClick,
  showTaskLink = true,
  horizontal = false,
  invert = true
}: {
  tasks: Task[]
  selectedTask: Task | null
  setSelectedTask: Dispatch<SetStateAction<Task | null>>
  selectedCategory: TaskCategory | null
  handleViewModeClick: (event: FormEvent<HTMLButtonElement>) => void
  showTaskLink: boolean
  horizontal: boolean
  invert: boolean
}) {
  return (
    <div className='flex flex-col h-full w-full'>
      <div className=''>
        {/* Task card carousel */}
        {tasks && selectedTask !== null && (
          <TaskCarousel
            tasks={tasks}
            selectedTask={selectedTask}
            handleTaskChange={setSelectedTask}
            selectedCategory={selectedCategory}
            showTaskLink={showTaskLink}
            handleViewModeClick={handleViewModeClick}
            horizontal={horizontal}
            invert={invert}
          />
        )}
      </div>
      <div className='flex w-full'>
        <DescriptionListsView
          lists={selectedTask !== null ? selectedTask?.description_lists : []}
          className='flex flex-col w-full gap-6'
        />
      </div>
    </div>
  )
}
