'use client'

import { useOptimistic, useRef, useState } from 'react'
import { TaskDescriptionList } from '@/app/lib/definitions'
import {
  optimisticFnDescriptions,
  formActionCreateDescriptionWrapper,
  sendDeleteDescription
} from './descriptions/optimistic-utils'
import BasicTextButton from '@/app/_components/circle-vibes/BasicTextButton'
import { FormWrapper } from '../edit-form'
import { initialState } from '@/app/_components/response-state'
import Card from '../../Card'
import {
  CardButtonRow,
  CardRow,
  CardTitleRow,
  TextareaInput
} from '@/app/_components/circle-vibes/UpdateTaskCard'
import { sendDeleteDescriptionList } from './optimistic-utils'
import { updateDescriptionList } from '@/app/lib/actions/descriptionlists'
import { useFormState } from 'react-dom'
import TightCard from '@/app/_components/circle-vibes/TightCard'
import { updateListDescription } from '@/app/lib/actions/descriptions'
import { getNewRandomKey } from '@/app/utils/getRandomKey'
import { TrashIcon } from '@heroicons/react/24/outline'
import BasicButton from '@/app/_components/circle-vibes/BasicButton'

export default function EditDescriptionListView ({
  descriptionList,
  cancelRedirect = undefined
}: {
  descriptionList: TaskDescriptionList
  cancelRedirect?: string | undefined
}) {
  const createFormRef = useRef<HTMLFormElement>(null)
  const editListFormRef = useRef<HTMLFormElement>(null)
  const createDescriptionFormRef = useRef<HTMLFormElement>(null)

  const [createDescriptionTextareaKey, setCreateDescriptionTextareaKey] =
    useState(getNewRandomKey('description'))

  const [optimisticDescriptions, crudOptimisticDescription] = useOptimistic(
    descriptionList.descriptions,
    optimisticFnDescriptions
  )

  if (!descriptionList || descriptionList.task_id === null) {
    return <>No list</>
  }

  return (
    <div className='flex flex-col gap-y-3 w-full'>
      <Card>
        <FormWrapper
          name='updateDescriptionListForm'
          id='updateDescriptionListForm'
          formActionFun={updateDescriptionList.bind(
            null,
            `${descriptionList.id}`,
            `${descriptionList.task_id}`
          )}
          formRef={editListFormRef}
          initialState={initialState}
        >
          <CardTitleRow>
            <h2>List</h2>
            <div className='flex h-fit'>
              <BasicButton
                type='delete'
                ariaLabel='Delete list'
                onClick={(ev: React.FormEvent<HTMLButtonElement>) => {
                  ev.preventDefault()
                  const handleDeleteList = sendDeleteDescriptionList.bind(
                    null,
                    'id' in descriptionList ? `${descriptionList.id}` : '',
                    {
                      ...initialState,
                      redirectTo: `/tasks/${descriptionList.task_id}/edit`
                    }
                  )
                  return handleDeleteList()
                }}
              >
                <TrashIcon className='icon w-5 h-5' />
              </BasicButton>
            </div>
          </CardTitleRow>
          <CardRow>
            <label>Title</label>
            <TextareaInput
              name='title'
              id='title'
              placeholder='Happy title'
              currentValue={descriptionList.title}
            />
          </CardRow>
          <CardButtonRow>
            <BasicTextButton
              type={undefined}
              href={cancelRedirect}
              ariaLabel='Cancel'
            >
              Cancel
            </BasicTextButton>
            <BasicTextButton type='submit' ariaLabel='Update list'>
              Update list
            </BasicTextButton>
          </CardButtonRow>
        </FormWrapper>
      </Card>
      <FormWrapper
        formRef={createDescriptionFormRef}
        name='createListDescriptionForm'
        id='createListDescriptionForm'
        formActionFun={formActionCreateDescriptionWrapper.bind(
          null,
          crudOptimisticDescription,
          `${descriptionList.id}`
        )}
        initialState={initialState}
      >
        <Card>
          <CardTitleRow>
            <h3 className='flex min-w-[100px] text-xl'>Create description</h3>
          </CardTitleRow>
          <CardRow>
            <TextareaInput
              key={createDescriptionTextareaKey}
              name='description'
              id='description'
              placeholder='Happy description'
            />
          </CardRow>
          <CardButtonRow>
            <BasicTextButton
              type='submit'
              ariaLabel='Create description'
              onClick={(ev: React.FormEvent<HTMLButtonElement>) => {
                ev.preventDefault()
                if (!createDescriptionFormRef.current) return
                createDescriptionFormRef.current.requestSubmit()
                setCreateDescriptionTextareaKey(getNewRandomKey('description'))
              }}
            >
              Create
            </BasicTextButton>
          </CardButtonRow>
        </Card>
      </FormWrapper>
      <ul className='flex flex-col w-full gap-y-4'>
        {optimisticDescriptions &&
          optimisticDescriptions.map((description, idx) => (
            <li
              key={`${
                'id' in description && description.id !== undefined
                  ? description?.id
                  : `${description.description}${idx}`
              }`}
            >
              <TightCard>
                <FormWrapper
                  name='editListDescription'
                  id='editListDesription'
                  formActionFun={updateListDescription.bind(
                    null,
                    'id' in description ? `${description.id}` : '',
                    `${description.description_list_id}`
                  )}
                  initialState={initialState}
                >
                  <CardTitleRow>
                    <label className='flex pt-1 pb-2'>Description</label>
                    <BasicButton
                      type='delete'
                      onClick={(ev: React.FormEvent<HTMLButtonElement>) => {
                        ev.preventDefault()
                        const deleteAction = sendDeleteDescription.bind(
                          null,
                          'id' in description ? `${description.id}` : ''
                        )
                        return deleteAction(initialState)
                      }}
                      isDisabled={'id' in description === false}
                    >
                      <TrashIcon className='icon w-5 h-5' />
                    </BasicButton>
                  </CardTitleRow>

                  <TextareaInput
                    id='description'
                    name='description'
                    currentValue={description.description}
                  />
                  <CardButtonRow>
                    <BasicTextButton>Update</BasicTextButton>
                  </CardButtonRow>
                </FormWrapper>
              </TightCard>
            </li>
          ))}
      </ul>
    </div>
  )
}
