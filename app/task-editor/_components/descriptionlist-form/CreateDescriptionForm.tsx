'use client'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Dispatch, SetStateAction, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { bullet } from './definitions'

export default function CreateDesriptionForm ({
  onDescriptionCreate
}: {
  onDescriptionCreate: (desciption: string) => void
}) {
  const [currentDescription, setCurrentDescription] = useState<bullet | null>(
    null
  )
  const divRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCurrentDescription(previousState =>
        previousState ? { ...previousState, body: e.target.value } : null
      )
    },
    300
  )

  const handleTextAreaBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!textareaRef.current || textareaRef.current.value === '') return

    onDescriptionCreate(textareaRef.current.value)

    setCurrentDescription(null)
    textareaRef.current.value = ''
    textareaRef.current.focus()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code !== 'Enter' || !textareaRef.current) return

    e.preventDefault()
    handleChange.cancel()

    textareaRef.current.blur()
  }

  return (
    <div ref={divRef} className='flex relative w-full rounded-md'>
      <textarea
        id='createDescription'
        name='createDescription'
        ref={textareaRef}
        rows={3}
        className='peer description-input-create'
        placeholder='Description'
        defaultValue={currentDescription ? currentDescription.body : ''}
        onBlur={handleTextAreaBlur}
        onKeyDown={handleKeyDown}
      />
      <PlusCircleIcon className='absolute top-1/2 -translate-y-1/2 left-3 h-5 w-5 stroke-cyan-700 peer-focus:stroke-content peer-placeholder-shown:stroke-accent-4 z-10' />
    </div>
  )
}
