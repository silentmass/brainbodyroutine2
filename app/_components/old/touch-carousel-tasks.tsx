'use client'
import {
  Dispatch,
  MutableRefObject,
  ReactNode,
  RefObject,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { Task } from '@/app/lib/definitions'
import TaskCard from '@/app/ui/tasks/card'
import clsx from 'clsx'
import useTouchHandler from '../task-carousel/task-carousel-touch-handlers'
import {
  getListVerticalPadding,
  yCenterTask,
  yCenterTaskScroll
} from '../task-carousel/task-carousel-utils'
import useMouseHandler from '../task-carousel/task-carousel-mouse-handlers'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'

export const TouchCarouselTasks = ({
  tasks,
  selectedTask,
  handleTaskChange,
  horizontal = false,
  invert = true
}: {
  tasks: Task[]
  selectedTask: Task
  handleTaskChange: Dispatch<SetStateAction<Task | null>>
  horizontal: boolean
  invert: boolean
}) => {
  const touchAreaRef = useRef<HTMLDivElement>(null)

  const touchAreaHeight = 200
  const gradientHeight = Math.round(touchAreaHeight / 5)
  const gradientContainerStyle = `from-transparent dark:to-black to-white to-80% w-full z-10`

  const router = useRouter()
  // Get touch area dimension
  let initCounter = 0

  const listRef = useRef<HTMLUListElement>(null)

  // Touch movement flag state
  const [isTouchMove, setIsTouchMove] = useState(false)

  // Changed during touch move
  const [selectedTaskState, setSelectedTaskState] = useState<Task>(selectedTask)
  const selectedTaskStateRef = useRef(selectedTaskState)

  const selectedTaskElementRef = useRef(null)

  // Task list dimension and position states
  const [listBoundingRectState, setListBoundingRectState] =
    useState<DOMRect | null>(null)

  const listBoundingRectStateRef = useRef(listBoundingRectState)

  const [listTopPositionState, setListTopPositionState] = useState<
    number | null
  >(null)
  const listTopPositionStateRef = useRef(listTopPositionState)

  const [listPaddingState, setListPaddingState] = useState({
    top: 0,
    bottom: 0
  })

  const listPaddingRef = useRef(listPaddingState)

  const { handleScroll, handleScrollEnd, handleMouseMove, handleMouseClick } =
    useMouseHandler(
      touchAreaRef,
      listRef,
      tasks,
      selectedTaskStateRef,
      setSelectedTaskState,
      setIsTouchMove,
      handleTaskChange
    )

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchHandler(
    touchAreaRef,
    listRef,
    tasks,
    selectedTaskStateRef,
    listTopPositionStateRef,
    setSelectedTaskState,
    setIsTouchMove,
    handleTaskChange,
    setListTopPositionState
  )

  useEffect(() => {
    listTopPositionStateRef.current = listTopPositionState
  }, [listTopPositionState])

  useEffect(() => {
    listBoundingRectStateRef.current = listBoundingRectState
  }, [listBoundingRectState])

  useEffect(() => {
    selectedTaskStateRef.current = selectedTaskState
  }, [selectedTaskState])

  useEffect(() => {
    listPaddingRef.current = listPaddingState
  }, [listPaddingState])

  useEffect(() => {
    if (!selectedTaskStateRef.current) {
      setSelectedTaskState(tasks[0])
      selectedTaskStateRef.current = tasks[0]
    }

    // Pad card list to position first and last cards at the center of the touch area

    // Get start and end card positions
    const listVerticalPadding = getListVerticalPadding(touchAreaRef, tasks)

    setListPaddingState(previousState => listVerticalPadding)

    if (touchAreaRef?.current?.scrollHeight === undefined) {
      console.error('Touch area has no height')
      return
    }
    const scrollEnd =
      touchAreaRef?.current?.scrollHeight - touchAreaRef?.current?.offsetHeight

    const endPositionSelectedCard = yCenterTask(
      touchAreaRef,
      selectedTaskStateRef.current.id
    )

    const yCenterDistancesFromTouchAreaYCenter = tasks.map(entry => {
      if (entry.id) {
        const rect = touchAreaRef?.current
          ?.querySelector(`#taskCard${entry.id}`)
          ?.getBoundingClientRect()

        if (rect && touchAreaRef?.current) {
          const y = rect.y - touchAreaRef?.current.offsetTop
          const yCenter = listVerticalPadding.top + y + rect.height / 2
          return yCenter - touchAreaRef?.current.offsetHeight / 2
        }
      }
    })

    // Init list position to show selected task
    // Move list for mobile and scroll on desktop and mouse
    const isMobile = window.innerWidth <= 767

    if (isMobile) {
      // Move list on mobile
      console.log('Mobile')
      console.log('selectedTask', selectedTaskStateRef.current.title)

      if (endPositionSelectedCard !== null) {
        setListTopPositionState(
          endPositionSelectedCard - listVerticalPadding.top
        )
      }
    } else {
      // Scroll on desktop
      console.group('Desktop')

      const endPositionSelectedCardScroll = yCenterTaskScroll(
        touchAreaRef,
        selectedTaskStateRef.current.id
      )

      console.log('selectedTask', selectedTaskStateRef.current.title)
      console.log('endPositionSelectedCard', endPositionSelectedCard)
      console.log(
        'endPositionSelectedCardScroll',
        endPositionSelectedCardScroll
      )
      console.log('element.scrollTop', touchAreaRef?.current.scrollTop)
      console.log('initCounter', initCounter)
      initCounter += 1
      console.groupEnd()

      touchAreaRef.current.scrollTo({ top: 0, behavior: 'instant' })
    }

    touchAreaRef?.current?.addEventListener('scroll', handleScroll, {
      passive: false
    })
    touchAreaRef?.current?.addEventListener('scrollend', handleScrollEnd)
    touchAreaRef?.current?.addEventListener('mousemove', handleMouseMove)
    touchAreaRef?.current?.addEventListener('click', handleMouseClick)
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
      touchAreaRef?.current?.removeEventListener('scrollend', handleScrollEnd)
      touchAreaRef?.current?.removeEventListener('mousemove', handleMouseMove)
      touchAreaRef?.current?.removeEventListener('click', handleMouseClick)
      touchAreaRef?.current?.removeEventListener('touchstart', handleTouchStart)
      touchAreaRef?.current?.removeEventListener('touchmove', handleTouchMove)
      touchAreaRef?.current?.removeEventListener('touchend', handleTouchEnd)
    }
  }, [tasks])

  function scrollToSelectedTask () {
    const endPositionSelectedCard = yCenterTask(
      touchAreaRef,
      selectedTaskStateRef.current.id
    )

    console.group('scrollToSelectedTask', selectedTaskStateRef.current.title)
    console.log('endPositionSelectedCard', endPositionSelectedCard)

    if (endPositionSelectedCard !== null) {
      console.log('scrollTo', -endPositionSelectedCard)

      touchAreaRef.current?.scrollBy({
        top: -endPositionSelectedCard,
        behavior: 'instant'
      })
    }
    console.groupEnd()
  }

  // const setRef = useCallback(node => {
  //   if (node) {
  //     console.log('useCallback')
  //     scrollToSelectedTask()
  //   }
  //   touchAreaRef.current = node
  // }, [])

  return (
    <div
      id='touchArea'
      ref={touchAreaRef}
      className={`relative flex flex-col w-full rounded-2xl select-none overflow-auto hide-scrollbar`}
      style={{ height: `${touchAreaHeight}px` }}
    >
      {/* Top gradient fade */}
      <div
        id='touchAreaTopGradient'
        className={`flex sticky bg-gradient-to-t ${gradientContainerStyle} z-1  rounded-t-2xl ${clsx(
          {
            'hover:bg-gray-900':
              selectedTaskState &&
              tasks &&
              selectedTaskState.id !== tasks[0].id,
            '':
              selectedTaskState && tasks && selectedTaskState.id === tasks[0].id
          }
        )}`}
        style={{
          height: `${gradientHeight}px`,
          top: `0px`
        }}
      >
        <button
          id='listButtonUp'
          name='listButtonUp'
          className='flex w-full h-full justify-center items-center rounded-t-2xl'
        >
          <ChevronUpIcon
            className={`h-5 stroke-gray-800 ${clsx({
              '': selectedTaskState.id !== tasks[0].id,
              hidden: selectedTaskState.id === tasks[0].id
            })}`}
          />
        </button>
      </div>
      <div
        className='flex sticky left-0 w-6 z-40 justify-center items-center'
        style={{
          top: `${gradientHeight}px`,
          height: `${touchAreaHeight - 2 * gradientHeight}px`
        }}
      >
        <div className='flex h-[1px] w-full bg-slate-400'></div>
      </div>
      {/* Bottom gradient fade */}
      <div
        id='touchAreaBottomGradient'
        className={`flex sticky bg-gradient-to-b ${gradientContainerStyle} z-1 rounded-b-2xl ${clsx(
          {
            'hover:bg-gray-900':
              selectedTaskState &&
              tasks &&
              selectedTaskState.id !== tasks[tasks.length - 1].id,
            '':
              selectedTaskState &&
              tasks &&
              selectedTaskState.id === tasks[tasks.length - 1].id
          }
        )}`}
        style={{
          height: `${gradientHeight}px`,
          top: `${touchAreaHeight - gradientHeight}px`
        }}
      >
        <button
          id='listButtonDown'
          name='listButtonDown'
          className='flex w-full h-full justify-center items-center rounded-b-2xl'
        >
          <ChevronDownIcon
            className={`h-5 stroke-gray-800 ${clsx({
              '':
                selectedTaskState &&
                tasks &&
                selectedTaskState.id !== tasks[tasks.length - 1].id,
              hidden:
                selectedTaskState &&
                tasks &&
                selectedTaskState.id === tasks[tasks.length - 1].id
            })}`}
          />
        </button>
      </div>

      {/* Task card carousel */}
      {touchAreaRef && tasks && tasks.length && selectedTask !== null && (
        <ul
          ref={listRef}
          id='taskList'
          className={`absolute flex flex-col w-full gap-y-1 items-center select-none z-0 rounded-2xl p-1 pt-[100px] pb-[100px]`}
          style={{
            top: `${listTopPositionState}px`,
            paddingTop: `${listPaddingState.top}px`,
            paddingBottom: `${listPaddingState.bottom}px`
          }}
        >
          {tasks !== null &&
            tasks.map(task => (
              <li
                id={`taskCard${task.id}`}
                key={task.id}
                className={`flex relative w-full rounded-2xl  ${clsx({
                  'outline-2 outline-offset-0 outline-dashed outline-gray-200 opacity-100':
                    task.id === selectedTaskState?.id && isTouchMove,
                  'opacity-50':
                    task.id !== selectedTaskState?.id && isTouchMove,
                  'opacity-100':
                    task.id !== selectedTaskState?.id && !isTouchMove
                })}`}
              >
                <div className='absolute top-0 left-5 flex h-full w-full items-center'>
                  <div className='flex w-full bg-gray-400 h-[1px] z-40'></div>
                </div>
                <div className='absolute top-0 left-5 flex h-full w-full items-center justify-center z-30'>
                  <button
                    className='flex items-center justify-center border rounded p-2'
                    onClick={scrollToSelectedTask}
                  >
                    Scroll To
                  </button>
                </div>
                <TaskCard task={task}>
                  <></>
                </TaskCard>
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default TouchCarouselTasks
