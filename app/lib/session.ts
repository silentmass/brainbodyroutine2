import 'server-only'
import { cookies } from 'next/headers'

export function deleteSession () {
  cookies().delete('access_token')
}
