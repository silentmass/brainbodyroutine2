'use client'
import {
  useCallback,
  useState,
  FC,
  memo,
  SetStateAction,
  Dispatch,
  useRef
} from 'react'
import CreateDesriptionForm, { bullet } from './DescriptionForm'
import update from 'immutability-helper'
import { ItemTypes } from './ItemTypes'
import CreateDescriptionListHeader from './DescriptionListHeaderForm'
import clsx from 'clsx'
import { SpinnerFormButton } from '@/app/ui/form-components/buttons'
import { useFormState } from 'react-dom'
import { createDescriptionList } from './actions'
import { TaskDndCard } from './TaskDndCard'
import { useDrop } from 'react-dnd'

export const Container: FC<{
  cards: bullet[] | null
  setCards: Dispatch<SetStateAction<bullet[] | null>>
}> = memo(function Container ({
  cards,
  setCards
}: {
  cards: bullet[] | null
  setCards: Dispatch<SetStateAction<bullet[] | null>>
}) {
  if (!cards) return null
  const ref = useRef<HTMLUListElement>(null)

  const findCard = useCallback(
    (id: string) => {
      const card = cards.filter(c => `${c.id}` === id)[0] as {
        id: string
        body: string
      }
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
    accept: ItemTypes.CARD
  }))

  const [isDraggingAction, setIsDraggingAction] = useState(false)
  const containerHeight = `${Math.floor(100 / cards.length / 2)}vh`

  drop(ref)

  return (
    <ul ref={ref} className={'description'}>
      {cards.map(card => (
        <TaskDndCard
          key={`${card.id}_${card.body.slice(0, 3)}`}
          id={`${card.id}`}
          body={card.body}
          moveCard={moveCard}
          findCard={findCard}
          taskBullet={card}
          taskBullets={cards}
          setTaskBullets={setCards}
          isDraggingAction={isDraggingAction}
          setIsDraggingAction={setIsDraggingAction}
          containerHeight={containerHeight}
        />
      ))}
    </ul>
  )
})

export interface DescriptionListHeader {
  header: string | null
  setHeader: (header: string | null) => void
}

export const messageToList: (message: any) => string[] = (message: any) => {
  if (typeof message !== 'object' || message === null) return [`${message}`]

  const result: string[] = []

  const traverse = (obj: any, path: string) => {
    if (typeof obj !== 'object' || obj === null) {
      result.push(`${path}: ${obj}`)
      return
    }

    for (const [key, value] of Object.entries(obj)) {
      traverse(value, path ? `${path}.${key}` : key)
    }
  }

  traverse(message, '')
  return result
}

export default function TaskBulletTable () {
  const [taskBullets, setTaskBullets] = useState<bullet[] | null>([
    {
      id: '0',
      body: 'Execution: → Stand tall with feet hip-width apart. → Take a step forward with your right leg, lowering your hips until both knees are bent at about a 90-degree angle. Ensure your right knee does not go past your right toes. → Push back up to the starting position and repeat with the left leg.'
    },
    {
      id: '1',
      body: 'Warm-Up: Begin with a 5-10 minute warm-up of light cardio (e.g., jogging in place, jumping jacks) to get your muscles ready.'
    },
    {
      id: '2',
      body: 'Repetitions: Continue alternating legs until you reach a total of 300 lunges. Break the lunges into sets if needed (e.g., 10 sets of 30 lunges).'
    }
    // {
    //   id: '3',
    //   body: 'Repetitions: Continue alternating legs until you reach a total of 300 lunges. Break the lunges into sets if needed (e.g., 10 sets of 30 lunges).'
    // },
    // {
    //   id: '4',
    //   body: 'Repetitions: Continue alternating legs until you reach a total of 300 lunges. Break the lunges into sets if needed (e.g., 10 sets of 30 lunges).'
    // }
  ])

  const [descriptionListHeader, setDescriptionListHeader] = useState<
    null | string
  >('Instructions')

  const [message, formAction] = useFormState(createDescriptionList, null)

  return (
    <form action={formAction}>
      <div className='flex-col-w-full gap-2 h-fit'>
        <div className='relative flex flex-col'>
          <label className='description absolute top-[0px]'>List</label>
          <h1
            className={`description ${clsx({
              'text-accent-2/50':
                descriptionListHeader === '' || descriptionListHeader === null,
              '': descriptionListHeader !== ''
            })}`}
          >
            {descriptionListHeader ? descriptionListHeader : 'Header'}
          </h1>
        </div>
        {taskBullets && (
          <Container cards={taskBullets} setCards={setTaskBullets} />
        )}

        <div className='flex flex-wrap w-full gap-2'>
          <div className='flex w-full'>
            <CreateDesriptionForm
              taskBullets={taskBullets}
              setTaskBullets={setTaskBullets}
            />
          </div>
          <div className='flex w-full'>
            <CreateDescriptionListHeader
              header={descriptionListHeader}
              setHeader={setDescriptionListHeader}
            />
          </div>
          <div className='flex w-full justify-center p-5'>
            <SpinnerFormButton
              ariaLabel={'Create Description List'}
              className={''}
              type={'submit'}
            >
              Create
            </SpinnerFormButton>
          </div>
          {message && (
            <ul aria-live='polite'>
              {messageToList(message).map((entry, idx) => (
                <li key={idx}>{entry.replace(/.\d{1}/, '')}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </form>
  )
}
