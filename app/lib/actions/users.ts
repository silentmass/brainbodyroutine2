import { User } from '../definitions'

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
