import {
  Dispatch,
  MutableRefObject,
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
  getTaskCardRect,
  selectTaskCard
} from './task-carousel-utils'
import { animateListMovement } from './task-carousel-animation'

export default function useTouchHandler (
  touchAreaRef: RefObject<HTMLDivElement>,
  listRef: RefObject<HTMLUListElement>,
  selectedCategoryRef: RefObject<TaskCategory | null>,
  selectedTaskRef: RefObject<Task | null>,
  tasksRef: RefObject<Task[] | null>,
  listTopPositionRef: MutableRefObject<number | null>,
  setIsTouchMoveFun: Dispatch<SetStateAction<boolean>>,
  handleTaskChangeFun: Dispatch<SetStateAction<Task | null>>,
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

  const touchAreaRect = touchAreaRef?.current?.getBoundingClientRect()
  const touchAreaCenterY = touchAreaRect
    ? touchAreaRect?.height / 2 + touchAreaRect?.y
    : 0

  // Touch event handlers

  // Touch start

  const handleTouchStart = useCallback((event: TouchEvent) => {
    event.preventDefault()
    setIsTouchMoveFun(true)

    touchTimer = performance.now()
    console.log('handleTouchStart')

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
  }, [])

  // Touch end

  const handleTouchEnd = useCallback((event: TouchEvent) => {
    const touchDuration = performance.now() - touchTimer
    console.log('handleTouchEnd', touchDuration)

    if (!selectedTaskRef.current) {
      console.log('No selected task')
      return
    }

    const cardRect = getTaskCardRect(touchAreaRef, selectedTaskRef.current.id)
    const listRect = listRef.current?.getBoundingClientRect()

    // Tap

    if (touchDuration < 120) {
      console.log('tap')

      // Check element under tap

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

      console.log(elementUnderClick)

      if (!cardRect || !listRect) {
        return
      }

      if (elementUnderClick && elementUnderClick?.id === 'listButtonUp') {
        console.log('Up click')

        // Move list up

        if (
          listRect &&
          tasksRef.current !== null &&
          listTopPositionRef.current !== null &&
          cardRect &&
          listRef !== null
        ) {
          const animateRolling = (position: number) => {
            // Change selected task

            setListTopPositionFun(position)
            changeTask(
              touchAreaRef,
              selectedTaskRef,
              tasksRef,
              handleTaskChangeFun
            )
          }

          const listTopPositionAfterEndRolling =
            listTopPositionRef.current + cardRect?.height

          // Get closest card position to  after rolling end position
          const closestCardPosition = getClosestTaskCardPosition(
            tasksRef.current,
            listTopPositionAfterEndRolling,
            touchAreaRef
          )

          if (
            closestCardPosition !== null &&
            closestCardPosition !== undefined &&
            listTopPositionRef.current !== undefined &&
            listTopPositionRef.current !== null
          ) {
            animateListMovement(
              listTopPositionRef.current,
              closestCardPosition,
              animateRolling
            ).then(() => {
              console.log('setIsTouchMove end')
              setIsTouchMoveFun(false)
            })
          }
        }
      } else if (
        elementUnderClick &&
        elementUnderClick?.id === 'listButtonDown'
      ) {
        console.log('Down click')

        // Move list down

        // Animate end rolling

        if (
          listRect &&
          tasksRef.current !== null &&
          listTopPositionRef.current !== null &&
          cardRect
        ) {
          const animateRolling = (position: number) => {
            // Change selected task
            setListTopPositionFun(position)
            changeTask(
              touchAreaRef,
              selectedTaskRef,
              tasksRef,
              handleTaskChangeFun
            )
          }

          const listTopPositionAfterEndRolling =
            listTopPositionRef.current - cardRect?.height

          // Get closest card position to  after rolling end position
          const closestCardPosition = getClosestTaskCardPosition(
            tasksRef.current,
            listTopPositionAfterEndRolling,
            touchAreaRef
          )

          if (
            closestCardPosition !== null &&
            closestCardPosition !== undefined &&
            listTopPositionRef.current !== undefined &&
            listTopPositionRef.current !== null
          ) {
            animateListMovement(
              listTopPositionRef.current,
              closestCardPosition,
              animateRolling
            ).then(() => {
              console.log('setIsTouchMove end')
              setIsTouchMoveFun(false)
            })
          }
        }
      }
    }

    // Scroll end continues
    // ############################

    event.preventDefault()

    const averageEndVelocity =
      (touchCurrentPosition.y - touchStartPosition.y) /
      ((touchCurrentPosition.time - touchStartPosition.time) / 1000)

    if (
      listTopPositionRef.current === null ||
      listTopPositionRef.current === undefined ||
      isNaN(averageEndVelocity)
    ) {
      setIsTouchMoveFun(false)
      return
    }

    if (!selectedTaskRef.current) {
      console.error('No tasksRef.current selected')
      return
    }

    // Animate end rolling

    if (listRect && tasksRef.current !== null) {
      const animateRolling = (position: number) => {
        // Change selected task

        setListTopPositionFun(position)
        changeTask(touchAreaRef, selectedTaskRef, tasksRef, handleTaskChangeFun)
      }

      const listTopPositionAfterEndRolling =
        listTopPositionRef.current + getRollingDistance(averageEndVelocity)

      // Get closest card position to  after rolling end position
      const closestCardPosition = getClosestTaskCardPosition(
        tasksRef.current,
        listTopPositionAfterEndRolling,
        touchAreaRef
      )

      if (
        closestCardPosition !== null &&
        closestCardPosition !== undefined &&
        listTopPositionRef.current !== undefined &&
        listTopPositionRef.current !== null
      ) {
        animateListMovement(
          listTopPositionRef.current,
          closestCardPosition,
          animateRolling
        ).then(() => {
          console.log('setIsTouchMove end')
          setIsTouchMoveFun(false)
        })
      }
    }
  }, [])

  // Touch move

  const handleTouchMove = useCallback((event: TouchEvent) => {
    event.preventDefault()
    setIsTouchMoveFun(true)

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
      console.log('No tasksRef.current')
      return
    }

    if (!selectedTaskRef.current) {
      return console.error('No task selected')
    }

    const cardRect = listRef.current
      ?.querySelector(`#taskCard${selectedTaskRef.current.id}`)
      ?.getBoundingClientRect()

    if (!cardRect) {
      return console.error('No card rect')
    }

    const yChange = touchY - touchCurrentPosition.y

    if (
      listTopPositionRef.current == null ||
      listTopPositionRef.current == undefined
    ) {
      // setListTopPositionState
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

    changeTask(touchAreaRef, selectedTaskRef, tasksRef, handleTaskChangeFun)
  }, [])

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
