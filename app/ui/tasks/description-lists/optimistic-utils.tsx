import {
  createDescriptionList,
  deleteDescriptionList
} from '@/app/lib/actions/descriptionlists'
import {
  TaskDescriptionList,
  TaskDescriptionListBase
} from '@/app/lib/definitions'
import { RefObject } from 'react'

export const optimisticFnLists = (
  state: TaskDescriptionListBase[] | null,
  crudObject: TaskDescriptionListBase | TaskDescriptionList | number
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
        ...state.filter(list => ('id' in list ? list.id !== crudObject : true))
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

export async function sendDescriptionList (
  taskId: string,
  prevState: any,
  formData: FormData
) {
  await createDescriptionList(taskId, prevState, formData)
}

export async function sendDeleteDescriptionList (
  id: string,
  prevState: any,
  formData?: FormData
) {
  await deleteDescriptionList(id, prevState, formData)
}

export async function formActionCreateDescriptionListWrapper (
  crudOptimisticFun: (
    action: number | TaskDescriptionListBase | TaskDescriptionList
  ) => void,
  taskId: string,
  prevState: any,
  formData: FormData
) {
  crudOptimisticFun({
    title: `${formData.get('taskDescriptionListTitle')}`,
    task_id: parseInt(taskId),
    descriptions: []
  })
  await sendDescriptionList(taskId, prevState, formData)
}

export async function formActionDeleteDescriptionListWrapper (
  crudOptimisticFun: (
    action: number | TaskDescriptionListBase | TaskDescriptionList
  ) => void,
  id: string,
  prevState: any,
  formData?: FormData
) {
  crudOptimisticFun(parseInt(id))
  await sendDeleteDescriptionList(id, prevState, formData)
}
