'use client'
import { useRef } from 'react'
import TouchCarouselTasks from '@/app/_components/touch-carousel-tasks'
import { Task } from '@/app/lib/definitions'

export default function TouchCarouselTasksWrapper ({
  tasks = null,
  initialTask = null,
  horizontal = false,
  invert = true
}: {
  tasks: Task[] | null
  initialTask: Task | null
  horizontal: boolean
  invert: boolean
}) {
  const divRef = useRef<HTMLDivElement>(null)

  const touchAreaHeight = 200
  const mainContainerSizeStyle = `min-h-[${touchAreaHeight}px] max-h-[${touchAreaHeight}px]`
  const gradientHeight = `${Math.round(touchAreaHeight / 5)}`
  const gradientContainerStyle = `absolute from-transparent to-white to-80% w-full z-10`

  return (
    <div
      ref={divRef}
      className={`relative flex flex-col w-full overflow-hidden rounded-2xl select-none`}
    >
      <div
        className={`top-0 bg-gradient-to-t ${gradientContainerStyle} z-1`}
        style={{
          height: `${gradientHeight}px`
        }}
      ></div>
      <div
        className={`top-0 bg-gradient-to-t ${gradientContainerStyle} z-1`}
        style={{
          height: `${gradientHeight}px`
        }}
      ></div>
      <div
        className={`bottom-0 bg-gradient-to-b ${gradientContainerStyle} z-1`}
        style={{
          height: `${gradientHeight}px`
        }}
      ></div>
      <div
        className={`flex w-full rounded-2xl select-none`}
        style={{
          height: `${touchAreaHeight}px`
        }}
      ></div>
      {tasks && tasks.length && initialTask !== null && (
        <TouchCarouselTasks
          divRef={divRef}
          tasks={tasks}
          initialTask={initialTask}
          horizontal={horizontal}
          invert={invert}
        />
      )}
    </div>
  )
}
