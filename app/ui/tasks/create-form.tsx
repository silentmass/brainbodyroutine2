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
      className='card-create relative flex flex-col p-4 w-full rounded-2xl'
    >
      <input
        type='hidden'
        name='taskIsActive'
        id='taskIsActive'
        className={``}
        defaultValue={`true`}
      />
      <label className={`card-create w-full p-2 gap-2`}>
        <h2 className='card-create'>Task Title</h2>
        <input
          type='text'
          name='taskTitle'
          id='taskTitle'
          required
          className={`card-create`}
        />
      </label>
      <label className={`card-create flex pl-2 pr-2 pb-2 gap-4`}>
        <h2 className='card-create'>Category</h2>
        <TaskCategoriesSelect
          categories={taskCategories}
          defaultCategoryId={taskCategories[0].id}
        />
      </label>
      <div className='flex w-full justify-center pb-2'>
        <CreateTask />
      </div>
      {/* Form action state message floating above card */}
      <ResponseDurationMessage state={state} />
    </form>
  ) : (
    <>No categories</>
  )
}
