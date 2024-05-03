'use server'
import { revalidateTag } from 'next/cache'
import { TaskCategorySchema, TaskCategoryWithIdSchema } from '../definitions'

export const createTaskCategory = async (
  prevState: any,
  formData: FormData
) => {
  const validatedFields = TaskCategorySchema.safeParse({
    title: formData.get('taskCategoryTitle'),
    description: formData.get('taskCategoryDescription')
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const data = validatedFields.data

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKCATEGORIES}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(data)
      }
    )

    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    try {
      revalidateTag('taskcategories')
      revalidateTag('taskcategory')
    } catch (revalidateErr) {
      console.error(
        'Failed revalidate after create task category: ',
        revalidateErr
      )
    }

    return { ...prevState, message: `Created category ${data.title}` }
  } catch (err) {
    console.error('Failed to create task category:', err)
    return { ...prevState, message: 'Failed to create title and description' }
  }
}

export const updateTaskCategory = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  const validatedFields = TaskCategoryWithIdSchema.safeParse({
    id: parseInt(id),
    title: formData.get('taskCategoryTitle'),
    description: formData.get('taskCategoryDescription')
  })

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const data = validatedFields.data

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKCATEGORIES}/${id}/update`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(data)
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    try {
      revalidateTag('taskcategory')
      revalidateTag('taskcategories')
    } catch (revalidateErr) {
      console.error('Failed update task category revalidate: ', revalidateErr)
    }

    return {
      ...prevState,
      message: `Updated category ${data.title}`,
      redirectTo: '/task-categories'
    }
  } catch (err) {
    console.error('Failed to update task category:', err)
    return { ...prevState, message: 'Failed to update title and description' }
  }
}

export const deleteTaskCategory = async (
  id: string,
  prevState: any,
  formData: FormData
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_TASKCATEGORIES}/${id}/delete`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors'
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch delete task category')
    }

    try {
      revalidateTag('taskcategories')
      revalidateTag('taskcategory')
    } catch (revalidateErr) {
      console.error('Failed delete task category revalidate: ', revalidateErr)
    }

    return { ...prevState, message: `Deleted category` }
  } catch (err) {
    console.error('Failed to delete task category: ', err)
    return { ...prevState, message: 'Failed to delete tasks category' }
  }
}
