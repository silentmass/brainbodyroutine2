'use server'
import { User, UserRegisterSchema } from '@/app/lib/definitions'

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
    return { ...prevState, error: 'Create user fetch failed' }
  }
}
