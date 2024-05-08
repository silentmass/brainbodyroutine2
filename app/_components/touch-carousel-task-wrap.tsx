'use client'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import TouchCarouselTasks from '@/app/_components/touch-carousel-tasks'
import { Task } from '@/app/lib/definitions'
import { DescriptionListsView } from '../ui/tasks/description-lists/card-list'

export default function TouchCarouselTasksWrapper ({
  tasks = null,
  selectedTask = null,
  horizontal = false,
  invert = true
}: {
  tasks: Task[] | null
  selectedTask: Task | null
  horizontal: boolean
  invert: boolean
}) {
  const divRef = useRef<HTMLDivElement>(null)

  const [taskState, setTaskState] = useState(selectedTask)

  const touchAreaHeight = 200
  const gradientHeight = `${Math.round(touchAreaHeight / 5)}`
  const gradientContainerStyle = `absolute from-transparent dark:to-black to-white to-80% w-full z-10`

  return (
    <div className='flex flex-col h-full'>
      <div
        ref={divRef}
        className={`relative flex flex-col w-full rounded-2xl select-none overflow-auto h-full hide-scrollbar`}
      >
        {/* Top gradient fade */}
        <div
          className={`sticky top-[0px] bg-gradient-to-t ${gradientContainerStyle} z-1`}
          style={{
            height: `${gradientHeight}px`
          }}
        ></div>
        {/* Bottom gradient fade */}
        <div
          className={`sticky bg-gradient-to-b ${gradientContainerStyle} z-1`}
          style={{
            height: `${gradientHeight}px`,
            top: `${touchAreaHeight + parseFloat(gradientHeight)}px`
          }}
        ></div>
        <div
          className={`flex flex-col w-full rounded-2xl select-none`}
          style={{
            height: `${touchAreaHeight}px`
          }}
        >
          {/* Set dummy for height */}
        </div>
        {tasks && tasks.length && selectedTask !== null && (
          <TouchCarouselTasks
            divRef={divRef}
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
