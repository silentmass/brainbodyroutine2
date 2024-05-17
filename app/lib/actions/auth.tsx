'use server'
import { AuthError } from 'next-auth'
import { deleteSession } from '@/app/lib/session'
import { signIn, signOut } from '@/app/auth'

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
  const username = formData.get('username')
  const password = formData.get('password')
  try {
    // signIn will authenticate user and fetch and set access_token
    // When redirect is true, it will redirect to /login page and update session object
    // There are several callback functions attached
    const message = await signIn('credentials', {
      username: username,
      password: password,
      redirect: false
    }).then(
      async value => {
        // try {
        //   const token = await getToken(username, password)

        //   if (!token) return null

        //   cookies().set('access_token', token.access_token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'lax',
        //     path: '/'
        //   })
        // } catch (error) {
        //   console.error('Failed to fetch token:', error)
        //   throw new Error('Failed to fetch token.')
        // }

        return { ...prevState, message: `We signed in` }
      },
      value => {
        return { ...prevState, message: `Failed to sign in` }
      }
    )

    // This never gets executed redirect is true
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
