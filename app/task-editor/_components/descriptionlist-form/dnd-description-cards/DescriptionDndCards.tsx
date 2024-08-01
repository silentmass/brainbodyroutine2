import { FC, memo, useRef, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import {
  DescriptionCard,
  DescriptionCards
} from '../../dnd-list-cards/definitions'
import { DescriptionDndCard } from './DescriptionDndCard'
import { ItemTypes } from './ItemTypes'
import update from 'immutability-helper'

export const DescriptionDndCards: FC<DescriptionCard> = memo(
  function DescriptionCardContainer ({
    cards,
    setCards,
    onChange,
    onDescriptionDelete
  }: DescriptionCard) {
    if (!cards || cards == undefined) return null
    const ref = useRef<HTMLUListElement>(null)

    const findCard = useCallback(
      (id: string) => {
        const card = cards.filter(
          ({ cardId }) => `${cardId}` === id
        )[0] as DescriptionCards
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
      accept: ItemTypes.DESCIPTION_CARD
    }))

    const [isDraggingAction, setIsDraggingAction] = useState(false)

    drop(ref)

    return (
      <ul ref={ref} className={'description'}>
        {cards.map(({ cardId, body: { description } }) => {
          return (
            <DescriptionDndCard
              key={`descriptionCard_${cardId}`}
              cardId={`${cardId}`}
              moveCard={moveCard}
              findCard={findCard}
              description={description}
              cards={cards}
              setCards={setCards}
              isDraggingAction={isDraggingAction}
              setIsDraggingAction={setIsDraggingAction}
              containerHeight={`${Math.floor(100 / cards.length / 2)}vh`}
              onChange={onChange}
              onDescriptionDelete={onDescriptionDelete}
            />
          )
        })}
      </ul>
    )
  }
)
