'use client'

import { RefObject, useRef, useState } from 'react'
import { Task } from '@/app/lib/definitions'
import { initialState } from '@/app/_components/response-state'
import Card from '../../Card'
import { FormWrapper } from '../edit-form'
import BasicTextButton from '@/app/_components/demos/circle-vibes/BasicTextButton'
import {
  CardTitleRow,
  CardRow,
  TextareaInput,
  CardButtonRow
} from '@/app/_components/demos/circle-vibes/UpdateTaskCard'

export default function CreateTaskDescriptionListForm ({
  onSubmit,
  cancelRedirect = undefined
}: {
  onSubmit?: undefined | (() => void)
  cancelRedirect?: string | undefined
}) {
  const [textareaKey, setTextareaKey] = useState(getNewTitleKey())
  function getNewTitleKey () {
    return `title_${Math.round(10000 * Math.random())}`
  }
  return (
    <Card>
      <CardTitleRow>
        <h2>Description List</h2>
      </CardTitleRow>
      <CardRow>
        <label>Title</label>
        <TextareaInput
          key={textareaKey}
          name='taskDescriptionListTitle'
          id='taskDescriptionListTitle'
          placeholder='Happy title'
        />
      </CardRow>
      <CardButtonRow>
        <BasicTextButton href={cancelRedirect} ariaLabel='Cancel'>
          Cancel
        </BasicTextButton>
        <BasicTextButton
          type='submit'
          ariaLabel='Create list'
          onClick={(ev: React.FormEvent) => {
            if (!onSubmit) return
            ev.preventDefault()
            onSubmit()
            // Clear textarea
            setTextareaKey(getNewTitleKey())
          }}
        >
          Create
        </BasicTextButton>
      </CardButtonRow>
    </Card>
  )
}
