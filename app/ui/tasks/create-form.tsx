'use client'
import { TaskCategory } from '@/app/lib/definitions'
import { initialState } from '@/app/_components/response-state'
import { RefObject, useState } from 'react'
import {
  CardRow,
  CardButtonRow,
  CardTitleRow,
  SelectCategoryInput,
  TextareaInput
} from '@/app/_components/circle-vibes/UpdateTaskCard'
import Card from '../Card'
import BasicTextButton from '@/app/_components/circle-vibes/BasicTextButton'
import { FormWrapper } from './edit-form'
import { getNewRandomKey } from '@/app/utils/getRandomKey'

export default function CreateTaskForm ({
  taskCategories,
  formActionFun,
  createFormRef
}: {
  taskCategories: TaskCategory[]
  formActionFun: (prevState: any, formData: FormData) => Promise<any>
  createFormRef: RefObject<HTMLFormElement>
}) {
  const [textareaKey, setTextareaKey] = useState(getNewRandomKey('taskTitle'))
  return (
    <Card>
      <FormWrapper
        formRef={createFormRef}
        name='createTaskForm'
        id='createTaskForm'
        formActionFun={formActionFun}
        initialState={initialState}
      >
        <input
          type='hidden'
          name='taskIsActive'
          id='taskIsActive'
          className={``}
          defaultValue={`true`}
        />
        <CardTitleRow>
          <h2>Task</h2>
        </CardTitleRow>
        <CardRow className='mb-3'>
          <label className='flex'>Title</label>
          <TextareaInput
            key={textareaKey}
            id='taskTitle'
            name='taskTitle'
            placeholder='Happy title'
          />
        </CardRow>
        <CardRow className='mb-3'>
          <label className='flex min-w-[100px]'>Category</label>
          <SelectCategoryInput
            id='taskCategoryId'
            name='taskCategoryId'
            categories={taskCategories.map(({ id, title }) => ({
              id: `${id}`,
              value: `${title}`
            }))}
            defaultId={`${taskCategories[0].id}`}
          />
        </CardRow>
        <CardButtonRow>
          <BasicTextButton
            type='submit'
            ariaLabel='Create task'
            onClick={(ev: React.FormEvent<HTMLButtonElement>) => {
              ev.preventDefault()
              if (!createFormRef || !createFormRef.current) return
              createFormRef.current.requestSubmit()
              setTextareaKey(getNewRandomKey('taskTitle'))
            }}
          >
            Create
          </BasicTextButton>
        </CardButtonRow>
      </FormWrapper>
    </Card>
  )
}
