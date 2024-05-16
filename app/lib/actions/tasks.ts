'use server'
// Task operations

import { revalidateTag } from 'next/cache'
import { TaskSchema, TaskWithIdSchema } from '../definitions'
import { cookies } from 'next/headers'

export const createTask = async (prevState: any, formData: FormData) => {
  // Check access token cookie
  // Assume `cookies().get()` returns an object { token: "your_token_here" }
  const accessToken = cookies().get('access_token')
  if (!accessToken?.value)
    return {
      ...prevState,
      message: 'You need to authenticate. No task created.'
    }

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

  const validatedFields = TaskSchema.safeParse({
    title: formData.get('taskTitle'),
    is_active: isActive,
    task_category_id: task_category_id
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const data = validatedFields.data

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKS}`,
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
      throw new Error('Failed to fetch create task')
    }

    try {
      revalidateTag('usertasks')
    } catch (revalidateErr) {
      console.error('Failed to create task revalidate: ', revalidateErr)
    }

    return { ...prevState, message: `Task: ${data.title} created` }
  } catch (err) {
    console.error(`Failed to create a task: ${data.title}`, err)
    return { ...prevState, message: `Failed to create a task: ${data.title}` }
  }
}

export const deleteTask = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  // Check access token cookie
  // Assume `cookies().get()` returns an object { token: "your_token_here" }
  const accessToken = cookies().get('access_token')
  if (!accessToken?.value)
    return {
      ...prevState,
      message: 'You need to authenticate. No task deleted.'
    }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKS}/${id}/delete`,
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
      throw new Error('Failed to fetch delete task')
    }

    try {
      revalidateTag('usertasks')
    } catch (revalidateErr) {
      console.error(`Failed to delete task revalidate: `, revalidateErr)
    }

    return { ...prevState, message: `Deleted task: ${id}` }
  } catch (err) {
    console.error(`Failed to delete task: ${id}`)
    return { ...prevState, message: `Failed to delete task: ${id}` }
  }
}

export const updateTask = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  // Check access token cookie
  // Assume `cookies().get()` returns an object { token: "your_token_here" }
  const accessToken = cookies().get('access_token')
  if (!accessToken?.value)
    return {
      ...prevState,
      message: 'You need to authenticate. No task updated.'
    }

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

  const validatedFields = TaskWithIdSchema.safeParse({
    id: parseInt(id),
    title: title,
    task_category_id: task_category_id,
    is_active: isActive === 'on' || isActive === 'true' ? true : false,
    sort_order: sortOrder
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const data = validatedFields.data

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKS}/${id}/update`,
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
      throw new Error(`Failed to fetch update task ${id}`)
    }

    try {
      revalidateTag('usertask')
      revalidateTag('usertasks')
    } catch (revalidateErr) {
      console.error(`Failed to update task revalidate: `, revalidateErr)
    }
    return { ...prevState, message: `Task updated` }
  } catch (err) {
    console.error(`Failed to fetch update task ${title}`, err)
    return {
      ...prevState,
      message: `Failed to fetch update task ${id}`,
      redirectTo: prevState.redirectTo
    }
  }
}
