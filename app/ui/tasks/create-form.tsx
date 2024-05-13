'use client'
import { CreateTask } from '@/app/ui/tasks/buttons'
import { TaskCategory } from '@/app/lib/definitions'
import { createTask } from '@/app/lib/actions/tasks'
import { useFormState } from 'react-dom'
import TaskCategoriesSelect from '../form-components/task-categories-select'
import ResponseDurationMessage from '@/app/_components/response-duration'
import { initialState } from '@/app/_components/response-state'

export default function CreateTaskForm ({
  taskCategories
}: {
  taskCategories: TaskCategory[]
}) {
  const [state, formAction] = useFormState(createTask, initialState)

  return taskCategories ? (
    <form
      name='createTaskForm'
      id='createTaskForm'
      action={formAction}
      className=' relative flex flex-col p-6 gap-6 w-full rounded-2xl'
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
          <label className={`w-1/3`}>
            <h2 className=''>Title</h2>
          </label>
          <input
            type='text'
            name='taskTitle'
            id='taskTitle'
            required
            className={` flex w-full border-b`}
          />
        </div>
        <div className='flex w-full'>
          <label className={`w-1/3`}>
            <h2 className=''>Category</h2>
          </label>
          <div className='flex w-full'>
            <TaskCategoriesSelect
              categories={taskCategories}
              defaultCategoryId={taskCategories[0].id}
              className={`w-fit bg-transparent border-b`}
            />
          </div>
        </div>
      </div>

      <div className='flex w-full justify-center'>
        <CreateTask />
      </div>
      {/* Form action state message floating above card */}
      <ResponseDurationMessage state={state} />
    </form>
  ) : (
    <>No categories</>
  )
}
