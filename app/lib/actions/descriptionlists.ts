'use server'
// Description list actions

import { revalidateTag } from 'next/cache'
import {
  ListDescription,
  TaskDescriptionListSchema,
  TaskDescriptionListWithIdSchema
} from '../definitions'

export const createDescriptionList = async (
  taskId: string,
  prevState: any,
  formData: FormData
) => {
  const validatedFields = TaskDescriptionListSchema.safeParse({
    title: formData.get('taskDescriptionListTitle'),
    task_id: parseInt(taskId)
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const data = validatedFields.data

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKS}/${taskId}/descriptionlists`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(data)
      }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch task description list create ${taskId}`)
    }

    try {
      revalidateTag('descriptionlists')
    } catch (revalidateErr) {
      console.error(
        'Failed to fetch task description list create revalidate: ',
        revalidateErr
      )
    }

    return {
      ...prevState,
      message: `List ${data.title} created`,
      redirectTo: `/tasks/${taskId}/edit`
    }
  } catch (err) {
    console.error(`Failed to fetch task description list create ${taskId}`, err)
    return {
      ...prevState,
      message: `Failed to fetch task description list create ${taskId}`,
      redirectTo: prevState.redirectTo
    }
  }
}

export const updateDescriptionList = async (
  id: string,
  descriptions: ListDescription[] | null,
  prevState: any,
  formData: FormData
) => {
  const taskIdValue = formData.get('taskId')
  const taskId =
    taskIdValue && typeof taskIdValue == 'string' && taskIdValue !== ''
      ? parseInt(taskIdValue)
      : null

  const validatedFields = TaskDescriptionListWithIdSchema.safeParse({
    id: parseInt(id),
    title: formData.get('title'),
    task_id: taskId
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const data = validatedFields.data

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_DESCRIPTIONLISTS}/${id}/update`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(data)
      }
    )

    if (!res.ok) {
      throw new Error('Failed to update description list fetch')
    }

    try {
      revalidateTag('descriptionlists')
      revalidateTag(`descriptionlist`)
    } catch (revalidateErr) {
      console.error(
        'Description list update revalidate failed: ',
        revalidateErr
      )
    }

    return { ...prevState, message: 'List updated' }
  } catch (err) {
    console.error('Failed to update description list fetch: ', err)
    return { ...prevState, errors: 'Failed to update description list fetch' }
  }
}

export const deleteDescriptionList = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_DESCRIPTIONLISTS}/${id}/delete`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      }
    )

    if (!res.ok) {
      throw new Error(`Task description list delete fetch failed ${id}`)
    }

    try {
      revalidateTag('descriptionlists')
    } catch (revalidateErr) {
      console.error(
        `Task description list delete revalidate failed ${id}`,
        revalidateErr
      )
    }

    return { ...prevState, message: `List ${id} deleted` }
  } catch (err) {
    console.error(`Task description list delete fetch failed ${id}`, err)
    return {
      ...prevState,
      errors: `Task description list delete fetch failed ${id}`
    }
  }
}
