'use client'
import type { CSSProperties, Dispatch, FC, SetStateAction } from 'react'
import { memo, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { ItemTypes } from './ItemTypes'
import { UpdateDescriptionForm } from '../EditDescriptionForm'
import {
  DescriptionCard,
  ListDescriptionCard
} from '../../dnd-list-cards/definitions'

const style: CSSProperties = {
  cursor: 'move'
}

export interface CardProps extends DescriptionCard {
  cardId: string
  description: string
  moveCard: (id: string, to: number) => void
  findCard: (id: string) => { index: number }
  isDraggingAction: boolean
  setIsDraggingAction: Dispatch<SetStateAction<boolean>>
  containerHeight: string
}

export const DescriptionDndCard: FC<CardProps> = memo(function Card ({
  cardId,
  description,
  moveCard,
  findCard,
  isDraggingAction,
  setIsDraggingAction,
  containerHeight,
  cards,
  setCards,
  onChange,
  onDescriptionDelete
}) {
  const ref = useRef<HTMLLIElement>(null)
  const originalIndex = findCard(cardId).index
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.DESCIPTION_CARD,
      item: { cardId, originalIndex },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {
        const { cardId: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveCard(droppedId, originalIndex)
        }
      }
    }),
    [cardId, originalIndex, moveCard]
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.DESCIPTION_CARD,
      hover ({ cardId: draggedId }: { cardId: string; originalIndex: number }) {
        if (draggedId !== cardId) {
          const { index: overIndex } = findCard(cardId)
          moveCard(draggedId, overIndex)
        }
      }
    }),
    [findCard, moveCard]
  )

  drag(drop(ref))

  return (
    <li
      ref={ref}
      id={`dragHandlerDescription`}
      onTouchStart={ev => {
        console.log('description touch start')
        isDragging && setIsDraggingAction(true)
      }}
      onTouchEnd={ev => {
        console.log('description touch end')
        setIsDraggingAction(false)
      }}
    >
      <UpdateDescriptionForm
        cardId={cardId}
        description={description}
        isDragging={isDragging}
        isDraggingAction={isDraggingAction}
        containerHeight={containerHeight}
        onChange={onChange}
        onDescriptionDelete={onDescriptionDelete}
      />
    </li>
  )
})
