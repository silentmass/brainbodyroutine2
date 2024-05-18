import {
  Dispatch,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect
} from 'react'
import { Task, TaskCategory } from '@/app/lib/definitions'
import {
  changeTask,
  getClosestTaskCardPosition,
  getRollingDistance,
  getTaskAfterListMove,
  getTaskCardRect
} from './task-carousel-utils'
import {
  animateListMovement,
  animateRollingWrapper
} from './task-carousel-animation'

export default function useTouchHandler (
  touchAreaRef: RefObject<HTMLDivElement>,
  listRef: RefObject<HTMLUListElement>,
  selectedCategoryRef: RefObject<TaskCategory | null>,
  selectedTaskRef: RefObject<Task | null>,
  tasksRef: RefObject<Task[] | null>,
  listTopPositionRef: RefObject<number | null>,
  isTouchMove: boolean,
  setIsTouchMoveFun: Dispatch<SetStateAction<boolean>>,
  setTaskChangeFun: Dispatch<SetStateAction<Task | null>>,
  setListTopPositionFun: Dispatch<SetStateAction<number | null>>
): {
  handleTouchStart: (event: TouchEvent) => void
  handleTouchMove: (event: TouchEvent) => void
  handleTouchEnd: (event: TouchEvent) => void
} {
  let touchTimer: number
  let touchStartPosition: { x: number; y: number; time: number }
  let touchCurrentPosition: {
    x: number
    y: number
    time: number
    velocity: { x: number; y: number }
    acceleration: { x: number; y: number }
  }

  // Touch event handlers

  // Touch start event handler
  const handleTouchStart = useCallback(
    (event: TouchEvent) => {
      event.preventDefault()
      if (!isTouchMove) {
        setIsTouchMoveFun(true)
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
    },
    [setIsTouchMoveFun]
  )

  // Touch end event handler
  const handleTouchEnd = useCallback(
    (event: TouchEvent) => {
      const touchDuration = performance.now() - touchTimer

      if (!selectedTaskRef.current) {
        console.log('No selected task')
        return
      }

      const cardRect = getTaskCardRect(touchAreaRef, selectedTaskRef.current.id)
      const listRect = listRef.current?.getBoundingClientRect()

      // Tap handling
      if (touchDuration < 120) {
        const elementUnderClick = document.elementFromPoint(
          touchCurrentPosition.x,
          touchCurrentPosition.y
        )

        if (
          elementUnderClick?.tagName.toLocaleLowerCase() === 'button' &&
          elementUnderClick?.id === 'isActiveButton'
        ) {
          ;(elementUnderClick as HTMLButtonElement)?.click()
        } else if (elementUnderClick?.tagName.toLocaleLowerCase() === 'svg') {
          console.log(
            elementUnderClick?.parentElement,
            elementUnderClick?.parentElement?.tagName
          )
          if (
            elementUnderClick?.parentElement?.tagName.toLocaleLowerCase() ===
            'button'
          ) {
            elementUnderClick?.parentElement.click()
          }
        } else if (elementUnderClick?.tagName.toLocaleLowerCase() === 'path') {
          console.log(elementUnderClick?.parentElement?.parentElement)
          if (
            elementUnderClick?.parentElement?.parentElement?.tagName.toLocaleLowerCase() ===
            'button'
          ) {
            elementUnderClick?.parentElement?.parentElement.click()
          }
        }

        if (!cardRect || !listRect) {
          return
        }

        if (
          !listRect ||
          tasksRef.current === null ||
          listTopPositionRef.current === null ||
          !cardRect
        ) {
          return
        }

        const moveDirection =
          elementUnderClick && elementUnderClick?.id === 'listButtonUp'
            ? 1
            : elementUnderClick && elementUnderClick?.id === 'listButtonDown'
            ? -1
            : 0

        const closestCardPosition = getClosestTaskCardPosition(
          tasksRef.current,
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
              setTaskChangeFun
            )
          )
          if (isTouchMove) {
            setIsTouchMoveFun(false)
          }
        }
      }

      // Scroll end continues
      event.preventDefault()

      const averageEndVelocity =
        (touchCurrentPosition.y - touchStartPosition.y) /
        ((touchCurrentPosition.time - touchStartPosition.time) / 1000)

      if (
        listTopPositionRef.current === null ||
        listTopPositionRef.current === undefined ||
        isNaN(averageEndVelocity)
      ) {
        // Change is touch move flag
        setIsTouchMoveFun(false)
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
          setTaskChangeFun
        )
      )
      setIsTouchMoveFun(false)
    },
    [
      touchAreaRef,
      listRef,
      listTopPositionRef,
      selectedTaskRef,
      tasksRef,
      setTaskChangeFun,
      setIsTouchMoveFun,
      setListTopPositionFun
    ]
  )

  // Touch move
  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      event.preventDefault()
      if (!isTouchMove) {
        setIsTouchMoveFun(true)
      }

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

      const yChange = touchY - touchCurrentPosition.y

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

      // Change task if changed
      const newTask = changeTask(touchAreaRef, selectedTaskRef, tasksRef)
      if (
        newTask !== undefined &&
        newTask !== null &&
        selectedTaskRef.current &&
        selectedTaskRef.current.id !== newTask.id
      ) {
        setTaskChangeFun(newTask)
      }
    },
    [
      touchAreaRef,
      listRef,
      listTopPositionRef,
      tasksRef,
      selectedTaskRef,
      setIsTouchMoveFun,
      setListTopPositionFun,
      setTaskChangeFun
    ]
  )

  useEffect(() => {
    touchAreaRef?.current?.addEventListener('touchstart', handleTouchStart, {
      passive: false
    })
    touchAreaRef?.current?.addEventListener('touchmove', handleTouchMove, {
      passive: false
    })
    touchAreaRef?.current?.addEventListener('touchend', handleTouchEnd, {
      passive: false
    })

    return () => {
      touchAreaRef?.current?.removeEventListener('touchstart', handleTouchStart)
      touchAreaRef?.current?.removeEventListener('touchmove', handleTouchMove)
      touchAreaRef?.current?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  return { handleTouchStart, handleTouchMove, handleTouchEnd }
}
