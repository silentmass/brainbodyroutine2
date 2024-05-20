import {
  createListDescription,
  deleteListDescription
} from '@/app/lib/actions/descriptions'
import { ListDescriptionBase, ListDescription } from '@/app/lib/definitions'
import { RefObject } from 'react'

export const optimisticFnDescriptions = (
  state: ListDescriptionBase[] | null,
  crudObject: ListDescriptionBase | ListDescription | number
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
    if (state && crudObject) {
      return [
        ...state.filter(description =>
          'id' in description ? description.id !== crudObject : true
        )
      ]
    } else if (state && !crudObject) {
      return [...state]
    } else {
      return null
    }
  } else {
    if (state && !crudObject) {
      return [...state]
    } else {
      return null
    }
  }
}

export async function sendDescription (
  listId: string,
  prevState: any,
  formData: FormData
) {
  await createListDescription(listId, prevState, formData)
}

export async function sendDeleteDescription (
  id: string,
  prevState: any,
  formData: FormData
) {
  await deleteListDescription(id, prevState, formData)
}

export async function formActionCreateDescriptionWrapper (
  crudOptimisticFun: (
    action: number | ListDescriptionBase | ListDescription
  ) => void,
  formRef: RefObject<HTMLFormElement>,
  listId: string,
  prevState: any,
  formData: FormData
) {
  crudOptimisticFun({
    description: `${formData.get('description')}`,
    description_list_id: parseInt(listId)
  })
  formRef.current?.reset()
  await sendDescription(listId, prevState, formData)
}

export async function formActionDeleteDescriptionWrapper (
  crudOptimisticFun: (
    action: number | ListDescriptionBase | ListDescription
  ) => void,
  id: string,
  prevState: any,
  formData: FormData
) {
  crudOptimisticFun(parseInt(id))
  await sendDeleteDescription(id, prevState, formData)
}
