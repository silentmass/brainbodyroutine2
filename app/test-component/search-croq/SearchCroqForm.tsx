'use client'
import { getCroqSearch } from '@/app/lib/actions/croq'
import { SpinnerFormButton } from '@/app/ui/form-components/buttons'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { useDebounce, useDebouncedCallback } from 'use-debounce'

export default function SearchCroq ({
  query = 'exercise bottle'
}: {
  query?: string | null
}) {
  const [state, dispatch] = useFormState(getCroqSearch, null)
  const [newQuery, setNewQuery] = useState(query)
  const formRef = useRef<HTMLFormElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [questions, setQuestions] = useState<string[] | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    console.log(state)
    if (!state) return
    const message = state.message
    console.log('message' in state)
    console.log(message.status)
    console.log(message.value)
    console.log('_response in message', '_response' in message)
    console.log('message._response', message._response)

    const innerJsonString =
      message.status === 'resolved_model' ? message.value : message._response
    const parsedInnerJson = { ...JSON.parse(innerJsonString) }
    const newQuestions = Object.values({
      ...parsedInnerJson.searchQueryResult
    }).map(e => String(e))
    setQuestions(previousState =>
      previousState ? [...previousState, ...newQuestions] : newQuestions
    )
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
  const handlePending = (isPending: boolean) => {
    setPending(isPending)
  }
  return (
    <div className='flex flex-col gap-5'>
      <div>
        {' '}
        <form
          ref={formRef}
          action={dispatch}
          name='getCroqSearchForm'
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
              onPending={handlePending}
            >
              Search
            </SpinnerFormButton>
          </div>
        </form>
      </div>
      {questions && (
        <div className='flex flex-col gap-1'>
          <h2>Questions</h2>
          <ol className='flex flex-col list-decimal ml-5'>
            {questions.map((q, idx) => {
              return <li key={idx}>{q}</li>
            })}
          </ol>
          {pending && (
            <div className='border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto mt-5'>
              <div className='animate-pulse flex space-x-4'>
                <div className='flex-1 space-y-3 py-1'>
                  <div className='h-2 bg-slate-200 rounded'></div>
                  <div className='h-2 bg-slate-200 rounded'></div>
                  <div className='h-2 bg-slate-200 rounded'></div>
                  <div className='h-2 bg-slate-200 rounded'></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
