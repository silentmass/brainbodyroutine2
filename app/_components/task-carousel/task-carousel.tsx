'use client'
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import {
  Tag,
  Task,
  TaskCategory,
  TaskDescriptionList
} from '@/app/lib/definitions'
import TaskCard from '@/app/ui/tasks/card'
import clsx from 'clsx'
import useTouchHandler from './task-carousel-touch-handlers'
import {
  getListVerticalPadding,
  yCenterTask,
  yCenterTaskScroll
} from './task-carousel-utils'
import useMouseHandler from './task-carousel-mouse-handlers'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

const touchAreaHeight = 200
const gradientHeight = Math.round(touchAreaHeight / 5)

export const TaskCarousel = ({
  tasks,
  selectedTask,
  handleTaskChange,
  selectedCategory,
  handleViewModeClick,
  showOpenTaskLink = true,
  showEditTaskButtons = true,
  horizontal = false,
  invert = true,
  formActionDeleteTaskFun,
  formActionUpdateTaskFun,
  formActionDuplicateTaskFun,
  isTokenValid
}: {
  tasks: Task[]
  selectedTask: Task
  handleTaskChange: Dispatch<SetStateAction<Task | null>>
  selectedCategory: TaskCategory | null
  handleViewModeClick: (event: FormEvent<HTMLButtonElement>) => void
  showOpenTaskLink?: boolean
  showEditTaskButtons?: boolean
  horizontal: boolean
  invert: boolean
  formActionDeleteTaskFun: (
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<any>
  formActionUpdateTaskFun: (
    user_id: string,
    description_lists: TaskDescriptionList[] | null,
    tags: Tag[] | null,
    id: string,
    prevState: any,
    formData: FormData
  ) => Promise<any>
  formActionDuplicateTaskFun: (
    user_id: string,
    description_lists: TaskDescriptionList[] | null,
    tags: Tag[] | null,
    prevState: any,
    formData: FormData
  ) => Promise<any>
  isTokenValid: boolean
}) => {
  const touchAreaRef = useRef<HTMLDivElement>(null)

  // Get touch area dimension
  const initCounter = useRef(0)

  const listRef = useRef<HTMLUListElement>(null)

  // Touch movement flag state
  const [isTouchMove, setIsTouchMove] = useState(false)

  // Changed during touch move
  const selectedCategoryRef = useRef(selectedCategory)
  const selectedTaskRef = useRef(selectedTask)
  const tasksRef = useRef(tasks)

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
      selectedCategoryRef,
      selectedTaskRef,
      tasksRef,
      setIsTouchMove,
      handleTaskChange
    )

  const { handleTouchStart, handleTouchMove, handleTouchEnd } = useTouchHandler(
    touchAreaRef,
    listRef,
    selectedCategoryRef,
    selectedTaskRef,
    tasksRef,
    listTopPositionStateRef,
    isTouchMove,
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
    selectedTaskRef.current = selectedTask
  }, [selectedTask])

  useEffect(() => {
    tasksRef.current = tasks
  }, [tasks])

  useEffect(() => {
    listPaddingRef.current = listPaddingState
  }, [listPaddingState])

  useEffect(() => {
    selectedCategoryRef.current = selectedCategory
    if (selectedTaskRef.current) {
      const selectedTaskYCenter = yCenterTask(
        touchAreaRef,
        selectedTaskRef.current.id
      )

      // Init list position to show selected task
      // Move list for mobile and scroll on desktop and mouse
      const isMobile = window.innerWidth <= 767

      if (isMobile) {
        // Move list on mobile

        if (selectedTaskYCenter !== null) {
          setListTopPositionState(selectedTaskYCenter)
        }
      }
    }
  }, [selectedCategory])

  useEffect(() => {
    if (!selectedTaskRef.current) {
      handleTaskChange(tasks[0])
      selectedTaskRef.current = tasks[0]
    }

    // Pad card list to position first and last cards at the center of the touch area

    // Get start and end card positions
    const listVerticalPadding = getListVerticalPadding(touchAreaRef, tasks)
    listPaddingRef.current = listVerticalPadding
    setListPaddingState(listVerticalPadding)

    if (touchAreaRef?.current?.scrollHeight === undefined) {
      console.error('Touch area has no height')
      return
    }

    const selectedTaskYCenter = yCenterTask(
      touchAreaRef,
      selectedTaskRef.current.id
    )

    // Init list position to show selected task
    // Move list for mobile and scroll on desktop and mouse
    const isMobile = window.innerWidth <= 767

    if (isMobile) {
      // Move list on mobile

      if (selectedTaskYCenter !== null) {
        setListTopPositionState(
          selectedTaskYCenter - listPaddingRef.current.top
        )
      }
    } else {
      // Scroll on desktop

      const endPositionSelectedCardScroll = yCenterTaskScroll(
        touchAreaRef,
        selectedTaskRef.current.id
      )

      initCounter.current += 1

      selectedTaskYCenter !== null &&
        touchAreaRef.current.scrollTo({
          top: -selectedTaskYCenter + listPaddingRef.current.top,
          behavior: 'instant'
        })
    }

    const toucharea = touchAreaRef.current

    toucharea.addEventListener('scroll', handleScroll, {
      passive: false
    })
    toucharea.addEventListener('scrollend', handleScrollEnd)
    toucharea.addEventListener('mousemove', handleMouseMove)
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
      toucharea.removeEventListener('scrollend', handleScrollEnd)
      toucharea.removeEventListener('mousemove', handleMouseMove)
      toucharea.removeEventListener('touchstart', handleTouchStart)
      toucharea.removeEventListener('touchmove', handleTouchMove)
      toucharea.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <div
      id='touchArea'
      ref={touchAreaRef}
      className={`relative flex flex-col w-full select-none overflow-auto hide-scrollbar rounded-cool border-0`}
      style={{ height: `${touchAreaHeight}px` }}
    >
      {/* Top gradient fade */}
      <div
        id='touchAreaTopGradient'
        className={`task-carousel-gradient-mask bg-gradient-to-t`}
        style={{
          visibility:
            selectedTask && tasks && selectedTask.id !== tasks[0].id
              ? 'visible'
              : 'hidden',
          height: `${gradientHeight}px`,
          top: `0px`
        }}
      >
        <button
          id='listButtonUp'
          name='listButtonUp'
          onClick={handleMouseClick}
          className={`flex w-full h-full justify-center items-center rounded-t-cool  border-0 ${clsx(
            {
              '': selectedTask && selectedTask.id !== tasks[0].id,
              hidden: selectedTask && selectedTask.id === tasks[0].id
            }
          )}`}
          value={
            tasks &&
            selectedTask !== undefined &&
            tasks.findIndex(({ id }) => id === selectedTask.id) !== -1 &&
            tasks.findIndex(({ id }) => id === selectedTask.id) > 0
              ? tasks[tasks.findIndex(({ id }) => id === selectedTask.id) - 1]
                  .id
              : 'null'
          }
        >
          <ChevronUpIcon id='listIconUp' className={`h-5 stroke-accent-3`} />
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div
        id='touchAreaBottomGradient'
        className={`task-carousel-gradient-mask bg-gradient-to-b`}
        style={{
          visibility:
            selectedTask &&
            tasks &&
            selectedTask.id !== tasks[tasks.length - 1].id
              ? 'visible'
              : 'hidden',
          height: `${gradientHeight}px`,
          top: `${touchAreaHeight - gradientHeight}px`
        }}
      >
        <button
          id='listButtonDown'
          name='listButtonDown'
          onClick={handleMouseClick}
          className={`flex w-full h-full justify-center items-center rounded-b-cool  border-0 ${clsx(
            {
              '':
                selectedTask &&
                tasks &&
                selectedTask.id !== tasks[tasks.length - 1].id,
              hidden:
                selectedTask &&
                tasks &&
                selectedTask.id === tasks[tasks.length - 1].id
            }
          )}`}
          value={
            tasks &&
            selectedTask !== undefined &&
            tasks.findIndex(({ id }) => id === selectedTask.id) !== -1 &&
            tasks.length - 1 >
              tasks.findIndex(({ id }) => id === selectedTask.id)
              ? tasks[tasks.findIndex(({ id }) => id === selectedTask.id) + 1]
                  .id
              : 'null'
          }
        >
          <ChevronDownIcon
            id='listIconDown'
            className={`h-5 stroke-accent-3`}
          />
        </button>
      </div>

      {/* Task card carousel */}
      {touchAreaRef && tasks && tasks.length && selectedTask !== null && (
        <ul
          ref={listRef}
          id='taskList'
          className={`absolute flex flex-col w-full px-1 gap-y-1 items-center select-none z-0 pt-[100px] pb-[100px]  border-0 `}
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
                className={`flex relative w-full rounded-cool  border-0 ${clsx({
                  'outline-2 outline-offset-0 outline-dashed outline-accent-3 opacity-100':
                    task.id === selectedTask?.id && isTouchMove,
                  'opacity-50': task.id !== selectedTask?.id && isTouchMove,
                  'opacity-100': task.id !== selectedTask?.id && !isTouchMove
                })}`}
              >
                <TaskCard
                  task={task}
                  showOpenTaskLink={showOpenTaskLink}
                  showEditTaskButtons={showEditTaskButtons}
                  handleViewModeClick={handleViewModeClick}
                  formActionDeleteTaskFun={formActionDeleteTaskFun}
                  formActionUpdateTaskFun={formActionUpdateTaskFun.bind(
                    null,
                    `${task.user_id}`,
                    task.description_lists,
                    task.tags,
                    !('id' in task) || task.id === undefined ? '' : `${task.id}`
                  )}
                  formActionDuplicateTaskFun={formActionDuplicateTaskFun.bind(
                    null,
                    `${task.user_id}`,
                    task.description_lists,
                    task.tags
                  )}
                  isTokenValid={isTokenValid}
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  )
}

export default TaskCarousel
