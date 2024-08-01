import { createTask, deleteTask, updateTask } from '@/app/lib/actions/tasks'
import { Tag, Task, TaskBase, TaskDescriptionList } from '@/app/lib/definitions'
import { RefObject } from 'react'

export const optimisticFnTasks = (
  state: TaskBase[] | Task[] | null,
  crudObject: TaskBase | Task | number
) => {
  if (typeof crudObject !== 'number' && !('id' in crudObject)) {
    // Create
    if (state) {
      const nullUserFirstTaskPosition = state.findIndex(
        task => task.user_id === null
      )
      return nullUserFirstTaskPosition === -1
        ? [...state, { ...crudObject }]
        : [
            ...state.slice(0, nullUserFirstTaskPosition),
            { ...crudObject },
            ...state.slice(nullUserFirstTaskPosition, undefined)
          ]
    } else if (!state) {
      return [{ ...crudObject }]
    } else {
      return null
    }
  } else if (typeof crudObject !== 'number' && 'id' in crudObject) {
    // Update
    if (state && crudObject) {
      const crudObjectPosition = state.findIndex(task =>
        'id' in task && task.id !== undefined
          ? task.id === crudObject.id
          : false
      )
      return [
        ...state.slice(0, crudObjectPosition),
        { ...crudObject, sending: true },
        ...state.slice(crudObjectPosition + 1, undefined)
      ]
    } else if (!state && crudObject) {
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

export async function sendUpdateTask (
  id: string,
  prevState: any,
  formData: FormData
) {
  await updateTask(id, prevState, formData)
}

export async function sendDeleteTask (
  id: string,
  prevState: any,
  formData?: FormData | undefined
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
    console.error('form action create task wrapper init failed', error)
  }
}

export async function formActionUpdateTaskWrapper (
  crudOptimisticFun: (action: number | Task) => void,
  user_id: string,
  description_lists: TaskDescriptionList[] | null,
  tags: Tag[] | null,
  id: string,
  prevState: any,
  formData: FormData
) {
  try {
    const isActive = formData.get('taskIsActive')
    const taskCategoryIdValue = formData.get('taskCategoryId')
    const task_category_id =
      taskCategoryIdValue !== null &&
      typeof taskCategoryIdValue === 'string' &&
      taskCategoryIdValue !== ''
        ? parseInt(taskCategoryIdValue)
        : null
    const title = formData.get('taskTitle')
    const sortOrderValue = formData.get('sortOrder')
    const sortOrder =
      sortOrderValue !== `null` &&
      typeof sortOrderValue === 'string' &&
      sortOrderValue !== ''
        ? parseInt(sortOrderValue)
        : null

    if (isActive === null || task_category_id === null) {
      throw new Error('Invalid task category or is active statut')
    }

    crudOptimisticFun({
      id: parseInt(id),
      title: `${title}`,
      is_active: isActive === 'true' || isActive === 'on' ? true : false,
      task_category_id: task_category_id,
      sort_order: sortOrder,
      user_id: parseInt(user_id),
      tags: tags,
      description_lists: description_lists
    })

    await sendUpdateTask(`${id}`, prevState, formData)
  } catch (error) {
    console.error('form action update task wrapper init failed', error)
  }
}
export async function formActionDuplicateTaskWrapper (
  crudOptimisticFun: (action: number | Task | TaskBase) => void,
  user_id: string,
  description_lists: TaskDescriptionList[] | null,
  tags: Tag[] | null,
  prevState: any,
  formData: FormData
) {
  try {
    const isActive = formData.get('taskIsActive')
    const taskCategoryIdValue = formData.get('taskCategoryId')
    const task_category_id =
      taskCategoryIdValue !== null &&
      typeof taskCategoryIdValue === 'string' &&
      taskCategoryIdValue !== ''
        ? parseInt(taskCategoryIdValue)
        : null
    const title = formData.get('taskTitle')
    const sortOrderValue = formData.get('sortOrder')
    const sortOrder =
      sortOrderValue !== `null` &&
      typeof sortOrderValue === 'string' &&
      sortOrderValue !== ''
        ? parseInt(sortOrderValue)
        : null

    if (isActive === null || task_category_id === null) {
      throw new Error('Invalid task category or is active status')
    }

    crudOptimisticFun({
      title: `${title}`,
      is_active: isActive === 'true' || isActive === 'on' ? true : false,
      task_category_id: task_category_id,
      sort_order: sortOrder,
      user_id: parseInt(user_id),
      tags: tags,
      description_lists: description_lists
    })

    await sendTask(prevState, formData)
  } catch (error) {
    console.error('form action duplicate task wrapper init failed', error)
  }
}

export async function formActionDeleteTaskWrapper (
  crudOptimisticFun: (action: number | Task) => void,
  id: string,
  prevState: any,
  formData?: FormData | undefined
) {
  crudOptimisticFun(parseInt(id))
  await sendDeleteTask(id, prevState, formData)
}
