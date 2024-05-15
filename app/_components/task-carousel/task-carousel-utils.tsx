import { Dispatch, RefObject, SetStateAction } from 'react'
import { Task } from '@/app/lib/definitions'

export const getTaskCard = (
  touchAreaRef: RefObject<HTMLDivElement | HTMLUListElement>,
  id: number
) => {
  return touchAreaRef.current?.querySelector(`#taskCard${id}`)
}

export const getTaskCardRect = (
  touchAreaRef: RefObject<HTMLDivElement | HTMLUListElement>,
  id: number
) => {
  return getTaskCard(touchAreaRef, id)?.getBoundingClientRect()
}

export function getTouchAreaRect (touchAreaRef: RefObject<HTMLDivElement>) {
  return touchAreaRef?.current?.getBoundingClientRect()
}

export function getListRect (touchAreaRef: RefObject<HTMLDivElement>) {
  const touchElement = touchAreaRef?.current
  return touchElement?.querySelector('#taskList')?.getBoundingClientRect()
}

export function getRollingDistance (velocity: number) {
  const direction = velocity < 0 ? -1 : 1
  const velocityFactor = 1 - (1 - Math.abs(velocity / 6000) ** 2) ** 2
  return Math.abs(velocity * velocityFactor) * direction
}

export function yCenterTask (
  touchAreaRef: RefObject<HTMLDivElement>,
  taskID: number
) {
  const touchRect = getTouchAreaRect(touchAreaRef)
  const touchElement = touchAreaRef?.current

  const listRect = getListRect(touchAreaRef)

  const cardRect = getTaskCardRect(touchAreaRef, taskID)

  if (touchRect && cardRect && listRect) {
    const cardYCenter = cardRect.y + cardRect.height / 2
    return listRect.y - (cardYCenter - touchRect?.height / 2)
  }
  return null
}

export function selectTaskCard (
  tasks: Task[],
  listRef: RefObject<HTMLDivElement | HTMLUListElement>,
  touchAreaCenterY: number,
  setSelectedTaskStateFun: (task: Task) => void
) {
  // Get each closest card to touch area
  const taskClosestToTouchAreaCenter = tasks.filter(task => {
    const cardRect = getTaskCardRect(listRef, task.id)

    if (!cardRect) {
      return false
    }

    if (
      Math.abs(cardRect?.top + cardRect?.height / 2 - touchAreaCenterY) <
      cardRect.height / 2
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

export function getClosestTaskCardPosition (
  tasks: Task[],
  position: number,
  touchAreaRef: RefObject<HTMLDivElement>
) {
  const possibleEndPositions = tasks.map(task =>
    yCenterTask(touchAreaRef, task.id)
  )

  const nonNullEndPositions = possibleEndPositions.filter(
    positionValue => positionValue !== null
  )

  const distanceFromEndPositions = nonNullEndPositions.map(positionValue => {
    if (position !== null) {
      return Math.abs(position - positionValue)
    } else {
      return 999999
    }
  })

  const filteredPosition = nonNullEndPositions.filter(
    (positionValue, idx) =>
      distanceFromEndPositions[idx] === Math.min(...distanceFromEndPositions)
  )[0]

  return filteredPosition
}

export function getCardYCenterDistanceFromTouchAreaYCenter (
  touchAreaRef: RefObject<HTMLDivElement>,
  taskID: number
) {
  const touchRect = getTouchAreaRect(touchAreaRef)
  const cardRect = getTaskCardRect(touchAreaRef, taskID)

  if (!cardRect) {
    console.error(
      'getCardYCenterDistanceFromTouchAreaYCenter',
      'cardRect not defined'
    )
    return null
  }

  if (!touchRect) {
    console.error(
      'getCardYCenterDistanceFromTouchAreaYCenter',
      'touchAreaRect not defined'
    )
    return null
  }

  const cardTopDistanceFromTouchAreaTop = cardRect.y - touchRect.y
  const cardYCenter = cardTopDistanceFromTouchAreaTop + cardRect.height / 2
  const touchAreaYCenter = touchRect?.height / 2

  return cardYCenter - touchAreaYCenter
}

export function yCenterTaskScroll (
  touchAreaRef: RefObject<HTMLDivElement>,
  taskID: number
) {
  const touchRect = getTouchAreaRect(touchAreaRef)

  const cardRect = getTaskCardRect(touchAreaRef, taskID)

  if (touchRect && cardRect) {
    const cardDistanceFromTouchAreaTop = cardRect.y - touchRect.y
    const verticalPaddingTotal = touchRect?.height / 2 - cardRect.height / 2
    const yCenter = cardDistanceFromTouchAreaTop - verticalPaddingTotal
    return yCenter
  }

  return null
}

export function getListVerticalPadding (
  touchAreaRef: RefObject<HTMLDivElement>,
  tasks: Task[]
) {
  const touchRect = getTouchAreaRect(touchAreaRef)
  const cardRectFirst = getTaskCardRect(touchAreaRef, tasks[0].id)
  const cardRectLast = getTaskCardRect(touchAreaRef, tasks[tasks.length - 1].id)

  if (cardRectFirst && cardRectLast && touchRect) {
    const topPadding = (touchRect?.height - cardRectFirst?.height) / 2
    const bottomPadding = (touchRect?.height - cardRectLast?.height) / 2

    return {
      top: topPadding,
      bottom: bottomPadding
    }
  } else {
    return {
      top: 0,
      bottom: 0
    }
  }
}

export function changeTask (
  touchAreaRef: RefObject<HTMLDivElement>,
  selectedTaskRef: RefObject<Task | null>,
  tasksRef: RefObject<Task[] | null>,
  handleTaskChangeFun: Dispatch<SetStateAction<Task | null>>
) {
  if (tasksRef.current === null) {
    console.log('No tasks')
    return
  }

  const yCenterDistances = tasksRef.current
    .map(task => {
      if (touchAreaRef.current) {
        const cardRect = getTaskCardRect(touchAreaRef, task.id)
        const touchRect = getTouchAreaRect(touchAreaRef)

        if (cardRect && touchRect) {
          return (
            cardRect.y +
            cardRect.height / 2 -
            touchRect.y -
            touchRect.height / 2
          )
        }
      }
      return NaN
    })
    .filter(distance => !isNaN(distance))

  const absDistances = yCenterDistances.map(distance => Math.abs(distance))

  const minAbsDistance = Math.min(...absDistances)

  const nMinDistance = absDistances.filter(
    distance => distance === minAbsDistance
  ).length

  if (nMinDistance === 2) {
    console.log("Midway between task cards. Don't change task")
    return
  } else if (selectedTaskRef.current !== null) {
    const minDistanceIdx = absDistances
      .map((distance, idx) => (distance === minAbsDistance ? idx : false))
      .filter(idx => idx !== false)[0]

    if (minDistanceIdx !== undefined) {
      selectedTaskRef.current.id !== tasksRef.current[minDistanceIdx].id &&
        handleTaskChangeFun(tasksRef.current[minDistanceIdx])
    }
  }
}
