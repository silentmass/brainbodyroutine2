'use server'
// Description list actions

import { revalidateTag } from 'next/cache'
import {
  ListDescription,
  TaskDescriptionListSchema,
  TaskDescriptionListWithIdSchema
} from '../definitions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const createDescriptionList = async (
  taskId: string,
  prevState: any,
  formData: FormData
) => {
  // Check access token cookie
  // Assume `cookies().get()` returns an object { token: "your_token_here" }
  const accessToken = cookies().get('access_token')

  if (!accessToken?.value)
    return {
      ...prevState,
      message: 'You need to authenticate. List not created.'
    }

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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken.value}`
        },
        mode: 'cors',
        body: JSON.stringify(data)
      }
    )

    if (!res.ok) {
      throw new Error(`Failed to fetch task description list create ${taskId}`)
    }

    try {
      revalidateTag('userdescriptionlists')
    } catch (revalidateErr) {
      console.error(
        'Failed to fetch task description list create revalidate: ',
        revalidateErr
      )
    }

    return {
      ...prevState,
      message: `List ${data.title} created`
      // redirectTo: `/tasks/${taskId}/edit`
    }
  } catch (err) {
    console.error(`Failed to fetch task description list create ${taskId}`, err)
    return {
      ...prevState,
      message: `Failed to fetch task description list create ${taskId}`
      // redirectTo: prevState.redirectTo
    }
  }
}

export const updateDescriptionList = async (
  id: string,
  taskId: string,
  prevState: any,
  formData: FormData
) => {
  // Check access token cookie
  // Assume `cookies().get()` returns an object { token: "your_token_here" }
  const accessToken = cookies().get('access_token')

  if (!accessToken?.value)
    return {
      ...prevState,
      message: 'You need to authenticate. List not updated.'
    }

  const validatedFields = TaskDescriptionListWithIdSchema.safeParse({
    id: parseInt(id),
    title: formData.get('title'),
    task_id: parseInt(taskId)
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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken.value}`
        },
        mode: 'cors',
        body: JSON.stringify(data)
      }
    )

    if (!res.ok) {
      throw new Error('Failed to update description list fetch')
    }

    try {
      revalidateTag('userdescriptionlists')
      revalidateTag(`userdescriptionlist`)
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
  formData?: FormData
) => {
  // Check access token cookie
  // Assume `cookies().get()` returns an object { token: "your_token_here" }
  const accessToken = cookies().get('access_token')

  if (!accessToken?.value)
    return {
      ...prevState,
      message: 'You need to authenticate. List not deleted.'
    }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_DESCRIPTIONLISTS}/${id}/delete`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken.value}`
        },
        mode: 'cors'
      }
    )

    if (!res.ok) {
      throw new Error(`Task description list delete fetch failed ${id}`)
    }

    try {
      revalidateTag('userdescriptionlists')
    } catch (revalidateErr) {
      console.error(
        `Task description list delete revalidate failed ${id}`,
        revalidateErr
      )
    }

    if ('redirectTo' in prevState === true && prevState.redirectTo) {
      return redirect(prevState.redirectTo)
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
