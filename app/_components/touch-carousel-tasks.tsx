'use client'
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import { Task } from '@/app/lib/definitions'
import TaskCard from '@/app/ui/tasks/card'
import clsx from 'clsx'
import { never } from 'zod'

export interface coords {
  x: number | null
  y: number | null
}

async function animateListMovement (
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

function selectTaskCard (
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

function getClosestTaskCardPosition (
  tasks: Task[],
  position: number,
  parentDivRef: RefObject<HTMLDivElement>
) {
  const possibleEndPositions = tasks.map(task =>
    yCenterTask(parentDivRef, task.id)
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

function yCenterTask (ref: RefObject<HTMLDivElement>, taskID: number) {
  // Find touch area dimensions
  const touchAreaRect = ref.current?.getBoundingClientRect()

  const listRect = ref.current
    ?.querySelector('#taskList')
    ?.getBoundingClientRect()

  const cardRect = ref.current
    ?.querySelector(`#taskCard${taskID}`)
    ?.getBoundingClientRect()

  if (touchAreaRect && cardRect && listRect) {
    const cardYCenter = cardRect.y + cardRect.height / 2
    return listRect.y - (cardYCenter - touchAreaRect?.height / 2)
  }
  return null
}

function getRollingDistance (velocity: number) {
  const direction = velocity < 0 ? -1 : 1
  const velocityFactor = 1 - (1 - Math.abs(velocity / 6000) ** 2) ** 2
  return Math.abs(velocity * velocityFactor) * direction
}

export const TouchCarouselTasks = ({
  divRef = null,
  tasks = null,
  selectedTask = null,
  handleTaskChange,
  horizontal = false,
  invert = true
}: {
  divRef: RefObject<HTMLDivElement> | null
  tasks: Task[] | null
  selectedTask: Task | null
  handleTaskChange: Dispatch<SetStateAction<Task | null>>
  horizontal: boolean
  invert: boolean
}) => {
  // Get touch area dimension

  const listRef = useRef<HTMLUListElement>(null)

  // Touch movement flag state
  const [isTouchMove, setIsTouchMove] = useState(false)

  // Changed during touch move
  const [selectedTaskState, setSelectedTaskState] = useState<Task | null>(
    selectedTask
  )
  const selectedTaskStateRef = useRef(selectedTaskState)

  // State used to calculate touch position
  const [touchCoords, setTouchCoords] = useState<coords>({ x: null, y: null })

  // Task list dimension and position states
  const [listBoundingRectState, setListBoundingRectState] =
    useState<DOMRect | null>(null)

  const listBoundingRectStateRef = useRef(listBoundingRectState)

  const [listTopPositionState, setListTopPositionState] = useState<
    number | null
  >(null)
  const listTopPositionStateRef = useRef(listTopPositionState)

  const [listPadding, setListPadding] = useState({ top: 0, bottom: 0 })

  useEffect(() => {
    listTopPositionStateRef.current = listTopPositionState
  }, [listTopPositionState])

  // Use effect functions
  useEffect(() => {
    listBoundingRectStateRef.current = listBoundingRectState
  }, [listBoundingRectState])

  useEffect(() => {
    selectedTaskStateRef.current = selectedTaskState
  }, [selectedTaskState])

  // Init component and touch handlers definitions

  useEffect(() => {
    let touchTimer: number
    let touchStartPosition: { x: number; y: number; time: number }
    let touchCurrentPosition: {
      x: number
      y: number
      time: number
      velocity: { x: number; y: number }
      acceleration: { x: number; y: number }
    }

    const parentDiv = divRef

    let isEndAutoScroll = false

    if (parentDiv === null) {
      console.error('Missin parent div ref')
      return
    }

    const touchAreaRect = parentDiv.current?.getBoundingClientRect()

    if (!touchAreaRect) {
      console.error('No touch area!')
      return
    }

    if (!tasks) return

    const cardRectFirst = parentDiv.current
      ?.querySelector(`#taskCard${tasks[0].id}`)
      ?.getBoundingClientRect()
    const cardRectLast = parentDiv.current
      ?.querySelector(`#taskCard${tasks[tasks.length - 1].id}`)
      ?.getBoundingClientRect()

    setListPadding(previousState => ({
      top: cardRectFirst
        ? touchAreaRect?.height / 2 - cardRectFirst?.height / 2
        : previousState.top,
      bottom: cardRectLast
        ? touchAreaRect?.height / 2 - cardRectLast?.height / 2
        : previousState.bottom
    }))

    const touchAreaCenterY = touchAreaRect?.height / 2 + touchAreaRect?.y

    // Init list position to show selected task
    if (selectedTaskStateRef.current && parentDiv !== null) {
      const startPosition = 0

      const endPositionSelectedCard = yCenterTask(
        parentDiv,
        selectedTaskStateRef.current.id
      )

      if (
        endPositionSelectedCard !== null &&
        startPosition !== undefined &&
        startPosition !== null &&
        cardRectFirst
      ) {
        setListTopPositionState(
          endPositionSelectedCard -
            (touchAreaRect?.height / 2 - cardRectFirst?.height / 2)
        )
        console.log(endPositionSelectedCard)
        // animateListMovement(
        //   startPosition,
        //   endPositionSelectedCard -
        //     (touchAreaRect?.height / 2 - cardRectFirst?.height / 2),
        //   setListTopPositionState
        // )
      }
    }

    // Touch event handlers

    // Touch start

    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault()
      setIsTouchMove(true)

      if (!tasks) {
        console.log('No category tasks')
        return
      }

      touchTimer = performance.now()
      console.log('handleTouchStart', touchTimer)

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
    }

    // Touch end

    const handleTouchEnd = (event: TouchEvent) => {
      event.preventDefault()

      const touchDuration = performance.now() - touchTimer
      console.log('handleTouchEnd', touchDuration)

      // Tap

      if (touchDuration < 120) {
        console.log('tap')
        const elementUnderTouch = document.elementFromPoint(
          touchCurrentPosition.x,
          touchCurrentPosition.y
        )
        console.log(elementUnderTouch, elementUnderTouch?.tagName)
        if (
          elementUnderTouch &&
          elementUnderTouch?.tagName.toLowerCase() === 'button'
        ) {
          ;(elementUnderTouch as HTMLButtonElement).click()
        }
      }

      const averageEndVelocity =
        (touchCurrentPosition.y - touchStartPosition.y) /
        ((touchCurrentPosition.time - touchStartPosition.time) / 1000)

      if (
        listTopPositionStateRef.current === null ||
        listTopPositionStateRef.current === undefined ||
        isNaN(averageEndVelocity)
      ) {
        setIsTouchMove(false)
        return
      }

      if (!selectedTaskStateRef.current) {
        console.error('No tasks selected')
        return
      }

      // Animate end rolling

      const listRect = listRef.current?.getBoundingClientRect()

      if (listRect && tasks !== null) {
        const animateRolling = (position: number) => {
          // Change selected task

          setListTopPositionState(position)
          const currentTask = selectTaskCard(
            tasks,
            listRef,
            touchAreaCenterY,
            setSelectedTaskState
          )
          handleTaskChange(currentTask)
        }

        const listTopPositionAfterEndRolling =
          listTopPositionStateRef.current +
          getRollingDistance(averageEndVelocity)

        // Get closest card position to  after rolling end position
        const closestCardPosition = getClosestTaskCardPosition(
          tasks,
          listTopPositionAfterEndRolling,
          parentDiv
        )

        if (
          closestCardPosition !== null &&
          closestCardPosition !== undefined &&
          listTopPositionStateRef.current !== undefined &&
          listTopPositionStateRef.current !== null
        ) {
          animateListMovement(
            listTopPositionStateRef.current,
            closestCardPosition,
            animateRolling
          ).then(() => {
            console.log('setIsTouchMove end')
            setIsTouchMove(false)
          })
        }
      }
    }

    // Touch move

    const handleTouchMove = (event: TouchEvent) => {
      event.preventDefault()
      setIsTouchMove(true)

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

      setTouchCoords({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      })

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

      if (!selectedTaskStateRef.current) {
        return console.error('No task selected')
      }

      const cardRect = listRef.current
        ?.querySelector(`#taskCard${selectedTaskStateRef.current.id}`)
        ?.getBoundingClientRect()

      if (!cardRect) {
        return console.error('No card rect')
      }

      const yChange = touchY - touchCurrentPosition.y

      if (
        listTopPositionStateRef.current == null ||
        listTopPositionStateRef.current == undefined
      ) {
        // setListTopPositionState
        return
      }

      const newListTopPosition = listTopPositionStateRef.current + yChange

      if (
        (newListTopPosition > listTopPositionStateRef.current &&
          tasks[0].id !== selectedTaskStateRef.current.id) ||
        (newListTopPosition < listTopPositionStateRef.current &&
          tasks[tasks.length - 1].id !== selectedTaskStateRef.current.id)
      ) {
        setListTopPositionState(newListTopPosition)
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
        setSelectedTaskState
      )
      handleTaskChange(currentTask)
    }

    const handleScroll = (event: Event) => {
      event.preventDefault()
      if (!tasks) return

      // Change selected task
      const currentTask = selectTaskCard(
        tasks,
        listRef,
        touchAreaCenterY,
        setSelectedTaskState
      )

      setIsTouchMove(true)
      handleTaskChange(currentTask)
    }

    const handleScrollEnd = (event: Event) => {
      event.preventDefault()
      console.log('handleScrollEnd')
      setIsTouchMove(false)

      const currentTask = selectTaskCard(
        tasks,
        listRef,
        touchAreaCenterY,
        setSelectedTaskState
      )
      const cardRect = currentTask
        ? listRef.current
            ?.querySelector(`#taskCard${currentTask.id}`)
            ?.getBoundingClientRect()
        : null

      if (divRef && cardRect) {
        const endShiftY = touchAreaCenterY - (cardRect.y + cardRect.height / 2)

        endShiftY &&
          divRef.current?.scrollTo({
            top: divRef.current?.scrollTop - endShiftY,
            behavior: 'smooth'
          })
        // divRef.current?.scrollTo(0, divRef.current?.scrollTop - endShiftY)
      }
    }

    if (parentDiv.current) {
      parentDiv.current.addEventListener('scrollend', handleScrollEnd)
      parentDiv.current?.addEventListener('scroll', handleScroll, {
        passive: false
      })
      parentDiv.current?.addEventListener('touchstart', handleTouchStart, {
        passive: false
      })
      parentDiv.current?.addEventListener('touchmove', handleTouchMove, {
        passive: false
      })
      parentDiv.current?.addEventListener('touchend', handleTouchEnd, {
        passive: false
      })
    }

    return () => {
      if (parentDiv.current) {
        parentDiv.current?.removeEventListener('scrollend', handleScrollEnd)
        parentDiv.current?.removeEventListener('scroll', handleScroll)
        parentDiv.current?.removeEventListener('touchstart', handleTouchStart)
        parentDiv.current?.removeEventListener('touchmove', handleTouchMove)
        parentDiv.current?.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [divRef, tasks])

  return (
    <ul
      ref={listRef}
      id='taskList'
      className={`absolute flex flex-col w-full gap-y-1 items-center select-none z-0 rounded-2xl p-1 pt-[100px] pb-[100px]`}
      style={{
        top: `${listTopPositionState}px`,
        paddingTop: `${listPadding.top}px`,
        paddingBottom: `${listPadding.bottom}px`
      }}
    >
      {tasks !== null &&
        tasks.map(task => (
          <li
            id={`taskCard${task.id}`}
            key={task.id}
            className={`flex w-full rounded-2xl  ${clsx({
              'outline-2 outline-offset-0 outline-dashed outline-gray-200 opacity-100':
                task.id === selectedTaskState?.id && isTouchMove,
              'opacity-50': task.id !== selectedTaskState?.id && isTouchMove,
              'opacity-20': task.id !== selectedTaskState?.id && !isTouchMove
            })}`}
          >
            <TaskCard task={task}>
              <></>
            </TaskCard>
          </li>
        ))}
    </ul>
  )
}

export default TouchCarouselTasks
