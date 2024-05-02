'use server'
import { AuthError } from 'next-auth'
import { User } from '@/app/lib/definitions'
import { signIn, signOut } from '../api/auth/[...nextauth]/route'
import { deleteSession } from '@/app/lib/session'

export async function getUser (
  username: string,
  password: string
): Promise<User | undefined> {
  const params = new URLSearchParams()
  params.append('username', username)
  params.append('password', password)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      mode: 'cors',
      body: params
    })
    return response.json()
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export async function getToken (username: string, password: string) {
  try {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    const token = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/token`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      mode: 'cors',
      body: params
    })
    return token.json()
  } catch (error) {
    console.error('Failed to fetch token:', error)
    throw new Error('Failed to fetch token.')
  }
}

export async function authenticate (prevState: any, formData: FormData) {
  try {
    const user = await signIn('credentials', formData)

    // This never gets executed
    console.log('authenticate', user)

    return { ...prevState, message: `We got token` }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { ...prevState, error: 'Invalid credentials.' }
        default:
          return { ...prevState, error: 'Something went wrong.' }
      }
    }
    throw error
  }
}

export const signOutAction = async () => {
  deleteSession()
  await signOut()
}
