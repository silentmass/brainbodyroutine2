import { RefObject } from 'react'
import { Task } from '@/app/lib/definitions'

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

  const cardRect = touchElement
    ?.querySelector(`#taskCard${taskID}`)
    ?.getBoundingClientRect()

  if (touchRect && cardRect && listRect) {
    const cardYCenter = cardRect.y + cardRect.height / 2
    return listRect.y - (cardYCenter - touchRect?.height / 2)
  }
  return null
}

export function selectTaskCard (
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
  const touchElement = touchAreaRef?.current

  const cardRect = touchElement
    ?.querySelector(`#taskCard${taskID}`)
    ?.getBoundingClientRect()

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
  const touchElement = touchAreaRef?.current

  const cardRect = touchElement
    ?.querySelector(`#taskCard${taskID}`)
    ?.getBoundingClientRect()

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
  const touchElement = touchAreaRef?.current

  const cardRectFirst = touchElement
    ?.querySelector(`#taskCard${tasks[0].id}`)
    ?.getBoundingClientRect()

  const cardRectLast = touchElement
    ?.querySelector(`#taskCard${tasks[tasks.length - 1].id}`)
    ?.getBoundingClientRect()

  const listRef = touchElement?.querySelector(`#taskList`)

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
