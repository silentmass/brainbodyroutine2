'use server'
import { User, UserRegisterSchema } from '@/app/lib/definitions'
import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { permanentRedirect } from 'next/navigation'
import { deleteSession } from '@/app/lib/session'
import { signOutAction } from './auth'
import { signOut } from '@/app/auth'

export async function getUser (
  username: string,
  password: string
): Promise<User | undefined> {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_USERS}`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        mode: 'cors',
        body: params
      }
    )
    return response.json()
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export async function createUser (prevState: any, formData: FormData) {
  const validatedFields = UserRegisterSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    full_name: formData.get('fullname'),
    disabled: formData.get('disabled'),
    password: formData.get('password')
  })

  console.log('process.env.API_ROUTER_USERS', process.env.API_ROUTER_USERS)

  try {
    if (!validatedFields.success) {
      console.log(validatedFields.error.flatten().fieldErrors)
      return { errors: validatedFields.error.flatten().fieldErrors }
    }

    const data = validatedFields.data

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_USERS}/create`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(data)
      }
    )

    if (!res.ok) {
      throw new Error('Failed to fetch create user')
    }

    return { ...prevState, message: 'User created' }
  } catch (error) {
    console.error('Create user fetch failed', error)
    return {
      ...prevState,
      message: 'Create user fetch failed',
      errors: 'Create user fetch failed'
    }
  }
}

export const deleteUser = async (prevState: any, formData: FormData) => {
  // Check access token cookie
  // Assume `cookies().get()` returns an object { token: "your_token_here" }
  const accessToken = cookies().get('access_token')
  if (!accessToken?.value)
    return {
      ...prevState,
      message: 'You need to authenticate. No user deleted.'
    }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_USERS}/delete`,
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
      throw new Error('Failed to fetch delete user')
    }

    try {
      revalidateTag('users')
    } catch (revalidateErr) {
      console.error(`Failed to delete user revalidate: `, revalidateErr)
    }
  } catch (err) {
    console.error(`Failed to delete user`, err)
    return {
      ...prevState,
      message: `Failed to delete user`,
      errors: err
    }
  }

  deleteSession()
  await signOut()
  return permanentRedirect('/tasks/filter')
}
