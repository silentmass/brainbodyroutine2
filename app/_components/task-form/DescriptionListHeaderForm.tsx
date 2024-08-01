'use client'
import { useRef } from 'react'
import { DescriptionListHeader } from './TaskBulletTable'

export default function CreateDescriptionListHeader ({
  header,
  setHeader
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
        value={header ? header : ''}
        onChange={e => {
          e.preventDefault()
          setHeader(e.target.value)
        }}
        onKeyDown={e => {
          if (e.code === 'Enter' && ref.current) {
            ref.current.blur()
          }
        }}
      />
    </div>
  )
}
