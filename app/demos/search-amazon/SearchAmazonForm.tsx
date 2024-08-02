'use client'
import { getAmazonAuthorizationGrantCode } from '@/app/lib/actions/amazon'
import { SpinnerFormButton } from '@/app/ui/form-components/buttons'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { useDebounce, useDebouncedCallback } from 'use-debounce'

export default function SearchAmazon ({
  query = 'exercise bottle'
}: {
  query?: string | null
}) {
  const [state, dispatch] = useFormState(getAmazonAuthorizationGrantCode, null)
  const [newQuery, setNewQuery] = useState(query)
  const formRef = useRef<HTMLFormElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  useEffect(() => {
    if (!state) return
    if ('message' in state && 'value' in state.message) {
      console.log(state.message.value)
    }
  }, [state])
  const handleSearchQueryReset = (ev: React.FormEvent) => {
    if (!textareaRef.current) return
    textareaRef.current.value = ''
    setNewQuery(null)
  }
  const handleQueryChange = useDebouncedCallback(
    (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      setNewQuery(ev.target.value)
    },
    300
  )
  const handleClickSubmit = (ev: React.FormEvent<HTMLButtonElement>) => {
    if (!formRef.current) return
    if (isButtonDisabled) return

    ev.preventDefault()
    console.log('handleClickSubmit')
    setIsButtonDisabled(true)
    setTimeout(() => {
      setIsButtonDisabled(false)
      console.log('Not disabled')
    }, 3000)
    formRef.current.requestSubmit()
  }
  return (
    <form
      ref={formRef}
      action={dispatch}
      name='getAmazonAuthUrlForm'
      className='flex flex-col justify-center items-center gap-5'
    >
      <div className='relative flex'>
        <textarea
          ref={textareaRef}
          id='searchQuery'
          name='searchQuery'
          className='peer description-input-create'
          defaultValue={query ? query : ''}
          rows={3}
          required
          onChange={handleQueryChange}
        />
        <div
          onClick={handleSearchQueryReset}
          style={{
            visibility:
              newQuery !== '' && newQuery !== null ? 'visible' : 'hidden'
          }}
        >
          <XMarkIcon className='textarea-icon' />
        </div>
      </div>
      <div className='flex'>
        <SpinnerFormButton
          type={'submit'}
          ariaLabel='Search'
          onClick={handleClickSubmit}
          isDisabled={isButtonDisabled}
        >
          Search
        </SpinnerFormButton>
      </div>
    </form>
  )
}
