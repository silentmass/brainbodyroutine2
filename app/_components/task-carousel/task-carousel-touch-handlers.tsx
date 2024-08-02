import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef
} from 'react'
import { Task, TaskCategory } from '@/app/lib/definitions'
import {
  changeTask,
  getClosestTaskCardPosition,
  getParentButtonElement,
  getRollingDistance,
  getTaskAfterListMove,
  getTaskCardRect
} from './task-carousel-utils'
import {
  animateListMovement,
  animateRollingWrapper
} from './task-carousel-animation'
import { getDropTargetElementsAtPoint } from '@/app/contexts/DndProvider'

export default function useTouchHandler (
  touchAreaRef: RefObject<HTMLDivElement>,
  listRef: RefObject<HTMLUListElement>,
  selectedCategoryRef: RefObject<TaskCategory | null>,
  selectedTaskRef: RefObject<Task | null>,
  tasksRef: RefObject<Task[] | null>,
  listTopPositionRef: RefObject<number | null>,
  isTouchMove: boolean,
  setIsTouchMove: Dispatch<SetStateAction<boolean>>,
  setTaskChange: Dispatch<SetStateAction<Task | null>>,
  setListTopPositionFun: Dispatch<SetStateAction<number | null>>
): {
  handleTouchStart: (event: TouchEvent) => void
  handleTouchMove: (event: TouchEvent) => void
  handleTouchEnd: (event: TouchEvent) => void
} {
  const touchTimerRef = useRef<number | null>(null)
  const touchStartPositionRef = useRef<{
    x: number
    y: number
    time: number
  } | null>(null)
  const touchCurrentPositionRef = useRef<{
    x: number
    y: number
    time: number
    velocity: { x: number; y: number }
    acceleration: { x: number; y: number }
  } | null>(null)

  // Touch event handlers

  // Touch start event handler
  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      event.preventDefault()
      const buttons = getPointElementByString(
        event.touches[0].clientX,
        event.touches[0].clientY,
        'listButton'
      )

      if (!isTouchMove && !buttons) {
        setIsTouchMove(true)
      }

      touchTimerRef.current = performance.now()

      touchStartPositionRef.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
        time: performance.now()
      }
      touchCurrentPositionRef.current = {
        x: touchStartPositionRef.current.x,
        y: touchStartPositionRef.current.y,
        time: touchStartPositionRef.current.time,
        velocity: { x: 0, y: 0 },
        acceleration: { x: 0, y: 0 }
      }
    },
    [setIsTouchMove]
  )

  // Touch end event handler
  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (touchStartPositionRef.current === null) return

      if (touchTimerRef.current === null) return

      if (touchCurrentPositionRef.current === null) return

      const touchDuration = performance.now() - touchTimerRef.current

      if (!selectedTaskRef.current) {
        return
      }

      const cardRect = getTaskCardRect(touchAreaRef, selectedTaskRef.current.id)
      const listRect = listRef.current?.getBoundingClientRect()

      // Tap handling
      if (touchDuration < 120) {
        const tasks = tasksRef.current
        if (
          !listRect ||
          tasks === null ||
          listTopPositionRef.current === null ||
          !cardRect
        ) {
          return
        }

        const elementUnderClick = document.elementFromPoint(
          touchCurrentPositionRef.current.x,
          touchCurrentPositionRef.current.y
        )

        if (elementUnderClick) {
          console.log('elementUnderClick', elementUnderClick.id)
          const buttonElement = getParentButtonElement(elementUnderClick)
          console.log('buttonElement', buttonElement?.id)
          if (buttonElement && buttonElement.id === 'isActiveButton') {
            buttonElement.click()
            setIsTouchMove(false)
            return
          } else if (buttonElement && buttonElement.id !== 'isActiveButton') {
            const nextTaskID = buttonElement?.value
            if (nextTaskID !== undefined) {
              const taskAbove = tasks.find(
                task =>
                  task.id === parseInt(nextTaskID) ||
                  task.id === selectedTaskRef.current?.id
              )

              if (taskAbove) {
                const moveDirection =
                  taskAbove.id === parseInt(nextTaskID) ? 1 : -1

                const closestCardPosition = getClosestTaskCardPosition(
                  tasks,
                  listTopPositionRef.current + moveDirection * cardRect?.height,
                  touchAreaRef
                )

                if (
                  closestCardPosition !== null &&
                  closestCardPosition !== undefined &&
                  listTopPositionRef.current !== undefined &&
                  listTopPositionRef.current !== null
                ) {
                  // Change is touch move flag
                  animateListMovement(
                    listTopPositionRef.current,
                    closestCardPosition,
                    animateRollingWrapper(
                      touchAreaRef,
                      selectedTaskRef,
                      tasksRef,
                      setListTopPositionFun,
                      setTaskChange
                    )
                  )
                  if (isTouchMove) {
                    setIsTouchMove(false)
                  }
                }
              }
            }
          }
        }
      }

      // Scroll end continues
      event.preventDefault()

      const averageEndVelocity =
        (touchCurrentPositionRef.current.y - touchStartPositionRef.current.y) /
        ((touchCurrentPositionRef.current.time -
          touchStartPositionRef.current.time) /
          1000)

      if (
        listTopPositionRef.current === null ||
        listTopPositionRef.current === undefined ||
        isNaN(averageEndVelocity)
      ) {
        // Change is touch move flag
        setIsTouchMove(false)
        return
      }

      if (!selectedTaskRef.current || tasksRef.current === null) {
        console.error('No task selected')
        return
      }

      // Get closest card position after rolling end position
      const closestCardPosition = getClosestTaskCardPosition(
        tasksRef.current,
        listTopPositionRef.current + getRollingDistance(averageEndVelocity),
        touchAreaRef
      )

      if (
        closestCardPosition === null ||
        closestCardPosition === undefined ||
        listTopPositionRef.current === undefined ||
        listTopPositionRef.current === null
      ) {
        return
      }

      animateListMovement(
        listTopPositionRef.current,
        closestCardPosition,
        animateRollingWrapper(
          touchAreaRef,
          selectedTaskRef,
          tasksRef,
          setListTopPositionFun,
          setTaskChange
        )
      )
      setIsTouchMove(false)
    },
    [
      touchAreaRef,
      listRef,
      listTopPositionRef,
      selectedTaskRef,
      tasksRef,
      setTaskChange,
      setIsTouchMove,
      setListTopPositionFun,
      isTouchMove,
      touchTimerRef,
      touchCurrentPositionRef,
      touchStartPositionRef
    ]
  )

  // Touch move
  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      event.preventDefault()
      if (!isTouchMove) {
        setIsTouchMove(true)
      }

      if (touchCurrentPositionRef.current === null) return

      const touchX = event.touches[0].clientX
      const touchY = event.touches[0].clientY
      const currentTime = performance.now()
      const currentVelocity = {
        x:
          (touchCurrentPositionRef.current.x - touchX) /
          (currentTime - touchCurrentPositionRef.current.time),
        y:
          (touchCurrentPositionRef.current.y - touchY) /
          (currentTime - touchCurrentPositionRef.current.time)
      }

      // Get list dimensions
      if (!listRef.current) {
        console.error('No list')
        return
      }

      // Check if we have a list
      if (!tasksRef.current) {
        console.log('No tasks')
        return
      }

      if (!selectedTaskRef.current) {
        console.error('No task selected')
        return
      }

      const cardRect = listRef.current
        ?.querySelector(`#taskCard${selectedTaskRef.current.id}`)
        ?.getBoundingClientRect()

      if (!cardRect) {
        console.error('No task card')
        return
      }

      const yChange = touchY - touchCurrentPositionRef.current.y

      if (
        listTopPositionRef.current == null ||
        listTopPositionRef.current == undefined
      ) {
        console.error('Missing list position')
        return
      }

      const newListTopPosition = listTopPositionRef.current + yChange

      if (
        (newListTopPosition > listTopPositionRef.current &&
          tasksRef.current[0].id !== selectedTaskRef.current.id) ||
        (newListTopPosition < listTopPositionRef.current &&
          tasksRef.current[tasksRef.current.length - 1].id !==
            selectedTaskRef.current.id)
      ) {
        setListTopPositionFun(newListTopPosition)
      }

      touchCurrentPositionRef.current = {
        x: touchX,
        y: touchY,
        time: currentTime,
        velocity: {
          x:
            (touchCurrentPositionRef.current.x - touchX) /
            (currentTime - touchCurrentPositionRef.current.time),
          y:
            (touchCurrentPositionRef.current.y - touchY) /
            (currentTime - touchCurrentPositionRef.current.time)
        },
        acceleration: {
          x:
            (touchCurrentPositionRef.current.velocity.x - currentVelocity.x) /
            (currentTime - touchCurrentPositionRef.current.time),
          y:
            (touchCurrentPositionRef.current.velocity.y - currentVelocity.y) /
            (currentTime - touchCurrentPositionRef.current.time)
        }
      }

      // Change task if changed
      const newTask = changeTask(touchAreaRef, selectedTaskRef, tasksRef)
      if (
        newTask !== undefined &&
        newTask !== null &&
        selectedTaskRef.current &&
        selectedTaskRef.current.id !== newTask.id
      ) {
        setTaskChange(newTask)
      }
    },
    [
      touchAreaRef,
      listRef,
      listTopPositionRef,
      tasksRef,
      selectedTaskRef,
      setIsTouchMove,
      setListTopPositionFun,
      setTaskChange
    ]
  )

  useEffect(() => {
    const toucharea = touchAreaRef.current
    if (!toucharea) return
    toucharea.addEventListener('touchstart', handleTouchStart, {
      passive: false
    })
    toucharea.addEventListener('touchmove', handleTouchMove, {
      passive: false
    })
    toucharea.addEventListener('touchend', handleTouchEnd, {
      passive: false
    })

    return () => {
      toucharea.removeEventListener('touchstart', handleTouchStart)
      toucharea.removeEventListener('touchmove', handleTouchMove)
      toucharea.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd, touchAreaRef])

  return { handleTouchStart, handleTouchMove, handleTouchEnd }
}

export const getPointElementByString = (x: number, y: number, id: string) => {
  return getElementsAtPoint(
    x,
    y,
    Array.from(document.documentElement.querySelectorAll(`[id^="${id}"]`))
  )
}

export function getElementsAtPoint (x: number, y: number, elements: Element[]) {
  return elements.filter(t => {
    const rect = t.getBoundingClientRect()
    return (
      x >= rect.left && x <= rect.right && y <= rect.bottom && y >= rect.top
    )
  })
}
