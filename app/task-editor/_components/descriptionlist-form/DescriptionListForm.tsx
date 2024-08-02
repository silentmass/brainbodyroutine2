'use client'
import { useContext, useMemo, useRef } from 'react'
import clsx from 'clsx'
import { SpinnerFormButton } from '@/app/ui/form-components/buttons'
import CreateDesriptionForm from './CreateDescriptionForm'
import {
  DescriptionCards,
  ListDescriptionCard
} from '../dnd-list-cards/definitions'
import { DescriptionDndCards } from './dnd-description-cards/DescriptionDndCards'
import { DescriptionListHeader } from './definitions'
import { FormContext } from '../Contexts'
import BasicTextButton from '@/app/_components/demos/circle-vibes/BasicTextButton'

export default function DescriptionListForm ({
  list,
  setCards,
  onChange,
  onDescriptionCreate,
  onDescriptionDelete,
  onListDelete,
  onListReset,
  isCreate
}: {
  list: ListDescriptionCard
  setCards: (cards: DescriptionCards[] | null) => void
  onChange: (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void
  onDescriptionCreate: (desciption: string) => void
  onDescriptionDelete: (cardId: number) => void
  onListDelete: (event: React.FormEvent<HTMLButtonElement>) => void
  onListReset: (event: React.FormEvent<HTMLButtonElement>) => void
  isCreate: boolean
}) {
  // const [message, formAction] = useFormState(createDescriptionList, null)
  const formContext = useContext(FormContext)

  return (
    // <form id={'descriptionListForm'} ref={ref} action={sendList}>
    <div className='flex-col-w-full gap-2 h-fit'>
      <div className='relative flex flex-col'>
        <h1
          className={`description ${clsx({
            'text-accent-2/50': list.title === '' || list.title === null,
            '': list.title !== ''
          })}`}
        >
          {list.title ? list.title : 'Title'}
        </h1>
      </div>
      {list.descriptionCards && (
        <DescriptionDndCards
          cards={list.descriptionCards}
          setCards={setCards}
          onChange={onChange}
          onDescriptionDelete={onDescriptionDelete}
        />
      )}

      <div className='flex flex-wrap w-full gap-2'>
        <div className='flex w-full'>
          <CreateDesriptionForm onDescriptionCreate={onDescriptionCreate} />
        </div>
        <div className='flex w-full'>
          <DescriptionListTitleInput
            title={list.title !== '' ? list.title : null}
            onChange={onChange}
          />
        </div>
        <div className='flex w-full justify-center p-5 gap-5'>
          <BasicTextButton
            ariaLabel={'Delete list'}
            type={'delete'}
            onClick={onListDelete}
            defaultValue={list.listId}
          >
            Delete
          </BasicTextButton>
          <BasicTextButton
            ariaLabel={'Reset list'}
            type={undefined}
            onClick={onListReset}
            defaultValue={list.listId}
          >
            Clear
          </BasicTextButton>

          <BasicTextButton
            ariaLabel={'Create Description List'}
            isPing={formContext && formContext.isDirty ? true : false}
            type={'submit'}
            defaultValue={list.listId}
          >
            {isCreate ? 'Create' : 'Update'}
          </BasicTextButton>
        </div>
        {/* {message && (
            <ul aria-live='polite'>
              {messageToList(message).map((entry, idx) => (
                <li key={idx}>{entry.replace(/.\d{1}/, '')}</li>
              ))}
            </ul>
          )} */}
      </div>
    </div>
    // </form>
  )
}

export function DescriptionListTitleInput ({
  title,
  onChange
}: DescriptionListHeader) {
  const ref = useRef<HTMLInputElement | null>(null)
  return (
    <div className='relative flex w-full'>
      <label
        className='description absolute top-[0px]'
        htmlFor='listHeaderInput'
      >
        Title
      </label>
      <input
        className='description'
        ref={ref}
        id='listHeader'
        name='listHeader'
        type='text'
        placeholder='e.g., Instructions'
        defaultValue={title ? title : ''}
        required
        onChange={onChange}
        onKeyDown={e => {
          if (e.code === 'Enter' && ref.current) {
            ref.current.blur()
          }
        }}
      />
    </div>
  )
}
