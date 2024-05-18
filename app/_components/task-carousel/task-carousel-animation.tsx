import { Task } from '@/app/lib/definitions'
import { Dispatch, RefObject, SetStateAction } from 'react'
import { changeTask } from './task-carousel-utils'

export async function animateListMovement (
  startPosition: number,
  endPosition: number,
  setPositionStateFun: (position: number) => void
) {
  return new Promise(resolve => {
    const dt = 1 / 120
    const velocityPxPerSec = 1300
    const distance = endPosition - startPosition
    const duration = Math.abs(distance) / velocityPxPerSec
    const step = dt * (distance / duration)
    let timer: NodeJS.Timeout
    let position = startPosition
    let startTime = performance.now() / 1000
    let currentTime = 0
    let relativePosition = 0
    let dampeningFactor = 1

    timer = setInterval(() => {
      currentTime = performance.now() / 1000
      const totalTime = currentTime - startTime
      const inside = relativePosition >= 0 && relativePosition <= 1
      if (inside) {
        // Include sigmoid factor here

        relativePosition = (position + step - startPosition) / distance
        dampeningFactor = (1 - relativePosition ** 4) ** 2
        position = position + step + dampeningFactor
        setPositionStateFun(position)
      } else {
        position = endPosition
        setPositionStateFun(position)
        clearInterval(timer)
        resolve(true)
      }
    }, Math.round(1000 * dt))
  })
}

export const animateRollingWrapper = (
  touchAreaRef: RefObject<HTMLDivElement>,
  selectedTaskRef: RefObject<Task | null>,
  tasksRef: RefObject<Task[] | null>,
  setListTopPositionFun: Dispatch<SetStateAction<number | null>>,
  setTaskChange: Dispatch<SetStateAction<Task | null>>
) => {
  const animateRolling = (position: number) => {
    // Change list position
    setListTopPositionFun(position)
    // Change selected task
    const newTask = changeTask(touchAreaRef, selectedTaskRef, tasksRef)
    if (
      newTask !== undefined &&
      newTask !== null &&
      selectedTaskRef.current &&
      selectedTaskRef.current.id !== newTask.id
    ) {
      setTaskChange(newTask)
    }
  }
  return animateRolling
}
