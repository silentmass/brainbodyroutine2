import {
  Dispatch,
  FormEvent,
  MutableRefObject,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect
} from 'react'
import {
  changeTask,
  getTaskCard,
  getTaskCardRect,
  getTouchAreaRect,
  selectTaskCard,
  yCenterTask
} from './task-carousel-utils'
import { Task, TaskCategory } from '@/app/lib/definitions'

export default function useMouseHandler (
  touchAreaRef: RefObject<HTMLDivElement>,
  listRef: RefObject<HTMLUListElement>,
  selectedCategoryRef: RefObject<TaskCategory | null>,
  selectedTaskRef: RefObject<Task | null>,
  tasksRef: RefObject<Task[] | null>,
  setIsTouchMoveFun: Dispatch<SetStateAction<boolean>>,
  handleTaskChangeFun: Dispatch<SetStateAction<Task | null>>
): {
  handleScroll: (event: Event) => void
  handleScrollEnd: (event: Event) => void
  handleMouseMove: (event: MouseEvent) => void
  handleMouseClick: (event: FormEvent<HTMLButtonElement>) => void
} {
  const touchAreaRect = touchAreaRef?.current?.getBoundingClientRect()
  const touchAreaCenterY = touchAreaRect
    ? touchAreaRect?.height / 2 + touchAreaRect?.y
    : 0

  const handleScroll = useCallback((event: Event) => {
    event.preventDefault()
    // setIsTouchMoveFun(true)

    console.log('handleScroll')

    changeTask(touchAreaRef, selectedTaskRef, tasksRef, handleTaskChangeFun)
  }, [])

  const handleScrollEnd = useCallback((event: Event) => {
    console.group('handleScrollEnd')

    event.preventDefault()
    // setIsTouchMoveFun(false)

    if (selectedTaskRef.current === null) {
      console.log('Selected task is null')
      return
    }

    const taskCardYCenter = yCenterTask(
      touchAreaRef,
      selectedTaskRef.current.id
    )

    if (taskCardYCenter === null) {
      console.log('Task y center is null')
      return
    }

    touchAreaRef.current?.scrollTo({
      top: -taskCardYCenter,
      behavior: 'smooth'
    })

    console.groupEnd()
  }, [])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    event.preventDefault()

    const elementUnderClick = document.elementFromPoint(
      event.clientX,
      event.clientY
    )
  }, [])

  const handleMouseClick = useCallback(
    (event: FormEvent<HTMLButtonElement>) => {
      event.preventDefault()

      const nextTask =
        event.currentTarget.value !== null && tasksRef.current
          ? tasksRef.current.filter(
              task => task.id === parseInt(event.currentTarget.value)
            )[0]
          : null

      console.log('Mouse click', event.currentTarget.value, nextTask)

      if (nextTask !== null && nextTask !== undefined) {
        const nextYCenter = yCenterTask(touchAreaRef, nextTask.id)
        nextYCenter !== null &&
          touchAreaRef.current?.scrollTo({
            top: -nextYCenter,
            behavior: 'smooth'
          })
      }
    },
    []
  )

  useEffect(() => {
    touchAreaRef?.current?.addEventListener('scroll', handleScroll)
    touchAreaRef?.current?.addEventListener('scrollend', handleScrollEnd)
    touchAreaRef?.current?.addEventListener('mousemove', handleMouseMove)

    return () => {
      touchAreaRef?.current?.removeEventListener('scroll', handleScroll)
      touchAreaRef?.current?.removeEventListener('scrollend', handleScrollEnd)
      touchAreaRef?.current?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleScroll, handleScrollEnd, handleMouseMove])

  return { handleScroll, handleScrollEnd, handleMouseMove, handleMouseClick }
}
