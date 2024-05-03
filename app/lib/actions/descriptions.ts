'use server'
// Description actions

import { revalidateTag } from 'next/cache'
import {
  ListDescriptionSchema,
  ListDescriptionWithIdSchema
} from '@/app/lib/definitions'
import { cookies } from 'next/headers'

export const createListDescription = async (
  listId: string,
  prevState: any,
  formData: FormData
) => {
  // Check access token cookie
  // Assume `cookies().get()` returns an object { token: "your_token_here" }
  const accessToken = cookies().get('access_token')

  if (!accessToken?.value)
    return {
      ...prevState,
      message: 'You need to authenticate. Description not created.'
    }

  const validatedFields = ListDescriptionSchema.safeParse({
    description: formData.get('description'),
    description_list_id: parseInt(listId),
    owner: parseInt(listId)
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const data = validatedFields.data

  console.log(data)

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_DESCRIPTIONLISTS}/${listId}/descriptions`,
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
      throw new Error(`List description create fetch failed`)
    }

    try {
      revalidateTag(`descriptions`)
      revalidateTag(`descriptionlist`)
      revalidateTag(`descriptionlists`)
    } catch (revalidateErr) {
      console.error(
        `List description create revalidate failed: `,
        revalidateErr
      )
    }

    return { ...prevState, message: `Description created` }
  } catch (err) {
    console.error(`List description create fetch failed`, err)
    return { ...prevState, errors: `List description create fetch failed` }
  }
}

export const updateListDescription = async (
  descriptionId: string,
  descriptionListId: string,
  prevState: any,
  formData: FormData
) => {
  // Check access token cookie
  // Assume `cookies().get()` returns an object { token: "your_token_here" }
  const accessToken = cookies().get('access_token')

  if (!accessToken?.value)
    return {
      ...prevState,
      message: 'You need to authenticate. Description not updated.'
    }

  const validatedFields = ListDescriptionWithIdSchema.safeParse({
    id: parseInt(descriptionId),
    description: formData.get('description'),
    description_list_id: parseInt(descriptionListId)
  })

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors)
    return { errors: validatedFields.error.flatten().fieldErrors }
  }

  const data = validatedFields.data

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_DESCRIPTIONS}/${data.id}/update`,
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
      throw new Error('List description update fetch result failed')
    }

    try {
      revalidateTag(`descriptions`)
      revalidateTag(`descriptionlist`)
      revalidateTag(`descriptionlists`)
      revalidateTag(`task`)
    } catch (revalidateErr) {
      console.error(
        'List description update revalidation failed:',
        revalidateErr
      )
    }

    return { ...prevState, message: 'Description updated' }
  } catch (err) {
    console.error('List description update fetch failed', err)
    return { ...prevState, errors: 'List description update fetch failed' }
  }
}

export const deleteListDescription = async (
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
      message: 'You need to authenticate. Description not deleted.'
    }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_DESCRIPTIONS}/${id}/delete`,
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
      throw new Error(`List description delete fetch failed`)
    }

    try {
      revalidateTag(`descriptions`)
      revalidateTag(`descriptionlist`)
      revalidateTag(`descriptionlists`)
      revalidateTag(`task`)
    } catch (revalidateErr) {
      console.log(`List description deleted revalidation failed`, revalidateErr)
    }

    return { ...prevState, message: `Description deleted` }
  } catch (err) {
    console.error(`List description delete fetch failed`, err)
    return { ...prevState, errors: `List description delete fetch failed` }
  }
}
