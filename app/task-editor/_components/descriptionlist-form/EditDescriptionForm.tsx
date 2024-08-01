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
import { isStringEmpty, sliceText } from './utils'

interface FormProps {
  cardId: string
  description: string
  isDragging: boolean
  isDraggingAction: boolean
  containerHeight: string
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  onDescriptionDelete: (cardId: number) => void
}

export function UpdateDescriptionForm ({
  cardId,
  description,
  isDragging,
  isDraggingAction,
  containerHeight,
  onChange,
  onDescriptionDelete
}: FormProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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
  }, [description, textareaRef.current])

  useEffect(() => {
    if (!textareaRef.current) return
    textareaRef.current.blur()
  }, [isDragging, textareaRef.current])

  const deleteDescription = () => {
    if (!description) return

    if (!textareaRef.current) return

    onDescriptionDelete(Number(cardId))
  }

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setScrollHeight(e.target.scrollHeight)

      if (!divRef.current) return

      onChange(e)

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
    if (!description) return

    if (isStringEmpty(e.target.value)) return deleteDescription()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!description || e.code !== 'Enter' || !textareaRef.current) return

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
        TEXTAREA_YPADDING * 2
    )
  }

  const handleShowTextarea = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!textareaRef.current) return
    setOnFocus(true)

    if (!textareaRef.current || !scrollHeight) return
    setFormContainerHeight(Number(`${scrollHeight}`.replace('px', '')))
  }

  const slicedBody = sliceText(description, formContainerHeight, scrollHeight)

  return (
    <div
      ref={divRef}
      className={`relative flex w-full overflow-hidden rounded-md ${clsx({
        'bg-accent-2/90': !isDraggingAction,
        'opacity-50': isDragging,
        'opacity-80': !isDragging && isDraggingAction
      })}`}
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
            id={`deleteBullet_${cardId}`}
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
            id={`collapseDescription_${cardId}`}
            onClick={handleCollapseDescription}
          >
            <ChevronDownIcon className='w-5 h-5 stroke-accent-3/90' />
          </button>
        </div>
        {/* Show sliced preview when not in focus */}
        <div
          id={`updateDescriptionPreview_${cardId}`}
          className='description-input flex absolute top-0 w-full h-full border-transparent text-accent-5'
          onClick={handleShowTextarea}
          style={{ visibility: onFocus ? 'hidden' : 'visible' }}
        >
          {slicedBody}
        </div>
        {/* Textarea */}
        <textarea
          ref={textareaRef}
          id={`updateDescription_${cardId}`}
          name={`updateDescription_${cardId}`}
          // rows={2}
          className='peer description-input'
          defaultValue={description ? description : ''}
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
