'use client'
import { FormEvent, RefObject, useEffect, useRef, useState } from 'react'
import { Task, TaskCategory } from '@/app/lib/definitions'
import TaskCard from '@/app/ui/tasks/card'
import clsx from 'clsx'

export interface coords {
  x: number | null
  y: number | null
}

function yCenterTask (ref: RefObject<HTMLDivElement>, taskID: number) {
  // Find touch area dimensions
  const touchAreaRect = ref.current?.getBoundingClientRect()
  const listRect = ref.current
    ?.querySelector('#taskList')
    ?.getBoundingClientRect()
  const cardRect = ref.current
    ?.querySelector(`#taskCard${taskID}`)
    ?.getBoundingClientRect()

  if (touchAreaRect && cardRect && listRect) {
    const touchAreaCenterY = touchAreaRect?.height / 2
    const cardYCenter = cardRect.y + cardRect.height / 2
    console.log('yCenterTask', listRect.y - (cardYCenter - touchAreaCenterY))
    return listRect.y - (cardYCenter - touchAreaCenterY)
  }
  return null
}

export const TouchCarouselTasks = ({
  divRef,
  tasks,
  initialTask,
  horizontal,
  invert
}: {
  divRef: RefObject<HTMLDivElement>
  tasks: Task[]
  initialTask: Task
  horizontal: boolean
  invert: boolean
}) => {
  const listRef = useRef<HTMLUListElement>(null)
  // Touch movement flag state
  const [isTouchMove, setIsTouchMove] = useState(false)

  // Changed during touch move
  const [selectedTaskState, setSelectedTaskState] = useState<Task | null>(
    initialTask
  )
  const selectedTaskStateRef = useRef(selectedTaskState)

  // State used to calculate touch position
  const [touchCoords, setTouchCoords] = useState<coords>({ x: null, y: null })

  // Task list dimension and position states
  const [listBoundingRectState, setListBoundingRectState] =
    useState<DOMRect | null>(null)

  const listBoundingRectStateRef = useRef(listBoundingRectState)

  const [listTopPositionState, setListTopPositionState] = useState<
    number | null
  >(null)

  // Use effect functions
  useEffect(() => {
    listBoundingRectStateRef.current = listBoundingRectState
  }, [listBoundingRectState])

  useEffect(() => {
    selectedTaskStateRef.current = selectedTaskState
  }, [selectedTaskState])

  useEffect(() => {
    // Init list position
    if (selectedTaskStateRef.current) {
      console.log('init', selectedTaskStateRef.current.title)
      setListTopPositionState(
        yCenterTask(divRef, selectedTaskStateRef.current.id)
      )
    }

    // Touch event handlers
    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault()
      setIsTouchMove(true)

      // Lets find cursor touch area normalized position
      const touchY = event.touches[0].clientY

      if (!tasks) {
        console.log('No category tasks')
        return
      }

      if (selectedTaskStateRef.current === null) {
        setSelectedTaskState(tasks[0])
      }

      if (selectedTaskStateRef.current) {
        console.log('handleTouchStart', selectedTaskStateRef.current.title)
        setListTopPositionState(
          yCenterTask(divRef, selectedTaskStateRef.current.id)
        )
      }
    }

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault()
      setIsTouchMove(false)
      if (selectedTaskStateRef.current) {
        console.log('handleTouchEnd', selectedTaskStateRef.current.title)
        setListTopPositionState(
          yCenterTask(divRef, selectedTaskStateRef.current.id)
        )
      }

      // TODO animate card return
      // use timer and lerp
      // from endCardListTopPosition to startCorrectedListTopPosition
      // use sigmoid translation
    }

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault()
      setIsTouchMove(true)
      setTouchCoords({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      })

      // Check if we have a list
      if (tasks === null || tasks.length === 0) {
        console.error('tasks', tasks?.length)
        return
      }

      // Get touch area dimension
      const touchAreaRect = divRef.current?.getBoundingClientRect()
      // Get list dimensions
      if (!listRef.current) {
        return
      }
      const listRect = listRef.current.getBoundingClientRect()

      if (!touchAreaRect || !listRect) {
        console.error('No touch area or list')
        return
      }

      // Transform touch area normalized movement into list movement
      const touchX = event.touches[0].clientX
      const touchY = event.touches[0].clientY
      // Normalized touch position clamped into range from 0 to 1
      const normalizedTouchPosition = horizontal
        ? !invert
          ? (touchX - touchAreaRect.left) / touchAreaRect.width
          : 1 - (touchX - touchAreaRect.left) / touchAreaRect.width
        : !invert
        ? 1 - (touchY - touchAreaRect.top) / touchAreaRect.height
        : (touchY - touchAreaRect.top) / touchAreaRect.height
      const clampedTouchPosition =
        normalizedTouchPosition >= 0 && normalizedTouchPosition <= 1
          ? normalizedTouchPosition
          : normalizedTouchPosition < 0
          ? 0
          : 1

      console.log('normalizedTouchPosition', clampedTouchPosition)

      if (!selectedTaskStateRef.current) {
        return console.error('No task selected')
      }

      const cardRect = listRef.current
        ?.querySelector(`#taskCard${selectedTaskStateRef.current.id}`)
        ?.getBoundingClientRect()
      if (!cardRect) {
        return console.error('No card rect')
      }

      const newListTopPosition =
        touchAreaRect?.height / 2 -
        clampedTouchPosition * listRect?.height +
        ((2 * clampedTouchPosition - 1) * cardRect.height) / 2

      console.log(newListTopPosition)

      setListTopPositionState(newListTopPosition)

      const touchAreaCenterY = touchAreaRect?.height / 2 + touchAreaRect.y

      // Get each closest card to touch area
      const taskClosestToCenter = tasks.filter(task => {
        const taskRect = listRef.current
          ?.querySelector(`#taskCard${task.id}`)
          ?.getBoundingClientRect()

        if (!taskRect) {
          return false
        }

        const taskYCenter = taskRect?.top + taskRect?.height / 2
        if (Math.abs(taskYCenter - touchAreaCenterY) < taskRect.height / 2) {
          return true
        } else {
          return false
        }
      })

      console.log(taskClosestToCenter[0], taskClosestToCenter.length)

      if (taskClosestToCenter && taskClosestToCenter[0]) {
        setSelectedTaskState(taskClosestToCenter[0])
        console.log(
          taskClosestToCenter[0].title,
          touchAreaCenterY,
          touchAreaRect.y
        )
      }
    }

    if (divRef.current) {
      divRef.current?.addEventListener('touchstart', handleTouchStart, {
        passive: false
      })
      divRef.current?.addEventListener('touchmove', handleTouchMove, {
        passive: false
      })
      divRef.current?.addEventListener('touchend', handleTouchEnd, {
        passive: false
      })
      // divRef?.current.addEventListener('tou')
    }

    return () => {
      if (divRef.current) {
        divRef.current?.removeEventListener('touchstart', handleTouchStart)
        divRef.current?.removeEventListener('touchmove', handleTouchMove)
        divRef.current?.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [])

  return (
    <ul
      ref={listRef}
      id='taskList'
      className={`absolute flex flex-col w-full h-fit gap-y-1 items-center select-none z-0 rounded-2xl p-1`}
      style={{
        top: `${listTopPositionState}px`
      }}
    >
      {tasks.map(task => (
        <li
          id={`taskCard${task.id}`}
          key={task.id}
          className={`flex w-full rounded-2xl ${clsx({
            'outline-2 outline-offset-0 outline-dashed outline-gray-200 opacity-100':
              task.id === selectedTaskState?.id && isTouchMove,
            'opacity-50': task.id !== selectedTaskState?.id && isTouchMove,
            'opacity-0': task.id !== selectedTaskState?.id && !isTouchMove
          })}`}
        >
          <TaskCard task={task} />
        </li>
      ))}
    </ul>
  )
}

export default TouchCarouselTasks
