'use client'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import TouchCarouselTasks from '@/app/_components/old/touch-carousel-tasks'
import { Task } from '@/app/lib/definitions'
import { DescriptionListsView } from '../../ui/tasks/description-lists/card-list'

export default function TouchCarouselTasksWrapper ({
  tasks,
  selectedTask,
  horizontal = false,
  invert = true
}: {
  tasks: Task[]
  selectedTask: Task
  horizontal: boolean
  invert: boolean
}) {
  const [taskState, setTaskState] = useState(selectedTask)

  const isTaskSelectedAndTasks = tasks && selectedTask !== null

  return (
    <div className='flex flex-col h-full'>
      <div className=''>
        {/* Task card carousel */}
        {isTaskSelectedAndTasks && (
          <TouchCarouselTasks
            tasks={tasks}
            selectedTask={taskState}
            handleTaskChange={setTaskState}
            horizontal={horizontal}
            invert={invert}
          />
        )}
      </div>
      <div className='flex w-full h-full'>
        <DescriptionListsView
          lists={taskState !== null ? taskState?.description_lists : []}
          className='flex flex-col'
        />
      </div>
    </div>
  )
}
