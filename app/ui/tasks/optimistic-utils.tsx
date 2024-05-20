import { createTask, deleteTask } from '@/app/lib/actions/tasks'
import { Task, TaskBase } from '@/app/lib/definitions'
import { RefObject } from 'react'

export const optimisticFnTasks = (
  state: TaskBase[] | null,
  crudObject: TaskBase | Task | number
) => {
  if (typeof crudObject !== 'number' && !('id' in crudObject)) {
    // Create
    if (state) {
      return [...state, { ...crudObject }]
    } else if (!state) {
      return [{ ...crudObject }]
    } else {
      return null
    }
  } else if (typeof crudObject === 'number') {
    // Delete
    if (state && crudObject !== null && crudObject !== undefined) {
      return [
        ...state.filter(task => ('id' in task ? task.id !== crudObject : true))
      ]
    } else if (state && (crudObject === null || crudObject === undefined)) {
      return [...state]
    } else {
      return null
    }
  } else {
    if (state && (crudObject === null || crudObject === undefined)) {
      return [...state]
    } else {
      return null
    }
  }
}

export async function sendTask (prevState: any, formData: FormData) {
  await createTask(prevState, formData)
}

export async function sendDeleteTask (
  id: string,
  prevState: any,
  formData: FormData
) {
  await deleteTask(id, prevState, formData)
}

export async function formActionCreateTaskWrapper (
  crudOptimisticFun: (action: number | TaskBase | Task) => void,
  formRef: RefObject<HTMLFormElement>,
  user_id: number | null,
  prevState: any,
  formData: FormData
) {
  try {
    const isActiveValue = formData.get('taskIsActive')
    const isActive =
      isActiveValue === 'on' || isActiveValue === 'true' ? true : false
    const taskCategoryIdValue = formData.get('taskCategoryId')
    const task_category_id =
      taskCategoryIdValue !== null &&
      typeof taskCategoryIdValue === 'string' &&
      taskCategoryIdValue !== ''
        ? parseInt(taskCategoryIdValue)
        : null

    if (task_category_id === null) {
      throw new Error('Invalid task category')
    }

    crudOptimisticFun({
      title: `${formData.get('taskTitle')}`,
      is_active: isActive,
      task_category_id: task_category_id,
      sort_order: null,
      user_id: user_id,
      tags: null,
      description_lists: null
    })
    formRef.current?.reset()
    await sendTask(prevState, formData)
  } catch (error) {
    console.error('form action create task wrapper intit failed', error)
  }
}

export async function formActionDeleteTaskWrapper (
  crudOptimisticFun: (action: number | TaskBase | Task) => void,
  id: string,
  prevState: any,
  formData: FormData
) {
  crudOptimisticFun(parseInt(id))
  await sendDeleteTask(id, prevState, formData)
}
