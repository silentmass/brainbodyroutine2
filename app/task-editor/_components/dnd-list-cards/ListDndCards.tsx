import {
  FC,
  Dispatch,
  SetStateAction,
  memo,
  useRef,
  useCallback,
  useState,
  useEffect
} from 'react'
import { useDrop } from 'react-dnd'
import { ListCard } from './ListDndCard'
import { ItemTypesContainer } from './ItemTypes'
import { ContainerCard, listContainer } from './definitions'
import update from 'immutability-helper'
import { getDropTargetElementsAtPoint } from '@/app/context/DndProvider'
import { GSSP_NO_RETURNED_VALUE } from 'next/dist/lib/constants'

export const ListContainer: FC<listContainer> = memo(function Container ({
  cards,
  setCards,
  onSelectList,
  onEditModel,
  isModal,
  isModelEdit,
  textureText,
  showTextureText,
  adUrl
}: listContainer) {
  if (!cards || cards === undefined) return null
  const ref = useRef<HTMLUListElement>(null)

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter(
        ({ cardId }) => `${cardId}` === id
      )[0] as ContainerCard
      return {
        card,
        index: cards.indexOf(card)
      }
    },
    [cards]
  )

  const moveCard = useCallback(
    (id: string, atIndex: number) => {
      const { card, index } = findCard(id)
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card]
          ]
        })
      )
    },
    [findCard, cards, setCards]
  )

  const [, drop] = useDrop(() => ({
    accept: ItemTypesContainer.CONTAINERCARD
  }))

  const [isDraggingAction, setIsDraggingAction] = useState<string | null>(null)

  const getPointDragHandlers = (x: number, y: number, id: string) => {
    return getDropTargetElementsAtPoint(
      x,
      y,
      Array.from(document.documentElement.querySelectorAll(`[id^="${id}"]`))
    )
  }

  drop(ref)

  useEffect(() => {
    if (!ref.current) return

    const handleTap = (ev: TouchEvent) => {
      const dhandlers = getPointDragHandlers(
        ev.touches[0].clientX,
        ev.touches[0].clientY,
        'dragHandlerList_'
      )

      const dragging = handleDragging(dhandlers)

      const draggingDescription = handleDragging(
        getPointDragHandlers(
          ev.touches[0].clientX,
          ev.touches[0].clientY,
          'dragHandlerDescription'
        )
      )

      const buttons = getPointDragHandlers(
        ev.touches[0].clientX,
        ev.touches[0].clientY,
        'button'
      )

      if (isModelEdit) {
        console.log('isModelEdit')
        if (!buttons) {
          // Allow page dragging
          console.log('preventDefault')
          ev.preventDefault()
        }
        console.log('stopPropagation')
        ev.stopPropagation()
        return
      }

      if (dragging) {
        console.log(dhandlers[0].id)
        setIsDraggingAction(dhandlers[0].id)
      }

      console.log('draggingDescription', draggingDescription)

      if (!dragging) {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const x = ev.touches[0].clientX
        const y = ev.touches[0].clientY
        const inside =
          x >= rect.left && x <= rect.right && y <= rect.bottom && y >= rect.top

        if (inside && isDraggingAction !== null) {
          console.log('preventDefault', 'Inside ListDndCards')
          // We are dragging and inside target containers, but drag handler was not clicked
          ev.preventDefault()
        }

        if (draggingDescription) return

        console.log('stopPropagation', 'ListDndCards')
        // Prevent propagation from parent containers, but allow normal clicking
        ev.stopPropagation()
        return
      }
    }

    // Have to add to whole document to prevent propagation of events from parents
    // which overrides dragging prevention
    document.documentElement.addEventListener('touchstart', handleTap, {
      passive: false
    })

    return () => {
      document.documentElement.removeEventListener('touchstart', handleTap)
    }
  }, [])

  const handleClick = (ev: React.MouseEvent) => {
    const dhandlers = getPointDragHandlers(
      ev.clientX,
      ev.clientY,
      'dragHandlerList_'
    )
    const dragging = handleDragging(dhandlers)

    const buttons = getPointDragHandlers(ev.clientX, ev.clientY, 'button')

    if (isModelEdit) {
      // Prevent dragging
      console.log('isModelEdit')
      console.log('preventDefault')
      console.log('stopPropagation')
      ev.preventDefault()
      ev.stopPropagation()
      return
    }

    if (dragging) {
      setIsDraggingAction(dhandlers[0].id)
    }

    if (!dragging) {
      console.log(
        'preventDefault and stopPropagation',
        'ListDndCards - handleClick'
      )
      ev.preventDefault()
      ev.stopPropagation()
      return
    }
  }

  const handleDragging = (handlers: Element[] | undefined) => {
    if (handlers && handlers.length) {
      return true
    }
    return false
  }

  const handleDragEnd = () => {
    setIsDraggingAction(null)
  }

  return (
    <ul
      ref={ref}
      className={'description'}
      onMouseDown={handleClick}
      onMouseUp={ev => {
        ev.preventDefault()
        setIsDraggingAction(null)
      }}
      onDragStart={handleClick}
      onDragEnd={ev => {
        handleDragEnd()
      }}
      onTouchEnd={ev => {
        handleDragEnd()
      }}
      onTouchCancel={ev => {
        handleDragEnd()
      }}
    >
      {cards.map(({ cardId, body }) => {
        return (
          <ListCard
            key={`listCard_${cardId}`}
            cardId={`${cardId}`}
            body={body}
            moveCard={moveCard}
            findCard={findCard}
            isDraggingAction={isDraggingAction}
            containerHeight={`${Math.floor(100 / cards.length / 2)}vh`}
            onSelectList={onSelectList}
            onEditModel={onEditModel}
            isModal={isModal}
            isModelEdit={isModelEdit}
            textureText={textureText}
            showTextureText={showTextureText}
            adUrl={adUrl}
          />
        )
      })}
    </ul>
  )
})
