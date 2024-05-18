import {
  Dispatch,
  FormEvent,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect
} from 'react'
import { changeTask, yCenterTask } from './task-carousel-utils'
import { Task, TaskCategory } from '@/app/lib/definitions'

type MouseHandlerReturnType = {
  handleScroll: (event: Event) => void
  handleScrollEnd: (event: Event) => void
  handleMouseMove: (event: MouseEvent) => void
  handleMouseClick: (event: FormEvent<HTMLButtonElement>) => void
}

export default function useMouseHandler (
  touchAreaRef: RefObject<HTMLDivElement>,
  listRef: RefObject<HTMLUListElement>,
  selectedCategoryRef: RefObject<TaskCategory | null>,
  selectedTaskRef: RefObject<Task | null>,
  tasksRef: RefObject<Task[] | null>,
  setIsTouchMove: Dispatch<SetStateAction<boolean>>,
  setTaskChange: Dispatch<SetStateAction<Task | null>>
): MouseHandlerReturnType {
  const handleScroll = useCallback(
    (event: Event) => {
      event.preventDefault()
      const newTask = changeTask(touchAreaRef, selectedTaskRef, tasksRef)
      if (newTask && selectedTaskRef.current?.id !== newTask.id) {
        setTaskChange(newTask)
      }
    },
    [touchAreaRef, selectedTaskRef, tasksRef, setTaskChange]
  )

  const handleScrollEnd = useCallback(
    (event: Event) => {
      event.preventDefault()

      const selectedTaskId = selectedTaskRef.current?.id
      if (selectedTaskId !== null && selectedTaskId !== undefined) {
        const taskCardYCenter = yCenterTask(touchAreaRef, selectedTaskId)
        if (taskCardYCenter !== null) {
          touchAreaRef.current?.scrollTo({
            top: -taskCardYCenter,
            behavior: 'smooth'
          })
        }
      }
    },
    [selectedTaskRef, touchAreaRef]
  )

  const handleMouseMove = useCallback((event: MouseEvent) => {
    event.preventDefault()
  }, [])

  const handleMouseClick = useCallback(
    (event: FormEvent<HTMLButtonElement>) => {
      event.preventDefault()
      const nextTaskId = parseInt(event.currentTarget.value)
      const nextTask =
        tasksRef.current?.find(task => task.id === nextTaskId) ?? null

      if (nextTask && selectedTaskRef.current?.id !== nextTask.id) {
        const nextYCenter = yCenterTask(touchAreaRef, nextTask.id)
        if (nextYCenter !== null) {
          touchAreaRef.current?.scrollTo({
            top: -nextYCenter,
            behavior: 'smooth'
          })
        }
      }
    },
    [selectedTaskRef, touchAreaRef, tasksRef]
  )

  useEffect(() => {
    const touchAreaElement = touchAreaRef.current
    touchAreaElement?.addEventListener('scroll', handleScroll)
    touchAreaElement?.addEventListener('scrollend', handleScrollEnd)
    touchAreaElement?.addEventListener('mousemove', handleMouseMove)

    return () => {
      touchAreaElement?.removeEventListener('scroll', handleScroll)
      touchAreaElement?.removeEventListener('scrollend', handleScrollEnd)
      touchAreaElement?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [handleScroll, handleScrollEnd, handleMouseMove, touchAreaRef])

  return { handleScroll, handleScrollEnd, handleMouseMove, handleMouseClick }
}
