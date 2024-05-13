import {
  Dispatch,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect
} from 'react'
import { selectTaskCard, yCenterTask } from './task-carousel-utils'
import { Task } from '@/app/lib/definitions'

export default function useMouseHandler (
  touchAreaRef: RefObject<HTMLDivElement>,
  listRef: RefObject<HTMLUListElement>,
  tasks: Task[],
  selectedTaskRef: MutableRefObject<Task>,
  setIsTouchMoveFun: Dispatch<SetStateAction<boolean>>,
  handleTaskChangeFun: Dispatch<SetStateAction<Task | null>>
): {
  handleScroll: (event: Event) => void
  handleScrollEnd: (event: Event) => void
  handleMouseMove: (event: MouseEvent) => void
  handleMouseClick: (event: MouseEvent) => void
} {
  const touchAreaRect = touchAreaRef?.current?.getBoundingClientRect()
  const touchAreaCenterY = touchAreaRect
    ? touchAreaRect?.height / 2 + touchAreaRect?.y
    : 0
  const lastCardYCenter = yCenterTask(touchAreaRef, tasks[tasks.length - 1].id)

  const handleScroll = useCallback((event: Event) => {
    event.preventDefault()

    // Change selected task
    const currentTask = selectTaskCard(
      tasks,
      listRef,
      touchAreaCenterY,
      handleTaskChangeFun
    )

    setIsTouchMoveFun(true)
    currentTask !== null && handleTaskChangeFun(currentTask)
  }, [])

  const handleScrollEnd = useCallback((event: Event) => {
    event.preventDefault()
    console.log('handleScrollEnd')
    setIsTouchMoveFun(false)
    const currentTask = selectTaskCard(
      tasks,
      listRef,
      touchAreaCenterY,
      handleTaskChangeFun
    )
    const cardRect = currentTask
      ? listRef.current
          ?.querySelector(`#taskCard${currentTask.id}`)
          ?.getBoundingClientRect()
      : null

    if (cardRect) {
      const endShiftY = touchAreaCenterY - (cardRect.y + cardRect.height / 2)
      endShiftY &&
        touchAreaRef.current?.scrollTo({
          top: touchAreaRef.current?.scrollTop - endShiftY,
          behavior: 'smooth'
        })
      // touchAreaRef.current?.scrollTo(
      //   0,
      //   touchAreaRef.current?.scrollTop - endShiftY
      // )
    }
  }, [])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    event.preventDefault()

    const elementUnderClick = document.elementFromPoint(
      event.clientX,
      event.clientY
    )
  }, [])

  const handleMouseClick = useCallback((event: MouseEvent) => {
    // event.preventDefault()

    console.log('Click')

    const elementUnderClick = document.elementFromPoint(
      event.clientX,
      event.clientY
    )

    const cardRect = selectedTaskRef.current
      ? listRef.current
          ?.querySelector(`#taskCard${selectedTaskRef.current.id}`)
          ?.getBoundingClientRect()
      : null

    if (
      elementUnderClick &&
      (elementUnderClick?.id === 'listButtonUp' ||
        elementUnderClick?.id === 'listIconUp')
    ) {
      console.log('Up click', touchAreaRef.current?.scrollTop)

      cardRect &&
        touchAreaRef?.current?.scrollTo({
          top: touchAreaRef?.current?.scrollTop - cardRect?.height,
          behavior: 'smooth'
        })
    } else if (
      elementUnderClick &&
      (elementUnderClick?.id === 'listButtonDown' ||
        elementUnderClick?.id === 'listIconDown')
    ) {
      console.log('Down click')

      cardRect &&
        touchAreaRef?.current?.scrollTo({
          top: touchAreaRef.current?.scrollTop + cardRect?.height,
          behavior: 'smooth'
        })
    }
  }, [])

  useEffect(() => {
    touchAreaRef?.current?.addEventListener('scroll', handleScroll)
    touchAreaRef?.current?.addEventListener('scrollend', handleScrollEnd)
    touchAreaRef?.current?.addEventListener('mousemove', handleMouseMove)
    touchAreaRef?.current?.addEventListener('click', handleMouseClick)

    return () => {
      touchAreaRef?.current?.removeEventListener('scroll', handleScroll)
      touchAreaRef?.current?.removeEventListener('scrollend', handleScrollEnd)
      touchAreaRef?.current?.removeEventListener('mousemove', handleMouseMove)
      touchAreaRef?.current?.removeEventListener('click', handleMouseClick)
    }
  }, [handleScroll, handleScrollEnd, handleMouseMove, handleMouseClick])

  return { handleScroll, handleScrollEnd, handleMouseMove, handleMouseClick }
}
