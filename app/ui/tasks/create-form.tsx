'use client'
import { TaskCategory } from '@/app/lib/definitions'
import { createTask } from '@/app/lib/actions/tasks'
import { useFormState } from 'react-dom'
import TaskCategoriesSelect from '@/app/ui/form-components/task-categories-select'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { initialState } from '@/app/_components/response-state'
import { FormButton } from '@/app/ui/form-components/buttons'
import { RefObject } from 'react'

export default function CreateTaskForm ({
  taskCategories,
  formActionFun,
  createFormRef
}: {
  taskCategories: TaskCategory[]
  formActionFun: (prevState: any, formData: FormData) => Promise<any>
  createFormRef: RefObject<HTMLFormElement>
}) {
  const [state, formAction] = useFormState(formActionFun, initialState)

  return (
    <form
      ref={createFormRef}
      name='createTaskForm'
      id='createTaskForm'
      action={formAction}
      className='card relative flex flex-col p-6 gap-6 w-full rounded-2xl'
    >
      <input
        type='hidden'
        name='taskIsActive'
        id='taskIsActive'
        className={``}
        defaultValue={`true`}
      />
      <div className='flex flex-col gap-4'>
        <div className='flex w-full'>
          <label className={`flex`}>
            <h2 className=''>Title</h2>
          </label>
          <input
            type='text'
            name='taskTitle'
            id='taskTitle'
            required
            className={``}
          />
        </div>
        <div className='flex w-full'>
          <label className={`flex`}>
            <h2 className=''>Category</h2>
          </label>
          <div className='flex w-full'>
            <TaskCategoriesSelect
              categories={taskCategories}
              defaultCategoryId={taskCategories[0].id}
              className={``}
            />
          </div>
        </div>
      </div>

      <div className='flex w-full justify-center'>
        <FormButton ariaLabel='Create task' type='submit' className=''>
          Create
        </FormButton>
      </div>
      {/* Form action state message floating above card */}
      <ResponseDurationMessage state={state} />
    </form>
  )
}
