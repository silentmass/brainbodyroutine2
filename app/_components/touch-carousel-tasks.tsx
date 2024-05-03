'use client'
import { RefObject, useEffect, useRef, useState } from 'react'
import { Task } from '@/app/lib/definitions'
import TaskCard from '@/app/ui/tasks/card'
import clsx from 'clsx'

export interface coords {
  x: number | null
  y: number | null
}

async function animateListMovement (
  startPosition: number,
  endPosition: number,
  setPositionStateFun: (position: number) => void
) {
  return new Promise(resolve => {
    const dt = 1 / 120
    const velocityPxPerSec = 1300
    const distance = endPosition - startPosition
    const duration = Math.abs(distance) / velocityPxPerSec
    const step = dt * (distance / duration)
    let timer: NodeJS.Timeout
    let position = startPosition
    let startTime = performance.now() / 1000
    let currentTime = 0
    let relativePosition = 0
    let dampeningFactor = 1

    timer = setInterval(() => {
      currentTime = performance.now() / 1000
      const totalTime = currentTime - startTime
      const inside = relativePosition >= 0 && relativePosition <= 1
      if (inside) {
        // Include sigmoid factor here

        relativePosition = (position + step - startPosition) / distance
        dampeningFactor = (1 - relativePosition ** 4) ** 2
        position = position + step + dampeningFactor
        setPositionStateFun(position)
      } else {
        position = endPosition
        setPositionStateFun(position)
        clearInterval(timer)
        resolve(true)
      }
    }, Math.round(1000 * dt))
  })
}

function selectTaskCard (
  tasks: Task[],
  listRef: RefObject<HTMLUListElement>,
  touchAreaCenterY: number,
  setSelectedTaskStateFun: (task: Task) => void
) {
  // Get each closest card to touch area
  const taskClosestToTouchAreaCenter = tasks.filter(task => {
    const taskRect = listRef.current
      ?.querySelector(`#taskCard${task.id}`)
      ?.getBoundingClientRect()

    if (!taskRect) {
      return false
    }

    if (
      Math.abs(taskRect?.top + taskRect?.height / 2 - touchAreaCenterY) <
      taskRect.height / 2
    ) {
      return true
    } else {
      return false
    }
  })

  if (taskClosestToTouchAreaCenter && taskClosestToTouchAreaCenter[0]) {
    setSelectedTaskStateFun(taskClosestToTouchAreaCenter[0])
    return taskClosestToTouchAreaCenter[0]
  } else {
    return null
  }
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
    return listRect.y - (cardYCenter - touchAreaCenterY)
  }
  return null
}

export const TouchCarouselTasks = ({
  divRef = null,
  tasks = null,
  initialTask = null,
  horizontal = false,
  invert = true
}: {
  divRef: RefObject<HTMLDivElement> | null
  tasks: Task[] | null
  initialTask: Task | null
  horizontal: boolean
  invert: boolean
}) => {
  // Get touch area dimension

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
  const listTopPositionStateRef = useRef(listTopPositionState)

  useEffect(() => {
    listTopPositionStateRef.current = listTopPositionState
  }, [listTopPositionState])

  // Use effect functions
  useEffect(() => {
    listBoundingRectStateRef.current = listBoundingRectState
  }, [listBoundingRectState])

  useEffect(() => {
    selectedTaskStateRef.current = selectedTaskState
  }, [selectedTaskState])

  // Init component and touch handlers definitions

  useEffect(() => {
    let touchTimer: number
    let touchStartPosition: { x: number; y: number; time: number }
    let touchCurrentPosition: {
      x: number
      y: number
      time: number
      velocity: { x: number; y: number }
      acceleration: { x: number; y: number }
    }

    const parentDiv = divRef

    if (parentDiv === null) {
      console.error('Missin parent div ref')
      return
    }

    const touchAreaRect = parentDiv.current?.getBoundingClientRect()

    if (!touchAreaRect) {
      console.error('No touch area!')
      return
    }

    const touchAreaCenterY = touchAreaRect?.height / 2 + touchAreaRect?.y

    // Init list position to show selected task
    if (selectedTaskStateRef.current && parentDiv !== null) {
      const startPosition = 0
      const endPosition = yCenterTask(
        parentDiv,
        selectedTaskStateRef.current.id
      )

      if (
        endPosition !== null &&
        startPosition !== undefined &&
        startPosition !== null
      ) {
        animateListMovement(startPosition, endPosition, setListTopPositionState)
      }
    }

    // Touch event handlers
    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault()
      setIsTouchMove(true)

      if (!tasks) {
        console.log('No category tasks')
        return
      }

      touchTimer = performance.now()
      touchStartPosition = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
        time: performance.now()
      }
      touchCurrentPosition = {
        x: touchStartPosition.x,
        y: touchStartPosition.y,
        time: touchStartPosition.time,
        velocity: { x: 0, y: 0 },
        acceleration: { x: 0, y: 0 }
      }
    }

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault()

      console.log('handleTouchEnd', performance.now() - touchTimer)

      if (!selectedTaskStateRef.current) {
        console.error('No tasks selected')
        return
      }

      const averageEndVelocity =
        (touchCurrentPosition.y - touchStartPosition.y) /
        ((touchCurrentPosition.time - touchStartPosition.time) / 1000)

      const listRect = listRef.current?.getBoundingClientRect()
      if (listRect && tasks !== null) {
        const direction = averageEndVelocity < 0 ? -1 : 1
        const velocityFactor =
          1 - (1 - Math.abs(averageEndVelocity / 6000) ** 2) ** 2
        const endRollingShift =
          Math.abs(averageEndVelocity * velocityFactor) * direction
        // const endRollingShift =
        //   Math.abs(averageEndVelocity * (averageEndVelocity / 3000) ** 2 * 1) *
        //   direction

        console.log(
          'averageEndVelocity',
          averageEndVelocity,
          'endRollingShift',
          endRollingShift,
          'touchCurrentPosition.y',
          touchCurrentPosition.y,
          'listTopPositionStateRef.current',
          listTopPositionStateRef.current
        )

        const animateRolling = (position: number) => {
          // Change selected task

          setListTopPositionState(position)
          const currentTask = selectTaskCard(
            tasks,
            listRef,
            touchAreaCenterY,
            setSelectedTaskState
          )
        }

        if (listTopPositionStateRef.current !== null) {
          const rollingEnd = listTopPositionStateRef.current + endRollingShift

          const possibleEndPositions = tasks.map(task =>
            yCenterTask(parentDiv, task.id)
          )

          const nonNullEndPositions = possibleEndPositions.filter(
            position => position !== null
          )

          const distanceFromEndPositions = nonNullEndPositions.map(position => {
            if (position !== null) {
              return Math.abs(rollingEnd - position)
            } else {
              return 999999
            }
          })

          const filteredPosition = nonNullEndPositions.filter(
            (position, idx) =>
              distanceFromEndPositions[idx] ===
              Math.min(...distanceFromEndPositions)
          )[0]

          if (
            filteredPosition !== null &&
            listTopPositionStateRef.current !== undefined &&
            listTopPositionStateRef.current !== null
          ) {
            console.log(
              'possibleEndPositions',
              possibleEndPositions,
              'filteredPosition',
              filteredPosition,
              'distanceFromEndPositions',
              distanceFromEndPositions
            )
            animateListMovement(
              listTopPositionStateRef.current,
              filteredPosition,
              animateRolling
            ).then(() => {
              console.log('setIsTouchMove end')
              setIsTouchMove(false)
            })
          }

          // TODO animate card return
          // use timer and lerp
          // from endCardListTopPosition to startCorrectedListTopPosition
          // use sigmoid translation
        }
      }
    }

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault()
      setIsTouchMove(true)

      const touchX = event.touches[0].clientX
      const touchY = event.touches[0].clientY
      const currentTime = performance.now()
      const currentVelocity = {
        x:
          (touchCurrentPosition.x - touchX) /
          (currentTime - touchCurrentPosition.time),
        y:
          (touchCurrentPosition.y - touchY) /
          (currentTime - touchCurrentPosition.time)
      }

      setTouchCoords({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      })

      // Get list dimensions
      if (!listRef.current) {
        console.error('No list')
        return
      }

      // Check if we have a list
      if (!tasks) {
        console.log('No tasks')
        return
      }

      if (!selectedTaskStateRef.current) {
        return console.error('No task selected')
      }

      const cardRect = listRef.current
        ?.querySelector(`#taskCard${selectedTaskStateRef.current.id}`)
        ?.getBoundingClientRect()

      if (!cardRect) {
        return console.error('No card rect')
      }

      const yChange = touchY - touchCurrentPosition.y

      if (!listTopPositionStateRef.current) {
        return
      }

      const newListTopPosition = listTopPositionStateRef.current + yChange

      if (
        (newListTopPosition > listTopPositionStateRef.current &&
          tasks[0].id !== selectedTaskStateRef.current.id) ||
        (newListTopPosition < listTopPositionStateRef.current &&
          tasks[tasks.length - 1].id !== selectedTaskStateRef.current.id)
      ) {
        setListTopPositionState(newListTopPosition)
      }

      touchCurrentPosition = {
        x: touchX,
        y: touchY,
        time: currentTime,
        velocity: {
          x:
            (touchCurrentPosition.x - touchX) /
            (currentTime - touchCurrentPosition.time),
          y:
            (touchCurrentPosition.y - touchY) /
            (currentTime - touchCurrentPosition.time)
        },
        acceleration: {
          x:
            (touchCurrentPosition.velocity.x - currentVelocity.x) /
            (currentTime - touchCurrentPosition.time),
          y:
            (touchCurrentPosition.velocity.y - currentVelocity.y) /
            (currentTime - touchCurrentPosition.time)
        }
      }

      // Change selected task
      selectTaskCard(tasks, listRef, touchAreaCenterY, setSelectedTaskState)
    }

    if (parentDiv.current) {
      parentDiv.current?.addEventListener('touchstart', handleTouchStart, {
        passive: false
      })
      parentDiv.current?.addEventListener('touchmove', handleTouchMove, {
        passive: false
      })
      parentDiv.current?.addEventListener('touchend', handleTouchEnd, {
        passive: false
      })
    }

    return () => {
      if (parentDiv.current) {
        parentDiv.current?.removeEventListener('touchstart', handleTouchStart)
        parentDiv.current?.removeEventListener('touchmove', handleTouchMove)
        parentDiv.current?.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [divRef, tasks])

  return (
    <ul
      ref={listRef}
      id='taskList'
      className={`absolute flex flex-col w-full h-full gap-y-1 items-center select-none z-0 rounded-2xl p-1`}
      style={{
        top: `${listTopPositionState}px`
      }}
    >
      {tasks !== null &&
        tasks.map(task => (
          <li
            id={`taskCard${task.id}`}
            key={task.id}
            className={`flex w-full rounded-2xl ${clsx({
              'outline-2 outline-offset-0 outline-dashed outline-gray-200 opacity-100':
                task.id === selectedTaskState?.id && isTouchMove,
              'opacity-50': task.id !== selectedTaskState?.id && isTouchMove
              // 'opacity-0': task.id !== selectedTaskState?.id && !isTouchMove
            })}`}
          >
            <TaskCard task={task} />
          </li>
        ))}
    </ul>
  )
}

export default TouchCarouselTasks
