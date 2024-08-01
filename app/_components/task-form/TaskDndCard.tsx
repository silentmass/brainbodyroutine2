'use client'
import type { CSSProperties, Dispatch, FC, SetStateAction } from 'react'
import { memo, useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { ItemTypes } from './ItemTypes'
import { bullet, UpdateDescriptionForm } from './DescriptionForm'
import clsx from 'clsx'

const style: CSSProperties = {
  cursor: 'move'
}

export interface CardProps {
  id: string
  body: string
  moveCard: (id: string, to: number) => void
  findCard: (id: string) => { index: number }
  taskBullet: bullet
  taskBullets: bullet[]
  setTaskBullets: Dispatch<SetStateAction<bullet[] | null>>
  isDraggingAction: boolean
  setIsDraggingAction: Dispatch<SetStateAction<boolean>>
  containerHeight: string
}

interface Item {
  id: string
  originalIndex: number
}

export const TaskDndCard: FC<CardProps> = memo(function Card ({
  id,
  body,
  moveCard,
  findCard,
  taskBullet,
  taskBullets,
  setTaskBullets,
  isDraggingAction,
  setIsDraggingAction,
  containerHeight
}) {
  const ref = useRef<HTMLLIElement>(null)
  const originalIndex = findCard(id).index
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypes.CARD,
      item: { id, originalIndex },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      }),
      end: (item, monitor) => {
        const { id: droppedId, originalIndex } = item
        const didDrop = monitor.didDrop()
        if (!didDrop) {
          moveCard(droppedId, originalIndex)
        }
      }
    }),
    [id, originalIndex, moveCard]
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.CARD,
      hover ({ id: draggedId }: Item) {
        if (draggedId !== id) {
          const { index: overIndex } = findCard(id)
          moveCard(draggedId, overIndex)
        }
      }
    }),
    [findCard, moveCard]
  )

  if (!taskBullet) return null

  drag(drop(ref))

  return (
    <li ref={ref}>
      <UpdateDescriptionForm
        taskBullet={taskBullet}
        taskBullets={taskBullets}
        setTaskBullets={setTaskBullets}
        isDragging={isDragging}
        isDraggingAction={isDraggingAction}
        containerHeight={containerHeight}
        setIsDraggingAction={setIsDraggingAction}
      />
    </li>
  )
})
