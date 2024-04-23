'use client'
import { createListDescription } from '@/app/lib/actions'
import { TaskDescriptionList } from '@/app/lib/definitions'
import { useFormState } from 'react-dom'
import clsx from 'clsx'
import { CreateButton } from '@/app/ui/form-components/buttons'
import { useEffect, useRef, useState } from 'react'
import FormActionStateMessage from '@/app/ui/form-components/form-action-message'
import { initialState } from '@/app/_components/response-state'
import ResponseDurationMessage from '@/app/_components/response-duration'

export default function CreateListDescriptionForm ({
  descriptionList,
  redirectTo
}: {
  descriptionList: TaskDescriptionList
  redirectTo: string
}) {
  const createListDescriptionWithId = createListDescription.bind(
    null,
    `${descriptionList.id}`
  )
  const [state, formAction] = useFormState(
    createListDescriptionWithId,
    initialState
  )

  return (
    <form
      name='createListDescriptionForm'
      id='createListDescriptionForm'
      action={formAction}
      className='relative card-create flex flex-col gap-y-4 w-full rounded-2xl p-5'
    >
      <div className='flex flex-col gap-y-4 w-full'>
        <label className={`flex flex-col w-full`}>
          <h2 className='card-create'>Description</h2>
          <textarea
            name='description'
            id='description'
            className='flex w-full p-2 bg-transparent border border-neutral-300 rounded-2xl'
          ></textarea>
        </label>
        <div className='flex w-full justify-center'>
          <CreateButton className='card-create' ariaLabel='Create description'>
            Create
          </CreateButton>
        </div>
      </div>
      {/* Form action state message floating above card. Requires relative parent. */}
      <ResponseDurationMessage state={state} />
    </form>
  )
}
