'use client'
import type { Dispatch, FC, SetStateAction } from 'react'
import { memo, useEffect, useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import { ItemTypesContainer } from './ItemTypes'
import clsx from 'clsx'
import { DragIcon } from './DragIcon'
import EditModelCard from './EditModelCard'
import { ContainerCard } from './definitions'
import { PencilIcon } from '@heroicons/react/24/outline'
import Card from '@/app/ui/Card'
import {
  CardRow,
  CardTitleRow
} from '@/app/_components/circle-vibes/UpdateTaskCard'
import BasicTextButton from '@/app/_components/circle-vibes/BasicTextButton'
import BasicButton from '@/app/_components/circle-vibes/BasicButton'
import ModelViewPreview from '@/app/_components/model-palette/model-preview'

export interface ListCardProps extends ContainerCard {
  moveCard: (id: string, to: number) => void
  findCard: (id: string) => { index: number }
  isDraggingAction: string | null
  containerHeight: string
  onSelectList: (id: number) => void
  onEditModel: () => void
  isModal: boolean
  isModelEdit: boolean
  textureText: string
  showTextureText: boolean
  adUrl: string | null
}

export const ListCard: FC<ListCardProps> = memo(function ListCardFun ({
  cardId,
  body,
  moveCard,
  findCard,
  isDraggingAction,
  containerHeight,
  onSelectList,
  onEditModel,
  isModal,
  isModelEdit,
  textureText,
  showTextureText,
  adUrl
}) {
  if (!body) return null

  const ref = useRef<HTMLLIElement>(null)
  const originalIndex = findCard(cardId).index
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: ItemTypesContainer.CONTAINERCARD,
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
      accept: ItemTypesContainer.CONTAINERCARD,
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
      className={`relative flex items-center h-full select-none border-2 border-transparent rounded-cool ${clsx(
        {
          '': !isDraggingAction,
          'opacity-50 border-2 border-accent-7':
            isDragging ||
            (isDraggingAction && isDraggingAction.split('_')[1] === cardId),
          'opacity-80': !isDragging && isDraggingAction
        }
      )}`}
    >
      <Card>
        {/* Select container type */}
        {'description' in body ? (
          <>
            <CardTitleRow>
              <button
                onClick={() => onSelectList(body.id)}
                disabled={isModal}
                style={{
                  cursor: isModal ? 'not-allowed' : 'pointer'
                }}
                className='flex gap-5'
              >
                <h2>{body.title}</h2>
              </button>
              <div>
                <BasicButton
                  onClick={() => onSelectList(body.id)}
                  isVisible={!isModal}
                >
                  <PencilIcon className='icon w-5 h-5' />
                </BasicButton>
              </div>
              {/* Drag button */}
              <div
                className='absolute top-1/2 -translate-y-1/2 right-0 flex justify-center p-1 w-fit'
                style={{
                  visibility: isModal ? 'hidden' : 'visible'
                }}
              >
                <DragHandler scale={1} id={`dragHandlerList_${cardId}`} />
              </div>
            </CardTitleRow>
            <CardRow>
              {body.description && (
                <ul className='flex flex-col w-full pl-2 pr-4 pb-2 list-disc list-inside'>
                  {body.description.map((description, idx) => {
                    return (
                      <li key={idx} className={`w-full h-full items-center`}>
                        {description}
                      </li>
                    )
                  })}
                </ul>
              )}
            </CardRow>
          </>
        ) : (
          <>
            <CardTitleRow>
              <div className='flex w-full justify-end'>
                <BasicButton onClick={() => onEditModel()} isVisible={!isModal}>
                  <PencilIcon className='icon w-5 h-5' />
                </BasicButton>
              </div>
              <div
                className='absolute top-1/2 -translate-y-1/2 right-0 flex justify-center p-1 w-fit'
                style={{
                  visibility: isModal ? 'hidden' : 'visible'
                }}
              >
                <DragHandler scale={1} id={`dragHandlerList_${cardId}`} />
              </div>
            </CardTitleRow>
            <CardRow>
              <div
                className={`model-editor ${clsx({
                  'model-editor-edit-model': isModelEdit,
                  'model-editor-preview': !isModelEdit
                })}`}
              >
                <div className='flex flex-col justify-center items-center gap-5'>
                  <div className='flex w-[200px] h-[200px]'>
                    <ModelViewPreview
                      textureText={textureText}
                      showTextureText={showTextureText}
                    />
                  </div>
                  {adUrl && (
                    <div className='flex'>
                      <BasicTextButton
                        ariaLabel='Order Now'
                        type={undefined}
                        onClick={() => console.log(adUrl)}
                        defaultValue={'buttonOrderNow'}
                      >
                        Order Now
                      </BasicTextButton>
                    </div>
                  )}
                </div>
              </div>
            </CardRow>
          </>
        )}
      </Card>
    </li>
  )
})

export const DragHandler = ({ id, scale }: { id: string; scale: number }) => {
  return (
    <div
      id={`${id}`}
      className='flex h-fit justify-center items-center p-1 select-none'
    >
      <DragIcon className='drag-icon' width={5} height={5} />
    </div>
  )
}
