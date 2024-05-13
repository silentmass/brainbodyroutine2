import {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect
} from 'react'
import { Task } from '@/app/lib/definitions'
import {
  getClosestTaskCardPosition,
  getRollingDistance,
  selectTaskCard
} from './task-carousel-utils'
import { animateListMovement } from './task-carousel-animation'

export default function useTouchHandler (
  touchAreaRef: RefObject<HTMLDivElement>,
  listRef: RefObject<HTMLUListElement>,
  tasks: Task[],
  selectedTaskRef: MutableRefObject<Task>,
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

      const cardRect = selectedTaskRef.current
        ? listRef.current
            ?.querySelector(`#taskCard${selectedTaskRef.current.id}`)
            ?.getBoundingClientRect()
        : null

      if (elementUnderClick && elementUnderClick?.id === 'listButtonUp') {
        console.log('Up click')

        // Move list up

        const listRect = listRef.current?.getBoundingClientRect()

        if (
          listRect &&
          tasks !== null &&
          listTopPositionRef.current !== null &&
          cardRect &&
          listRef !== null
        ) {
          const animateRolling = (position: number) => {
            // Change selected task

            setListTopPositionFun(position)
            const currentTask = selectTaskCard(
              tasks,
              listRef,
              touchAreaCenterY,
              handleTaskChangeFun
            )
            currentTask !== null && handleTaskChangeFun(currentTask)
          }

          const listTopPositionAfterEndRolling =
            listTopPositionRef.current + cardRect?.height

          // Get closest card position to  after rolling end position
          const closestCardPosition = getClosestTaskCardPosition(
            tasks,
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

        const listRect = listRef.current?.getBoundingClientRect()

        if (
          listRect &&
          tasks !== null &&
          listTopPositionRef.current !== null &&
          cardRect
        ) {
          const animateRolling = (position: number) => {
            // Change selected task

            setListTopPositionFun(position)
            const currentTask = selectTaskCard(
              tasks,
              listRef,
              touchAreaCenterY,
              handleTaskChangeFun
            )
            currentTask !== null && handleTaskChangeFun(currentTask)
          }

          const listTopPositionAfterEndRolling =
            listTopPositionRef.current - cardRect?.height

          // Get closest card position to  after rolling end position
          const closestCardPosition = getClosestTaskCardPosition(
            tasks,
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
      console.error('No tasks selected')
      return
    }

    // Animate end rolling

    const listRect = listRef.current?.getBoundingClientRect()

    if (listRect && tasks !== null) {
      const animateRolling = (position: number) => {
        // Change selected task

        setListTopPositionFun(position)
        const currentTask = selectTaskCard(
          tasks,
          listRef,
          touchAreaCenterY,
          handleTaskChangeFun
        )
        currentTask !== null && handleTaskChangeFun(currentTask)
      }

      const listTopPositionAfterEndRolling =
        listTopPositionRef.current + getRollingDistance(averageEndVelocity)

      // Get closest card position to  after rolling end position
      const closestCardPosition = getClosestTaskCardPosition(
        tasks,
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
    if (!tasks) {
      console.log('No tasks')
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
        tasks[0].id !== selectedTaskRef.current.id) ||
      (newListTopPosition < listTopPositionRef.current &&
        tasks[tasks.length - 1].id !== selectedTaskRef.current.id)
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

    // Change selected task
    const currentTask = selectTaskCard(
      tasks,
      listRef,
      touchAreaCenterY,
      handleTaskChangeFun
    )
    currentTask !== null && handleTaskChangeFun(currentTask)
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
