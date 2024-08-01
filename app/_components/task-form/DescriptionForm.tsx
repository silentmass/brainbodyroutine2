'use client'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  MinusCircleIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline'
import clsx from 'clsx'
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import { useDebouncedCallback } from 'use-debounce'

export type bullet = {
  id: string
  body: string
}

function sliceText (
  currentText: string,
  visibleHeight: null | number,
  totalHeight: null | number
) {
  if (!visibleHeight || !totalHeight) {
    return currentText.slice(0, 50) + '...'
  }

  if (Number(visibleHeight) / Number(totalHeight) > 0.9) {
    return currentText
  }

  return `${currentText.slice(0, 50)} ...`
}

export default function CreateDesriptionForm ({
  taskBullets,
  setTaskBullets
}: {
  taskBullets: bullet[] | null
  setTaskBullets: Dispatch<SetStateAction<bullet[] | null>>
}) {
  const [currentBullet, setCurrentBullet] = useState<bullet | null>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentBullet(previousState =>
        previousState ? { ...previousState, body: e.target.value } : null
      )
    },
    300
  )

  const handleTextAreaBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!textareaRef.current || textareaRef.current.value === '') return

    const updatedBullet = {
      id: taskBullets
        ? `${Math.max(...taskBullets.map(entry => Number(entry.id))) + 1}`
        : `${0}`,
      body: e.target.value
    }

    const newBullets = taskBullets
      ? [...taskBullets, updatedBullet]
      : [updatedBullet]

    setTaskBullets(newBullets)

    setCurrentBullet(null)
    textareaRef.current.value = ''
    textareaRef.current.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code !== 'Enter' || !textareaRef.current) return

    e.preventDefault()
    handleChange.cancel()
    textareaRef.current.blur()
  }

  return (
    <div
      ref={divRef}
      className='flex relative w-full bg-accent-2/30 rounded-md'
    >
      <textarea
        id='createDescription'
        name='createDescription'
        ref={textareaRef}
        rows={3}
        className='peer description-input-create rounded-md'
        placeholder='Description'
        defaultValue={currentBullet ? currentBullet.body : ''}
        onChange={handleChange}
        onBlur={handleTextAreaBlur}
        onKeyDown={handleKeyDown}
      />
      <PlusCircleIcon className='absolute top-1/2 -translate-y-1/2 left-3 h-5 w-5 stroke-cyan-700 peer-focus:stroke-content peer-placeholder-shown:stroke-accent-3 z-10' />
    </div>
  )
}

export function UpdateDescriptionForm ({
  taskBullet,
  taskBullets,
  setTaskBullets,
  isDragging,
  isDraggingAction,
  containerHeight,
  setIsDraggingAction
}: {
  taskBullet: bullet | null
  taskBullets: bullet[] | null
  setTaskBullets: Dispatch<SetStateAction<bullet[] | null>>
  isDragging: boolean
  isDraggingAction: boolean
  containerHeight: string
  setIsDraggingAction: Dispatch<SetStateAction<boolean>>
}) {
  if (!taskBullet) return null
  const divRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [currentBullet, setCurrentBullet] = useState<bullet | null>(taskBullet)

  const FONTSIZE_REM = 1
  const LINEHEIGHT_REM = 1.2
  const REM_TO_PX = 16
  const TEXTAREA_YPADDING = 4
  const PREVIEW_LINES_COUNT = 2
  const PREVIEW_HEIGHT_PX =
    PREVIEW_LINES_COUNT * REM_TO_PX * FONTSIZE_REM +
    REM_TO_PX * LINEHEIGHT_REM +
    TEXTAREA_YPADDING

  const [scrollHeight, setScrollHeight] = useState<null | number>(null)
  const [scrollTop, setScrollPosition] = useState<null | number>(null)
  const [onFocus, setOnFocus] = useState(false)
  const [formContainerHeight, setFormContainerHeight] = useState<null | number>(
    PREVIEW_HEIGHT_PX
  )

  useEffect(() => {
    if (!textareaRef.current) return
    setScrollHeight(textareaRef.current.scrollHeight)
  }, [setScrollHeight, textareaRef.current])

  useEffect(() => {
    if (!textareaRef.current) return
    setScrollPosition(textareaRef.current.offsetTop)
  }, [setScrollPosition, textareaRef.current])

  useEffect(() => {
    if (!textareaRef.current) return

    textareaRef.current.style.height = 'auto'
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }, [taskBullet, textareaRef.current])

  useEffect(() => {
    setIsDraggingAction(isDragging)
  }, [isDragging, setIsDraggingAction])

  useEffect(() => {
    if (!textareaRef.current) return
    textareaRef.current.blur()
  }, [isDragging, textareaRef.current])

  const deleteDescription = () => {
    if (!currentBullet) return

    setTaskBullets(previousState =>
      previousState
        ? previousState.filter(entry => entry.id !== currentBullet.id)
        : null
    )
    setCurrentBullet(null)
  }

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentBullet(previousState =>
        previousState ? { ...previousState, body: e.target.value } : null
      )

      setScrollHeight(e.target.scrollHeight)

      if (!divRef.current) return

      const scrollDistanceToBottom =
        divRef.current.getBoundingClientRect().bottom -
        (e.target.getBoundingClientRect().y +
          Number(e.target.style.height.replace('px', '')))

      const scrollDistanceToTop =
        divRef.current.getBoundingClientRect().top -
        e.target.getBoundingClientRect().y
    },
    300
  )

  const handleTextAreaBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!textareaRef.current) return
    if (!currentBullet) return

    if (isStringEmpty(e.target.value)) return deleteDescription()

    const updatedBullet = {
      id: currentBullet.id,
      body: e.target.value
    }

    setCurrentBullet(updatedBullet)

    setTaskBullets(previousState =>
      previousState
        ? previousState?.map(entry => {
            if (entry.id !== updatedBullet.id) return entry
            return updatedBullet
          })
        : null
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!currentBullet || e.code !== 'Enter' || !textareaRef.current) return

    e.preventDefault()
    handleChange.cancel()
    textareaRef.current.blur()
  }

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault()
    deleteDescription()
  }

  const handleCollapseDescription = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault()

    if (!textareaRef.current) return

    if (!onFocus) return

    setOnFocus(false)

    if (!scrollHeight) return

    setFormContainerHeight(
      PREVIEW_LINES_COUNT *
        Number(
          window
            .getComputedStyle(textareaRef.current)
            .lineHeight.replace('px', '')
        ) +
        TEXTAREA_YPADDING
    )
  }

  const handleShowTextarea = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!textareaRef.current) return
    setOnFocus(true)

    if (!textareaRef.current || !scrollHeight) return
    setFormContainerHeight(Number(`${scrollHeight}`.replace('px', '')))
  }

  const slicedBody = sliceText(
    taskBullet.body,
    formContainerHeight,
    scrollHeight
  )

  return (
    <div
      ref={divRef}
      className={`relative flex w-full bg-accent-2/50 overflow-hidden rounded-md ${clsx(
        {
          '': !isDraggingAction,
          'opacity-50': isDraggingAction && !isDragging
        }
      )}`}
      style={{
        cursor: 'move',
        height: isDraggingAction
          ? Number(`${containerHeight}`.replace('vh', '')) + 'vh'
          : `${formContainerHeight}px`
      }}
    >
      {/* Delete bullet */}
      <div className='flex sticky top-0 text-xs w-fit min-w-10'>
        <div className='flex relative w-fit h-full'>
          <button
            id={`deleteBullet_${taskBullet?.id}`}
            className='flex absolute top-1/2 -translate-y-1/2 left-3 select-none w-5 h-5 rounded-full'
            onClick={handleDeleteClick}
          >
            <MinusCircleIcon className=' h-5 w-5 stroke-cyan-700 peer-focus:stroke-content peer-placeholder-shown:stroke-accent-3' />
          </button>
        </div>
      </div>
      <div className='flex relative w-full'>
        {/* Collapse textarea */}
        <div
          className='flex absolute top-0 right-0'
          style={{ visibility: !onFocus ? 'hidden' : 'visible' }}
        >
          <button
            id={`collapseDescription_${taskBullet?.id}`}
            onClick={handleCollapseDescription}
          >
            <ChevronDownIcon className='w-5 h-5 stroke-accent-2' />
          </button>
        </div>
        {/* Show sliced preview when not in focus */}
        <div
          id='descriptionPreview'
          className='flex absolute top-0 w-full h-full py-[4px] bg-transparent pl-2 pr-2 border-transparent text-accent-5'
          onClick={handleShowTextarea}
          style={{ visibility: onFocus ? 'hidden' : 'visible' }}
        >
          {slicedBody}
        </div>
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          id={`updateDescription_${taskBullet?.id}`}
          name={`updateDescription_${taskBullet?.id}`}
          className='peer description-input'
          defaultValue={taskBullet.body}
          placeholder='Bullet'
          onChange={handleChange}
          onBlur={handleTextAreaBlur}
          onKeyDown={handleKeyDown}
          style={{ visibility: !onFocus ? 'hidden' : 'visible' }}
        />
      </div>
    </div>
  )
}

export function isStringEmpty (testString: string) {
  return (
    testString == '' ||
    (testString.search(/^ /) !== -1 &&
      testString.split('\n') &&
      testString.search(/\n$/) !== -1)
  )
}
