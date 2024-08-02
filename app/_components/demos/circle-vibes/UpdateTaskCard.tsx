'use client'
import { IsTaskActive } from '@/app/ui/form-components/is-task-active'
import { PencilIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import BasicTextButton from './BasicTextButton'
import CircleVibesCard from './CircleVibesCard'
import CreateTaskDescriptionListCard from './CreateTaskDescriptionListCard'
import BasicButton from './BasicButton'
import TightCard from './TightCard'

export default function UpdateTaskCard () {
  return (
    <>
      {/* 
      Task update card - Task info
       */}
      <CircleVibesCard>
        <CardTitleRow>
          <h2>Task</h2>
          <div className='flex h-fit'>
            <BasicTextButton type='delete'>Delete</BasicTextButton>
          </div>
        </CardTitleRow>
        <CardRow>
          <label className='flex'>Title</label>
          <TextareaInput id='updateTaskTitle' name='updateTaskTitle' />
        </CardRow>
        <CardRow>
          <label className='flex min-w-[100px]'>Category</label>
          <SelectCategoryInput
            id='taskCategoryId'
            name='taskCategoryId'
            categories={[
              { id: '1', value: 'BRN' },
              { id: '2', value: 'BOD' },
              { id: '3', value: 'NUT' }
            ]}
          />
        </CardRow>
        <CardRow>
          <label className='flex min-w-[100px]'>Is active</label>
          <IsTaskActive isActiveValue={false} />
        </CardRow>
        <CardButtonRow>
          <BasicTextButton href={'/'}>Cancel</BasicTextButton>
          <BasicTextButton>Edit</BasicTextButton>
        </CardButtonRow>
      </CircleVibesCard>
      {/* 
      Task update card - Create List card 
      */}
      <CreateTaskDescriptionListCard>
        <label className='flex min-w-[100px]'>
          <h3>Lists</h3>
        </label>
        <div className='flex min-w-[100px]'>
          <BasicTextButton>
            <>Create list</>
          </BasicTextButton>
        </div>
      </CreateTaskDescriptionListCard>
      {/* 
      Task update card - Update or create list desriptions
       */}
      <CircleVibesCard>
        <CardTitleRow>
          <h2>List</h2>
          <div className='flex h-fit'>
            <BasicTextButton type='delete'>Delete</BasicTextButton>
          </div>
        </CardTitleRow>
        <CardTitleRow>
          <h3 className='flex min-w-[100px] text-xl'>List title</h3>
          <div className='flex h-full items-center justify-center'>
            <BasicButton>
              <PencilIcon className='icon w-5 h-5' />
            </BasicButton>
          </div>
        </CardTitleRow>
        <TightCard>
          <label className='flex pt-1 pb-2'>Description</label>
          <TextareaInput id='updateTaskTitle' name='updateTaskTitle' />
          <CardRow>
            <BasicTextButton type='delete'>Delete</BasicTextButton>
            <BasicTextButton>
              <>Update</>
            </BasicTextButton>
          </CardRow>
        </TightCard>
      </CircleVibesCard>
    </>
  )
}

export const CardTitleRow = ({ children }: { children: React.ReactNode }) => {
  return <div className='flex w-full justify-between pb-3'>{children}</div>
}

export const CardButtonRow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex w-full justify-center pt-3 gap-x-3'>{children}</div>
  )
}

export const CardRow = ({
  children,
  className = undefined
}: {
  children: React.ReactNode
  className?: string | undefined
}) => {
  return (
    <div
      className={`flex w-full items-center gap-x-3 ${
        className ? className : ''
      }`}
    >
      {children}
    </div>
  )
}

export const TextareaInput = ({
  name,
  id,
  placeholder = 'Happy content',
  currentValue = null
}: {
  name: string
  id: string
  placeholder?: string
  currentValue?: null | string
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [textareaState, setTextareaState] = useState<null | string>(
    currentValue
  )

  const handleChange = useDebouncedCallback(
    (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      setTextareaState(ev.target.value)
    },
    300
  )

  const handleBlur = (ev: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!textareaRef.current) return

    handleChange(ev)
  }

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (ev.code !== 'Enter' || !textareaRef.current) return
    ev.preventDefault()
    handleChange.cancel()
    textareaRef.current.blur()
  }

  const handleReset = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!textareaRef.current) return
    textareaRef.current.value = ''
    setTextareaState(null)
  }

  return (
    <div className='relative flex w-full'>
      <textarea
        ref={textareaRef}
        name={name}
        id={id}
        required
        className={`peer description-input-create`}
        placeholder={placeholder}
        defaultValue={textareaState ? textareaState : ''}
        onChange={handleChange}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleReset}
        style={{
          visibility:
            textareaState !== '' && textareaState !== null
              ? 'visible'
              : 'hidden'
        }}
      >
        <XMarkIcon className='textarea-icon' />
      </button>
    </div>
  )
}

export const SelectCategoryInput = ({
  name,
  id,
  categories,
  defaultId
}: {
  name: string
  id: string
  categories: { id: string; value: string }[]
  defaultId?: string | undefined
}) => {
  // Works with ids
  return (
    <select
      name='taskCategoryId'
      id='taskCategoryId'
      defaultValue={defaultId ? defaultId : `${categories[0].id}`}
    >
      {categories.map(({ id, value }) => (
        <option key={`${id}`} value={`${id}`}>
          {value}
        </option>
      ))}
    </select>
  )
}
