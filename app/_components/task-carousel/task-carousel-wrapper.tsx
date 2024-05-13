'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { Task } from '@/app/lib/definitions'
import { DescriptionListsView } from '../../ui/tasks/description-lists/card-list'
import { TaskCarousel } from './task-carousel'

export default function TaskCarouselWrapper ({
  tasks,
  selectedTask,
  setSelectedTask,
  horizontal = false,
  invert = true
}: {
  tasks: Task[]
  selectedTask: Task | null
  setSelectedTask: Dispatch<SetStateAction<Task | null>>
  horizontal: boolean
  invert: boolean
}) {
  return (
    <div className='flex flex-col h-full'>
      <div className=''>
        {/* Task card carousel */}
        {tasks && selectedTask !== null && (
          <TaskCarousel
            tasks={tasks}
            selectedTask={selectedTask}
            handleTaskChange={setSelectedTask}
            horizontal={horizontal}
            invert={invert}
          />
        )}
      </div>
      <div className='flex w-full h-full'>
        <DescriptionListsView
          lists={selectedTask !== null ? selectedTask?.description_lists : []}
          className='flex flex-col w-full gap-2'
        />
      </div>
    </div>
  )
}
