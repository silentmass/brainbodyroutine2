'use client'

import { useOptimistic, useRef } from 'react'
import { Task } from '@/app/lib/definitions'
import CreateTaskDescriptionListForm from './create-form'
import {
  formActionCreateDescriptionListWrapper,
  formActionDeleteDescriptionListWrapper,
  optimisticFnLists
} from './optimistic-utils'
import { initialState } from '@/app/_components/response-state'
import { FormWrapper } from '../edit-form'
import BasicButton from '@/app/_components/circle-vibes/BasicButton'
import BasicTextButton from '@/app/_components/circle-vibes/BasicTextButton'
import TightCard from '@/app/_components/circle-vibes/TightCard'
import {
  CardTitleRow,
  TextareaInput,
  CardRow
} from '@/app/_components/circle-vibes/UpdateTaskCard'
import { updateListDescription } from '@/app/lib/actions/descriptions'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { sendDeleteDescription } from './descriptions/optimistic-utils'
import Card from '../../Card'

export default function CreateDescriptionListView ({ task }: { task: Task }) {
  const createFormRef = useRef<HTMLFormElement>(null)

  const [optimisticLists, crudOptimisticListFun] = useOptimistic(
    task.description_lists,
    optimisticFnLists
  )

  if (!task === null) {
    return <>No task</>
  }

  const handleCreateOnSubmit = () => {
    if (!createFormRef.current) return
    createFormRef.current.requestSubmit()
  }

  return (
    <div className='flex flex-col gap-y-3 w-full'>
      <FormWrapper
        formRef={createFormRef}
        name='createTaskDescriptionListForm'
        id='createTaskDescriptionListForm'
        formActionFun={formActionCreateDescriptionListWrapper.bind(
          null,
          crudOptimisticListFun,
          `${task.id}`
        )}
        initialState={initialState}
      >
        <CreateTaskDescriptionListForm
          onSubmit={handleCreateOnSubmit}
          cancelRedirect={`/tasks/${task.id}/edit`}
        />
      </FormWrapper>
      {optimisticLists && (
        <ul className={`flex flex-col w-full gap-y-2`}>
          {optimisticLists.map((list, idx) => (
            <li
              key={
                'id' in list && list.id !== undefined
                  ? `${list.id}`
                  : `${list.title}${idx}`
              }
            >
              <Card>
                <CardTitleRow>
                  <h2>List</h2>
                  <div className='flex h-fit'>
                    <BasicButton
                      type='delete'
                      ariaLabel='Delete list'
                      onClick={(ev: React.FormEvent) => {
                        ev.preventDefault()
                        const deleteAction =
                          formActionDeleteDescriptionListWrapper.bind(
                            null,
                            crudOptimisticListFun,
                            'id' in list ? `${list.id}` : '',
                            initialState
                          )
                        return deleteAction()
                      }}
                    >
                      <TrashIcon className='icon w-5 h-5' />
                    </BasicButton>
                  </div>
                </CardTitleRow>
                <CardTitleRow>
                  <h3 className='flex min-w-[100px] text-xl'>{list.title}</h3>
                  <div className='flex h-full items-center justify-center'>
                    <BasicButton
                      href={
                        'id' in list === true
                          ? `/tasks/${list.task_id}/description-lists/${list.id}/edit`
                          : undefined
                      }
                      isDisabled={'id' in list === false}
                      ariaLabel='Edit list'
                    >
                      <PencilIcon className='icon w-5 h-5' />
                    </BasicButton>
                  </div>
                </CardTitleRow>
                <ul className='flex flex-col w-full gap-y-3'>
                  {list.descriptions &&
                    list.descriptions.map((description, idx) => (
                      <li
                        key={`${
                          'id' in description && description.id !== undefined
                            ? description?.id
                            : `${description.description}${idx}`
                        }`}
                      >
                        <TightCard>{description.description}</TightCard>
                      </li>
                    ))}
                </ul>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
