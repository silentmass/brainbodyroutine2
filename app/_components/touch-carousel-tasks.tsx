'use client'
import clsx from 'clsx'
import { RefObject, useEffect, useRef, useState } from 'react'
import { number } from 'zod'
import { Task } from '../lib/definitions'
import TaskCard from '../ui/tasks/card'

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

export function getCardBoundingRect (
  listElementRef: RefObject<HTMLDivElement>,
  taskID: number
) {
  return listElementRef.current
    ?.querySelector(`#taskCard${taskID}`)
    ?.getBoundingClientRect()
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
    // Init list height
    const listHeight = divRef.current
      ?.querySelector('#taskList')
      ?.getBoundingClientRect()?.height

    console.log('init listHeight', listHeight)

    // Init card height
    const cardHeight = getCardBoundingRect(divRef, selectedTaskState.id)?.height

    console.log('init cardHeight', cardHeight)

    if (cardHeight) {
      const initialTopPosition = (touchAreaHeight - cardHeight) / 2
      setListTopPosition(initialTopPosition)
      setListInitialTopPosition(initialTopPosition)
      console.log('init top shifted', initialTopPosition)
    }

    // Touch event handlers

    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault()
      setIsTouchMove(true)
    }

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault()
      setIsTouchMove(false)

      const cardRect = getCardBoundingRect(
        divRef,
        selectedTaskStateRef.current.id
      )
      const cardHeight = cardRect?.height
      const cardTop = cardRect?.top

      const endCardListTopPosition = getCardListTopPosition(
        divRef,
        selectedTaskStateRef.current.id
      )

      console.log(cardHeight, cardTop, endCardListTopPosition)

      if (
        cardHeight !== undefined &&
        endCardListTopPosition !== undefined &&
        cardTop !== undefined
      ) {
        const correctedListTopPosition =
          -endCardListTopPosition + (touchAreaHeight - cardHeight) / 2

        const startCorrectedListTopPosition =
          cardTop < -cardHeight / 2
            ? (touchAreaHeight - cardHeight) / 2
            : correctedListTopPosition

        setListTopPosition(startCorrectedListTopPosition)
        console.log(
          'handleTouchEnd',
          startCorrectedListTopPosition,
          selectedTaskStateRef.current.title,
          cardTop
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

      // Set
      if (
        divRef.current?.offsetLeft &&
        divRef.current?.offsetWidth &&
        divRef.current?.offsetTop &&
        divRef.current?.offsetHeight
      ) {
        const localRelativePosition = horizontal
          ? !invert
            ? (event.touches[0].clientX - divRef.current?.offsetLeft) /
              divRef.current?.offsetWidth
            : 1 -
              (event.touches[0].clientX - divRef.current?.offsetLeft) /
                divRef.current?.offsetWidth
          : !invert
          ? 1 -
            (event.touches[0].clientY - divRef.current?.offsetTop) /
              divRef.current?.offsetHeight
          : (event.touches[0].clientY - divRef.current?.offsetTop) /
            divRef.current?.offsetHeight

        setRelativePosition(localRelativePosition)

        // Set current card as selected
        const currentTask =
          tasks[
            getRangeRelativeIndex(
              getRangeRelativePosition(localRelativePosition, 0, 1),
              tasks.length
            )
          ]
        setSelectedTaskState(currentTask)

        const currentCardElement = divRef.current?.querySelector(
          `#taskCard${currentTask.id}`
        )
        const cardHeight = currentCardElement?.getBoundingClientRect().height

        const listRect = divRef.current
          ?.querySelector('#taskList')
          ?.getBoundingClientRect()

        const listHeight = listRect?.height

        console.log(currentTask.title)

        // Card list scrolling logic
        if (
          cardHeight &&
          cardHeight !== null &&
          listHeight &&
          listHeight !== null
        ) {
          const startListShift = (touchAreaHeight - cardHeight) / 2 // Center card
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
          const listShiftFactor = listHeight / touchAreaHeight
          const pos =
            relClippedTouchAreaDistance * touchAreaHeight * listShiftFactor
          const endListShift = relClippedTouchAreaDistance * cardHeight // Correct end position

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

  // bg-gradient-to-t from-transparent to-white

  return (
    <div
      ref={divRef}
      className={`relative flex flex-col w-10/12 min-h-[${touchAreaHeight}px] max-h-[${touchAreaHeight}px] justify-center items-center overflow-hidden rounded-2xl z-10 select-none `}
    >
      <div className='absolute top-0 h-[30px] bg-gradient-to-t from-transparent to-white w-full z-20'></div>
      <div className='absolute bottom-0 h-[30px] bg-gradient-to-b from-transparent to-white w-full z-20'></div>
      {/* <div className={`absolute top-0 h-15 bg-red w-full z-20`}></div> */}
      <ul
        id='taskList'
        className={`absolute flex flex-col w-full h-fit gap-y-1 items-center pl-4 pr-4 select-none  ${
          listTopPosition === null ? 'opacity-0' : ''
        }`}
        style={{
          top: `${listTopPosition}px`
        }}
      >
        {isTouchMove && relativePosition !== null
          ? tasks.map(task =>
              task.id ===
              tasks[
                getRangeRelativeIndex(
                  getRangeRelativePosition(relativePosition, 0, 1),
                  tasks.length
                )
              ].id ? (
                // Selected card
                <li
                  id={`taskCard${task.id}`}
                  key={task.id}
                  className={`flex rounded-2xl ${'outline-2 outline-offset-0 outline-dashed outline-black w-11/12'} `}
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
          : // Not moving
            // Show only single card
            tasks.map(task => (
              <li
                id={`taskCard${task.id}`}
                key={task.id}
                className={`flex rounded-2xl w-full z-30 ${
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
