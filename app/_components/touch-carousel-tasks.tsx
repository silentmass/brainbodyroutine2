'use client'
import { RefObject, useEffect, useRef, useState } from 'react'
import { Task } from '@/app/lib/definitions'
import TaskCard from '@/app/ui/tasks/card'

export interface coords {
  x: number | null
  y: number | null
}

export function getRangeRelativePosition (
  value: number,
  rangeStart: number,
  rangeEnd: number
) {
  if (value <= rangeStart) {
    return rangeStart
  } else if (value >= rangeEnd) {
    return rangeEnd
  } else {
    return value
  }
}

export function getRangeRelativeMappedPosition (
  value: number,
  rangeStart: number,
  rangeEnd: number
) {
  const rangeLength = rangeEnd - rangeStart
  if (value <= rangeStart / rangeLength) {
    return rangeStart
  } else if (value >= rangeEnd / rangeLength) {
    return rangeEnd
  } else {
    return value * (rangeEnd - rangeStart)
  }
}

export function getRangeRelativeIndex (value: number, spacings: number) {
  const spacingsInt = Math.round(spacings)
  return Math.round(value * (spacingsInt - 1))
}

export function getScaledInt (value: number | null, scale: number) {
  if (value !== null && scale !== null) {
    return Math.round(value * scale)
  }
  {
    return null
  }
}

export function getCardListTopPosition (
  listElementRef: RefObject<HTMLDivElement>,
  taskID: number
) {
  const cardTop = listElementRef.current
    ?.querySelector(`#taskCard${taskID}`)
    ?.getBoundingClientRect()?.top
  const listTop = listElementRef.current
    ?.querySelector('#taskList')
    ?.getBoundingClientRect()?.top

  if (cardTop && listTop) {
    return cardTop - listTop
  }
}

export function getListBoundingRect (ref: RefObject<HTMLDivElement | null>) {
  if (ref) {
    return ref.current?.querySelector('#taskList')?.getBoundingClientRect()
  } else {
    console.error('No main div ref')
    return null
  }
}

export function getCardBoundingRect (
  ref: RefObject<HTMLDivElement | null>,
  taskID: number
) {
  if (ref) {
    return ref.current
      ?.querySelector(`#taskCard${taskID}`)
      ?.getBoundingClientRect()
  } else {
    console.error('No card div ref')
    return null
  }
}

export const TouchCarouselTasks = ({
  tasks,
  initialTask,
  horizontal,
  invert
}: {
  tasks: Task[]
  initialTask: Task
  horizontal: boolean
  invert: boolean
}) => {
  const divRef = useRef<HTMLDivElement>(null)
  const [selectedTaskState, setSelectedTaskState] = useState<Task>(initialTask)
  const selectedTaskStateRef = useRef(selectedTaskState)

  const [touchCoords, setTouchCoords] = useState<coords>({ x: null, y: null })
  const [relativePosition, setRelativePosition] = useState<number | null>(null)
  const [rangeRelativePosition, setRangeRelativePosition] = useState<
    number | null
  >(null)

  // List states
  const [listInitialTopPosition, setListInitialTopPosition] = useState<
    number | null
  >(null)
  const [listTopPosition, setListTopPosition] = useState<number | null>(null)
  const [isTouchMove, setIsTouchMove] = useState(false)

  const touchAreaHeight = 200

  useEffect(() => {
    selectedTaskStateRef.current = selectedTaskState
  }, [selectedTaskState])

  useEffect(() => {
    function initListTop (cardHeight: number | undefined) {
      if (cardHeight !== undefined && cardHeight !== null) {
        const initialTopPosition = (touchAreaHeight - cardHeight) / 2
        setListTopPosition(initialTopPosition)
        setListInitialTopPosition(initialTopPosition)
        console.log('init cardHeight', cardHeight)
        console.log('init list top shifted', initialTopPosition)
      } else {
        console.error('No card height')
      }
    }

    // Init list rect dimensions
    const listRect = getListBoundingRect(divRef)

    const mainOffsetWidth = divRef.current?.offsetWidth
    const mainOffsetHeight = divRef.current?.offsetHeight
    const mainOffsetTop = divRef.current?.offsetTop
    const mainOffsetLeft = divRef.current?.offsetLeft

    initListTop(getCardBoundingRect(divRef, selectedTaskState.id)?.height)

    // Touch event handlers

    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault()
      setIsTouchMove(true)
      console.log('handleTouchStart')
    }

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault()
      setIsTouchMove(false)

      const cardRect = getCardBoundingRect(
        divRef,
        selectedTaskStateRef.current.id
      )
      const endCardHeight = cardRect?.height
      const endCardTop = cardRect?.top

      const endCardListTopPosition = getCardListTopPosition(
        divRef,
        selectedTaskStateRef.current.id
      )

      if (
        endCardHeight !== undefined &&
        endCardHeight !== null &&
        endCardListTopPosition !== undefined &&
        endCardListTopPosition !== null &&
        endCardTop !== undefined &&
        endCardTop !== null
      ) {
        const correctedListTopPosition =
          -endCardListTopPosition + (touchAreaHeight - endCardHeight) / 2

        const startCorrectedListTopPosition =
          endCardTop < -endCardHeight / 2
            ? (touchAreaHeight - endCardHeight) / 2
            : correctedListTopPosition

        setListTopPosition(startCorrectedListTopPosition)
        console.log(
          'handleTouchEnd',
          startCorrectedListTopPosition,
          selectedTaskStateRef.current.title,
          endCardTop
        )
      }
    }

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault()
      setIsTouchMove(true)
      setTouchCoords({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      })

      const listRect = getListBoundingRect(divRef)
      const moveListHeight = listRect?.height

      // Set
      if (
        mainOffsetLeft !== undefined &&
        mainOffsetLeft !== null &&
        mainOffsetWidth !== undefined &&
        mainOffsetWidth !== null &&
        mainOffsetTop !== undefined &&
        mainOffsetTop !== null &&
        mainOffsetHeight !== undefined &&
        mainOffsetHeight !== null
      ) {
        // Logic for selecting card
        const localRelativePosition = horizontal
          ? !invert
            ? (event.touches[0].clientX - mainOffsetLeft) / mainOffsetWidth
            : 1 - (event.touches[0].clientX - mainOffsetLeft) / mainOffsetWidth
          : !invert
          ? 1 - (event.touches[0].clientY - mainOffsetTop) / mainOffsetHeight
          : (event.touches[0].clientY - mainOffsetTop) / mainOffsetHeight

        setRelativePosition(localRelativePosition)

        console.log('handleTouchMove', localRelativePosition)

        // Set current card as selected
        const currentTask =
          tasks[
            getRangeRelativeIndex(
              getRangeRelativePosition(localRelativePosition, 0, 1),
              tasks.length
            )
          ]
        setSelectedTaskState(currentTask)

        const cardRect = getCardBoundingRect(divRef, currentTask.id)
        const moveCardHeight = cardRect?.height

        console.log(currentTask.title, moveListHeight, mainOffsetHeight)

        // Card list scrolling logic
        if (
          moveCardHeight !== undefined &&
          moveCardHeight !== null &&
          moveListHeight !== undefined &&
          moveListHeight !== null
        ) {
          const startListShift = (touchAreaHeight - moveCardHeight) / 2 // Center card
          const touchDistanceFromStart =
            event.touches[0].clientY - startListShift

          // Calculate touch distance from start in the touch area from 0 to 1
          const relTouchAreaDistance = touchDistanceFromStart / touchAreaHeight
          const relClippedTouchAreaDistance =
            relTouchAreaDistance < 0
              ? 0
              : relTouchAreaDistance > 1
              ? 1
              : relTouchAreaDistance

          // Transform touch area displacement as list displacement
          const listShiftFactor = moveListHeight / touchAreaHeight
          const pos =
            relClippedTouchAreaDistance * touchAreaHeight * listShiftFactor
          const endListShift = relClippedTouchAreaDistance * moveCardHeight // Correct end position

          // Set new list top position
          const newListTopPosition = -pos + startListShift + endListShift
          setListTopPosition(newListTopPosition)
          console.log('setListTopPosition', newListTopPosition)
        }
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

  const mainContainerSizeStyle = `min-h-[${touchAreaHeight}px] max-h-[${touchAreaHeight}px]`
  const gradientHeight = `${Math.round(touchAreaHeight / 4)}`
  const gradientContainerStyle = `absolute from-transparent to-white to-80% w-full z-10`

  return (
    <div
      ref={divRef}
      className={`relative flex flex-col w-screen h-screen ${mainContainerSizeStyle} justify-center items-center overflow-hidden rounded-2xl select-none`}
    >
      <div
        className={`top-0 bg-gradient-to-t ${gradientContainerStyle}`}
        style={{
          height: `${gradientHeight}px`
        }}
      ></div>
      <div
        className={`bottom-0 bg-gradient-to-b ${gradientContainerStyle}`}
        style={{
          height: `${gradientHeight}px`
        }}
      ></div>
      <ul
        id='taskList'
        className={`absolute flex flex-col w-full h-fit gap-y-1 items-center pl-4 pr-4 select-none z-1`}
        style={{
          top: `${listTopPosition}px`
        }}
      >
        {isTouchMove && relativePosition !== null
          ? tasks.map(task =>
              // Touch moving
              task.id === selectedTaskState.id ? (
                // Selected card
                <li
                  id={`taskCard${task.id}`}
                  key={task.id}
                  className={`flex rounded-2xl ${'outline-2 outline-offset-0 outline-dashed outline-black w-11/12 opacity-100'} `}
                >
                  <TaskCard task={task} />
                </li>
              ) : (
                // Non selected card
                <li
                  id={`taskCard${task.id}`}
                  key={task.id}
                  className={`flex rounded-2xl ${'w-10/12'} opacity-70`}
                >
                  <TaskCard task={task} />
                </li>
              )
            )
          : // Touc not moving
            // Show only a single card
            tasks.map(task => (
              <li
                id={`taskCard${task.id}`}
                key={task.id}
                className={`flex rounded-2xl w-full ${
                  task.id !== selectedTaskState.id ? 'opacity-0' : ''
                } `}
              >
                <TaskCard task={task} />
              </li>
            ))}
      </ul>
    </div>
  )
}

export default TouchCarouselTasks
