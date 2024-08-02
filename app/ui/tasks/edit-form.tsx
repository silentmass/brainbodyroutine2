'use client'
import { Task, TaskCategory } from '@/app/lib/definitions'
import { deleteTask, updateTask } from '@/app/lib/actions/tasks'
import { useFormState } from 'react-dom'
import { useRouter } from 'next/navigation'
import { RefObject, useEffect, useOptimistic, useRef, useState } from 'react'
import { IsTaskActive } from '@/app/ui/form-components/is-task-active'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { InitialState, initialState } from '@/app/_components/response-state'
import {
  formActionDeleteDescriptionListWrapper,
  optimisticFnLists
} from './description-lists/optimistic-utils'
import { useDebouncedCallback } from 'use-debounce'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import Card from '../Card'
import BasicButton from '@/app/_components/demos/circle-vibes/BasicButton'
import BasicTextButton from '@/app/_components/demos/circle-vibes/BasicTextButton'
import CreateTaskDescriptionListCard from '@/app/_components/demos/circle-vibes/CreateTaskDescriptionListCard'
import TightCard from '@/app/_components/demos/circle-vibes/TightCard'
import {
  CardTitleRow,
  CardRow,
  TextareaInput,
  SelectCategoryInput,
  CardButtonRow
} from '@/app/_components/demos/circle-vibes/UpdateTaskCard'
import { sendDeleteDescription } from './description-lists/descriptions/optimistic-utils'
import { updateListDescription } from '@/app/lib/actions/descriptions'

export default function EditTaskForm ({
  task,
  categories
}: {
  task: Task
  categories: TaskCategory[]
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [title, setTitle] = useState<null | string>(task.title)

  const [isActive, setIsActive] = useState(task.is_active)
  const [state, formAction] = useFormState(
    updateTask.bind(null, `${task.id}`),
    initialState
  )

  const router = useRouter()

  useEffect(() => {
    if (state.redirectTo) {
      router.push(state.redirectTo)
    }
  }, [state, router])

  const handleChange = useDebouncedCallback(
    (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
      console.log('handleChange', ev.target.value)
      setTitle(ev.target.value)
    },
    300
  )
  const handleBlur = (ev: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!textareaRef.current) return

    console.log('Update title')
    handleChange(ev)
  }
  const handleKeyDown = (ev: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (ev.code !== 'Enter' || !textareaRef.current) return
    ev.preventDefault()
    handleChange.cancel()
    textareaRef.current.blur()
  }
  const handleTitleReset = (ev: React.FormEvent) => {
    if (!textareaRef.current) return
    textareaRef.current.value = ''
    setTitle(null)
  }

  const [optimisticLists, crudOptimisticListFun] = useOptimistic(
    task.description_lists,
    optimisticFnLists
  )

  return (
    <div className='flex flex-col gap-3'>
      {/* 
      Task update card - Task info
       */}
      <Card>
        <FormWrapper
          name='editTaskForm'
          id='editTaskForm'
          formActionFun={updateTask.bind(null, `${task.id}`)}
          initialState={initialState}
        >
          <CardTitleRow>
            <h2>Task</h2>
            <div className='flex h-fit'>
              <BasicButton
                type='delete'
                ariaLabel='Delete task'
                isDisabled={'id' in task === false}
                onClick={(ev: React.FormEvent<HTMLButtonElement>) => {
                  ev.preventDefault()
                  const deleteAction = deleteTask.bind(
                    null,
                    'id' in task ? `${task.id}` : '',
                    { ...initialState, redirectTo: '/tasks/filter' }
                  )
                  return deleteAction()
                }}
              >
                <TrashIcon className='icon w-5 h-5' />
              </BasicButton>
            </div>
          </CardTitleRow>
          <CardRow className='mb-3'>
            <label className='flex'>Title</label>
            <TextareaInput
              id='taskTitle'
              name='taskTitle'
              currentValue={title ? title : ''}
            />
          </CardRow>
          <CardRow className='mb-3'>
            <label className='flex min-w-[100px]'>Category</label>
            <SelectCategoryInput
              id='taskCategoryId'
              name='taskCategoryId'
              categories={categories.map(({ id, title }) => ({
                id: `${id}`,
                value: `${title}`
              }))}
              defaultId={`${task.task_category_id}`}
            />
          </CardRow>
          <CardRow className='mb-3'>
            <label className='flex min-w-[100px]'>Is active</label>
            <IsTaskActive isActiveValue={isActive} />
          </CardRow>
          <CardButtonRow>
            <BasicTextButton href={'/tasks/filter'}>Cancel</BasicTextButton>
            <BasicTextButton type='submit' ariaLabel='Save changes'>
              Edit
            </BasicTextButton>
          </CardButtonRow>
        </FormWrapper>
      </Card>
      {/* 
      Task update card - Create List card 
      */}
      <CreateTaskDescriptionListCard>
        <label className='flex min-w-[100px]'>
          <h3>Lists</h3>
        </label>
        <div className='flex min-w-[100px]'>
          <BasicTextButton
            href={`/tasks/${task.id}/description-lists/create`}
            ariaLabel='Create list'
          >
            Create list
          </BasicTextButton>
        </div>
      </CreateTaskDescriptionListCard>
      {/* 
      Task update card - Update or create list desriptions
      */}
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

export const FormWrapper = ({
  children,
  formRef = undefined,
  name,
  id,
  formActionFun,
  initialState
}: {
  children: React.ReactNode
  formRef?: undefined | RefObject<HTMLFormElement>
  name: string
  id: string
  formActionFun: (prevState: any, formData: FormData) => Promise<any> | void
  initialState: InitialState
}) => {
  const [state, formAction] = useFormState(formActionFun, initialState)
  return (
    <>
      <form ref={formRef} name={`${name}`} id={`${id}`} action={formAction}>
        {children}
      </form>
      {/* Form action state message floating above card. Requires relative parent. */}
      <ResponseDurationMessage state={state} />
    </>
  )
}
