'use server'
import { AuthError } from 'next-auth'
import { signIn, signOut } from '../../api/auth/[...nextauth]/route'
import { deleteSession } from '@/app/lib/session'
import { redirect } from 'next/navigation'

export async function getToken (username: string, password: string) {
  try {
    const params = new URLSearchParams()
    params.append('username', username)
    params.append('password', password)

    const token = await fetch(
      `${process.env.NEXT_PUBLIC_URL}${process.env.API_ROUTER_AUTH}/token`,
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
    return token.json()
  } catch (error) {
    console.error('Failed to fetch token:', error)
    throw new Error('Failed to fetch token.')
  }
}

export async function authenticate (prevState: any, formData: FormData) {
  try {
    const message = await signIn('credentials', {
      username: formData.get('username'),
      password: formData.get('password'),
      redirect: false
    }).then(
      value => {
        return { ...prevState, message: `We signed in ${value}` }
      },
      value => {
        return { ...prevState, message: `Failed to sign in ${value}` }
      }
    )

    // This never gets executed
    // Maybe use signIn callback function
    return { ...message, redirectTo: '/login' }
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
